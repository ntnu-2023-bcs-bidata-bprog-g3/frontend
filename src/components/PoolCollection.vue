<template>
    <div id="content">
        <br>
        <div class="left">
            <v-file-input 
            Solo 
            Underlined 
            label="License file"
            v-model="file"
            dense
            />
            <v-btn @click="upload">Send</v-btn>
            <label v-if="errorMsg!=''">{{errorMsg}}</label>
        </div>
        <v-data-table  
            :loading="pool.length==0"
            :headers="headers"
            :items="pool"
            item-key="id">
        </v-data-table>
    </div>
</template>

<script>

import { fetchPools, uploadFile } from '@/http/http';

export default {
    name: 'PoolCollection',
    data: () => ({
        errorMsg: "",
        file: null,
        pool: []
    }),
    created: async function() {
        this.pool = (await fetchPools()).pools
    },
    methods:{
        upload: async function(){
            console.log(this.file)
            const responseMsg = await uploadFile({file:this.file})
            if('error' in responseMsg){
                this.errorMsg = responseMsg['error']
                return
            }
            this.pool = (await fetchPools()).pools
        },
    },
    computed:{
        headers: function(){
            return [
                    {text: "ID", value: "id"},
                    {text: "Media Function", value:"mediaFunction"},
                    {text: "Time left", value:"timeLeftSeconds"},
                    {text: "Description", value:"description"}
                ]
        }
    }
};
</script>


<style>

#content {
    padding-left: 150px;
    padding-right: 150px;
}

.v-file-input{
    max-width: 300px;
}

.left {
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
}

.left > * {
    margin-right: 20px;
}

</style>