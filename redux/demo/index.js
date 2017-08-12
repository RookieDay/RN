// Store 就是把它们联系到一起的对象。Store 有以下职责：
    // 维持应用的 state；
    // 提供 getState() 方法获取 state；
    // 提供 dispatch(action) 方法更新 state；
    // 通过 subscribe(listener) 注册监听器;
    // 通过 subscribe(listener) 返回的函数注销监听器

import {createStore} from 'redux'
import todoAPP from './reducers'
let store = createStore(todoAPP)

// createStore() 的第二个参数是可选的, 用于设置 state 初始状态。这对开发同构应用时非常有用，服务器端 redux 应用的 state 结构可以与客户端保持一致, 那么客户端可以将从网络接收到的服务端 state 直接用于本地数据初始化。

