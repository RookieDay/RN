function todos(state = [],action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text:action.text,
                    completed:false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo,index)=>{
                if(index === action.index){
                    return Object.assign({},todo,{
                        completed:!todo.completed
                    })
                }
                return todo
            })
        default:   
            return state
    }
}

function todoApp(state = initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({},state,{
                visibilityFilter:action.filter
            })
        case ADD_TODO:
        case TOGGLE_TODO:
            return Object.assign({},state,{
                todos:todos(state.todos,action)
            })
        default:
            return state
    }
}

// todos 依旧接收 state，但它变成了一个数组！现在 todoApp 只把需要更新的一部分 state 传给 todos 函数，todos 函数自己确定如何更新这部分数据。这就是所谓的 reducer 合成，它是开发 Redux 应用最基础的模式。
