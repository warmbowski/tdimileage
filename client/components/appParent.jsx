AppParent = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData: function() {
    var rawData = GASpreadsheet.find().fetch();
    var tankData = []

    if(rawData[0]) {
      var cellData = rawData[0].cells;

      _.each(cellData, function(val, key) {
        var temp = {};
        if (!(typeof val[4] === 'undefined') && !(typeof val[17] === 'undefined') && !(typeof val[19] === 'undefined')) {
          if(val[4].value === 'ULSD' || val[4].value === 'B99'){
            temp.fuelType = val[4].value;
            temp.mpg = val[17].value;
            temp.mph = val[19].value;
            tankData.push(temp);
          }
        }
      });
    }

    return {
      perTank: tankData
    };
  },

  render: function() {
    return (
      <section id='scatter-plot'>
        <ScatterPlot data={this.data} />
        <hr/>
        <ScatterChart data={this.data} width={640} height={480} />
        <hr/>
      </section>
    );
  }
});
