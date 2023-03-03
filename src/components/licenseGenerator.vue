<template>
    <v-card width="27%">
        <v-card-title>Control center</v-card-title>
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
                label="Medfiafunction"
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
        lfas: [],
        selected: null,
        payload: {
            mediaFunction: "",
            ip: "",
            duration: 0,
        }
    }),
    created: async function(){
        this.lfas = await fetchLfaNames();
        console.log(this.lfas)
    },
    methods: {
        send: async function(){
            console.log(this.payload)
            await generateSubLicense(this.payload)
        }
    },
    computed: {
        sendReady: function(){
            return this.payload.ip != '' && this.payload.duration != 0 && this.payload.id != 0
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