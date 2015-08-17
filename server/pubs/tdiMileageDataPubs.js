Meteor.publish("allData", function(){
  return TdiMileageData.find();
});

TdiMileageData.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
