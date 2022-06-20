import request from "@/utils/request";

export const getApplyList = (current, size, params) => {
    return request({
        url: '/backstage/doctor/blood/applyList',
        method: 'post',
        params: {
            ...params,
            current,
            size,
        }
    })
}

export const lookByBlood = (look) => {
    return request({
        url: '/backstage/doctor/trans/lookByBlood',
        method: 'post',
        param: look
    })
}
