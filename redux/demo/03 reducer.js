function todos(state =[],action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text:action.text,
                    completed:fasle
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

function vibibilityFilter(state = SHOW_ALL,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todoApp(state = {},action){
    return {
        visibilityFilter:visibilityFilter(state.visibilityFilter,action),
        todos:todos(state.todos,action)
    }
}