<template>
  <div class="checkout-box">
    <div class="layout-box">
      <div class="progress-box">
        <div class="progress-item">
          <div class="circle" v-bind:class="{'circle__active' : activeNumber === 1}">1</div>
          <span>Delivery</span>
        </div>
        <font-awesome-icon icon="chevron-right" class="progress-item-separator"/>
        <div class="progress-item">
          <div class="circle" v-bind:class="{'circle__active' : activeNumber === 2}">2</div>
          <span>Payment</span>
        </div>
        <font-awesome-icon icon="chevron-right" class="progress-item-separator"/>
        <div class="progress-item">
          <div class="circle" v-bind:class="{'circle__active' : activeNumber === 3}">3</div>
          <span>Finish</span>
        </div>
      </div>
      <div class="form-box">
        <Delivery v-on:next-delivery-step="nextDeliveryStep" v-show="activeNumber === 1"/>
      </div>
    </div>
  </div>
</template>

<script>
import Delivery from "./Delivery";

export default {
  name: "Checkout",
  components: {
    Delivery
  },
  data() {
    return {
      activeNumber: 1
    };
  },
  methods: {
    nextDeliveryStep() {
      this.activeNumber = 2;
    }
  }
};
</script>

<style lang="stylus">
@import '../css/checkout.styl';
</style>
