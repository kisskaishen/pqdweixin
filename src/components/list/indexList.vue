<template>
    <div class="childSwiper">
        <mt-navbar v-model="selected" fixed v-if="!this.$route.query.is_special">
            <mt-tab-item :id="this.$route.query.id">全部</mt-tab-item>
            <mt-tab-item v-for="item,index in currentData" :id="item.id" :key="item.id">{{item.name}}
            </mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" :class="this.$route.query.is_special?'containerDiv':''">
            <index-squared :currentId="selected"></index-squared>
        </mt-tab-container>
        <div :class="iconTopShow?'toTop':''" @click="toTopClick"><span></span></div>
    </div>
</template>
<script>
    import IndexSquared from '../index/indexSquared'

    export default {
        data() {
            return {
                selected: this.$route.query.id,//导航栏id
                currentId: this.$route.query.id,            // 当前id
                currentData: [],          // swiper子集轮换
                iconTopShow: false,
                scrollTop: 0,            // 距离顶部的距离
            }
        },
        components: {IndexSquared},
        computed: {},
        mounted() {
            this.getInfo()
            // 检测页面滚动
            window.addEventListener('scroll', this.handScroll)
        },
        methods: {
            // 获取本地保存的其他信息
            getInfo() {
                this.indexData = this.$local.get('indexData')
                for (let i = 0; i < this.indexData.category.length; i++) {
                    if (this.$route.query.parent_id == this.indexData.category[i].id) {
                        for (let j = 0; j < this.indexData.category[i].child.length; j++) {
                            if (this.$route.query.id == this.indexData.category[i].child[j].id) {
                                this.currentData = this.indexData.category[i].child[j].child
                            }
                        }
                    } else if (this.$route.query.id == this.indexData.category[i].id) {
                        this.currentData = this.indexData.category[i].child
                    }
                }
            },
            // 监听滚动方法
            handScroll() {
                this.scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
                if (this.scrollTop > 156) {
                    this.iconTopShow = true
                } else {
                    this.iconTopShow = false
                }
            },
            toTopClick() {
                document.body.scrollTop = 0
                document.documentElement.scrollTop = 0
                window.pageYOffset = 0
            },
        }
        ,
        watch: {
            selected(val) {
                this.currentId = val
                this.toTopClick()
            }
        }
    }
</script>
<style lang="scss">
    .childSwiper {
        .mint-navbar {
            width: 750px;
            overflow: scroll;
            .mint-tab-item {
                background-color: #fff;
                margin-bottom: -1px;
                .mint-tab-item-label {
                    width: 140px;
                    padding: 4px 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: #333;
                    margin: 0 auto;

                }
            }
            .is-selected {
                border-bottom: 1px solid #f13d3c;
                .mint-tab-item-label {
                    color: #f13d3c;
                    font-weight: bold;
                }
            }
        }
        .mint-tab-container {
            margin-top: 68px;
        }
        .containerDiv {
            margin-top: 0;
        }
    }

</style>
<style lang="scss" scoped>
    .toTop {
        position: fixed;
        bottom: 100px;
        right: 40px;
        width: 60px;
        height: 60px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            display: block;
            color: #fff;
            width: 20px;
            height: 20px;
            margin-top: 6px;
            border-right: 4px solid #fff;
            border-top: 4px solid #fff;
            transform: rotate(-45deg);
        }
    }
</style>
