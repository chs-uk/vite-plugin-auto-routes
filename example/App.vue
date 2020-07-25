<template>
  <div>
    <router-link :to="{ name: 'about' }">About</router-link>
    <router-link :to="{ name: 'contact' }">Contact</router-link>
    <router-link :to="{ name: 'services' }">Services</router-link>
    <router-link :to="{ name: 'team' }">Team</router-link>
    <router-link :to="{ name: 'product-buy', params: { product: 'computer' } }">
      Buy computer
    </router-link>
    <router-link :to="{ name: 'product-sell', params: { product: 'computer' } }">
      Sell computer
    </router-link>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
a {
  margin-right: 6px;
}
</style>
