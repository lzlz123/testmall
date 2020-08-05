<template>
    <!-- 通过 ref 去指定一个组件 -->
    <div ref="wrapper" class="wrapper">
        <div class="content">
            <slot ></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"

    export default {
        name: "Scroll",
        //需要挂在之后才能获取到 div 标签，
        //如何是在 组件生成时候， div 标签还没有渲染
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default() {
                    return 0;
                }
            },
            /*是否需要监听*/
            pullUpLoad: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        methods: {
            // 设置 scroll 的大小
            // this.scroll 加上 ，防止 scroll 未加载
            back(x, y, time = 300) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },

            //完成上拉加载更多，需要刷新 scroll 的状态
            finishPullUpHome() {
                this.scroll && this.scroll.finishPullUp()
            },
            //重新设置 高度
            //调用过于频繁,加入防抖函数
            refresh() {
                this.scroll && this.scroll.refresh()
            },

            //用于记录当前的Y
            getScrollY() {
                return this.scroll.y ? this.scroll.y : 0
            }

        },
        mounted() {
            //创建一个 scroll 对象
            //三个监听事件
            //第一个参数需要指定 准确的 东西
            this.scroll = new BScroll(this.$refs.wrapper,
                {
                    probeType: this.probeType,
                    pullUpLoad: this.pullUpLoad,
                    click: true,
                })
            // 0 和 1 的时候不需要监听
            //监听到底部==》需要在首页用 Goods 组件加载更多内容 ==》 传递给首页
            if (this.probeType === 2 || this.probeType === 3) {
                //监听滚动区域==>发出事件
                this.scroll.on('scroll', (position => {
                    this.$emit('scroll', position)
                }))
            }
            //设置 拉去更多
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on('pullingUp', () => {
                    this.$emit(('pullingUp'))
                })
            }
        },

    }
</script>

<style scoped>

</style>