<template>
  <div>
    <NavbarMenu i="nav-link active" d="nav-link" o="nav-link" v-on:orders="onOrders"></NavbarMenu>

    <div class="container mt-3 border boder-secondary rounded p-3 shadow">
      <div class="row justify-content-around">
        <h3 class="col-8">Orders</h3>
        <button
          class="
            bg-green
            border border-secondary
            col-1
            rounded
            row
            align-items-center
          "
          v-on:click="createPage"
        >
          <span
            class="material-symbols-outlined text-center"
            style="color: white; font-size: 40px"
          >
            add
          </span>
        </button>
        <button
        type="btn"
          class="
            bg-red
            border border-secondary
            col-1
            rounded
            row
            align-items-center
          "
          v-on:click="deleteOrder"
        >
          <span class="material-symbols-outlined text-center"
            style="color: white; font-size: 40px"
          > remove </span>
        </button>
        <div v-if="orders" class="col-12 row p-2">
          <div v-for="(order, index) in orders" :key="index">
            <div class="border rounded col-12 row p-1 m-1">
                <h4>Order {{index + 1}}</h4>
                <hr class="mb-1">
              <p class="pl-3 m-0">Content: <span style="color:brown">{{ order.content }}</span></p>
              <p class="pl-3 m-0">Description: <span style="color:brown">{{ order.description }}</span></p>
              <p class="pl-3 m-0">Order code: <span style="color:brown">{{ order.id_order }}</span></p>
              <p class="pl-3 m-0">Domiciliary code: <span style="color:brown">{{ order.domiciliary }}</span></p>
              <p class="pl-3 m-0">Customer: <span style="color:brown">{{ order.customer }}</span></p>
              <p class="pl-3 m-0">Delivery time: <span style="color:brown">{{ new Date(order.delivery_time).getDate() * 1440 }} min.</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarMenu from "../components/navbar.components.vue";
import axios from "axios";

export default {
  components: {
    NavbarMenu,
  },
  data: () => ({
    orders: null,
    apiOrders: window.HOST + "/orders",
    apiDelete: window.HOST + "/order/",
  }),
  methods: {
    async getOrders() {
      await axios.get(this.apiOrders).then((result) => {
        this.orders = result.data.data;
      });
      console.log(this.orders)
    },
    onOrders(parameter){
        this.orders = null;
        this.orders = parameter.data;
    },
    createPage(){
      this.$router.push("/create")
    },
    deleteOrder(){
      let orderId = prompt("Write id order to delete")
      axios.delete(this.apiDelete + orderId).then(()=>{
        this.$router.push("/login")
      })
    },
    onOrders(orders){
      this.orders = new Array();
      this.orders.push(orders);
    }
  },
  created() {
    if (sessionStorage.token == null) {
      this.$router.push("/login");
    }
    axios.defaults.headers.common["Authorization"] =
            "Bearer " + sessionStorage.token;
    if(this.orders == null){
      this.getOrders();
    }
    
    
  },
};
</script>

<style scoped>
.bg-red {
  background-color: red;
}

.bg-green {
  background-color: green;
}
</style>