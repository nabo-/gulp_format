var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;
var ListItem = require('./ListItem.jsx');


var List = React.createClass({

	PropTypes: {
		data_list: PropTypes.shape({
			id: PropTypes.number.isRequired,
			text: PropTypes.string.isRequired
		}),
		delete_list_item: PropTypes.func.isRequired
	},

	_deleteListItem: function(id){
		this.props.delete_list_item(id);
	},

	render: function() {
		var _this = this;

		var lists = this.props.data_list.map(function(list, index){
			return (
				<ListItem text={list.text} delete_list={_this._deleteListItem} id={list.id} key={list.id}/>
			);
		});

		var ulbox;

		if(lists.length > 0){
			ulbox = (
				<ul className="addList">
					{lists}
				</ul>
			);
		}else{
			ulbox = ('');
		}

		return (
			<div>
				{ulbox}
			</div>
		);
	}

});

module.exports = List;
