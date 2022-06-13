import request from '@/utils/request'

export const putTakeBlood = (blood) => {
    return request({
        url: '/backstage/doctor/blood/takeBlood',
        method: 'put',
        data: blood
    })
}

export const getUserList = (current, size, params) => {
    return request({
        url: '/backstage/doctor/blood/userList',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}
