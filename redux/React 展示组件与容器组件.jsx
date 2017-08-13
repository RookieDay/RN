// [参考](https://www.qcloud.com/community/article/578631001489391631)
// 我们将使用一个 clock 组件。 它接受一个Date对象作为prop，并显示实时变化的时间。

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {time:this.props.time};
        this._update = this._updateTime.bind(this);
    }
    componentDidMount(){
        this._interval = setInterval(this._update,1000);
    }
    componentWillUnmout(){
        clearInterval(this._interval);
    }
    _formatTime(time){
        var [hours, minutes, seconds] = [
            time.getHours(),
            time.getMinutes(),
            time.getSeconds()
        ].map(num => num < 10 ?'0' + num : num);
        return {hours, minutes, seconds}
    }
    _updateTime(){
        this.setState({time:new Date(this.state.time.getTime() + 1000)})
    }
    render(){
        var time = this._formatTime(this.state.time);
        return (
            <h1>
                {time.hours} : {time.minutes} : {time.seconds}
            </h1>
        )
    }
}

ReactDOM.render(
    <Clock time={new Date()}/>,
    document.getElementById('root')
)

// 在组件的构造函数中，我们将传递的time对象存储到内部状态。 通过使用setInterval，我们每秒更新状态，组件被重新渲染。 为了使它看起来像一个真正的时钟，我们使用两个辅助方法 —— _formatTime和_updateTime。_formatTime方法是提取小时，分钟和秒，并确保他们遵循两位数格式。_updateTime以一秒为度量来改变当前的time对象。


// 展示组件
// 展示组件是与展示的东西样子相关的。 他们有着让页面变得漂亮所需的额外的修饰。这样的组件不绑定任何东西，并且没有依赖性。 通常被实现为无状态功能组件(stateless functional components)，也就是说它们没有内部状态。
export default function Clock(props){
    var [hours,minutes,seconds] = [
        props.hours,
        props.minutes,
        props.seconds
    ].map(num => num < 10 ? '0' + num : num);
    return <h1>{ hours } : { minutes } : { seconds }</h1>;
}


// 容器
// 容器知道数据，知道数据的形态以及数据从何而来。 他们知道事务如何运作的细节或者说所谓的业务逻辑。 它们接收信息并对其进行格式化，以便由展示组件简单地使用。 通常我们使用高阶组件(higher-order components)来创建容器。 它们的render方法仅包含展示组件。 在flux架构(flux architecture)的上下文中，这是绑定了stores的变化和调用action的创建者的。
// ClockContainer.jsx
import Clock from './Clock.jsx'
export default class ClockContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = { time: props.time };
        this._update = this._updateTime.bind(this);
    }
    render() {
        return <Clock { ...this._extract(this.state.time) }/>;
    }
    componentDidMount() {
        this._interval = setInterval(this._update, 1000);
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    _extract(time) {
        return {
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
        };
    }
    _updateTime() {
        this.setState({ time: new Date(this.state.time.getTime() + 1000) });
    }
}
