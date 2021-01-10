import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const examplePersist = (reducer)=>{
    const exampleConfig = {
        key:"example",
        storage:storage,
        whitelist:["data",]
    }
    return persistReducer( exampleConfig,reducer );
}


