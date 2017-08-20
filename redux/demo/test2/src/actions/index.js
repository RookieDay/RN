let nextTodoId = 0
//添加list
export const addTodo = (text) =>({
    type:'ADD_TODO',
    id: nextTodoId++,
    text
})
//数据筛选
export const setVisibilityFilter = (filter)=>({
    type:'SET_VISIBILITY_FILTER',
    filter
}) 
// 处理某一项的结果
export const toggleTodo = (id) =>({
    type:'TOGGLE_TODO',
    id
})