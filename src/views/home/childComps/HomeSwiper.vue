<template>
    <swiper>
        <SwiperItem v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image">
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
        }
    }
</script>

<style scoped>

</style>