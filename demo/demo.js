// https://discountry.github.io/react/docs/thinking-in-react.html
// 在这里你会看到，我们的简单应用中有5个组件。我们把每个组件展示的数据用斜体表示。
//     FilterableProductTable (橙色): 包含了整个例子
//     SearchBar (蓝色): 接受所有的用户输入
//     ProductTable (绿色): 根据用户输入过滤并展示数据集合
//     ProductCategoryRow (绿松石色): 展示每个分类的标题
//     ProductRow (红色): 用行来展示每个产品
class ProductCategoryRow extends React.Component{
    render(){
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
}
class ProductRow extends React.Component{
    render(){
        var name = this.props.product.stocked ?
                this.props.product.name :
                <span style={{color:'red'}}>
                    {this.props.product.name}
                </span>;
        return (
            <tr>    
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}
class ProductTable extends React.Component{
    render(){
        var rows = [];
        var lastCategory = null;
        // 这里特别注意this的指向
        this.props.products.forEach((product) =>{
            if(product.name.indexOf(this.props.filterText) === -1 ||(!product.stocked
            && this.props.inStockOnly)){
                return;
            }
            if(product.category !== lastCategory){
                rows.push(<ProductCategoryRow category={product.category}
                    key={product.category}
                />)
            }   
            rows.push(<ProductRow product={product}
                key={product.name}
            />)
            lastCategory = product.category;
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }
    handleFilterTextInputChange(e){
        this.props.onFilterTextInput(e.target.value);
    }
    handleInStockInputChange(e){
        this.props.onInstockInput(e.target.checked);
    }
    render(){
        return (
            <form>
                <input type="text" placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
                <p>
                    <input type="checkbox" 
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockInputChange}
                    />
                    {' '} only show producs in stock
                </p>
            </form>
        )
    }
}

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText:'',
            isStockOnly:false
        }
        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }
    handleFilterTextInput(filterText){
        this.setState({
            filterText:filterText
        })
    }
    handleInStockInput(inStockOnly){
        this.setState({
            inStockOnly:inStockOnly
        })
    }
    render(){
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInstockInput={this.handleInStockInput}
                />
                <ProductTable 
                products={this.props.products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);