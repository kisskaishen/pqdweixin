<template>
    <div class="search">
        <div class="searchDiv">
            <i></i>
            <input v-model="searchVal" placeholder="搜索：分类 品牌 系列 产品">
            <mt-button type="danger" @click.native="searchClick">搜索</mt-button>
        </div>
        <div class="history">
            <p>
                <span>最近搜索</span>
                <span @click="deleteHistory"><i></i>清除历史记录</span>
            </p>
            <ul>
                <li v-for="item,index in historyList">{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "search",
        data() {
            return {
                searchVal:'',
                historyList:this.$local.fetch('searchHistory') || []
            }
        },
        mounted(){

        },
        methods:{
            searchClick() {
                if (this.searchVal) {
                    this.historyList.push(this.searchVal)
                    this.$local.save('searchHistory',this.historyList)
                    // this.$router.push({
                    //     path:'',
                    //     query:{
                    //         word:this.searchVal
                    //     }
                    // })
                } else {
                    Toast({
                        message: '请输入搜索内容',
                        duration: 2000
                    });
                }
            },
            deleteHistory() {
                this.historyList = []
                this.$local.delete('searchHistory')
            }
        }
    }
</script>

<style scoped lang="scss">
    .search {
        .searchDiv {
            position: relative;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 20px;
            background-color: #fff;
            i {
                width: 32px;
                height: 40px;
                background: url("../../images/img_search@3x.png") no-repeat center /100%;
            }
            input {
                flex: 1;
                border: none;
                padding: 20px;
            }
            .mint-button {
                height: 60px;
                padding: 0 40px;
            }
        }
        .history {
            width: 100%;
            padding: 10px 40px;
            margin-top: 20px;
            background-color: #fff;
            p {
                display: flex;
                justify-content: space-between;
                span {
                    &:nth-child(2) {
                        color:#d81e06;
                        i {
                            display: inline-block;
                            vertical-align: middle;
                            width: 40px;
                            height: 40px;
                            margin-right: 10px;
                            background: url("../../images/delete.png") no-repeat center /100%;
                        }
                    }
                }
            }
            ul {
                display: flex;
                flex-wrap: wrap;
                li {
                    max-width: 670px;
                    padding: 10px 20px;
                    margin:8px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    background-color: #ccc;
                    -webkit-border-radius: 4px;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                }
            }
        }
    }
</style>
