
import { SUCCESS } from "../actions";
import { EXAMPLE_THREAD } from "../actions/example";
import { EXAMPLE2_THREAD } from "../actions/example2";

const initialState = {
}

function reducerExample( state = initialState,action ){
    switch(action.type){
        case EXAMPLE_THREAD[SUCCESS] :
            return {
                ...state,
                data:action.response?.data
            };
        case EXAMPLE2_THREAD[SUCCESS]: 
            return { b:"3333" }
        default :
            return state;    
    }
}


export default reducerExample;



// /reselect操作计算


