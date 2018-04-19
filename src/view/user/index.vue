<template>
    <div>
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="200">
            <li v-for="item,index in list">{{ index }}</li>
        </ul>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'

    export default {
        name: "index",
        data() {
            return {
                list:[],
                loading:false
            }
        },
        components: { Tabbar },
        methods:{
            loadMore() {
                // console.log('caonima')
                this.loading = true;
                setTimeout(() => {
                    let last = this.list[this.list.length - 1];
                    for (let i = 1; i <= 10; i++) {
                        this.list.push(last + i);
                    }
                    this.loading = false;
                }, 1000);
            }
        }
    }
</script>

<style scoped lang="scss">
    li {
        height: 200px;
        line-height: 200px;
        border:1px solid red;
    }
</style>
