var React = require('react');
var PropTypes = React.PropTypes;

var TextItem = React.createClass({

	propTypes: {
		text: PropTypes.string.isRequired
	},
	
	render: function() {
		return (
			<p>{this.props.text}</p>
		);
	}
});

module.exports = TextItem;
