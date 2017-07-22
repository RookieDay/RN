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


// 将生命周期方法添加到类中
// 在具有许多组件的应用程序中，在销毁时释放组件所占用的资源非常重要。
// 每当Clock组件第一次加载到DOM中的时候，我们都想生成定时器，这在React中被称为挂载
// 同样，每当Clock生成的这个DOM被移除的时候，我们也会想要清除定时器，这在React中被称为卸载。

// 注意我们如何在 this 中保存定时器ID。
// 虽然 this.props 由React本身设置以及this.state 具有特殊的含义，但如果需要存储不用于视觉输出的东西，则可以手动向类中添加其他字段。
// 如果你不在 render() 中使用某些东西，它就不应该在状态中。

// 最后，我们实现了每秒钟执行的 tick() 方法。
// 它将使用 this.setState() 来更新组件局部状态：
class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state = {date:new Date()};
    }
    componentDidMount(){
        this.timerID = setInterval(()=>this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({
            date:new Date()
        });
    }
    render(){
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        )
    }
}
ReactDOM.render(
    <Clock/>,
    document.getElementsByClassName('root')
)

// 现在时钟每秒钟都会执行。

// 让我们快速回顾一下发生了什么以及调用方法的顺序：

// 1) 当 <Clock /> 被传递给 ReactDOM.render() 时，React 调用 Clock 组件的构造函数。 由于 Clock 需要显示当前时间，所以使用包含当前时间的对象来初始化 this.state 。 我们稍后会更新此状态。
// 2) React 然后调用 Clock 组件的 render() 方法。这是 React 了解屏幕上应该显示什么内容，然后 React 更新 DOM 以匹配 Clock 的渲染输出。
// 3) 当 Clock 的输出插入到 DOM 中时，React 调用 componentDidMount() 生命周期钩子。 在其中，Clock 组件要求浏览器设置一个定时器，每秒钟调用一次 tick()。
// 4) 浏览器每秒钟调用 tick() 方法。 在其中，Clock 组件通过使用包含当前时间的对象调用 setState() 来调度UI更新。 通过调用 setState() ，React 知道状态已经改变，并再次调用 render() 方法来确定屏幕上应当显示什么。 这一次，render() 方法中的 this.state.date 将不同，所以渲染输出将包含更新的时间，并相应地更新DOM。
// 5) 一旦Clock组件被从DOM中移除，React会调用componentWillUnmount()这个钩子函数，定时器也就会被清除。


// 正确地使用状态
// 关于 setState() 这里有三件事情需要知道

// 不要直接更新状态
// 例如，此代码不会重新渲染组件：
// Wrong
this.state.comment = 'Hello';
// 应当使用 setState():
// Correct
this.setState({comment: 'Hello'});
// 构造函数是唯一能够初始化 this.state 的地方。



// 状态更新可能是异步的
// React 可以将多个setState() 调用合并成一个调用来提高性能。

// 因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。

// 例如，此代码可能无法更新计数器：

// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
// 要修复它，请使用第二种形式的 setState() 来接受一个函数而不是一个对象。 该函数将接收先前的状态作为第一个参数，将需要更新的值作为第二个参数：

// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
// 上方代码使用了箭头函数，但它也适用于常规函数：

// Correct
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});


// 状态更新合并
// 当你调用 setState() 时，React 将你提供的对象合并到当前状态。

// 例如，你的状态可能包含一些独立的变量：

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
// 你可以调用 setState() 独立地更新它们：

  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
// 这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。


// 数据自顶向下流动
// 父组件或子组件都不能知道某个组件是有状态还是无状态，并且它们不应该关心某组件是被定义为一个函数还是一个类。

// 这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

// 组件可以选择将其状态作为属性传递给其子组件：

<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// 这也适用于用户定义的组件：

<FormattedDate date={this.state.date} />
// FormattedDate 组件将在其属性中接收到 date 值，并且不知道它是来自 Clock 状态、还是来自 Clock 的属性、亦或手工输入：

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

// 这通常被称为自顶向下或单向数据流。 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

// 如果你想象一个组件树作为属性的瀑布，每个组件的状态就像一个额外的水源，它连接在一个任意点，但也流下来。

// 为了表明所有组件都是真正隔离的，我们可以创建一个 App 组件，它渲染三个Clock：

function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// 每个 Clock 建立自己的定时器并且独立更新。

// 在 React 应用程序中，组件是有状态还是无状态被认为是可能随时间而变化的组件的实现细节。 可以在有状态组件中使用无状态组件，反之亦然。


// 事件处理
// React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

// React事件绑定属性的命名采用驼峰式写法，而不是小写。
// 如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)

// 例如，传统的 HTML：

<button onclick="activateLasers()">
  Activate Lasers
</button>
// React 中稍稍有点不同：

<button onClick={activateLasers}>
  Activate Lasers
</button>


// 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。例如，传统的 HTML 中阻止链接默认打开一个新页面，你可以这样写：

<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
// 在 React，应该这样来写：

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
// 在这里，e 是一个合成事件。React 根据 W3C spec 来定义这些合成事件，所以你不需要担心跨浏览器的兼容性问题。查看 SyntheticEvent 参考指南来了解更多。
// 使用 React 的时候通常你不需要使用 addEventListener 为一个已创建的 DOM 元素添加监听器。你仅仅需要在这个元素初始渲染的时候提供一个监听器。


class Toggle extends React.Component{
    constructor(props){
        super(props);
        this.state = {isToggleOn:true};
        
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(prevState=>({
            isToggleOn:!prevState.isToggleOn
        }))
    }
    render(){
        return (
            <button onClick={thi.handleClick}>
                {this.state.isToggleOn ?'ON':'OFF'};
            </button>
        )
    }
}
ReactDOM.render(
    <Toggle/>,
    document.getElementById('root')
)

// 你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。
// 这并不是 React 的特殊行为；它是函数如何在 JavaScript 中运行的一部分。通常情况下，如果你没有在方法后面添加 () ，例如 onClick={this.handleClick}，你应该为这个方法绑定 this.

// 性能问题 文末 https://discountry.github.io/react/docs/handling-events.html
// 解决this问题
// 1. 构造函数绑定函数this
this.handleClick = this.handleClick.bind(this);
// 2.属性初始化器方法
handleClick = ()=>{
    console.log('this:--' , this);
}
// 3.回调函数里面的箭头函数
<button onClick={(e) =>this.handleClick(e)}></button>

// 属性初始化器语法
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  // Warning: this is *experimental* syntax.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}


// 回调函数中使用 箭头函数：
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}

// 使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题。

// 条件渲染
function UserGreeting(props){
    return <h1>welcome back</h1>
}
function GuestGreeting(props){
    return <h1>greeting</h1>
}
function Greeting(props){
    const isLogin = props.isLogin;
    if(isLogin) {
        return <UserGreeting/>;
    } 
    return <GuestGreeting/>
}
ReactDOM.render(
    <Greeting isLogin={true}/>,
    document.getElementById('root')
)
// 根据 isLoggedIn 的值渲染将不同的问候语。


// 元素变量
// 你可以使用变量来储存元素。它可以帮助你有条件的渲染组件的一部分，而输出的其他部分不会更改。

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}


class LoginControl extends React.Component{
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLogin:false};
    }
    handleLoginClick(){
        this.setState({isLogin:true});
    }
    handleLogoutClick(){
        this.setState({isLogin:false});
    }
    render(){
        const isLogedIn = this.state.isLogin;
        let button = null;
        if(isLogedIn){
            button = <LogoutButton onClick={this.handleLogoutClick}/>
        } else {
            button = <LoginButton onClick={this.handleLoginClick}/>
        }
        return (
            <div>
                <Greeting isLogedIn={isLogedIn}/>
                {button}
            </div>
        )
    }
}

// 与运算符 &&
function MailBox(props){
    const unreadMeassage = props.unreadMeassage;
    return (
        <div>   
            <h1>hello</h1>
            {unreadMeassage.length > 0 &&
            <h2>you have {unreadMeassage.length} unread message</h2>
            }
        </div>
    )
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
    <MailBox unreadMeassage={message}/>,
    document.getElementById('root')
)


// 阻止组件渲染
// 在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。
function WarningBanner(props){
    if(!props.warn){
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    )
}

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {showWarning:true};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(prevState=>({
            showWarning:!prevState.showWarning
        }))
    }
    render(){
        return (
            <div>   
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleClick}>
                    {this.state.showWarning?'hide':'show'}
                </button>
            </div>
        )
    }
}

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
)
// 组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

const numbers = [1,2,3,4];
const listNumbers = number.map((number)=>
    <li>{number}</li>
);
ReactDOM.render(
    <ul>{listNumbers}</ul>,
    document.getElementById('root')
)
// 这段代码生成了一个1到5的数字列表

// 基础列表组件
function NumberList(props){
    const numbers = props.numbers;
    const listNumbers = numbers.map((number)=>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <ul>{listNumbers}</ul>
    )
}
const number = [1,23,45,4];
ReactDOM.render(
    <NumberList numbers={number}/>,
    document.getElementById('root')
)

// 当我们运行这段代码，将会看到一个警告a key should be provided for list items,意思是当你创建一个元素时，必须包括一个特殊的key属性。

// key的正确使用方式
function listItem(props){
    return <li>{props.value}</li>
}
function NumberList(props){
    const numbers = props.numbers;
    const listItems = numbers.map((number)=>{
        <listItem key={number.toString()} value={number}/>
    })
    return(
        <ul>
            {listItems}
        </ul>
    )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root')
)
// 当你在map()方法内部调用的元素时，你最好随时记得为每一个元素加上一个独一无二的key。


元素的key在他的兄弟元素之间应该唯一
// 数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键
function Blog(props){
    const slidebar = (
        <ul>
            {props.posts.map((post)=>
                <li key={post.id}>
                    {post.title}   
                </li> 
            )}
        </ul>
    )
    const content = props.posts.map((post) =>
        <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        </div>
    );
    return (
        <div>   
            {slidebar}
            <hr/>
            {content}
        </div>
    )
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);

// key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递：
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
// 上面例子中，Post组件可以读出props.id，但是不能读出props.key