var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var TextItem = require('./TextItem.jsx');
var DeleteButton = require('./DeleteButton.jsx');


var ListItem = React.createClass({

	PropTypes: {
		text: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		delete_list: PropTypes.func.isRequired
	},

	_deleteListItem: function(){
		var id = this.props.id;
		this.props.delete_list(id);
	},

	render: function() {
		return (
			<li className="addList__item">
				<div className="addList__layout">
					<div><TextItem text={this.props.text} /></div>
					<div><DeleteButton on_delete={this._deleteListItem}　/></div>
				</div>
			</li>
		);
	}

});

module.exports = ListItem;
