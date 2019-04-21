<template>
  <div class="content--body">
    <div class="content--row finish">
      <div class="content--column finish--header">
        <h1 class="header-text header-text__underline">Thank you</h1>
      </div>
      <div class="content--column finish--body">
        <p class="finish--text__bold">Order ID: {{orderID}}</p>
        <p>Your order will be delivered {{this.shipment.duration}} with {{this.shipment.text}}</p>
      </div>
      <div class="content--column navigator" @click.prevent="backHomepage">
        <font-awesome-icon icon="arrow-left"/>
        <span class="back-text">Go to homepage</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Finish",
  props: ["paymentObject"],
  created() {
    let allowedChars = "abcdefghjklmnpqrstuvwxyz23456789";

    for (let i = 0; i <= 5; i++) {
      this.orderID += allowedChars.charAt(
        Math.floor(Math.random() * allowedChars.length)
      );
    }
    this.orderID = this.orderID.toUpperCase();
  },
  watch: {
    paymentObject: {
      handler: function(val) {
        if (val.shipmentOption === 1) {
          this.shipment.text = "GO-SEND";
          this.shipment.duration = "today";
        } else if (val.shipmentOption === 2) {
          this.shipment.text = "JNE";
          this.shipment.duration = "in 2 days";
        } else if (val.shipmentOption === 3) {
          this.shipment.text = "Personal Courier";
          this.shipment.duration = "tomorrow";
        }
      },
      deep: true
    }
  },
  data() {
    return {
      shipment: {
        text: "",
        duration: ""
      },
      orderID: ""
    };
  },
  methods: {
    backHomepage() {
      this.$emit("back-homepage");
    }
  }
};
</script>

<style lang="stylus">
@import '../css/finish.styl';
@import '../css/common.styl';
</style>
