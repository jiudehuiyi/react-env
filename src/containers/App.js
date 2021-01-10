// import { library } from '@fortawesome/fontawesome-svg-core'
// import {  fas } from '@fortawesome/free-solid-svg-icons'

//图标地址访问:http://www.fontawesome.com.cn/faicons/
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*
  移动端不建议开启，开启后一次性加载所有得图标文件，打包体积会增大(开启gzip都有200k)，目前还没有解决方案
  可以采取以下的方案:
  1.需要那个图标就引入那个图标，这样就会进行按需加载(具体图标可以访问font-awesome网站查看)
  2.采用react-icons库
  3.使用iconfont,将加载iconfont图标的抽成一个公用组件(这个缺点明显,特定的图标未必找得到，需要ui配合)
*/
// library.add( fas );


import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";


import  RoutesConfig from "./RoutesConfig"; 
import Page404 from "@/components/Page404";
import "./App.scss";




function App() {
  return (
    <div className="App">
        <Router>
          <Switch>

            
              {
                RoutesConfig.map( (route,index)=>{
                  const { component,path,key,exact,...routeProps } = route;
                  return (
                    <Route  
                        path = { (component?.path)??path }
                        exact = { !!exact }
                        key = { key??index }
                        component = { component ?? <Page404 /> }
                        {
                          ...routeProps
                        }
                    />
                  )
                } )
              }
          </Switch>
        </Router>
    </div>
  );
}

export default App;
