<template>
  <div class="flex justify-center">
    <v-card
      height="400"
      width="500"
      class="block"
      color="#dbdbdb"
    >
      <v-text-field
        v-model="fullname"
        class="input"
        label="Full name"
      ></v-text-field>
      <v-select
         v-model="select"
         @change="change_prefix"
         :items="countries"
         class="input"
         label="Country"
         item-text="name"
      >
        <template v-slot:selection="{ item, index }">
          <div class="flag2" v-html="item.flag"></div>
          {{ item.name }}
       </template>
        <template v-slot:item="slotProps">
          <div class="flag" v-html="slotProps.item.flag"></div>
          {{ slotProps.item.name }}
        </template>
      </v-select>
      <v-text-field
        v-mask="'## ###-##-##'"
        v-model="phone"
        class="input"
        label="Phone number"
        :prefix="phone_prefix"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="email"
        class="input"
        label="Email"
      ></v-text-field>
      <v-btn
        class="mt-10"
        elevation="2"
        @click="do_registration"
      >Registration</v-btn>
    </v-card>
  </div>
</template>

<script>
import { VueMaskDirective } from 'v-mask';
import countries from '@/countries.json';

export default {
  data() {
    let phone_prefix = '+';
    let fullname = '';
    let phone = '';
    let email = '';

    return {
      select: null,
      countries,
      phone_prefix,
      error: '',
      loading: false,
      fullname,
      phone,
      email
    }
  },
  methods: {
    change_prefix () {
      this.phone_prefix = countries.find(row => row.name == this.select).idd;
    },
    async do_registration() {
      if (this.fullname && this.email && this.select && this.phone) {
        try {
          let user = {
            name: this.fullname,
            email: this.email,
            phone: this.phone_prefix + this.phone,
            country: this.select
          }

          await this.$store.dispatch('register', user);
          await this.$router.push({ name: 'posts' });
        } catch (error) {
          this.error = error;
        } finally {
          this.loading = false;
        }
      }
    }
  }
}
</script>

<style scoped>
  .flex{
    display: flex;
  }
  .justify-center{
    justify-content: center;
  }
  .input{
    background: #ffffff;
    border-radius: 16px !important;
    padding-left: 10px;
    padding-right: 10px;
  }
  .block{
    padding: 15px 20px;
  }
  .mt-10{
    margin-top: 10px;
  }
  .flag{
    width: 30px;
    height: 26px;
  }
  .flag2{
    width: 30px;
    height: 21px;
    text-align: center;
  }
</style>
