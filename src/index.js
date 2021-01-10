import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import "@/globalStyle/normalize.css";
import "@/globalStyle/index.scss";
import App from '@/containers/App';
import configureStore from "@/redux/store"
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import reportWebVitals from './reportWebVitals';


const store = configureStore();
const persistor = persistStore(store);
// console.log( process.env )
ReactDOM.render(
  <React.StrictMode>
    <Provider store= { store }>
      <PersistGate persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


//开启service worker缓存
// if ('serviceWorker' in navigator) {
//   navigator
//     .serviceWorker.register('./sw.js')
//     .then(() => {
//       console.log('Service Worker Registered')
//     })
// }