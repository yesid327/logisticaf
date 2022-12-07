<template>
  <div class="container-fluid shadow p-0 m-0 h-100 bg-dark">
    <div class="row h-100p p-0 m-0 align-items-center justify-content-center">
      <div
        v-if="login"
        class="
          shadow
          rounded
          form
          col-5
          border border-secundary
          row
          p-4
          bg-morning-blue
          color-white
          justify-content-around
          text-center
        "
        id="login"
      >
        <h1 class="logo">RapiEnvia</h1>
        <p class="col-8">
          Ingresa con tus credenciales a la pagina de logistica más grande del
          país
        </p>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="rounded col-8"
          v-model="email"
        />

        <label for="password" class="mt-1">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="rounded col-8"
          v-model="password"
        />

        <div></div>
        <div class="col-10 row justify-content-evenly mt-3">
          <button
            v-on:click="authentication"
            type="btn"
            class="btn btn-secondary rounded col-3"
          >
            Sign In
          </button>
          <button
            type="btn"
            id="btn-r"
            class="btn btn-secondary rounded col-3"
            v-on:click="signUp"
          >
            Sing Up
          </button>
        </div>
      </div>

      <div
        class="
          shadow
          rounded
          form
          col-5
          border border-secundary
          row
          p-4
          bg-morning-blue
          color-white
          justify-content-around
          text-center
        "
        id="register"
        v-else
      >
        <h1 class="logo">RapiEnvia</h1>
        <p class="col-8">
          Registrate a la pagina de logistica más grande del país
        </p>
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          class="rounded col-8"
          v-model="usernameRegister"
        />

        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="rounded col-8"
          v-model="emailRegister"
        />

        <label for="password" class="mt-1">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="rounded col-8"
          v-model="passwordRegister"
        />

        <div class="form-check col-8 row justify-content-evenly mt-2">
          <input
            class="form-check-input checkb col-2"
            type="checkbox"
            id="flexCheckDefault"
          />
          <label
            class="form-check-label col-8"
            for="flexCheckDefault"
            style="font-size: 13px"
          >
            Soy domiciliario.
          </label>
        </div>
        <div></div>
        <div class="col-10 row justify-content-evenly mt-3">
          <button
            type="btn"
            id="btn-l"
            class="btn btn-secondary rounded col-3"
            v-on:click="signIn"
          >
            Sign In
          </button>
          <button
            type="btn"
            v-on:click="register"
            class="btn btn-secondary rounded col-3"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AuthView",
  data: () => ({
    login: true,
    email: null,
    password: null,
    username: null,
    usernameRegister: null,
    emailRegister: null,
    passwordRegister: null,
    api: window.HOST + "/login",
    apiRegister: window.HOST + "/user/new",
  }),
  methods: {
    authentication() {
      axios
        .post(this.api, {
          email: this.email,
          password: this.password,
        })
        .then((result) => {
          sessionStorage.token = result.data.data.token;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + result.data.data.token;
          this.$router.push({ path: "/" });
        });
    },
    register() {
      axios
        .post(this.apiRegister, {
          email: this.emailRegister,
          username: this.usernameRegister,
          password: this.passwordRegister,
          id_rol: window.$('.checkb').prop('checked') ? 1 : 2
        })
        .then((result) => {
          alert(result.data.message);
          this.signIn();
        })
        .catch((err) => {
          alert("No se pudo registrar");
        });
    },
    signUp() {
      this.login = false;
    },
    signIn() {
      this.login = true;
    },
  },
  created() {
    if (sessionStorage.token != null) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
.h-100 {
  height: 100vh !important;
  width: 100% !important;
}

.h-100p {
  height: 100%;
}
</style>