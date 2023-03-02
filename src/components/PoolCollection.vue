<template>
    <div id="content">
        <br>
        <br>
        <v-card>
            <v-card-title >
                <div id="fancyTitle">
                    NMS pool

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
                </div> 
            </v-card-title>
            <v-data-table  
                :loading="pool.length==0"
                :headers="headers"
                :items="pool"
                item-key="id">
            </v-data-table>
        </v-card>
        <br>
        <v-card>
            <v-card-title>Aggregates</v-card-title>
            <div v-if="lfaPools.length != 0">
                <div id="lfaPools">
                    <div v-for="(v, i) in lfaPools" :key="i">
                        {{ v.name }} - {{ v.ip }} <br>
                        <lfaPool :pool="v.licenses"/>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>

import lfaPool from '@/components/lfaPool.vue';
import { fetchPools, uploadFile,fetchLfas } from '@/http/http';

export default {
    name: 'PoolCollection',
    components: {
        lfaPool
    },  
    data: () => ({
        errorMsg: "",
        file: null,
        pool: [],
        lfaPools: []
    }),
    created: async function() {
        this.pool = (await fetchPools()).pools
        this.fetchLFA();
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
        fetchLFA: async function(){
            const responseMsg = await fetchLfas()
            if('error' in responseMsg){
                this.errorMsg = responseMsg['error']
                return
            }
            this.lfaPools = responseMsg.lfas
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

#fancyTitle{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}

#lfaPools{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;
}

#content {
    padding-left: 150px;
    padding-right: 150px;
}

.v-file-input{
    padding-left: 35px;
    min-width: 300px;
}

.left {
    display: flex;
    flex-wrap: nowrap;
    align-items: end;
}

.left > * {
    margin-left: 20px;
}

#lfaPools > * {
    margin: 25px;
}

.v-card{
    padding: 10px;
}

</style>