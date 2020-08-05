<template>
    <div class="cart">
        <NavBar class="navBar">
            <div slot="center">购物车({{cartLength}})</div>
        </NavBar>
        <scroll class="content">
            <CartList></CartList>
        </scroll>
        <CartBottomBar></CartBottomBar>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    import CartList from "./ChildComponents/CartList";
    import {mapGetters} from 'vuex'
    import Scroll from "../../components/common/scroll/Scroll";
    import CartBottomBar from "./ChildComponents/CartBottomBar";

    export default {
        name: "Cart",
        components: {CartBottomBar, Scroll, CartList, NavBar},
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                cartLength: 'cartLength'
            })
        },
        methods: {
            // checkALl() {
            //     console.log('333');
            // }
        }
    }
</script>

<style scoped>
    .cart {
        height: calc(100vh - 43px - 48px);
    }

    .nar-bar {
        background-color: var(--color-tint);
        color: #eeeeee;
        font-weight: 700;
    }

    .content {
        height: calc(100% - 43px);
    }
</style>
