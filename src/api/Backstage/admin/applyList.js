import request from '@/utils/request'

export const getApplyList = (current, size, params) => {
    return request({
        url: '/backstage/blood/listAllForm',
        method: 'post',
        params: {
            ...params,
            current,
            size,
        }
    })
}


export const approvalBlood = (formId, accept) => {
    return request({
        url: '/backstage/blood/approvalBlood',
        method: 'get',
        params: {
            bloodTransFormId: formId,
            accept,
        }
    })
}



