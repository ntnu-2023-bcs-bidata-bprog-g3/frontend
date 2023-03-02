<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="pool"
            item-key="name">
        >
        </v-data-table>
    </div>
</template>


<script>

export default {
    name: 'lfaPool',
    props: {pool: []},
    computed:{
        headers: function(){
            return [
                    {text: "Media Function", value:"name"},
                    {text: "Time left", value:"duration"},
                    {text: "Description", value:"description"}
                ]
        }
    }
}
</script>