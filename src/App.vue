<template>
  <div>
    <router-link :to="{ name: 'about' }">About</router-link>
    <router-link :to="{ name: 'contact' }">Contact</router-link>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>
