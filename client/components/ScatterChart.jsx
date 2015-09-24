ScatterChart = React.createClass({
  getDefaultProps: function() {
    return {data: {}};
    },

  render: function() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries
          data={this.props.data}
          width={this.props.width}
          height={this.props.height}
          margins={this.props.margins}
          color="cornflowerblue"
        />
      </Chart>
    );
  }
});
