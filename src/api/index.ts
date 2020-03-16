import request from '@/utils/request';

export function loginApi(data) {
    return request({
        url: '/users/login',
        method: 'POST',
        data
    })
}