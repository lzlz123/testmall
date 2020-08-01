<template>
    <div id="app">
        <!--显示路由内容-->
        <router-view></router-view>
        <MainTabBar></MainTabBar>
    </div>
</template>

<script>
    import MainTabBar from "./components/content/mainTabbar/MainTabBar";


    export default {
        name: 'App',
        components: {
            MainTabBar
        }
    }
</script>

<style>
    @import "assets/css/base.css";
</style>
