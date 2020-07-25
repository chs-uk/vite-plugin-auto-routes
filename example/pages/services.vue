<template>
  <div>
    Check out the services we offer
    <router-link :to="{ name: 'services-cooking' }">Cooking</router-link>
    <router-link :to="{ name: 'services-laundry' }">Laundry</router-link>

    <router-view />
  </div>
</template>
