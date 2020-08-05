<template>
    <div id="goods">
        <GoodsListItem v-for="item in goods" :goodsitem="item"/>
    </div>
</template>

<script>
    import GoodsListItem from "./GoodsListItem";


    export default {
        name: "GoodsList",
        props: {
            goods: {
                default() {
                    type: Array
                    return []
                }
            }
        },
        components: {
            GoodsListItem
        }
    }
</script>

<style scoped>
    #goods {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

</style>