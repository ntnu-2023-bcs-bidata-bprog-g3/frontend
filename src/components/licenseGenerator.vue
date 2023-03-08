<template>
    <v-card width="28.5%" :loading="loading">
        <v-card-title>Generate sublicense <label v-if="errorMsg!=''">{{"  -  "}}{{errorMsg}}</label></v-card-title>
        <div class="selects">
            <v-select
                v-model="payload.ip"
                clearable
                label="Send to"
                :items="lfas.lfas"
                item-text="name"
                item-value="ip"
            ></v-select>
            <v-select
                v-model="payload.mediaFunction"
                clearable
                label="Media function"
                :items="medias"
                item-text="mediaFunction"
                item-value="mediaFunction"
            ></v-select>
        </div>
                
        <div class="left">

            <div id="number">
                <v-text-field
                dense
                v-model="payload.duration"
                hide-details
                single-line
                label="Time in seconds"
                type="number"
                />
            </div>
            <v-btn :disabled="!sendReady" @click="send">send</v-btn>
        </div>
    </v-card>
</template>

<script>


import { fetchLfaNames, generateSubLicense } from '@/http/http';

export default {
    name: 'licenseGenerator',
    props: {medias: []},
    data: () => ({
        loading: false,
        lfas: [],
        selected: null,
        errorMsg: "",
        payload: {
            mediaFunction: "",
            ip: "",
            duration: 0,
        }
    }),
    created: function(){
        this.refresh()
    },
    methods: {
        refresh: async function(){
            this.lfas = await fetchLfaNames();
        },
        send: async function(){
            this.loading = true;
            const responseMsg = await generateSubLicense(this.payload)
            if('error' in responseMsg){
                this.errorMsg = responseMsg['error']
                return
            }
            this.loading = false;
            this.errorMsg = ""
            this.$emit("generate")

            this.payload = {
                mediaFunction: "",
                ip: "",
                duration: 0,
            }
        }
    },
    watch:{
        lfas(newLfa){
            newLfa.lfas.forEach(function (element) {
                const ipWithoutPort = element.ip.split(":")[0];
                element.name = element.name + " - " + ipWithoutPort;
            });
        }
    },
    computed: {
        sendReady: function(){
            return this.payload.ip != '' && this.payload.duration > 0 && this.payload.id != 0
        }
    }
}
</script>


<style scoped>

#number{
    width:50%px;
    margin-bottom: 10px;
}

.selects {
    padding-left: 20px;
    padding-right: 20px;
    width: 98%px;
}

</style>