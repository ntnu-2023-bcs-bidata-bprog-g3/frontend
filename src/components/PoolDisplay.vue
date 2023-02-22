<template>
    <div>
        <v-file-input Solo Underlined></v-file-input>
        <p>{{ pool }}</p>
    </div>
</template>


<script>

import { fetchPools } from '@/http/http';

export default {
    name: 'PoolDisplay',
    
    components: {
    },
    
    data: () => ({
        pool: []
    }),

    mounted: () => {
        this.pool = fetchPools()
    }
};
</script>
  