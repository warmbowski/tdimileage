Meteor.startup(function () {
  // code to run on server at startup
  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.call('spreadsheet/fetch', '0AicrD4kSOriScEpzNXMxakRadVZUTnFjMVBhZXVvV0E', '0', 'R4C1:R275C21', 4)
    },50000);
  });
});
