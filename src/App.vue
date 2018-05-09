<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    let token = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).token:''

    export default {
        token,
        name: 'App',
    }
</script>

<style>
    @import './style/base.css';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        /*height: 800px;*/
    }
</style>
