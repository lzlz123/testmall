<template>
    <swiper class="swiperItem">
        <swiper-item v-for="item in topImages">
            <img :src="item">
        </swiper-item>
    </swiper>

</template>

<script>
    import {SwiperItem, Swiper} from "../../../components/common/swiper";

    export default {
        name: "DetailSwiper",
        components: {
            SwiperItem,
            Swiper
        },
        props: {
            topImages: {
                type: Array,
                default() {
                    return []
                }
            }

        }
    }
</script>

<style scoped>
    .swiperItem {
        height: 200px;
        overflow: hidden;
    }

</style>