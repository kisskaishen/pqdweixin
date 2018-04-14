<template>
    <div>
        <menu-list :info="listMenu" v-if="this.$route.path != '/list/index'"></menu-list>
        <goods-squared :goods="listInfo"></goods-squared>
    </div>
</template>

<script>
    import MenuList from '../menuList.vue'
    import GoodsSquared from './goodsSquared.vue'

    export default {
        props: ['menu','list'],
        data() {
            return {
                menuData: [],            // 菜单列表
                page: 1,
            }
        },
        components: { MenuList, GoodsSquared },
        computed: {
            listMenu() {
                return this.menu.cat2
            },
            listInfo() {
                return this.list
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
