

export const __backend__ = process.env.BACKEND_URL;


export const CREATE_CONVERSATION_API = `${__backend__}/conversation/create-conversation`;
export const GET_CONVERSATION_DETAILS_API = `${__backend__}/conversation/get-conversation-details`;
export const GET_LIST_OF_CONVERSATIONS_API = `${__backend__}/conversation/get-list-of-conversations`;