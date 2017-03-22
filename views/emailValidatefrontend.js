var source = $("#signup-template").html(); 
var template = Handlebars.compile(source);
var email = $(#email).val() 



Handlebars.registerHelper('emailCheck', function(email) {
  if (validator.isEmail(email)){
    return email
  }
});

$('body').append(template(email));




