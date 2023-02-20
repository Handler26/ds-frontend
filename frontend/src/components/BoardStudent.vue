<template>
  <div class="applications">
    My applications
  </div>
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
      </div>
    </div>
  </div>
  <div class="applications">
    Create New Application
  </div>
  <Form @submit="handleNewApplication" :validation-schema="schema">
        <div v-if="!successful">
          <div class="form-group">
            <label for="bachelorDegreeTitle">Bachelor Degree Title</label>
            <Field name="bachelorDegreeTitle" type="text" class="form-control" />
            <ErrorMessage name="bachelorDegreeTitle" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="bachelorDegreeGrade">Bachelor Degree Grade</label>
            <Field name="bachelorDegreeGrade" type="text" class="form-control" />
            <ErrorMessage name="bachelorDegreeGrade" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="teachers">Teachers</label>
            <Field name="teachers" type="text" class="form-control" />
            <ErrorMessage name="teachers" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="mastername">Master Name</label>
            <Field name="mastername" type="text" class="form-control" />
            <ErrorMessage name="mastername" class="error-feedback" />
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Create Application
            </button>
          </div>
        </div>
      </Form>

</template>

<script>
import UserService from "../services/user.service";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "BoardStudent",
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    const schema = yup.object().shape({
      bachelorDegreeTitle: yup
        .string()
        .required("Bachelor Degree Title is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      bachelorDegreeGrade: yup
        .string()
        .required("Bachelor Degree Grade is required!")
        .max(50, "Must be maximum 50 characters!"),
      teachers: yup
        .string()
        .required("Teachers are required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      mastername: yup
        .string()
        .required("Master Name is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      content: [],
      schema
    };
  },
  mounted() {
    UserService.getApplications().then(
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
    handleNewApplication(user){
      UserService.newApplication(user).then(
        (response) => {
          this.content = response.data;
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