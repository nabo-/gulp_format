var React = require('react');
var ReactDOM = require('react-dom');
var request = require('superagent');

var Test = require('./module/Test.jsx');

var TodoList = React.createClass({

	getInitialState: function(){
		return {
			todos: [
				{id: 1, text: 'hogehoge1'},
				{id: 2, text: 'hogehogehoge2'},
				{id: 3, text: 'hogehogehogehoge3'}
			]
		};
	},

	deleteTodo: function(id){
		this.setState({
			todos: this.state.todos.filter(function(todo){
				return todo.id !== id;
			})
		});
	},

	render: function(){

		var _this = this;

		var todos = this.state.todos.map(function(nyan){
			return (
				<li key={nyan.id}>
					<Test onDelete={_this.deleteTodo} todo={nyan} />
				</li>
			);
		});

		return (
			<ul>
				{todos}
			</ul>
		);
	}
});


ReactDOM.render(
	<TodoList />,
	document.getElementById('content')
	);
