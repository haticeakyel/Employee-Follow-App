<template>
  <div id="app">
    <Home />
    <UserList/>
  </div>
</template>
<script>
import Home from './components/Home.vue';
import UserList from './components/UserList.vue';
export default {
  name: 'App',
  components: {
    Home,
    UserList,

  }
}
</script>
