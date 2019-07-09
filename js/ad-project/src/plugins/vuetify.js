import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import '../stylus/main.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: colors.blue.darken3
  }
})
