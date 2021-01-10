import { take,fork } from "redux-saga/effects";
import  * as thread  from "../actions/example2";
import { REQUEST } from "../actions";
import * as api from "../api";
import { fetchEntity } from "./index";

export function* fetchExample2Thread(){
    const request = api.buildExample2Request.bind(null);
    yield fetchEntity( request,thread.thread );
}


//watcher
export function* watcherExample2Thread(){

    while( true ){
        const { p1 } = yield take( thread.EXAMPLE2_THREAD[REQUEST] );
        yield fork( fetchExample2Thread );
    }
} 