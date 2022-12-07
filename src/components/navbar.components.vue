<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand logo" href="/">RapiEnvia</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a :class="i" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <button type="btn" class="nav-link btn" v-on:click="exit">
              Logout
            </button>
          </li>
        </ul>
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="orderSearch"
          />
          <button
            class="btn btn-outline-success"
            type="btn"
            v-on:click="search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  name: "NavbarMenu",
  data: () => ({
    orderSearch: null,
    orders: null,
    apiOrderId: window.HOST + "/order/",
  }),
  props: {
    i: String,
    o: String,
    d: String,
  },
  methods: {
    exit() {
      sessionStorage.clear();
      this.$router.push({ path: "/login" });
    },
    async search() {
      await axios.get(this.apiOrderId + this.orderSearch).then((result) => {
        this.orders = result.data.data;
        this.$emit("orders", this.orders);
      });
    },
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.token;
  },
};
</script>