var app = angular.module('errormsg', ['PlaceholderDirective']);
angular.module("PlaceholderDirective",[]);

 var ValidSubmit = ['$parse', function ($parse) {
        //return {
            //compile: function compile(tElement, tAttrs, transclude) {
                return {
                    link: function postLink(scope, element, iAttrs, controller) {
						
						scope.errorlist=[];
                        var form = element.controller('form');
                        form.$submitted = false;
                        var fn = $parse(iAttrs.validSubmit);
                        element.on('submit', function(event) {
                            scope.$apply(function() {
                                element.addClass('ng-submitted');
                                form.$submitted = true;
                                if(form.$valid) {
                                    fn(scope, {$event:event});
									scope.errorlist=[];
								}
								
								else {scope.setErrorObject(); }
                            });
                        });
						scope.setErrorObject = function()
						{
							//go through each form element and create error object to be displayed by error display service
							scope.errorlist = [];
							if(form.$submitted && form.firstName.$error.required){
								scope.errorlist.push("First Name: Required, can not be blank"); 
							}
							if(form.$submitted && form.lastName.$error.required){
								scope.errorlist.push("Last Name: Required, can not be blank");
							}
							if(form.$submitted && form.email.$error.required){
								scope.errorlist.push("Email: Required, can not be blank");
							}
							else if(form.$submitted && form.email.$error.email){
								scope.errorlist.push("Email: Invalid email address, please enter valid email address"); 
							}
							
							if(form.$submitted && form.agreedToTerms.$error.required){
								scope.errorlist.push("Agreement To Terms: please check agreed to terms check box");
							}
						}
                        scope.$watch(function() { return form.$valid}, function(isValid) {
							//watch all form elements and update errorlist object and redisplay error message via error services
                            if(form.$submitted == false) return;
                            if(isValid) {
                                element.removeClass('has-error').addClass('has-success');
								scope.errorlist=[];
                            } else {
                                element.removeClass('has-success');
                                element.addClass('has-error');
								scope.setErrorObject();
								
                            }
                        });
                    }
                }
            //}
        //}
    }]
    app.directive('validSubmit', ValidSubmit);
    

app.controller('MainCtrl', function($scope, $rootScope) {
$scope.settop=false;

angular.element(window).on('beforeunload', function(){
                  window.alert("Hello Bye, see you soon");
				  })

  
  
   $scope.setFirstnameError = function()
  {
    if($scope.mainForm.$submitted && !$scope.userCanceledErrorDisplay)
	{
			$scope.setErrorObject();
			
	}
	
	
  };
  
});


