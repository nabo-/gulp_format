var React = require('react');
var ReactDOM = require('react-dom');
var PropTypes = React.PropTypes;

var InputText = React.createClass({

	PropTypes: {
		text_value: PropTypes.string.isRequired,
		on_submit: PropTypes.func.isRequired
	},

	_onSubmit: function(){
		var text = ReactDOM.findDOMNode(this.refs.text).value.trim();

		if(!text){
			return;
		}
		this.props.on_submit(text);

		ReactDOM.findDOMNode(this.refs.text).value = '';
	},

	render: function() {
		return (
			<div className="inputBar">
				<div className="inputBar__body">
					<input type="text" placeholder="テキストを入力" className="inputBar__input" ref="text" />
				</div>
				<div className="inputBar__right">
					<button onClick={this._onSubmit}>Add</button>
				</div>
			</div>
		);
	}

});

module.exports = InputText;
