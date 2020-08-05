<template>
    <div class="goods-item" @click="itemClick">
        <!--监听图片加载完成，重新刷新  Scroll 的高度-->
        <img v-lazy="showImage" @load="imageLoadOver">
        <div class="goods-info">
            <p>{{goodsitem.title}}</p>
            <span class="price">{{goodsitem.price}}</span>
            <span class="collect">{{goodsitem.cfav}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodsListItem",
        props: {
            goodsitem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            showImage() {
                return this.goodsitem.image || this.goodsitem.show.img
            }

        },
        methods: {
            imageLoadOver() {
                //利用事件总线，发生事件，返回首页  ==》 这里间隔太多层了
                this.$bus.$emit('imageLoadOver');
            },
            itemClick() {
                this.$router.push("/detaill/" + this.goodsitem.iid)
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }

    .goods-item img {
        width: 100%;
        border-radius: 5px;
    }

    .goods-info {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;
    }

    .goods-info p {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }

    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 20px;
    }

    .goods-info .collect {
        position: relative;
    }

    .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;

    }
</style>