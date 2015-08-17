Meteor.startup(function () {
  // code to run on server at startup
  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Meteor.call('spreadsheet/fetch', '0AicrD4kSOriScEpzNXMxakRadVZUTnFjMVBhZXVvV0E', 'od6', 'R5C1:R275C21', 5)
    },50000);
  });
});
