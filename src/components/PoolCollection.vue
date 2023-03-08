<template>
    <div id="content">
        <br>
        <div id="topElements">
            <v-card width="70%">
                <v-card-title >
                    <div class="spread">
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
                    :loading="loading"
                    :headers="headers"
                    :items="pool"
                    item-key="id">
                </v-data-table>
            </v-card>
            <licenseGenerator :medias="pool" @generate="refresh" ref="licenseGen"/>
        </div>
        <br>
        <v-card>
            <v-card-title>Aggregates</v-card-title>
            <label v-if="errorMsgLfa!=''">{{errorMsgLfa}}</label>
            <div v-if="lfaPools.length != 0">
                <div id="lfaPools">
                    <div v-for="(v, i) in lfaPools" :key="i">
                        <lfaPool :pool="v.licenses" :name="v.name+' - '+ v.ip" @consume="consumeLicense(v.ip, ...arguments)"/>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>

import lfaPool from '@/components/lfaPool.vue';
import licenseGenerator from '@/components/licenseGenerator.vue'
import { fetchPools, uploadFile, fetchLfas, consumeLicense } from '@/http/http';

export default {
    name: 'PoolCollection',
    components: {
        lfaPool,
        licenseGenerator
    },  
    data: () => ({
        errorMsg: "",
        errorMsgLfa: "",
        file: null,
        pool: [],
        lfaPools: [],
        loading: true
    }),
    created: async function() {
        let data = (await fetchPools())
        if ('pools' in data){
            this.pool = data.pools
        }
        this.loading = false;
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
            this.errorMsg = ""
            this.pool = (await fetchPools()).pools
        },
        fetchLFA: async function(){
            const responseMsg = await fetchLfas()
            if('error' in responseMsg){
                this.errorMsgLfa = responseMsg['error']
                return
            }
            this.errorMsgLfa = ""
            this.lfaPools = responseMsg.lfas
        },  
        refresh: async function(){  
            this.pool = (await fetchPools()).pools
            this.fetchLFA()
            this.$refs.licenseGen.refresh()
        },
        consumeLicense: async function(ip, mediaFunction, duration){
            let payload = {
                ip: ip,
                mediaFunction: mediaFunction,
                duration: duration,
            }
            await consumeLicense(payload);
            console.log(ip, mediaFunction, duration)
            this.refresh();
        }
    },
    computed:{
        headers: function(){
            return [
                    {text: "Media Function", value:"mediaFunction"},
                    {text: "Time left", value:"timeLeftSeconds"},
                    {text: "Description", value:"description"}
                ]
        },
    }
};
</script>


<style>

#topElements{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    width: 100%;
}

.spread{
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
    align-items: start;
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