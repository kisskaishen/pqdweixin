<template>
    <div class="menu">
        <ul>
            <li v-for="item,index in menu" :key="item.shopping_column_id">
                <router-link to="/activity/like" v-if="index=='0'">
                    <img :src="item.column_logo">
                    <span>{{item.column_name}}</span>
                </router-link>
                <router-link :to="'/list/index?is_special='+item.type" v-if="index>0">
                    <img :src="item.column_logo">
                    <span>{{item.column_name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['info'],
        data() {
            return {}
        },
        computed: {
            menu() {
                return this.info
            }
        },
        mounted() {
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .menu {
        width: 100%;
        padding: 16px 0;
        background-color: #fff;
        ul {
            display: flex;
            flex-deraction: row;
            flex-wrap: wrap;
            align-items: center;
            li {
                width: 25%;
                a {
                    display: block;
                    padding: 20px;
                    img {
                        display: block;
                        margin: 0 auto;
                        width: 80px;
                        height: 80px;
                    }
                    span {
                        display: block;
                        color: #666;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>
