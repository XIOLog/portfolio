<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <v-flex lg4 md6 sm8 xs12>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              validation
            >
              <v-text-field
                :rules="emailRules"
                label="Email"
                name="email"
                prepend-icon="person"
                type="email"
                v-model="email"
              ></v-text-field>
              <v-text-field
                :counter="6"
                :rules="passwordRules"
                label="Password"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                :counter="6"
                :rules="confirmPasswordRules"
                label="Confirm password"
                name="confirm-password"
                prepend-icon="lock"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid || loading"
              @click="onSubmit"
              color="primary"
              :loading="loading"
            >Create account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be equal or more than 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match'
      ]
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  }
}
</script>
