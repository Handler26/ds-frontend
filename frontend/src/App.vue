<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">JWT Client for Spring Boot</a>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" /> Home
          </router-link>
        </li> -->
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/teacher" class="nav-link">Teacher</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/secretary" class="nav-link">Secretary</router-link>
        </li>
        <li v-if="showStudentBoard" class="nav-item">
          <router-link  to="/student" class="nav-link">Student</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          <router-link to="/teacher" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.firstname }}
          </router-link>
        </li> -->
        <li class="nav-item">
          <button class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </button>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('STUDENT');
      }

      return false;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('TEACHER');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.role) {
        return this.currentUser.role.includes('SECRETARY');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
  
};
</script>
