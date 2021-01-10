import { fork,take } from "redux-saga/effects";
import { REQUEST } from "../actions";
import { fetchEntity } from "./index";
import * as exampleActions from "../actions/example";
import * as api from "../api/index";


export function* fetchExampleThread(p1) {
    const request = api.buildExampleRequest.bind(null);
    yield fetchEntity( request,exampleActions.thread );
} 


//watchers
export function* watchExampleThread(){
    while(true) {
        //监听action是否被触发，如果触发则执行fetchExampleThread方法
        const { p1 } = yield take( exampleActions.EXAMPLE_THREAD[REQUEST] );
        yield fork( fetchExampleThread,p1  );
    }
}

