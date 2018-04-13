<template>
    <div>
        <menu-list :info="listMenu"></menu-list>
        <goods-squared :goods="listInfo"></goods-squared>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import MenuList from '../menuList.vue'
    import GoodsSquared from './goodsSquared.vue'
    import Tabbar from '../footer.vue'

    export default {
        props: ['menu','list'],
        data() {
            return {
                menuData: [],            // 菜单列表
                page: 1,
            }
        },
        components: { MenuList, GoodsSquared,Tabbar },
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
