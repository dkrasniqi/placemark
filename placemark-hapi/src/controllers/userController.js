export const userController ={
  index: {
    handler: function(request, h){
      return h.view("welcome", {title: "Welcome to the test page of placemark"});
    },
  },

  loginView: {
    handler: function(request, h){
      return h.view("login", {title: "Please log into your account"});
    },
  },

  signupView: {
    handler: function(request, h){
      return h.view("signup", {title: "Please create an account"});
    },
  },

} 