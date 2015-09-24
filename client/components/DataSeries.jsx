DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: 'My Chart',
      data: [],
      width: 640,
      height: 480,
      margins: {
        left: 40,
        right: 30,
        top: 30,
        bottom: 30
      }
    }
  },

  render: function() {
    var props = this.props;
    var colors = d3.scale.category10();
    var vOffset = this.props.height - this.props.margins.top - this.props.margins.bottom;
    var hOffset = this.props.width - this.props.margins.left - this.props.margins.right;
    var transData = 'translate(' + this.props.margins.left + ', ' + this.props.margins.top + ')';
    var transXAxis = 'translate(0, ' + vOffset + ')';
    var transYAxis = 'translate(' + hOffset + ' 0)';
    var xPath = 'M 0,6 V0 H' + hOffset + ' V 6';
    var yPath = 'M-6,0 H0 V' + vOffset + ' H-6';

    var xScale = d3.scale.linear()
      // .domain(d3.extent(data.perTank, function(item) {
      //   return item.mph;
      // }))
      .domain([10, 60])
      .range([0, this.props.width - this.props.margins.left - this.props.margins.right]);

    var yScale = d3.scale.linear()
      // .domain(d3.extent(data.perTank, function (item) {
      //   return item.mpg;
      // }))
      .domain([20, 40])
      .range([this.props.height - this.props.margins.top - this.props.margins.bottom, 0]);

    var xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(yScale).orient("left").tickPadding(2);

    var dots = _.map(this.props.data.perTank, function(point, i) {
      return (
        <Dot cy={yScale(point.mpg)} cx={xScale(point.mph)} color={colors(point.fuelType)} fuel={point.fuelType} key={i} />
      )
    });

    return (
      <g transform={transData}>
        <g id='dots'>
          {dots}
        </g>
        <g id='axes'>
          <Axes className='x axis' scale={xScale(1)} path={xPath} transform={transXAxis} />
          <Axes className='y axis' scale={yScale(1)} path={yPath} />
        </g>
      </g>
    );
  }
});