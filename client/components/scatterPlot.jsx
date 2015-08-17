ScatterPlot = React.createClass({

  componentDidMount: function() {
		var el = this.getDOMNode();
		var svg = d3.select(el)
		  .append("svg")
			.attr("width", this.props.width)
			.attr("height", this.props.height)
      .append("g")
      .attr("transform", "translate(" + this.props.margins.left + "," + this.props.margins.top + ")");

		this.updateChart(this.props);
	},

  componentWillUpdate: function(nextProps) {
		this.updateChart(nextProps);
	},

	getDefaultProps: function() {
		return {
		  width: 640,
		  height: 480,
      margins: {
        "left": 40,
        "right": 30,
        "top": 30,
        "bottom": 30
      }
		}
	},

  updateChart: function(props) {
    var data = props.data;
    var svg = d3.select("svg > g");
    var colors = d3.scale.category10();
    var x = d3.scale.linear()
      // .domain(d3.extent(data.perTank, function(item) {
      //   return item.mph;
      // }))
      .domain([10, 60])
      .range([0, props.width - props.margins.left - props.margins.right]);
    var y = d3.scale.linear()
      // .domain(d3.extent(data.perTank, function (item) {
      //   return item.mpg;
      // }))
      .domain([20, 40])
      .range([props.height - props.margins.top - props.margins.bottom, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);

    svg.append("g").attr("class", "x axis")
      .attr("transform", "translate(0," + y.range()[0] + ")");
    svg.append("g").attr("class", "y axis");
    svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("x", props.width / 2)
      .attr("y", props.height - props.margins.bottom - 5)
      .text("Avg MPH (per tank)");
    svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("transform", "translate(-25," + (props.height / 2) + ")rotate(-90)" )
      // .attr("x", props.margins.left + 5)
      // .attr("y", props.height / 2)

      .text("MPG (per tank)");
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);

    var fuels = svg.selectAll("g.node").data(data.perTank, function(item) {
        return item.fuelType;
    });
    var fuelsGroup = fuels.enter().append("g").attr("class", "node")
      .attr('transform', function(item) {
        return "translate(" + x(item.mph) + "," + y(item.mpg) + ")";
      });
    fuelsGroup.append("circle")
      .attr("r", 5)
      .attr("class", "dot")
      .style("fill", function(item) {
          return colors(item.fuelType);
      });
  },

  render: function() {
    return (
      <div className='scatter-plot'></div>
    );
  }
});
