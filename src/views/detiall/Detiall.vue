<template>

    <div id="detail">
        <DetailNavBar
            ref="detailNavBar"
            @turnTo="turnTo"
            class="detai-nav">
        </DetailNavBar>
        <!--必须要有固定的高度-->
        <Scroll class="content"
                ref="scroll"
                :probe-type="3"
                @scroll="scroll"
        >
            <DetailSwiper :top-images="topImages"></DetailSwiper>
            <DetailBaseInfo :goods="goodsINFO"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>

            <DetailGoodsInfo ref="goodsInfo"
                             :detail-info="detailInfo"
                             @imageLoad="imageLoad"
            />
            <DetailParamInfo
                ref="param"
                :param-info="goodsParam"/>
            <DetailCommentInfo
                ref="detailCommentInfo"
                @detailCommentLoad="detailCommentInfoLoad"
                :comment-info="commentInfo"/>
            <GoodsList
                ref="goods"
                :goods="recommendInfo"></GoodsList>
        </Scroll>
        <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
        <BackTop @click.native="backClick" v-show="isShowBackTop"/>

    </div>

</template>

<script>
    //公共组件
    import Scroll from "../../components/common/scroll/Scroll";
    import GoodsListItem from "../../components/content/goods/GoodsListItem";
    import GoodsList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    //子组件
    import DetailNavBar from "./ChildComponents/DetailNavBar";
    import DetailSwiper from "./ChildComponents/DetailSwiper";
    import DetailBaseInfo from "./ChildComponents/DetailBaseInfo";
    import DetailShopInfo from "./ChildComponents/DetailShopInfo";
    import DetailGoodsInfo from "./ChildComponents/DetailGoodsInfo";
    import DetailParamInfo from "./ChildComponents/DetailParamInfo";
    import DetailCommentInfo from "./ChildComponents/DetailCommentInfo";
    import DetailBottomBar from "./ChildComponents/DetailBottomBar";
    //网络请求
    import {getDetial, GoodsINFO, Shop, GoodsParam, getReComment} from "../../../src/network/detail"
    import {deBounce} from "../../components/common/utils";

    export default {
        name: "Detiall",
        components: {
            Scroll,
            GoodsListItem,
            GoodsList,
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            BackTop
        },

        data() {
            return {
                iid: null,
                topImages: null,
                //这里需要返回的是一个空对象  不能返回null
                //商品信息
                goodsINFO: {},
                //店铺信息
                shop: {},
                detailInfo: {},
                //产品参数信息
                goodsParam: {},
                //【'商品', '参数', '评论', '推荐'】的位置信息
                position: {},
                //评论信息
                commentInfo: {},
                //推荐数据
                recommendInfo: [],
                detailItemListener: null,
                isShowBackTop: false,
                message: '',
                show: false
            }
        },
        //这里不能用 create 如果使用create 会保持KeepAlive 不会更新
        created() {
            //获取到iid的值
            this.iid = this.$route.params.iid
            // 请求详情数据
            getDetial(this.iid).then((res) => {
                //做一些分离操作
                //1.获取顶部的轮播数据
                const data = res.result;
                //顶部轮播图信息
                this.topImages = res.result.itemInfo.topImages;
                //商品信息
                this.goodsINFO = new GoodsINFO(data.itemInfo, data.columns, data.shopInfo.services)
                //店铺信息
                this.shop = new Shop(data.shopInfo)
                //详情数据
                this.detailInfo = data.detailInfo
                //获取商品参数信息
                this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                //获取评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

            })
            //请求推荐数据
            getReComment().then(res => {
                this.recommendInfo = res.data.list
            })

        },
        methods: {
            //图片完成加载。刷新下高度
            imageLoad() {
                this.$refs.scroll.refresh()
                //获取位置信息【'商品', '参数', '评论', '推荐'】


            },
            detailCommentInfoLoad() {
                this.$refs.scroll.refresh()

            },


            //【'商品', '参数', '评论', '推荐'】的位置信息的快速跳转
            turnTo(index) {
                this.$refs.scroll.back(0, this.position[index], 200)
            },
            // 【'商品', '参数', '评论', '推荐'】的位置信息 滚动监听
            scroll(position) {
                //监听 backTop 是否显示
                if (position.y < -1000) {
                    this.isShowBackTop = true
                }

                if (position.y <= this.position[3]) {
                    this.$refs.detailNavBar.change(3)
                } else if (position.y <= this.position[2]) {
                    this.$refs.detailNavBar.change(2)
                } else if (position.y <= this.position[1]) {
                    this.$refs.detailNavBar.change(1)
                } else if (position.y > this.position[1]) {
                    this.$refs.detailNavBar.change(0)
                }
            },
            backClick() {
                this.$refs.scroll.back(0, 0, 500)
            },
            addToCart() {
                //购物车需要展示的信息加
                const producet = {}
                producet.image = this.topImages[0]
                producet.title = this.goodsINFO.title
                producet.desc = this.goodsINFO.desc
                producet.price = this.goodsINFO.realPrice
                producet.iid = this.iid
                console.log(producet);
                // 加入到 vuex
                this.$store.dispatch('addCart', producet).then((res) => {
                    this.$toast.show(res, 1500)
                })
            }

        },
        //监听 下拉的距离，一到距离自动修改标签颜色
        computed: {},
        mounted() {
            //利用 debounce 防止打印很多次
            this.detailItemListener = deBounce(() => {
                this.$refs.scroll.refresh()
                //加载完毕，确定高度
                this.position[0] = 0
                this.position[1] = -this.$refs.param.$el.offsetTop
                this.position[2] = -this.$refs.detailCommentInfo.$el.offsetTop
                this.position[3] = -this.$refs.goods.$el.offsetTop
            })

            //执行防抖函数  同时刷新下 高度
            this.$bus.$on('imageLoadOver', this.detailItemListener)
        },
        destroyed() {
            this.$bus.$off('imageLoadOver', this.detailItemListener)
        }


    }
</script>

<style scoped>

    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .content {
        height: calc(100% - 43px);
    }

    .detai-nav {
        position: relative;
        z-index: 9;
        background-color: #eeeeee;
    }


</style>