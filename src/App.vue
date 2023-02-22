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
      <PoolCollection></PoolCollection>
    </v-main>
  </v-app>
</template>

<script>

import PoolCollection from "@/components/PoolCollection.vue"

export default {
  name: 'App',

  components: {
    PoolCollection
  },

  data: () => ({
    //
  }),
};
</script>
