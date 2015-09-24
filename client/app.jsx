Meteor.startup(function () {
  // code to run on client at startup
  React.render(
    <AppParent />,
    document.getElementById('app1-container')
  );
});
