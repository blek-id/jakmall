<template>
  <div class="content--body">
    <div class="content--row">
      <div class="content--column content--column__header">
        <h1 class="header-text header-text__underline">Delivery details</h1>
      </div>
      <div class="content--column content--column__checkbox">
        <div class="content--column">
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
    <div class="content--row">
      <div
        class="content--column content--column__neutral"
        v-bind:class="{'content--column__invalid' : emailFlags.invalid && !emailFlags.pristine, 'content--column__valid': emailFlags.valid}"
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
          class="input-field--placeholder"
          v-bind:class="{'text-invalid' : emailFlags.invalid && !emailFlags.pristine, 'text-valid' : emailFlags.valid}"
        >Email</label>
        <font-awesome-icon icon="check" class="icon icon__success" v-show="emailFlags.valid"/>
        <font-awesome-icon
          icon="times"
          class="icon icon__fail"
          v-show="emailFlags.invalid && !emailFlags.pristine"
        />
      </div>
      <div
        class="content--column content--column__neutral"
        v-bind:class="{'content--column__disabled' : !isDropshipper, 'content--column__invalid' : dropshipperNameFlags.invalid && dropshipperNameFlags.validated && isDropshipper, 'content--column__valid': dropshipperNameFlags.valid && isDropshipper}"
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
          class="input-field--placeholder"
          v-bind:class="{'text-invalid' : dropshipperNameFlags.invalid && !dropshipperNameFlags.pristine && isDropshipper, 'text-valid' : dropshipperNameFlags.valid && isDropshipper}"
        >Dropshipper Name</label>
        <font-awesome-icon
          icon="check"
          class="icon icon__success"
          v-show="dropshipperNameFlags.valid && isDropshipper"
        />
        <font-awesome-icon
          icon="times"
          class="icon icon__fail"
          v-show="dropshipperNameFlags.invalid && !dropshipperNameFlags.pristine && isDropshipper"
        />
      </div>
    </div>
    <div class="content--row">
      <div
        class="content--column content--column__neutral"
        v-bind:class="{'content--column__invalid' : phoneFlags.invalid && phoneFlags.validated, 'content--column__valid': phoneFlags.valid}"
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
          class="input-field--placeholder"
          v-bind:class="{'text-invalid' : phoneFlags.invalid && !phoneFlags.pristine, 'text-valid' : phoneFlags.valid}"
        >Phone Number</label>
        <font-awesome-icon icon="check" class="icon icon__success" v-show="phoneFlags.valid"/>
        <font-awesome-icon
          icon="times"
          class="icon icon__fail"
          v-show="phoneFlags.invalid && !phoneFlags.pristine"
        />
      </div>
      <div
        class="content--column content--column__neutral"
        v-bind:class="{'content--column__disabled' : !isDropshipper, 'content--column__invalid' : dropshipperPhoneFlags.invalid && dropshipperPhoneFlags.validated && isDropshipper, 'content--column__valid': dropshipperPhoneFlags.valid && isDropshipper}"
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
          class="input-field--placeholder"
          v-bind:class="{'text-invalid' : dropshipperPhoneFlags.invalid && !dropshipperPhoneFlags.pristine && isDropshipper, 'text-valid' : dropshipperPhoneFlags.valid && isDropshipper}"
        >Dropshipper Phone Number</label>
        <font-awesome-icon
          icon="check"
          class="icon icon__success"
          v-show="dropshipperPhoneFlags.valid && isDropshipper"
        />
        <font-awesome-icon
          icon="times"
          class="icon icon__fail"
          v-show="dropshipperPhoneFlags.invalid && !dropshipperPhoneFlags.pristine && isDropshipper"
        />
      </div>
    </div>
    <div class="content--row">
      <div
        class="content--column content--column__neutral"
        v-bind:class="{'content--column__invalid' : addressFlags.invalid && addressFlags.validated, 'content--column__valid': addressFlags.valid}"
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
          class="input-field--placeholder input-field--placeholder__textarea"
          v-bind:class="{'text-invalid' : addressFlags.invalid && !addressFlags.pristine, 'text-valid' : addressFlags.valid}"
        >Address {{formModel.address.length == 0 ? null : formModel.address.length}}</label>
        <font-awesome-icon icon="check" class="icon icon__success" v-show="addressFlags.valid"/>
        <font-awesome-icon
          icon="times"
          class="icon icon__fail"
          v-show="addressFlags.invalid && !addressFlags.pristine"
        />
      </div>
      <div class="content--column"></div>
    </div>
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
  inject: ["$validator"],
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
      dropshippingFee: 5900,
      tempDropShipperName: "",
      tempDropshipperPhoneNumber: ""
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
      } else {
        this.formModel.dropshipperName = this.tempDropShipperName;
        this.formModel.dropshipperPhoneNumber = this.tempDropshipperPhoneNumber;
      }
      this.isDropshipper = !this.isDropshipper;
      this.$emit("toggle-dropshipper", this.isDropshipper);
    },
    inputField(inputValue) {
      if (inputValue === "") {
        this.isActive = false;
      } else {
        this.isActive = true;
      }
    }
  }
};
</script>

<style lang="stylus">
@import '../css/delivery.styl';
@import '../css/common.styl';
</style>
