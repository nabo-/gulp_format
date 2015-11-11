var React = require('react');

var Todo  = React.createClass({

	PropTypes: {
		todo: React.PropTypes.shape({
			id: React.PropTypes.number.isRequired,
			text: React.PropTypes.string.isRequired
		}),

		onDelete: React.PropTypes.func.isRequired
	},

	_onDelete: function(){
		this.props.onDelete(this.props.todo.id);
	},

	render: function() {
		return (
			<div>
			<span>{this.props.todo.text}</span>
			<button onClick={this._onDelete}>delete</button>
			</div>
		);
	}

});

module.exports = Todo;
