import { createAction,createRequestTypes,FAILURE,SUCCESS,REQUEST } from "./index";

export const EXAMPLE_THREAD = createRequestTypes( "EXAMPLE_THREAD" );

//生成三个actionCreator
export const thread = {
    request:(p1) => createAction( EXAMPLE_THREAD[REQUEST],{p1} ),
    success:(response)=>createAction( EXAMPLE_THREAD[SUCCESS],{response} ),
    failure:(response)=>createAction( EXAMPLE_THREAD[FAILURE],{response} )
}

