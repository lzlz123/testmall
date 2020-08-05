<template>
    <div class="checkButton" :class="{check:checked}">
        <img src="~assets/img/cart/tick.svg" @click="selectItem">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props: {
            value: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                checked: this.value
            }
        },

        methods: {
            selectItem: function () {
                this.$emit('checkBtnClick', this.checked)
            }
        },
        watch: {
            value(newValue) {
                this.checked = newValue;
            }
        }

    }
</script>

<style scoped>
    .checkButton {

        border-radius: 50%;
        border: 2px solid #a3a3a5;
    }

    .check {
        border-color: red;
        background-color: red;
    }
</style>