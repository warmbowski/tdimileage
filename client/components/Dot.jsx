Dot = React.createClass({
  getDefaultProps: function() {
    return {
      r: 5
    }
  },

  render: function() {
    return (
      <circle className={'dot ' + this.props.fuel} fill={this.props.color} cx={this.props.cx} cy={this.props.cy} r={this.props.r}/>
    );
  }
});