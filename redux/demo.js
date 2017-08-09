import {createStore} from 'redux';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */

 function counter(state = 0, action){
     switch(action.type){
        case 'INCREMENT':
          return state + 1;
        case 'DECREMENT':
          return state + 1;
        default:
          return state;
     }
 }

 // 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);

// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(()=>{
    console.log(store.getState())
});

// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1

// Redux 没有 Dispatcher 且不支持多个 store。相反，只有一个单一的 store 和一个根级的 reduce 函数（reducer）。随着应用不断变大，你应该把根级的 reducer 拆成多个小的 reducers，分别独立地操作 state 树的不同部分，而不是添加新的 stores。这就像一个 React 应用只有一个根级的组件，这个根组件又由很多小组件构成。
