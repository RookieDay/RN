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


// 表单
class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleSubmit(event){
        alert('Name Sumitted' + this.state.value);
        event.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
            </form>      
        )
    }
}
ReactDOM.render(
    <NameForm/>,
    document.getElementById('root')
)
// 由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

class FlavorForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:'cocount'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value:event.target.value});
    }
    handleSubmit(event){
        alert('flavor is : ' + this.state.value);
        event.preventDefault();
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Pick your falvor:
                    <select value={this.state.value} onChange={this.handleChange}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>
                        <option value="mango">Mango</option>
                    </select>
                </label>
                <input type="submit" value="submit"/>
            </form>
        )
    }
}
ReactDOM.render(
    <FlavorForm/>,
    document.getElementById('root')
)
// 总之，<input type="text">, <textarea>, 和 <select> 都十分类似 - 他们都通过传入一个value属性来实现对组件的控制。

// 多个输入的解决方法
class Reservation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isGoing:true,
            numerOfGuests:2
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked:target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }
    render(){
        return (
            <form>
                <label>
                    isGoing:
                    <input name="isGoing" type="checkbox" 
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                Numbers of guest:
                <input 
                    name="numberOfGuests"
                    type="number"
                    value={this.state.numberOfGuests}
                    onChange={this.handleInputChange}
                />
                </label>
            </form>
        )
    }
}

ReactDOM.render(
    <Reservation/>,
    document.getElementById('root')
)

// 状态提升
// 使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。
function BoilingVerdict(props){
    if(props.cesius >= 100){
        return <p>ok 开</p>
    } else {
        return <p>no 不开</p>
    }
}

class Calculator  extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {temperature:''};
    }
    handleChange(e){
        this.setState({temperature:e.target.value});
    }
    render(){
        const temperature = this.state.temperature;
        return (
            <fieldset>
                <legend>请输入：</legend>
                <input
                    value={temperature}
                    onChange={this.handleChange}
                />
                <BoilingVerdict cesius={parseFloat(temperature)}/>
            </fieldset>
        )
    }
}

// 添加第二个输入框
// 现在我们有了一个新的需求，在提供摄氏度输入的基础之上，再提供一个华氏温度输入，并且它们能保持同步。
// 我们可以通过从 Calculator 组件中抽离一个 TemperatureInput 组件出来。我们也会给它添加一个值为 c 或 f 的表示温度单位的 scale 属性。

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component{
    render(){
        return (
            <div>
                <TemperatureInput scale="c"/>
                <TemperatureInput scale="f"/>
            </div>
        )
    }
}

// 我们现在有了两个输入框，但是当你在其中一个输入时，另一个并不会更新。这显然是不符合我们的需求的。
// 另外，我们此时也不能从 Calculator 组件中展示 BoilingVerdict 的渲染结果。因为现在表示温度的状态数据只存在于 TemperatureInput 组件当中。

// 首先，我们写两个可以将摄氏度和华氏度互相转换的函数。
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

// 这两个函数只是单纯转换数字。我们还需要另外一个函数，它接受两个参数，第一个接受字符串 temperature 变量，第二个参数则是上面编写的单位转换函数。最后会返回一个字符串。我们会使用它来根据一个输入框的输入计算出另一个输入框的值。

// 我们最后取到输出的小数点后三位，而 temperature 输入不合法的时候，这个函数则会返回空字符串。

function tryComvert(temperature,convert){
    const input = parseFloat(temperature);
    if(Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
// 举两个例子，tryConvert('abc', toCelsius) 会返回空字符串，而 tryConvert('10.22', toFahrenheit) 会返回 '50.396'。

// 状态提升
// 到这一步为止，两个TemperatureInput组件都是在自己的 state 中独立保存数据。
// class TemperatureInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this);
//  这里   this.state = {temperature: ''};
//   }

//   handleChange(e) {
//   这里  this.setState({temperature: e.target.value});
//   }

//   render() {
//   这里  const temperature = this.state.temperature;


// 但是，我们想要的是这两个输入能保持同步。当我们更新摄氏输入（Celsius）时，华氏度（Fahrenheit ）这个框应该能显示转换后的的温度数值，反之亦然。

// 在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。我们会将 TemperatureInput 组件自身保存的 state 移到 Calculator 中。

// 如果 Calculator 组件拥有了提升上来共享的状态数据，那它就会成为两个温度输入组件的“数据源”。它会传递给下面温度输入组件一致的数据。由于两个 TemperatureInput 温度组件的props属性都是来源于共同的父组件 Calculator，它们的数据也会保持同步。


// 完整实现：

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>水会烧开</p>;
  }
  return <p>水不会烧开</p>;
}

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }


    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
        <fieldset>
            <legend>在{scaleNames[scale]}:中输入温度数值</legend>
            <input value={temperature}
                onChange={this.handleChange} />
        </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature) {
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature) {
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

        return (
        <div>
            <TemperatureInput
            scale="c"
            temperature={celsius}
            onTemperatureChange={this.handleCelsiusChange} />
            <TemperatureInput
            scale="f"
            temperature={fahrenheit}
            onTemperatureChange={this.handleFahrenheitChange} />
            <BoilingVerdict
            celsius={parseFloat(celsius)} />
        </div>
        );
    }
}


ReactDOM.render(
  <Calculator/>,
  document.getElementById('root')
)

// 现在，无论你编辑哪一个输入框，Calculator 组件中 this.state.temperature 和 this.state.scale 都会更新。其中之一的输入框得到用户原样输入的值，另一个输入框总是显示基于这个值计算出的结果。

// 让我们梳理下编辑输入框时所发生的一系列活动：

//     React在DOM原生组件<input>上调用指定的onChange函数。在本例中，指的是TemperatureInput组件上的handleChange函数。
//     TemperatureInput组件的handleChange函数会在值发生变化时调用this.props.onTemperatureChange()函数。这些props属性，像onTemperatureChange都是由父组件Calculator提供的。
//     当最开始渲染时，Calculator组件把内部的handleCelsiusChange方法指定给摄氏输入组件TemperatureInput的onTemperatureChange方法，并且把handleFahrenheitChange方法指定给华氏输入组件TemperatureInput的onTemperatureChange。两个Calculator内部的方法都会在相应输入框被编辑时被调用。
//     在这些方法内部，Calculator组件会让React使用编辑输入的新值和当前输入框的温标来调用this.setState()方法来重渲染自身。
//     React会调用Calculator组件的render方法来识别UI界面的样子。基于当前温度和温标，两个输入框的值会被重新计算。温度转换就是在这里被执行的。
//     接着React会使用Calculator指定的新props来分别调用TemperatureInput组件.React也会识别出子组件的UI界面。
//     React DOM 会更新DOM来匹配对应的值。我们编辑的输入框获取新值，而另一个输入框则更新经过转换的温度值。
//一切更新都是经过同样的步骤，因而输入框能保持同步的。


// 组合 vs 继承
// React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。

// 在本节中，我们将围绕几个 React 新手经常使用继承解决的问题，我们将展示如果用组合来解决它们。

function FancyBorder(props){
    return (
        <div className={'fancy border' + props.color}>   
            {props.children}
        </div>
    )
}

function WelcomeDialog(){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for visiting our spacecraft!
            </p>
        </FancyBorder>
    )
}
ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);


// 虽然不太常见，但有时你可能需要在组件中有多个入口，这种情况下你可以使用自己约定的属性而不是 children：
function Contacts(){
    return <div className="Contacts"></div>
}
function Chat(){
    return <div className="Chat"></div>
}
function SplitPane(props){
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>            
        </div>
    )
}
function App(){
    return (
        <SplitPane
            left={<Contacts/>}
            right={<Chat/>}
        />
    )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);


// 特殊实例
// 有时我们认为组件是其他组件的特殊实例。例如，我们会说 WelcomeDialog 是 Dialog 的特殊实例。
// 在 React 中，这也是通过组合来实现的，通过配置属性用较特殊的组件来渲染较通用的组件。
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);


// 组合对于定义为类的组件同样适用：
function FancyBorder(props){
    return (
        <div className={'FancyBorder FancyBorder-'+props.color}>   
            {props.children}
        </div>
    )
}
function Dialog(props){
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    )
}

class SignUpDialog extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login:''};
    }
    handleChange(e){
        this.setState({login:e.target.value});
    }
    handleClick(e){
        alert(`hi welcome:${this.state.login}`);
    }
    render(){
        return(
            <Dialog title="haha this is title" message="how old are u">
                <input value={this.state.login} onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>click me</button>
            </Dialog>
        )
    }
}
ReactDOM.render(
    <SignUpDialog/>,
    document.getElementById('root')
)



// 默认为 True
// 如果你没有给属性传值，它默认为 true。因此下面两个 JSX 是等价的：
//<MyTextBox autocomplete />
//<MyTextBox autocomplete={true} />



// 使用 PropTypes 进行类型检查
// React 也有一些内置的类型检查功能。要检查组件的属性，你需要配置特殊的 propTypes 属性
// import PropTypes from 'prop-types';
// class Greeting extends from React.Component{
//     render(){
//         return (
//             <h1>Hello {this.props.name}</h1>
//         )
//     }
// }
// Greeting.propTypes = {
//     name:PropTypes.string
// }

// 限制单个子代
// 使用 PropTypes.element 你可以指定只传递一个子代

// import PropTypes from 'prop-types';

// class MyComponent extends React.Component {
//   render() {
//     // This must be exactly one element or it will warn.
//     const children = this.props.children;
//     return (
//       <div>
//         {children}
//       </div>
//     );
//   }
// }

// MyComponent.propTypes = {
//   children: PropTypes.element.isRequired
// };

// 属性默认值#
// 你可以通过配置 defaultProps 为 props定义默认值：

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);

// defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。
//ref的讲解http://www.onmpw.com/tm/xwzj/web_154.html
// 为 DOM 元素添加 Ref
// React 支持给任意组件添加特殊属性。ref 属性接受一个回调函数，它在组件被加载或卸载时会立即执行。
// 
// 当给 HTML 元素添加 ref 属性时，ref 回调接收了底层的 DOM 元素作为参数。例如，下面的代码使用 ref 回调来存储 DOM 节点的引用。

class CustomTextInput extends React.Component{
    constructor(props){
        super(props);
        this.focus = this.focus.bind(this);
    }
    focus (){
        this.texInput.focus();
    }
    render(){
        return (
            <div>
                <input
                    type="text"
                    ref={(input) =>{this.texInput = input;}}
                />
                <input
                    type="button"
                    value="Focus now"
                    onClick={this.focus}
                />
            </div>    
        )
    }
}

// 为类组件添加 Ref
// 当 ref 属性用于使用 class 声明的自定义组件时，ref 的回调接收的是已经加载的 React 实例。例如，如果我们想修改 CustomTextInput 组件，实现它在加载后立即点击的效果：

class AutoFocusInput extends React.Component{
    componentDidMount(){
        this.textInput.focus();
    }
    render(){
        return (
            <CustomTextInput
                 ref={(input) =>{this.texInput = input;}}
            />
        )
    }
}

// 你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件：

function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}


// 非受控组件
// 在大多数情况下，我们推荐使用 受控组件 来实现表单。 在受控组件中，表单数据由 React 组件处理。如果让表单数据由 DOM 处理时，替代方案为使用非受控组件。

// 要编写一个非受控组件，而非为每个状态更新编写事件处理程序，你可以 使用 ref 从 DOM 获取表单值。

class NameForm extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        alert('a name was submit: ' + this.input.value);
        event.preventDefault();
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    name:
                    <input type="text" ref={(input) => this.input = input}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}


// 默认值
// 在 React 的生命周期中，表单元素上的 value 属性将会覆盖 DOM 中的值。使用非受控组件时，通常你希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，你可以指定一个 defaultValue 属性而不是 value。

// render() {
//   return (
//     <form onSubmit={this.handleSubmit}>
//       <label>
//         Name:
//         <input
//           defaultValue="Bob"
//           type="text"
//           ref={(input) => this.input = input} />
//       </label>
//       <input type="submit" value="Submit" />
//     </form>
//   );
// }
// 同样，<input type="checkbox"> 和 <input type="radio"> 支持 defaultChecked，<select> 和 <textarea> 支持 defaultValue.


// 避免重复渲染
// React在渲染出的UI内部建立和维护了一个内层的实现方式，它包括了从组件返回的React元素。这种实现方式使得React避免了一些不必要的创建和关联DOM节点，因为这样做可能比直接操作JavaScript对象更慢一些。有时它被称之为“虚拟DOM”，但是它其实和React Native的工作方式是一样的。

// 当一个组件的props或者state改变时，React通过比较新返回的元素和之前渲染的元素来决定是否有必要更新实际的DOM。当他们不相等时，React会更新DOM。

// 在一些情况下，你的组件可以通过重写这个生命周期函数shouldComponentUpdate来提升速度， 它是在重新渲染过程开始前触发的。 这个函数默认返回true，可使React执行更新：

// shouldComponentUpdate(nexrProps,nextState){
//     return true;
// }
// 如果你知道在某些情况下你的组件不需要更新，你可以在shouldComponentUpdate内返回false来跳过整个渲染进程，该进程包括了对该组件和之后的内容调用render()指令。

// 受控和非受控组件的理解
// https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/
// 如何使用 Timeline 工具 https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool


// 如果想让组件只在props.color或者state.count的值变化时重新渲染，你可以像下面这样设定shouldComponentUpdate：
class CounterButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {count:1};
    }
    shouldComponentUpdate(nextProps,nextState){
        if(this.props.color !== nextProps.color){
            return true;
        }
        if(this.state.count !== nextState.count){
            return true;
        }
        return false;
    }
    render(){
        return (
            <button
                color={this.props.color}
                onClick={()=>this.setState(state=>({count:state.count+1}))}
            >
            Count：{this.state.count}
            </button>
        )
    }
}

// 在以上代码中，shouldComponentUpdate只检查props.color和state.count的变化。如果这些值没有变化，组件就不会更新。当你的组件变得更加复杂时，你可以使用类似的模式来做一个“浅比较”，用来比较属性和值以判定是否需要更新组件。这种模式十分常见，因此React提供了一个辅助对象来实现这个逻辑 - 继承自React.PureComponent。以下代码可以更简单的实现相同的操作：

class CountButton extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {count:1}
    }
    render(){
        return (
            <button
                color={this.props.color}
                onClick={()=>this.setState(state=>({count:state.count+1}))}
            >
            count:{this.state.count}

            </button>
        )
    }
}
// 大部分情况下，你可以使用React.PureComponent而不必写你自己的shouldComponentUpdate，它只做一个浅比较。但是由于浅比较会忽略属性或状态突变的情况，此时你不能使用它。

// 不会突变的数据的力量
// 避免此类问题最简单的方式是避免使用值可能会突变的属性或状态。例如，上面例子中的handleClick应该用concat重写成：
// handleClick(){
//     this.setState(prevState =>({
//         words:prevState.words.concat(['marklar'])
//     }));
// }

// handleClick(){
//     this.setState(prevState =>({
//         words:[...prevState.words, 'marklar']
//     }));
// }

//React PureComponent 使用指南 https://wulv.site/2017-05-31/react-purecomponent.html
// 在React.js中使用PureComponent的重要性和使用方式 http://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs-2344.html