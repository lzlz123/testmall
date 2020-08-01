<template>
    <div>
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <HomeSwiper :banners="banners"></HomeSwiper>
        <HomeRecommend :recommends="recommends"></HomeRecommend>
    </div>
</template>

<script>
    //数据请求
    import {getHomeMutidate} from "network/home"
    //组件导入
    import NavBar from "../../components/common/navbar/NavBar";
    import HomeSwiper from "./childComps/HomeSwiper";

    import HomeRecommend from "./childComps/HomeRecommend";


    export default {
        name: "Home",
        components: {
            NavBar,
            HomeSwiper,
            HomeRecommend,
        },
        data() {
            return {
                banners: [],
                recommends: []
            }
        },
        //组件创建好，直接发送网络请求
        created() {
            //1.请求多个数据,这里是一个异步操作
            getHomeMutidate().then(res => {
                //注意，这里需要加上 list 才能封装入数据
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
                console.log(res.data.banner)
                console.log(res.data.banner.list)
            })
        }
    }
</script>

<style scoped>
    .home-nav {
        /* 使用 css 的变量 */
        background-color: var(--color-tint);
        color: #eeeeee;
    }
</style>
