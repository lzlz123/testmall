<template>
    <div class="tabControl">
        <div v-for="(item,index) in titles"
             :class="{active:index==currentIndex}"
             @click="itemMouseClick(index)"
             class="tabControl-item">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemMouseClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style scoped>
    .tabControl {
        display: flex;
        text-align: center;
        background-color: bisque;
        position: relative;
        z-index: 9;
    }

    .tabControl-item {
        height: 40px;
        line-height: 40px;
        flex: 1;
        font-size: 14px;
    }

    .tabControl-item span {
        padding: 5px;
    }

    .active {
        color: var(--color-high-text);

    }

    .active span {
        border-bottom: 3px solid var(--color-tint)
    }
</style>