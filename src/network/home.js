import request from "./request";


export function getHomeMutidate() {
    return request({
        url: '/home/multidata',
    })
}