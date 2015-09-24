Axes = React.createClass({
  getDefaultProps: function() {
    return {
      scale: [1, 1],
      xMin: 0,
      xMax: 100, 
      yMin: 0,
      yMax: 100,
      tickSpread: 5
    }
  },

  render: function() {
    return (
      <g className='x axis' transform={this.props.transform}>
        <path className='domian' d={this.props.path} />
      </g>
    );
  }
});