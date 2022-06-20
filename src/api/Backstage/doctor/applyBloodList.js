import request from '@/utils/request'

export const putApplyList = (blood) => {
    return request({
        url: '/backstage/doctor/trans/useBlood',
        method: 'post',
        data: blood
    })
}

export const getuserList = (current, size, params) => {
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
