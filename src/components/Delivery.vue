<template>
  <div class="container">
    <form @submit.prevent="submitForm">
      <div>
        <font-awesome-icon icon="arrow-left"/>
        <span class="back-text">Back to cart</span>
      </div>
      <div class="content-box">
        <div class="detail-container">
          <div class="delivery-header-container">
            <div class="delivery-header-box">
              <h1>
                <span class="header-text header-text__underline">Delivery details</span>
              </h1>
            </div>
            <div class="form-group-checkbox">
              <div class="form-control">
                <input
                  id="checkbox"
                  type="checkbox"
                  class="checkbox"
                  checked
                  v-on:change="markDropshipper"
                >
                <label for="checkbox" class="form-label">Send as dropshipper</label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div
              class="form-control form-control__neutral"
              v-bind:class="{'form-control__invalid' : emailFlags.invalid && !emailFlags.pristine, 'form-control__valid': emailFlags.valid}"
            >
              <input
                id="email"
                name="email"
                v-model="formModel.email"
                class="input-field"
                placeholder="Email"
                v-validate="'required|email'"
                v-on:input="inputField(formModel.email)"
              >
              <label
                for="email"
                class="input-field-placeholder"
                v-bind:class="{'text-invalid' : emailFlags.invalid && !emailFlags.pristine, 'text-valid' : emailFlags.valid}"
              >Email</label>
              <font-awesome-icon icon="check" class="icon icon_success" v-show="emailFlags.valid"/>
              <font-awesome-icon
                icon="times"
                class="icon icon_fail"
                v-show="emailFlags.invalid && !emailFlags.pristine"
              />
            </div>
            <div
              class="form-control form-control__neutral"
              v-bind:class="{'form-control__invalid' : dropshipperNameFlags.invalid && dropshipperNameFlags.validated && isDropshipper, 'form-control__valid': dropshipperNameFlags.valid && isDropshipper}"
            >
              <input
                id="dropshipperName"
                name="dropshipperName"
                v-model="formModel.dropshipperName"
                :disabled="!isDropshipper"
                class="input-field"
                placeholder="Dropshipper name"
                v-validate="'required'"
                v-on:input="inputField(formModel.dropshipperName)"
              >
              <label
                for="dropshipperName"
                class="input-field-placeholder input-field-placeholder-right"
                v-bind:class="{'text-invalid' : dropshipperNameFlags.invalid && !dropshipperNameFlags.pristine && isDropshipper, 'text-valid' : dropshipperNameFlags.valid && isDropshipper}"
              >Dropshipper Name</label>
              <font-awesome-icon
                icon="check"
                class="icon icon_success"
                v-show="dropshipperNameFlags.valid && isDropshipper"
              />
              <font-awesome-icon
                icon="times"
                class="icon icon_fail"
                v-show="dropshipperNameFlags.invalid && !dropshipperNameFlags.pristine && isDropshipper"
              />
            </div>
          </div>
          <div class="form-group">
            <div
              class="form-control form-control__neutral"
              v-bind:class="{'form-control__invalid' : phoneFlags.invalid && phoneFlags.validated, 'form-control__valid': phoneFlags.valid}"
            >
              <input
                id="phoneNumber"
                name="phoneNumber"
                v-model="formModel.phoneNumber"
                class="input-field"
                placeholder="Phone Number"
                v-validate="{ required: true, max:20, min:6, regex: /^[0-9+()\-]*$/}"
                v-on:input="inputField(formModel.dropshipperName)"
              >
              <label
                for="phoneNumber"
                class="input-field-placeholder"
                v-bind:class="{'text-invalid' : phoneFlags.invalid && !phoneFlags.pristine, 'text-valid' : phoneFlags.valid}"
              >Phone Number</label>
              <font-awesome-icon icon="check" class="icon icon_success" v-show="phoneFlags.valid"/>
              <font-awesome-icon
                icon="times"
                class="icon icon_fail"
                v-show="phoneFlags.invalid && !phoneFlags.pristine"
              />
            </div>
            <div
              class="form-control form-control__neutral"
              v-bind:class="{'form-control__invalid' : dropshipperPhoneFlags.invalid && dropshipperPhoneFlags.validated && isDropshipper, 'form-control__valid': dropshipperPhoneFlags.valid && isDropshipper}"
            >
              <input
                id="dropshipperPhone"
                name="dropshipperPhone"
                :disabled="!isDropshipper"
                v-model="formModel.dropshipperPhoneNumber"
                placeholder="Dropshipper Phone Number"
                class="input-field"
                v-validate="{ required: true, max:20, min:6, regex: /^[0-9+()\-]*$/}"
              >
              <label
                for="dropshipperPhone"
                class="input-field-placeholder input-field-placeholder-right"
                v-bind:class="{'text-invalid' : dropshipperPhoneFlags.invalid && !dropshipperPhoneFlags.pristine && isDropshipper, 'text-valid' : dropshipperPhoneFlags.valid && isDropshipper}"
              >Dropshipper Phone Number</label>
              <font-awesome-icon
                icon="check"
                class="icon icon_success"
                v-show="dropshipperPhoneFlags.valid && isDropshipper"
              />
              <font-awesome-icon
                icon="times"
                class="icon icon_fail"
                v-show="dropshipperPhoneFlags.invalid && !dropshipperPhoneFlags.pristine && isDropshipper"
              />
            </div>
          </div>
          <div class="form-group">
            <div
              class="form-control form-control__neutral"
              v-bind:class="{'form-control__invalid' : addressFlags.invalid && addressFlags.validated, 'form-control__valid': addressFlags.valid}"
            >
              <textarea
                id="address"
                name="address"
                v-model="formModel.address"
                class="input-field input-field__textarea"
                placeholder="Address"
                v-validate="'required|max:120'"
              ></textarea>
              <label
                for="address"
                class="input-field-placeholder input-field-placeholder__textarea"
                v-bind:class="{'text-invalid' : addressFlags.invalid && !addressFlags.pristine, 'text-valid' : addressFlags.valid}"
              >Address {{formModel.address.length == 0 ? null : formModel.address.length}}</label>
              <font-awesome-icon
                icon="check"
                class="icon icon_success"
                v-show="addressFlags.valid"
              />
              <font-awesome-icon
                icon="times"
                class="icon icon_fail"
                v-show="addressFlags.invalid && !addressFlags.pristine"
              />
            </div>
            <div class="form-control"></div>
          </div>
        </div>
        <div class="separator-line"></div>
        <div class="summary-container">
          <div class="summary-box">
            <h2 class="header-text">Summary</h2>
            <p>{{summary.itemsQuantity}} items purchased</p>
          </div>
          <div class="pricing-box">
            <div class="summary-detail-text">
              <span>Cost of goods</span>
              <span class="column-right-text">{{summary.itemsPrice}}</span>
            </div>
            <div class="summary-detail-text">
              <span>Dropshipping Fee</span>
              <span class="column-right-text">{{summary.dropshippingFee}}</span>
            </div>
            <div>
              <h2 class="header-text">
                <span>Total</span>
                <span class="column-right-text">{{summary.itemsPrice + summary.dropshippingFee}}</span>
              </h2>
            </div>
            <div class="summary-button-box">
              <button type="submit" class="button-primary">Continue To Payment</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import { mapFields } from "vee-validate";

Vue.use(VeeValidate, {
  classes: true,
  classNames: {
    valid: "is-valid",
    invalid: "input-invalid"
  }
});

export default {
  name: "Delivery",
  data() {
    return {
      formModel: {
        email: "",
        dropshipperName: "",
        phoneNumber: "",
        dropshipperPhoneNumber: "",
        address: ""
      },
      isDropshipper: true,
      isActive: false,
      tempDropShipperName: "",
      tempDropshipperPhoneNumber: "",
      summary: {
        itemsQuantity: 10,
        itemsPrice: 500000,
        dropshippingFee: 5900
      }
    };
  },
  computed: {
    ...mapFields({
      emailFlags: "email",
      dropshipperNameFlags: "dropshipperName",
      phoneFlags: "phoneNumber",
      dropshipperPhoneFlags: "dropshipperPhone",
      addressFlags: "address"
    })
  },
  methods: {
    markDropshipper() {
      if (this.isDropshipper == true) {
        this.tempDropShipperName = this.formModel.dropshipperName;
        this.tempDropshipperPhoneNumber = this.formModel.dropshipperPhoneNumber;
        this.formModel.dropshipperName = null;
        this.formModel.dropshipperPhoneNumber = null;
        this.summary.dropshippingFee = 0;
      } else {
        this.formModel.dropshipperName = this.tempDropShipperName;
        this.formModel.dropshipperPhoneNumber = this.tempDropshipperPhoneNumber;
        this.summary.dropshippingFee = 5900;
      }
      this.isDropshipper = !this.isDropshipper;
    },
    inputField(inputValue) {
      if ((this.inputValue = "")) {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    },
    submitForm() {
      this.$emit("next-delivery-step");
    }
  }
};
</script>

<style lang="stylus">
@import '../css/delivery.styl';
@import '../css/common.styl';
</style>
