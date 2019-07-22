
<script>
export default {
  name: 'Logout',
  created () {
    delete localStorage.token
    delete localStorage.username
    this.$router.push({path: '/'})
  }
}
</script>
