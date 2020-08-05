<template>
    <swiper>
        <SwiperItem v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" @load="imageLoad">
            </a>
        </SwiperItem>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from "../../../components/common/swiper";

    export default {
        name: "HomeSwiper",
        components: {
            Swiper,
            SwiperItem
        },
        props: {
            banners: Array,
            default() {
                return []
            }
        },
        data() {
            return {
                //判断 加载完毕的信息 是否已经发送出去？
                isLoad: false
            }
        },
        methods: {
            imageLoad() {
                if (this.isLoad === false) {
                    this.$emit('swiperImageLoadOver')
                    this.isLoad = true;
                }
            }
        }
    }
</script>

<style scoped>

</style>