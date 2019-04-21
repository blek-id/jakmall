<template>
  <div class="checkout">
    <div class="progress">
      <div class="progress--item">
        <div class="circle" v-bind:class="{'circle__active' : activeNumber === 1}">1</div>
        <span>Delivery</span>
      </div>
      <font-awesome-icon icon="chevron-right" class="progress--separator"/>
      <div class="progress--item">
        <div class="circle" v-bind:class="{'circle__active' : activeNumber === 2}">2</div>
        <span>Payment</span>
      </div>
      <font-awesome-icon icon="chevron-right" class="progress--separator"/>
      <div class="progress--item">
        <div class="circle" v-bind:class="{'circle__active' : activeNumber === 3}">3</div>
        <span>Finish</span>
      </div>
    </div>
    <div class="navigator" v-show="activeNumber !== 3" @click.prevent="backNavigate">
      <font-awesome-icon icon="arrow-left"/>
      <span class="back-text" v-show="activeNumber === 1">Back to cart</span>
      <span class="back-text" v-show="activeNumber === 2">Back to delivery</span>
    </div>
    <div class="content">
      <Delivery v-show="activeNumber === 1" v-on:toggle-dropshipper="toggleDropshipper"/>
      <Payment v-show="activeNumber === 2" v-on:radio-chosen="radioChosen"/>
      <Finish
        v-show="activeNumber === 3"
        v-on:back-homepage="backHomepage"
        v-bind:payment-object="paymentObject"
      />
      <div class="content--separator"></div>
      <div class="content--summary">
        <Summary
          v-bind:is-dropshipper="this.isDropshipper"
          v-bind:payment-object="this.paymentObject"
        />
        <div v-show="activeNumber === 1">
          <button
            type="button"
            @click.prevent="deliverySubmit"
            class="button-primary"
          >Continue To Payment</button>
        </div>
        <div v-show="activeNumber === 2">
          <button
            type="button"
            @click.prevent="paymentSubmit"
            class="button-primary"
          >Pay with {{paymentMethod}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Delivery from "./Delivery";
import Payment from "./Payment";
import Summary from "./Summary";
import Finish from "./Finish";

export default {
  name: "Checkout",
  components: {
    Delivery,
    Payment,
    Summary,
    Finish
  },
  watch: {
    paymentObject: {
      handler: function(val) {
        if (val.paymentOption === 1) {
          this.paymentMethod = "e-Wallet";
        } else if (val.paymentOption === 2) {
          this.paymentMethod = "Bank Transfer";
        } else if (val.paymentOption === 3) {
          this.paymentMethod = "Virtual Account";
        }
      },
      deep: true
    }
  },
  data() {
    return {
      activeNumber: 1,
      isDropshipper: true,
      paymentObject: {
        paymentOption: 0,
        shipmentOption: 0
      },
      paymentMethod: ""
    };
  },
  methods: {
    backHomepage() {
      location.reload();
    },
    backNavigate() {
      if (this.activeNumber === 2) {
        this.activeNumber = 1;
      } else if (this.activeNumber === 1) {
        location.reload();
      }
    },
    paymentSubmit() {
      this.activeNumber = 3;
    },
    toggleDropshipper(isDropshipper) {
      this.isDropshipper = isDropshipper;
    },
    async deliverySubmit() {
      this.$validator.validateAll();

      let valid = await this.$validator.validateScopes();
      if (!valid) {
        return;
      }

      this.activeNumber = 2;
      await this.$validator.reset();
    },
    radioChosen(paymentObject) {
      this.paymentObject.paymentOption = paymentObject.paymentOption;
      this.paymentObject.shipmentOption = paymentObject.shipmentOption;
    }
  }
};
</script>

<style lang="stylus">
@import '../css/checkout.styl';
@import '../css/common.styl';
</style>
