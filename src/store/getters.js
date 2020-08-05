const getters = {
    cartLength(state) {
        return state.carList.length
    },
    cartList(state) {
        return state.carList
    }
}

export default getters
