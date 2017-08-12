### redux

- [参考1](https://www.zhihu.com/question/41312576?sort=created)
- Redux 本身很简单。当使用普通对象来描述应用的 state 时。例如todo 应用的 state 可能长这样：
```
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```
- 要想更新 state 中的数据，你需要发起一个 action。Action 就是一个普通 JavaScript 对象（注意到没，这儿没有任何魔法？）用来描述发生了什么。下面是一些 action 的示例：
```
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

- 强制使用 action 来描述所有变化带来的好处是可以清晰地知道应用中到底发生了什么。如果一些东西改变了，就可以知道为什么变。action 就像是描述发生了什么的面包屑。最终，为了把 action 和 state 串起来，开发一些函数，这就是 reducer。再次地，没有任何魔法，reducer 只是一个接收 state 和 action，并返回新的 state 的函数。 对于大的应用来说，可能很难开发这样的函数，所以我们编写很多小函数来分别管理 state 的一部分：

```
function visibilityFilter(state = 'SHOW_ALL',action){
    if(action.type === 'SET_VISIBILITY_FILTER'){
        return action.filter;
    } esle {
        return state;
    }
}
function tods(state = [], action){
  switch (action.type) {
    case 'ADD_TODO':
        return state.concat([{ text: action.text, completed: false }]);
    case 'TOGGLE_TODO':
        return state.map((todo, index) =>
            action.index === index ?
                { text: todo.text, completed: !todo.completed } :
                todo
        )
    default:
        return state;
  }
}
```
- 再开发一个 reducer 调用这两个 reducer，进而来管理整个应用的 state：
```
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  };
}
```