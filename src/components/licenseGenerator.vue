<template>
    <v-card>
        <v-card-title>Control center</v-card-title>
        <div class="left">
            <v-radio-group v-model="payload.ip" label="Send to:">
                <v-radio v-for="(v, i) in lfas.lfas" :key="i" :label="v.name +' - '+v.ip" :value="v.ip"></v-radio>
            </v-radio-group>
            <v-radio-group v-model="payload.mediaFunction" label="Media to send:">
                <v-radio v-for="(v, i) in medias" :key="i" :label="v.mediaFunction +' - '+v.id" :value="v.mediaFunction"></v-radio>
            </v-radio-group>
        </div>
                
        <div id="number">
            <v-text-field
                v-model="payload.duration"
                hide-details
                single-line
                label="Time in seconds"
                type="number"
            />
        </div>
        <v-btn :disabled="!sendReady" @click="send">send</v-btn>
    </v-card>
</template>

<script>


import { fetchLfaNames, generateSubLicense } from '@/http/http';

export default {
    name: 'licenseGenerator',
    props: {medias: []},
    data: () => ({
        lfas: [],
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
    padding-left: 20px;
    width:200px    
}

</style>