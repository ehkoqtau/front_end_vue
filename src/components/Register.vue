<template>
  <div class="register">
    <div class="login-wrapper border border-light">
      <form class="form-signin" @submit.prevent="register">
        <h2 class="form-signin-heading">Register User</h2>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <label for="inputUsername" class="sr-only">Username</label>
        <input v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <label for="inputEmail" class="sr-only">Email</label>
        <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="john@doe.com" required autofocus>
        <label for="inputHP" class="sr-only">HP</label>
        <input v-model="hp" type="text" id="inputHP" class="form-control" placeholder="085761924155" required autofocus>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        <p>
        <div align="center">
          <label class=""><router-link :to="{ path: '/login' }">Login</router-link></label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      hp: '',
      error: false,
      reg_stat: ''
    }
  },
  updated () {
    if (this.reg_stat === true) {
      this.$router.push({path: '/login', query: { account: 'created' }})
    }
  },
  created () {
    if (this.reg_stat === true) {
      this.$router.push({path: '/login', query: { account: 'created' }})
    }
  },
  methods: {
    register () {
      this.$http.post('/auth/register', { username: this.username, password: this.password, email: this.email, hp: this.hp })
        .then(request => this.registerSuccess(request))
        .catch(() => this.registerFailed())
    },
    registerSuccess (req) {
      if (!req.data.status) {
        this.registerFailed()
        return
      }
      this.error = false
      this.reg_stat = req.data.status
      this.$store.dispatch('register')
      this.$router.push({path: '/login', query: { account: 'created' }})
    },
    registerFailed () {
      this.error = 'Register failed!'
      this.$store.dispatch('register')
      delete localStorage.token
    }
  }
}
</script>

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
.form-signin  {
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
