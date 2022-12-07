<template>
  <div class="container-fluid p-0 m-0">
    <NavbarMenu
      i="nav-link active"
      d="nav-link"
      o="nav-link"
      v-on:orders="onOrders"
    ></NavbarMenu>

    <div class="row justify-content-around mt-2">
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
      >
        <h1 class="logo">RapiEnvia</h1>
        <p class="col-8">
          Llena el formulario con los campos de la nueva orden
        </p>
        <label for="content">Content</label>
        <input
          type="text"
          name="content"
          id="content"
          class="rounded col-8"
          v-model="content"
          required
        />

        <label for="description" class="mt-1">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          class="rounded col-8"
          v-model="description"
          required
        />

        <label for="cost" class="mt-1">Cost</label>
        <input
          type="number"
          name="cost"
          id="cost"
          class="rounded col-8"
          v-model="cost"
          required
        />

        <label for="customer" class="mt-1">Customer</label>
        <input
          type="text"
          name="customer"
          id="customer"
          class="rounded col-8"
          v-model="customer"
          required
        />

        <label for="delivery_time" class="mt-1">Delivery time</label>
        <input
          type="date"
          name="delivery_time"
          id="delivery_time"
          class="rounded col-8"
          v-model="delivery_time"
          required
        />

        <label for="payment_method" class="mt-1">Payment method</label>
        <select
          class="form-select rounded mb-1"
          id="inputGroupSelect01"
          ref="payment"
          style="width: 350px"
          required
        >
          <option v-for="element in elements" :key="element">{{element.text}}</option>
        </select>

        <label for="domiciliary" class="mt-1">Domiciliary</label>
        <select
          class="form-select rounded mb-1"
          id="inputGroupSelect01"
          ref="domici"
          style="width: 350px"
        >
          <option v-for="domi in domis" :key="domi">{{domi.id_user}}</option>
        </select>

        <div></div>
        <button
          type="btn"
          class="btn btn-primary rounded col-3"
          v-on:click="createOrder"
        >
          Create
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMenu from "../components/navbar.components.vue";
import axios from "axios";

export default {
  name: "CreateOrderView",
  components: {
    NavbarMenu,
  },
  data: () => ({
    content: null,
    description: null,
    domis:null,
    cost: 0,
    elements :[{
        text:"Online"
    },{
        text:'Punto de pago'
    },{
        text:'Contra entrega'
    }],
    domiciliary:null,
    delivery_time: null,
    customer: null,
    api: window.HOST + "/order/new",
  }),
  methods: {
    async createOrder() {
      console.log(Date.parse(this.delivery_time).toString);
      await axios
        .post(this.api, {
          content: this.content,
          description: this.description,
          payment_method:this.$refs.payment.value,
          delivery_time: this.delivery_time, 
          domiciliary: this.$refs.domici.value,
          cost: this.cost,
          customer: this.customer,
        })
        .then(() => {
          alert("Order create");
          this.$router.push("/");
        })
        .catch(() => {
          alert("Order don't create");
          this.$router.push("/");
        });
    },
    onOrders() {},
    async getDomicliaries(){
      await axios.get(window.HOST + "/users").then((result) =>{
        this.domis = result.data.data;
        console.log(this.domis);
      })
    }
  },
  created() {
    if (sessionStorage.token == null) {
      this.$router.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + sessionStorage.token;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    
    this.getDomicliaries();
  },
};
</script>

<style scoped>
</style>