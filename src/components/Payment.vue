<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div>
        <font-awesome-icon icon="arrow-left"/>
        <span class="back-text">Back to cart</span>
      </div>
      <div class="content-box">
        <div class="detail-container">
          <div class="shipment-container"></div>
          <div class="payment-container"></div>
        </div>
        <div class="separator-line"></div>
        <div class="summary-container"></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Payment"
};
</script>

<style>
@import "../css/common.styl";
</style>
