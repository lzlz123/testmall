<template>
    <nav-bar>
        <div slot="left"
             class="back"
             @click="backClick"
        >
            <img src="~assets/img/common/back.svg">
        </div>

        <div slot="center" class="center">
            <div v-for="(item,index) in titles"
                 @click="ItemClick(index)"
                 class="titleItem"
                 :class="{active:index==currentIndex}"
            >{{item}}
            </div>
        </div>
    </nav-bar>
</template>

<script>
    import NavBar from "../../../components/common/navbar/NavBar";

    export default {
        name: "DetailNavBar",
        components: {
            NavBar
        },
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐'],
                currentIndex: 0
            }
        },
        methods: {
            ItemClick(index) {
                this.currentIndex = index
                //点击 跳转到某个位置
                this.$emit('turnTo', index)
            },
            backClick() {
                this.$router.back()
            },
            change(index) {
                this.currentIndex = index;

            }
        },

    }
</script>

<style scoped>
    .back img {
        margin-top: 10px;
    }

    .center {
        display: flex;
        font-size: 13px;
    }

    .titleItem {
        flex: 1;
    }

    .active {
        color: var(--color-high-text);
    }
</style>