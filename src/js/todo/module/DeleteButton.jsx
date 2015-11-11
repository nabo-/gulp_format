var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var DeleteButton = React.createClass({

	propTypes: {
		on_delete: PropTypes.func.isRequired
	},

	render: function() {
		return (
			<button onClick={this.props.on_delete}>Delete</button>
		);
	}

});

module.exports = DeleteButton;
