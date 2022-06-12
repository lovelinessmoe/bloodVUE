import request from '@/utils/request'

// export const getList = (current, size, params) => {
//     return request({
//         url: 'backstage/user/list',
//         method: 'get',
//         params: {
//             ...params,
//             current,
//             size,
//         }
//     })
// }
export const select = (current, size, params) => {
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