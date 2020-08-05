<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <!--加上冒号，传入的是 3 ==>Number
            不加冒号  传入的是 ‘3’ ==》字符串

        -->
        <!--用障眼法  实现停留-->
        <TabControl @tabClick="tabClick"
                    :titles="['流行','新款','精选']"
                    class="tabControl"
                    ref="tabControl1"
                    v-show="isTabFix"
        />

        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
            <div>
                <HomeSwiper @swiperImageLoadOver="swiperImageLoadOver" :banners="banners" ref="swiper"></HomeSwiper>
                <HomeRecommend :recommends="recommends"></HomeRecommend>
                <HomeFeature></HomeFeature>
                <!--上面不用写 参数 下面可以直接用参数-->
                <TabControl @tabClick="tabClick"
                            :titles="['流行','新款','精选']"
                            class="tabControl"
                            ref="tabControl2"
                >
                </TabControl>
                <GoodsList :goods="showGoods"></GoodsList>
            </div>
        </scroll>
        <!--!!!监听组件的点击!!!  需要加上  .native的属性-->
        <BackTop @click.native="backClick" v-show="isShowBackTop"/>
    </div>

</template>

<script>
    //数据请求
    import {getHomeMutidate, getHomeGoods} from "network/home"
    //公共组件导入
    import NavBar from "../../components/common/navbar/NavBar";
    import TabControl from "../../components/content/tabControl/TabControl";
    import GoodsList from "../../components/content/goods/GoodsList";
    import Scroll from "../../components/common/scroll/Scroll";
    import BackTop from "../../components/content/backTop/BackTop";
    //子组件导入
    import HomeSwiper from "./childComps/HomeSwiper";
    import HomeRecommend from "./childComps/HomeRecommend";
    import HomeFeature from "./childComps/HomeFeature";
    //方法导入
    import {deBounce} from "../../components/common/utils";

    export default {
        name: "Home",
        components: {
            NavBar,
            TabControl,
            GoodsList,
            Scroll,
            BackTop,

            HomeSwiper,
            HomeRecommend,
            HomeFeature,


        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []}
                },
                currentType: 'pop',
                isShowBackTop: false,
                tabOffsetTop: 0,
                isTabFix: false,
                saveY: 0,
                homeItemListener: null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        methods: {
            /*
            *
            * 网络请求相关方法
            * */
            //请求主页 swiper数据
            getHomeMutidate() {
                //1.请求多个数据,这里是一个异步操作
                getHomeMutidate().then(res => {
                    //注意，这里需要加上 list 才能封装入数据
                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            //请求 【流行】 【新款】 【精选】 数据
            getHomeGoods(type) {
                //需要加载的页码
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    //请求商品数据
                    this.goods[type].list.push(...res.data.list)
                    //当前的页码
                    this.goods[type].page += 1
                    //重新刷新下一次 scroll  让 scroll的长度重新计算
                    this.$refs.scroll.finishPullUpHome()
                })

            },

            /*


            事件监听相关方法
            */
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
                }
                //解决是 原生 的tabcontrol 产生了切换 需要和 障眼法的保持一致
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },
            //监听返回顶部组件的点击
            backClick() {
                //通过 标签，拿到组件，
                //通过 组件 直接访问内部属性
                this.$refs.scroll.back(0, 0, 400)
            },
            //监听滚动
            contentScroll(position) {
                //是否显示 返回最上方的图表
                if (position.y < -1000) {
                    this.isShowBackTop = true
                }
                //决定 tabControll 是否吸顶
                this.isTabFix = (-position.y) > this.tabOffsetTop
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            swiperImageLoadOver() {
                // 获取 tabControl 的位置
                //组件没有 offsetTop 只有组件的元素的
                //所有的组件都有一个  @el  ，获取组件内部的元素 需要在图片全部加载之后，才是正确的值
                this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
            }


        },
        destroyed() {


        },
        activated() {
            this.$refs.scroll.back(0, this.saveY, 0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            //在离开的时候，保存下Y
            //要加上（），让他执行
            this.saveY = this.$refs.scroll.getScrollY()

            //取消全局监听事件
            this.$bus.$off('imageLoadOver', this.homeItemListener)

        },


        //组件创建好，直接发送网络请求
        created() {
            //请求主页 swiper数据
            this.getHomeMutidate();
            //请求三个首页数据
            this.getHomeGoods('pop');
            this.getHomeGoods('new');
            this.getHomeGoods('sell');


        },


        mounted() {
            //防抖函数
            const refresh = deBounce(() => {
                this.$refs.scroll.refresh()
            }, 200)
            //保存一下函数
            this.homeItemListener = () => {
                refresh()
            }
            //监听图片加载完成==》监听到  mounted 里面去做
            this.$bus.$on('imageLoadOver', this.homeItemListener)

        },


    }
</script>

<!-- 加上 scoped 只会给客户端-->
<style scoped>
    #home {
        padding-top: 44px;
        height: 100vh;
        position: relative;
    }

    .home-nav {
        /* 使用 css 的变量 */
        background-color: var(--color-tint);
        color: #eeeeee;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }


    /*
        不起效果了
        .tabControl {
            position: sticky;
            top: 44px;
            z-index: 9;
        }*/

    .content {

        overflow: hidden;
        position: absolute;
        top: 44px;
        bottom: 49px;
    }


    /*.content {*/
    /*    height: calc(100% - 98px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/

    /*}*/
</style>
