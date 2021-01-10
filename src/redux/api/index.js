import axios from "axios";


//axios请求需要配置一套get post put delete的通用的方法，结合具体的场景，再进行配置
export function buildExampleRequest(){
    return axios.get("http://119.23.17.221:3000/search?keywords=%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA")
}

export function buildExample2Request(){
    return axios.get("http://119.23.17.221:3000/comment/music?id=186016&limit=1")
}
