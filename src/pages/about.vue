<template>
  <div>About. Will this require login? {{ $route.meta.requiresLogin ? 'Yes' : 'No.' }}</div>
</template>

<script>
export default {}
</script>

<route>
{
  "meta": {
    "requiresLogin": true,
  }
}
</route>
