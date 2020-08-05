<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        props: {
            message: {
                type: String,
                default: ''
            },
            isShow: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            show(res, secound = 1500) {
                this.isShow = true;
                this.message = res;
                setTimeout(() => {
                    this.isShow = false;
                    this.message = '';
                }, secound)
            }
        }

    }
</script>

<style scoped>
    .toast {
        position: fixed;
        left: 50%;
        top: 50%;
        background-color: rgba(0, 0, 0, .8);
        padding: 10px;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        color: #fff;
        z-index: 99;
    }
</style>