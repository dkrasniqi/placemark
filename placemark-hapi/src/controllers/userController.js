export const userController ={
  index: {
    handler: function(request, h){
      return h.view("welcome", {title: "Welcome to the test page of placemark"});
    },
  },

} 