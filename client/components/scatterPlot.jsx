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
      .attr("class", "label")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("transform", "translate(" + (props.width - props.margins.right - 39) + ", 415)")
      .text("Avg MPH (per tank)");
    svg.append("text")
      .attr("class", "label")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("transform", "translate(10, 0)rotate(-90)")
      .text("MPG (per tank)");
    svg.selectAll("g.y.axis").call(yAxis);
    svg.selectAll("g.x.axis").call(xAxis);

    var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    var dots = svg.selectAll(".dot")
      .data(data.perTank)
      .enter().append("circle")
      .attr("class", function(d) { return "dot " + d.fuelType; })
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.mph); })
      .attr("cy", function(d) { return y(d.mpg); })
      .style("fill", function(d) { return colors(d.fuelType); });

    var mouseOn = function(d) {
  		var dot = d3.select(this);
      var cx = dot[0][0].cx.baseVal.value;
      var cy = dot[0][0].cy.baseVal.value;
  		dot.transition()
  		  .duration(800).style("opacity", 1)
  		  .attr("r", 10).ease("elastic");
      tooltip.transition()
        .duration(500)
        .style("opacity", 1);
      tooltip.html("MPH: " + d.mph + "<br/>MPG: " + (Math.round(d.mpg*10)/10).toFixed(1))
        .style("left", (cx + 50) + "px")
        .style("top", (cy + 70) + "px");
    };

    var mouseOff = function() {
      var dot = d3.select(this);
      dot.transition()
        .duration(800).style("opacity", null)
        .attr("r", 5).ease("elastic");
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    };

    var catClick = function(category) {
      var allCategories = $("rect.category")
      var selectedCategory = d3.select(this);
      var allDots = d3.selectAll(".dot");
      var catDots = d3.selectAll("." + category);

      if(selectedCategory.classed("selected") === true) {
        allDots.attr("class", function(d) { return "dot " + d.fuelType; });
        allCategories.attr("class", "category");
      } else {
        allDots.attr("class", function(d) { return "dot unselected " + d.fuelType; });
        allCategories.attr("class", "category unselected");
        catDots.attr("class", function(d) { return "dot selected " + d.fuelType; });
        selectedCategory.attr("class", "category selected");
      }
    };

    dots.on("mouseover", mouseOn);
    dots.on("mouseout", mouseOff);


    var legend = svg.selectAll(".legend")
      .data(colors.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend.append("rect")
      .attr("class", "category")
      .attr("x", props.width - 60)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", colors)
      .on("click", catClick);

    legend.append("text")
      .attr("x", props.width - 65)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) {
        return d;
      });
  },

  render: function() {
    return (
      <div className='scatter-plot'></div>
    );
  }
});
