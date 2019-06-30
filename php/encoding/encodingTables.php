<?php
$dbh = new PDO('mysql:host=localhost;dbname=test;charset=UTF8', 'root', '');
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if($dbh) {
    echo "Соединение установлено<br><br>";
} else {
    throw new Exception("Ошибка соединения с базой данных", 1);
}

/*
	Настройки скрипта
*/

// Определяем названия таблиц
$oldTableName = 'documents';
$newTableName = 'documents_encoded';

// Определяем переменные для перебора
$limit = 1000;
$point = 0;
$offset = 0;
$oldDbData = array();


// Получаем общее количество записей в таблице `documents`
$allRows = $dbh->query("SELECT count(*) FROM {$oldTableName}")->fetchColumn();

//создаем новую таблицу, в которой разместим измененные данные
$newTableSql = <<<EOL
create table if not exists {$newTableName}
(
    id int(11) not null auto_increment,
    title varchar(255) not null,
    document_text text not null,
    PRIMARY KEY(id)
) CHARACTER SET utf8 COLLATE utf8_general_ci;
EOL;
if ($dbh->exec($newTableSql) === false) {
	throw new Exception('Не удалось создать новую таблицу');
}

//собираем данные из старой таблицы, обрабатываем и вносим в новую. Используем вложенных SELECT, чтобы снизить нагрузку на БД
$oldDbSql = $dbh->prepare("SELECT t.id, t.title, t.document_text
								FROM ( SELECT id FROM {$oldTableName} ORDER BY id LIMIT :offset, {$limit} ) q
								JOIN {$oldTableName} t
								ON t.id = q.id
							");

while ($point < $allRows) {
	if($point % $limit === 0) {
		$oldDbSql->bindParam(':offset', $offset, PDO::PARAM_INT);
		$oldDbSql->execute();
		$oldDbData = $oldDbSql->fetchAll(PDO::FETCH_ASSOC);
		$offset = $offset + $limit;

		$cnt_rows = count($oldDbData);
		$row_length = count($oldDbData[0]);
		$length = $cnt_rows * $row_length;

		$args = implode(',', array_map(
		    function($el) {return '('.implode(',', $el).')'; },
		    array_chunk(array_fill(0, $length, '?'), $row_length)
		));

		$params = array();

		// Обрабатываем строки и меняем кодировку
		foreach($oldDbData as $row) {
			$row['title'] = strip_tags(mb_convert_encoding($row['title'], 'UTF-8', 'windows-1251'));
			$row['document_text'] = strip_tags(mb_convert_encoding($row['document_text'], 'UTF-8', 'windows-1251'));
			foreach($row as $value) {
				$params[] = $value;
			}
		}

		// Подготавливаем запрос для вставки значений. Будем отправлять оптимизированно, одним запросом, дабы снизить количество запросов к БД.
		$stmt = $dbh->prepare("INSERT INTO {$newTableName} (id, title, document_text) VALUES " . $args);

		try {
			$stmt->execute($params);
		} catch(PDOException $e) {
			throw new PDOException("Ошибка вставки данных в таблицы: $e");
			$dbh->rollBack();
		}
	}		

	$point++;
}