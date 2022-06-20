import request from '@/utils/request'

export const getUserList = (current, size, params) => {
    return request({
        url: '/backstage/blood/updateBlood',
        method: 'get',
        params: {
            ...params,
            current,
            size,
        }
    })
}
export const getBloodList = (current, size, params) => {
    return request({
        url: 'backstage/blood/getBloodList',
        method: 'post',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const del = (user) => {
    return request({
        url: 'backstage/blood/insertBlood',
        method: 'put',
        data: user,
    })
}



