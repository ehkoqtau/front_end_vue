<template>
  <div class="member">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <router-link :to="{ path: '/'}" replace class="navbar-brand">{{ header }}</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link :to="{ path: '/members'}" replace class="nav-link">Home</router-link>
          </li>
          <li>
            <router-link v-on:click.native="getUser" to="/members" class='nav-link'>Get User</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ path: '/logout'}" replace class="nav-link">Logout</router-link>
          </li>
        </ul>
          <router-link :to="{ path: '#'}" replace class="nav-link">{{ username }}</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MemberArea',
  data () {
    return {
      username: '',
      header: 'Vue',
      logout: 'Logout'
    }
  },
  mounted () {
    if (localStorage.token) {
      this.username = localStorage.username
    }
  },
  created () {
    if (!localStorage.token && this.$route.path === '/members') {
      this.$router.push({path: '/'})
    }
  },
  methods: {
    getUser () {
      this.$http.post('/main/userdet')
        .then(request => this.userDetail(request))
        .catch(() => this.failedGetUser())
    },
    userDetail (req) {
      alert(req.data.email)
    },
    failedGetUser () {
      alert('failed')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #605B56;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
