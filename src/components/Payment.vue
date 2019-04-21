<template>
  <div class="content--body">
    <div class="content--row">
      <div class="content--column">
        <h1 class="header-text header-text__underline">Shipment</h1>
      </div>
    </div>
    <div class="radio">
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.shipmentOption === 1}"
        @click.prevent="chooseShipment(1)"
      >
        <div class="radio--text">
          <p>GO-SEND</p>
          <P>15,000</P>
        </div>
        <div class="radio--icon" v-show="paymentObject.shipmentOption === 1">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.shipmentOption === 2}"
        @click.prevent="chooseShipment(2)"
      >
        <div class="radio--text">
          <p>JNE</p>
          <P>9,000</P>
        </div>
        <div class="radio--icon" v-show="paymentObject.shipmentOption === 2">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.shipmentOption === 3}"
        @click.prevent="chooseShipment(3)"
      >
        <div class="radio--text">
          <p>Personal Courier</p>
          <P>29,000</P>
        </div>
        <div class="radio--icon" v-show="paymentObject.shipmentOption === 3">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
    </div>
    <div class="content--row">
      <div class="content--colum">
        <h1 class="header-text header-text__underline">Payment</h1>
      </div>
    </div>
    <div class="radio">
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.paymentOption === 1}"
        @click.prevent="choosePayment(1)"
      >
        <div class="radio--text">
          <p>e-Wallet</p>
        </div>
        <div class="radio--icon" v-show="paymentObject.paymentOption === 1">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.paymentOption === 2}"
        @click.prevent="choosePayment(2)"
      >
        <div class="radio--text">
          <p>Bank Transfer</p>
        </div>
        <div class="radio--icon" v-show="paymentObject.paymentOption === 2">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
      <div
        class="radio--item"
        v-bind:class="{'radio-item__active' : paymentObject.paymentOption === 3}"
        @click.prevent="choosePayment(3)"
      >
        <div class="radio--text">
          <p>Virtual Account</p>
        </div>
        <div class="radio--icon" v-show="paymentObject.paymentOption === 3">
          <font-awesome-icon icon="check" class="icon_choosen icon_success"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Payment",
  data() {
    return {
      paymentObject: {
        shipmentOption: 0,
        paymentOption: 0
      }
    };
  },
  methods: {
    chooseShipment(number) {
      this.paymentObject.shipmentOption = number;
      this.$emit("radio-chosen", this.paymentObject);
    },
    choosePayment(number) {
      this.paymentObject.paymentOption = number;
      this.$emit("radio-chosen", this.paymentObject);
    }
  }
};
</script>

<style lang="stylus">
@import '../css/payment.styl';
@import '../css/common.styl';
</style>
