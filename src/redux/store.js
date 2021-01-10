import { createStore,applyMiddleware,compose } from "redux";
import createSagaMiddleware from "redux-saga";
// import rootReducer from "./modules";
import reducer from "./reducers";
import rootSaga from "./sagas";


const configureStore = ()=>{
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore( reducer,composeEnhancers( applyMiddleware( sagaMiddleware ) ) )
    sagaMiddleware.run( rootSaga );
    return store;
}

export default configureStore





