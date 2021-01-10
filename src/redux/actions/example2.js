import { SUCCESS,FAILURE,REQUEST,createAction,createRequestTypes } from "./index.js";

export const EXAMPLE2_THREAD = createRequestTypes("EXAMPLE2_THREAD");

export const thread = {
    request:()=>createAction( EXAMPLE2_THREAD[REQUEST] ),
    success:(response)=>createAction( EXAMPLE2_THREAD[SUCCESS],{response} ),
    failure:(response)=>createAction( EXAMPLE2_THREAD[FAILURE],{response} ),
}
