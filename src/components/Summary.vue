<template>
  <div>
    <div class="content--row content--row__vertical content--row__summary">
      <h2 class="header-text header-text__summary">Summary</h2>
      <p>{{summary.itemsQuantity}} items purchased</p>
    </div>
    <div class="content--row content--row__vertical content--row__detail">
      <div v-show="shipment.duration !== -1">
        <div class="content--row__line"></div>
        <p>Delivery Estimation</p>
        <p
          class="text__green"
        >{{shipment.duration === 0 ? "Today" : shipment.duration + " day(s)"}} by {{shipment.text}}</p>
      </div>
      <div v-show="paymentMethod != ''">
        <div class="content--row__line"></div>
        <p>Payment method</p>
        <p class="text__green">{{paymentMethod}}</p>
      </div>
    </div>
    <div class="content--row content--row__vertical content--row__pricing">
      <div class="summary-detail-text">
        <span>Cost of goods</span>
        <span class="column-right-text">{{summary.itemsPrice}}</span>
      </div>
      <div class="summary-detail-text">
        <span>Dropshipping Fee</span>
        <span class="column-right-text">{{summary.dropshippingFee}}</span>
      </div>
      <div class="summary-detail-text" v-show="summary.shipmentFee !== 0">
        <span>{{shipment.text}} shipment</span>
        <span class="column-right-text">{{summary.shipmentFee}}</span>
      </div>
      <div>
        <h2 class="header-text">
          <span>Total</span>
          <span class="column-right-text">{{summary.itemsPrice + summary.dropshippingFee}}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Summary",
  props: ["isDropshipper", "paymentObject"],
  watch: {
    isDropshipper: function(val) {
      if (val === true) {
        this.summary.dropshippingFee = 5900;
      } else {
        this.summary.dropshippingFee = 0;
      }
    },
    paymentObject: {
      handler: function(val) {
        if (val.shipmentOption === 1) {
          this.shipment.text = "GO-SEND";
          this.shipment.duration = 0;
          this.summary.shipmentFee = 15000;
        } else if (val.shipmentOption === 2) {
          this.shipment.text = "JNE";
          this.shipment.duration = 2;
          this.summary.shipmentFee = 9000;
        } else if (val.shipmentOption === 3) {
          this.shipment.text = "Personal Courier";
          this.shipment.duration = 1;
          this.summary.shipmentFee = 29000;
        }

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
      summary: {
        itemsQuantity: 10,
        itemsPrice: 500000,
        dropshippingFee: 5900,
        shipmentFee: 0
      },
      shipment: {
        text: "",
        duration: -1
      },
      paymentMethod: ""
    };
  },
  methods: {}
};
</script>

<style lang="stylus">
@import '../css/summary.styl';
@import '../css/common.styl';
</style>
