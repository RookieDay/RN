// state 结构
// 通常，这个 state 树还需要存放其它一些数据，以及一些 UI 相关的 state。这样做没问题，但尽量把这些数据与 UI 相关的 state 分开。
// {
//     visibilityFilter: 'SHOW_ALL',
//     todos: [
//       {
//         text: 'Consider using Redux',
//         completed: true,
//       },
//       {
//         text: 'Keep all state in a single tree',
//         completed: false
//       }
//     ]
//   }

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todoApp(state = initialState,action) {
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{
                visibilityFilter:action.filter
            })
        case ADD_TODO:
            return Object.assign({},state,{
                todos:[
                    ...state.todos,
                    {
                        text:action.text,
                        completed:false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({},state,{
                todos:state.todos.map((todo,index)=>{
                    if(index === action.index){
                        return Object.assign({},todo,{
                            completed:!todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

// 每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据。

// 最后，Redux 提供了 combineReducers() 工具类来做上面 todoApp 做的事情，这样就能消灭一些样板代码了。有了它，可以这样重构 todoApp：
// import {combineReducers} from 'redux';
// const todoApp = combineReducers({
//     visibilityFilter,
//     todos
// })
// export default todoApp;

// 等价于
// export default function todoApp(state={},action){
//     return {
//         visibilityFilter:visibilityFilter(state.visibilityFilter,action),
//         todos:todos(state.todos,action)
//     }
// }

// 你也可以给它们设置不同的 key，或者调用不同的函数。下面两种合成 reducer 方法完全等价：
// const reducer = combineReducers({
//     a: doSomethingWithA,
//     b: processB,
//     c: c
//   })

// 等价于
// function reducer(state = {}, action) {
//     return {
//       a: doSomethingWithA(state.a, action),
//       b: processB(state.b, action),
//       c: c(state.c, action)
//     }
// }

// combineReducers() 所做的只是生成一个函数，这个函数来调用你的一系列 reducer，每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理，然后这个生成的函数再将所有 reducer 的结果合并成一个大的对象。没有任何魔法。正如其他 reducers，如果 combineReducers() 中包含的所有 reducers 都没有更改 state，那么也就不会创建一个新的对象。

