<template>
    <div>
        <menu-list></menu-list>
        <goods-squared></goods-squared>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import MenuList from '../menuList.vue'
    import GoodsSquared from './goodsSquared.vue'
    import Tabbar from '../footer.vue'

    export default {
        data() {
            return {}
        },
        components: { MenuList, GoodsSquared, Tabbar},
        mounted() {

        },
        methods: {}
    }
</script>
