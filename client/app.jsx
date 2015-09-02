Meteor.startup(function () {
  // code to run on client at startup
  React.render(
    <AppParent />,
    document.getElementById('app1-container')
  );

  React.render(
    <ScatterChart width={600} height={300} />,
    document.getElementById('app2-container')
  );
});
