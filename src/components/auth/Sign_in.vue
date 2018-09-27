<template>
<v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md5>
            <v-card class="elevation-15">
              <v-toolbar dark>
                <v-toolbar-title>Sign in form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                   v-model="email" color="grey" prepend-icon="person"
                   name="email" label="Email" type="email"
                   :rules="emailRules"
                  ></v-text-field>
                  <v-text-field 
                  v-model="password" color="grey" prepend-icon="lock" name="password" 
                  label="Password" type="password" :rules="passwordRules"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                 :disabled="!valid || loading"
                 class="white"
                 :loading="loading"
                 @click="onSubmit">Submit</v-btn>
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
      valid: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 3) || 'Password must be more than 3 characters'
      ]
    }
  },
  methods: {
    onSubmit () {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        console.log('asdasdasdasda')
        this.$store.dispatch('loginUser', user)
           .then(this.$router.push('/'))
          .catch(err => {})
        console.log('asd22222')
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  created () {
    if(this.$route.query['loginError']){
      this.$store.dispatch('setError', 'You may log in to access this page  ')
    }

  }
}
</script>
