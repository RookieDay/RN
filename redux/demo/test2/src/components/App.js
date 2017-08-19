import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibiltTodoList from '../containers/VisibileTodoList'

const App = () =>{
    <div>
        <AddTodo/>
        <VisibiltTodoList/>
        <Footer/>
    </div>
}

export default App