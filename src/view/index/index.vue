<template>
    <div>
        <index></index>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Index from '../../components/index.vue'
    import Tabbar from '../../components/footer'

    export default {
        data() {
            return {}
        },
        components: {Index,Tabbar},
        mounted() {
            console.log(this.$token)
        },
        methods: {

        }
    }
</script>
