<template>
  <div class="container">
    {{this.currentUser.email}}
  </div>
  <div class="container">
    {{this.currentUser.role}}
  </div>
  <div>
    Students Applications
  </div>
</template>

<script>


export default {
  name: "BoardTeacher",
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  }
};
</script>
