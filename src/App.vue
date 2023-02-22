<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <h1>NMS</h1>
    </v-app-bar>

    <v-main>
      <PoolDisplay></PoolDisplay>
    </v-main>
  </v-app>
</template>

<script>

import PoolDisplay from "@/components/PoolDisplay.vue"

export default {
  name: 'App',

  components: {
    PoolDisplay
  },

  data: () => ({
    //
  }),
};
</script>
