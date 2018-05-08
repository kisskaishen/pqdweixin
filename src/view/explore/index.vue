<template>
    <div class="explore">
        <div class="search">
            <router-link to="search">
                <i></i>
                <span>搜索商品</span>
            </router-link>
        </div>
        <div class="exploreDiv">
            <ul class="exploreMenu">
                <li v-for="item,index in indexData" @click="memuClick(item,index)" :class="currentIndex == index?'active':''">
                    <img :src="item.logo" alt="">
                    <span>{{item.name}}</span>
                </li>
            </ul>
            <ul class="exploreList">
                <li v-for="item,index in indexData[currentIndex].child">
                    <router-link :to="'/list/index?id='+item.id">
                        <img :src="item.img" alt="">
                        <span>{{item.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <tabbar></tabbar>
    </div>
</template>

<script>
    import Tabbar from '../../components/footer'
    export default {
        name: "index",
        data() {
            return {
                indexData:[{child:[]}],           // 缓存总数据，是页面刚加载的时候缓存起来的
                currentIndex:'0'
            }
        },
        components:{ Tabbar },
        mounted() {
            this.getIndexData()
        },
        methods:{
            getIndexData() {
                this.indexData = this.$local.get('indexData').category
            },
            memuClick(val,index) {
                this.currentIndex = index
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        width: 100%;
        padding: 10px 0;
        background-color: #fff;
        border-bottom: 1px solid #fdfdfd;
        a {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 90%;
            height: 60px;
            font-size: 26px;
            margin: 0 auto;
            i {
                width: 30px;
                height: 40px;
                margin-right: 10px;
                background: url("../../images/img_search@3x.png") no-repeat center /100%;
            }
        }
    }
    .exploreDiv {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        top: 100px;
        bottom: 108px;
        left: 0;
        right: 0;
        margin: auto;
        .exploreMenu {
            flex: 1;
            background-color: #f8f8f8;
            height: 100%;
            overflow: scroll;
            li {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 36px 0;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 10px;
                }
            }
            .active {
                background-color: #fff;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                font-size: 30px;
            }
        }
        .exploreList {
            flex: 2;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
            background-color: #fff;
            height: 100%;
            overflow-y: scroll;
            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 33.3%;
                height: 172px;
                margin-bottom: 20px;
                a {
                    img {
                        width: 128px;
                        height: 128px;
                    }
                }
            }
        }
    }
</style>
