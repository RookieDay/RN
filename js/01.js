function Welcome(props){
    return <h1>hello,{props.name}</h1>;
}
console element = <Welcome name="sara"/>;
ReactDOM.reander(
    element,
    document.getElementById('root');
)

// 我们来回顾一下在这个例子中发生了什么：

// 我们对<Welcome name="Sara" />元素调用了ReactDOM.render()方法。
// React将{name: 'Sara'}作为props传入并调用Welcome组件。
// Welcome组件将<h1>Hello, Sara</h1>元素作为结果返回。
// React DOM将DOM更新为<h1>Hello, Sara</h1>。


function formatDate(date){
    return date.toLocaleDateString();
}
function Comment(props){
    return (
        <div className="Comment">
            <div className="UserInfo">
                <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name}/>
                <div className="UserInfo-name">
                    {props.author.name}
                </div>
            </div>
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {formatDate(props.date)}
            </div>
        </div>
    )
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};

ReactDOM.render(
    <Comment
        date={comment.date}
        text={commment.text}
        author={comment.author}
    />,
    document.getElementById('root')
)


// 组件的提取
function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar"
         src={props.user.avatarUrl}
         alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
function CommentRel(props) {
  return (
    <div className="Comment-text">
        {props.text}
      </div>
  );
}
function CommentDate(props) {
  return (
   <div className="Comment-date">
        {formatDate(props.date)}
      </div>
  );
}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <CommentRel text={props.text}/>
      <CommentDate date={props.date}/>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author} />,
  document.getElementById('root')
);

//定时器 了解组件 state
function tick(){
    console eles = (
        <div>
            <h1>hello world</h1>
            <h2>{new Date().toLocaleDateString()}</h2>
        </div>
    )
    ReactDOM.render(
        element,
        document.getElementById('root');
    )
}

setInterval(tick,100);

// 开始封装
function Clock(props){
    return (
        <div>
            <h1>hello world</h1>
            <h2>{props.date.toLocaleDateString()}</h2>
        </div>
    )
}
function tick(){
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById('root')
    )
}

setInterval(tick,100);


// 将函数转换为类
// 你可以通过5个步骤将函数组件 Clock 转换为类

    // 创建一个名称扩展为 React.Component 的ES6 类

    // 创建一个叫做render()的空方法

    // 将函数体移动到 render() 方法中

    // 在 render() 方法中，使用 this.props 替换 props

    // 删除剩余的空函数声明


class Clock extends React.Component{
    render(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}
function tick(){
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById('root')
    )
}

setInterval(tick,100);


// Clock 现在被定义为一个类而不只是一个函数
// 使用类就允许我们使用其它特性，例如局部状态、生命周期钩子



// 为一个类添加局部状态
// 我们会通过3个步骤将 date 从属性移动到状态中：
// 1) 在 render() 方法中使用 this.state.date 替代 this.props.date
class Clock extends React.Component{
    render(){
        return(
            <div>
                <h1>hello word</h1>
                <h2>{this.state.date.toLocaleDateString()}</h2>
            </div>
        )
    }
}
// 2) 添加一个类构造函数来初始化状态 this.state
class Clock extends React.Component{
    constructor(props){
        super(props);  //类组件应始终使用props调用基础构造函数。
        this.state = {date:new Date()};
    }
    render(){
        return(
            <div>
                <h1>hello word</h1>
                <h2>{this.state.date.toLocaleDateString()}</h2>
            </div>
        )
    }
}
// 注意我们如何传递 props 到基础构造函数的：

// 3) 从 <Clock /> 元素移除 date 属性：
ReactDOM.render(
    <Clock/>,
    document.getElementById('root')
)