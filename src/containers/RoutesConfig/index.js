import { lazy } from "react";
import loadableHoc from "@/components/LoadableHoc";

let RoutesConfig = [

    {
        name:"test1",
        path:"/test1",
        exact:false,
        component:loadableHoc( lazy( ()=> import(/* webpack Component Test1  */ "../Test1")  ) )
    },
    {
        name:"test2",
        path:"/test2",
        exact:false,
        component:loadableHoc( lazy( ()=> import(/* webpack Component Test2 */ "../Test2") ) )
    },
    {
        name:"example",
        path:"/example",
        exact:false,
        component:loadableHoc( lazy( ()=>import( /* webpack Component Example */ "../Example" ) ) )
    },
    {
        name:"example2",
        path:"/example2",
        exact:false,
        component:loadableHoc( lazy( ()=>import( /* webpack Component Example2 */ "../Example2" ) ) ),
    },
    







    //这个404页面必须写在最后
    {
        name:"page404",
        path:"*",
        exact:false,
        component:loadableHoc( lazy( ()=>import( /* webpack Component 404Page */ "@/components/Page404" ) ) )
    }


];


export default RoutesConfig;




