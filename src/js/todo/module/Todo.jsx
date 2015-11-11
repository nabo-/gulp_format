var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var InputText = require('./InputText.jsx');
var List = require('./List.jsx');


var Todo = React.createClass({

	getInitialState: function(){
		return {
			dataList: [],
			idNum: 0
		};
	},

	_deleteListItem: function(id){
		this.setState({
			dataList: this.state.dataList.filter(function(list){
				return list.id !== id;
			})
		});
	},

	_onSubmit: function(textValue){
		var data = this.state.dataList;
		var num = this.state.idNum;

		data.push({
			id: num,
			text: textValue
		});

		// id をインクリメントしてセット
		this.setState({
			dataList: data,
			idNum: num + 1
		});
	},

	render: function() {
		return (
			<div>
			<InputText on_submit={this._onSubmit}/>
			<List data_list={this.state.dataList} delete_list_item={this._deleteListItem}/>
			</div>
		);
	}

});

module.exports = Todo;
