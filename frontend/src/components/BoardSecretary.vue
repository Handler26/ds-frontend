<template>
  <div v-for="application in content" :key="application">
    <div class="boxBig">
      <div class="box">
        <div class="titles">
          Degree Title
        </div>
        <div>
          {{application.bachelorDegreeTitle}}
        </div>
      </div>
      <div class="box">
        <div class="titles">
          Degree Grade
        </div>
        {{application.bachelorDegreeGrade}}
      </div>
      <div class="box">
        <div class="titles">
          Teachers
        </div>
        {{application.teachers}}
      </div>
      <div class="box">
        <div class="titles">
          Master Name
        </div>
        {{application.mastername}}
      </div>
      <div class="box">
        <div class="titles">
          Accepted by Teacher
        </div>
        <div v-if="application.set_acceptedby_teacher">
          Yes
        </div>
        <div v-if="!application.set_acceptedby_teacher">
          No
        </div>
      </div>
      <div class="box">
        <div class="titles">
          Accepted by Secretary
        </div>
        <div v-if="application.set_acceptedby_secretary">
          Yes
        </div>
        <div v-if="!application.set_acceptedby_secretary">
          No
        </div>
        <button @click="acceptApplication(application)">
          Accept Application
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "BoardSecretary",
  data() {
    return {
      content: [],
    };
  },
  mounted() {
    UserService.getAllApplications().then(
      (response) => {
        response.data.forEach(element => {
          this.content.push(element)
        });
        console.log(this.content)
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }

    )
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    acceptApplication(application) {
      UserService.updateApplication(application).then (
        (response) => {
          console.log(response)
        },
      )
    }
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}

.box {
  display: flex;
  flex-direction: column;
}

.boxBig {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  border-style: solid;
  border-radius: 10px;
  padding: 5px
}

.applications {
  margin-top: 40px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: bold;
}
.titles {
  text-decoration: underline;
}

.btn.btn-primary.btn-block {
  margin-top: 20px;
}
</style>
