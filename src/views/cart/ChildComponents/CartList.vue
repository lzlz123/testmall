<template>
    <div class="carList">
        <CartListItem v-for="item in cartList" :item-info="item" ></CartListItem>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex'
    import CartListItem from "./CartListItem";

    export default {
        name: "CartList",
        components: {
            CartListItem
        },
        computed: {
            ...mapGetters([
                'cartList'
            ])
        },

    }
</script>

<style scoped>

</style>