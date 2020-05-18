import request from '@/utils/request';

export function loginApi(data) {
    return request({
        url: '/users/login',
        method: 'POST',
        data
    })
}

export function getRoomList() {
    return request({
        url: '/room/list',
        method: 'GET'
    })
}
export function submitHeadPicApi(query: {name: string}) {
    return request({
        url: '/users/submitHead',
        method: 'POST',
        data: query
    })
}
export function checkExpireApi() {
    return request({
        url: '/users/expire',
        method: 'POST'
    })
}