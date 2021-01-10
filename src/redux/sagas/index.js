import { all,call,put,fork } from "redux-saga/effects";
import { watchExampleThread } from "./example";
import { watcherExample2Thread } from "./example2"
export default function*(){
    yield all([
        fork(watchExampleThread),
        fork(watcherExample2Thread)
    ])
}


export function* fetchEntity(request,entity,...args) {
    try {
        const response =  yield call( request );
        yield put( entity.success(response,...args) );
    } catch (error) {
        yield put( entity.failure( error,...args ) )
    }
}

export function ignoreErrors(fn,...args){
    return ()=>{
        const ignoreErrorCallback = (response)=>response;
        return fn(...args).then( ignoreErrorCallback,ignoreErrorCallback  );
    }
}
