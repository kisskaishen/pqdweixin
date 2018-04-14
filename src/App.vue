<template>
    <div id="app">
        <router-view/>
        <!--<tabbar></tabbar>-->
    </div>
</template>

<script>
    // import Tabbar from './components/footer'

    export default {
        name: 'App',
        // components: {Tabbar}
    }
</script>

<style>
    @import './style/base.css';

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
