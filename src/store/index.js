import Vue from 'vue'
import Vuex from 'vuex'
import getters from "./getters";
//1. 安装插件
Vue.use(Vuex)
//2. 创建store 对象
const store = new Vuex.Store({
    state: {
        carList: []
    },
    getters,
    mutations: {
        //根据传递的 iid ，直接取反
        change(state, playload) {
            for (let item of state.carList) {
                if (item.iid === playload) {
                    item.checked = !item.checked
                }
            }
            state.carList.splice()
        },
        changeAll(state, playload) {
            if (playload === true) {
                for (let item of state.carList) {
                    item.checked = false
                }
            } else {
                for (let item of state.carList) {
                    item.checked = true
                }
            }
            state.carList.splice()
        },
        one(state, playload) {
            console.log('one');
            state.carList.forEach(item => {
                item.checked = true;
            });
            state.carList.splice()

        },
        two(state, playload) {
            console.log('two');
            state.carList.forEach(item => {
                item.checked = false;
            });
            state.carList.splice()
        },
        addTocarList(state, playload) {
            playload.count = 1
            playload.checked = true
            state.carList.push(playload)
            //直接修改数组类的数据，需要对数组进行一次刷新
            state.carList.splice()
        },
        addCount(state, playload) {
            playload.count += 1
            playload.checked = true
        }

    },
    actions: {
        //同步修改属性， 在mutataion中执行
        //当前为异步操作
        addCart(context, playload) {
            return new Promise((resolve, reject) => {
                //判断下之前的商品是否存在
                //a==>可以加入
                let a = true;
                for (let item of context.state.carList) {
                    if (item.iid === playload.iid) {
                        a = false
                        context.commit('addCount', item)
                        //直接修改数组类的数据，需要对数组进行一次刷新
                        context.state.carList.splice()
                        resolve('当前商品数量+1')
                    }
                }
                if (a === true) {
                    context.commit('addTocarList', playload)
                    resolve('添加新的商品')
                }
            })


        },
    }


});
//3 .挂在到Vue实例
export default store