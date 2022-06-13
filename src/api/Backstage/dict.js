import request from '@/utils/request'

export const getDictByCode = (code) => {
    return request({
        url: '/dict/getDictByCode',
        method: 'get',
        params: {code}
    })
}
