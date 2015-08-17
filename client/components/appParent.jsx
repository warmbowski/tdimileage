AppParent = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    return {
      perTank: [
        {
          fuelType: 'USLD',
          mpg: 25,
          mph: 17
        },
        {
          fuelType: 'B99',
          mpg: 35,
          mph: 27
        },
      ]
    };
  },

  render: function() {
    return (
      <section id='scatter-plot'>
        <ScatterPlot data={this.data} />
      </section>
    );
  }
});
