<template>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="100">
        <menu-squared v-if="this.$route.path != '/list/index'" :info="menuData" :squaredId="currentId"></menu-squared>
        <goods-squared :goods="listData"></goods-squared>
    </div>
</template>

<script>
    import MenuSquared from '../menuSquared.vue'
    import GoodsSquared from './goodsSquared.vue'
    import { Toast } from 'mint-ui';
    export default {
        props: ['currentId'],
        data() {
            return {
                menuData: [],            // 菜单列表
                page: 0,
                loading: false,
                listData: [],
                currentData:''
            }
        },
        components: {MenuSquared, GoodsSquared},
        computed: {

        },
        mounted() {
            this.getInfo()

        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                this.indexData = this.$local.get('indexData')
                for (let i=0;i<this.indexData.category.length;i++) {
                    if (this.currentId == this.indexData.category[i].id) {
                        this.currentData = this.indexData.category[i]
                        this.menuData = this.indexData.category[i].child
                    }
                }
            },
            // 获取列表
            getList(page) {
                this.$post('search/search', {
                    cate_id:this.currentId,
                    is_special:this.$route.query.is_special || '',
                    page: page
                })
                    .then((res) => {
                        if (res.list == '') {
                            Toast('没有更多数据了！')
                        } else {
                            if (page == '1') {
                                this.listData = res.list
                            } else {
                                this.listData = this.listData.concat(res.list)
                            }
                        }
                    })
            },
            loadMore() {
                this.loading = true;
                this.page++;
                this.getList(this.page);
                this.loading = false;
            }
        },
        watch:{
            currentId() {
                this.getInfo()
                this.getList(1)
            }
        }
    }
</script>
