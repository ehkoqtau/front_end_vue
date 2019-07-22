<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading" align="center">Please sign in</h2>
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <div class="alert alert-success" v-if="this.$route.query.account === 'created'">Register user success, please login</div>
      <label for="inputUsername" class="sr-only">Username</label>
      <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p>
      <div align="center">
        <label class=""><router-link :to="{ path: '/register' }">Register</router-link></label>
      </div>
    </form>
    <p align="center">&copy; 2019 - @ehkoqtau </p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      error: false
    }
  },
  updated () {
    if (localStorage.token) {
      this.$router.replace({path: '/members'})
    }
  },
  created () {
    if (localStorage.token) {
      this.$router.replace({path: '/members'})
    }
  },
  methods: {
    login () {
      this.$http.post('/auth/login', { username: this.username, password: this.password })
        .then(request => this.loginSuccessful(request))
        .catch(() => this.loginFailed())
    },
    loginSuccessful (req) {
      if (!req.data.token) {
        this.loginFailed()
        return
      }
      this.error = false
      localStorage.token = req.data.token
      localStorage.username = req.data.username
      this.$store.dispatch('login')
      this.$router.replace({path: '/members'})
    },
    loginFailed () {
      this.error = 'Login failed!'
      this.$store.dispatch('login')
      delete localStorage.username
      delete localStorage.token
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #605B56;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
