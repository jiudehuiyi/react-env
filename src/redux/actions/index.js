export const REQUEST = "REQUEST";
export const SUCCESS = "SUCCESS";
export const FAILURE = "FAILURE";


//这个函数生成一个有请求，成功，失败的一个对象，例如：
// {
//     "REQUEST":"EXAMPLE_THREAD_REQUEST",
//     "SUCCESS":"EXAMPLE_THREAD_SUCCESS",
//     "FAILURE":"EXAMPLE_THREAD_FAILURE",
// }
export function createRequestTypes(base) {
    if( !base ) {
        throw new Error("cannot create request with base = \ or base = null");
    }
   
    return [ REQUEST,SUCCESS,FAILURE ].reduce( (acc,type)=>{
        acc[type] = `${base}_${type}`;
        return acc;
    },{} )
}


//生成一个actionCreate,例如:
// {
//     type: "EXAMPLE_THREAD_REQUEST",
//     payload:{},
// }

export  function createAction(type,payload ={}){
    return {
        type,
        ...payload
    }
}


