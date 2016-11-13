module.exports = {
    ORDER_STATUS: {
        PENDING: 'PENDING',
        PAID: 'PAID',
        COMPLETE: 'COMPLETE',
        CANCEL: 'CANCEL'
    },
    ERROR_CODE: {
        NO_ID_PROVIDED: {
            code: 'NO_ID_PROVIDED',
            desc: 'Please provide Id in path params.'
        },
        NOT_FOUND: {
            code: 'NOT_FOUND',
            desc: 'Sorry, no resource found.'
        },
        INVALID_REQUEST_BODY: {
            code: 'INVALID_REQUEST_BODY',
            desc: 'Invalid request body'
        }
    }
};
