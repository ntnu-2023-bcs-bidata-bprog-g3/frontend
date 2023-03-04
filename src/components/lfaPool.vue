<template>
    <div>
        <v-card>
            {{ name }}
            <br>
            <v-data-table
                :headers="headers"
                :items="pool"
                item-key="name">
                <template v-slot:[`item.actions`]="{ item }">
                    <div>
                        <v-icon
                            :disabled="item.input<=0||item.input==undefined"
                            @click="consume(item)"
                            >
                            mdi-delete
                        </v-icon>
                    </div>
                </template>
                <template v-slot:[`item.input`]="{item}">
                    <v-text-field v-model="item.input"
                        dense
                        hide-details
                        single-line
                        label="Time in seconds"
                        type="number"
                    ></v-text-field>
                </template>  
            </v-data-table>
        </v-card>
    </div>
</template>


<script>

export default {
    name: 'lfaPool',
    props: {pool: [], name: String},
    methods:{
        consume(item){
            this.$emit("consume", item.name, item.input)
        }
    },  
    watch: {
        pool(newPool) {
            let items = JSON.parse(JSON.stringify(newPool))
            items.map(item => {
                if (!("input" in item)) {
                    item.input = 0;
                }
                return item
            })
            newPool = items
        }   
    },
    computed:{
        headers: function(){
            return [
                    {text: "Media Function", value:"name"},
                    {text: "Time left", value:"duration"},
                    {text: "Description", value:"description"},
                    {text: "Consume", value:"input"},
                    {text: 'Actions', value: 'actions', sortable: false },
                ]
        }
    }
}
</script>