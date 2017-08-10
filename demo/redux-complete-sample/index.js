import React,{Component} from 'react';
import ProTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider,connect} from 'react-redux';

//React Component
class Counter extends Component{
    render(){
        const {value ,onIncreaseClick} = this.props;
        return(
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        )
    }
}

Counter.propTypes = {
    value:Proptypes.number.isRequired,
    onIncreaseClick:Proptypes.func.isRequired
}

//Action
const increaseAction = {type:'increase'};

//Reducers
function counter(state = {count:0},action){
    const count = state.count;
    switch(action.type){
        case 'increase':
        return { count: count + 1 }
        default:
        return state
    }
}

//Store
const store = createStore(counter);

//Map redux state to component props
function mapStateToProps(state){
    return {
        value:state.count
    }
}

//Map redux actions to component props
function mapDispatchToProps(dispatch){
    return{
        onIncreaseClick:()=>dispatch(increaseAction)
    }
}

//connected component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App/>
</Provider>,
document.getElementById('root')
)