import request from '@/utils/request'

export const getRankList = () => {
    return request({
        url: '/rank/getRankList',
        method: 'get'
    })
}

