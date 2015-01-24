/**
 * Placeholder for non-HTML5 browsers ... specifically IE8 and IE9, but also
 * works with Firefox 3 and possibly others.
 *
 * 
 *
 * Quick Usage:
 *
 *     <input ng-model="xyz" placeholder="Enter Value" />
 *
 *     <textarea ng-model="xyz" placeholder="Enter Value"
 *         placeholder-class="placeholder"></textarea>
 *
 * 
 * @link https://github.com/mehtaad/IE-9-Placeholder-Directive-For-AngularJS
 * @license MIT
 */


/*global angular*/
(function () {
    "use strict";
    var propName = 'placeholder';
    var needsShimByNodeName = {};
    var labelId =0;
    

    angular.module("PlaceholderDirective").directive("placeholder", ["$document", function ($document) {
            // Determine if we need to perform the visual shimming if placeholder is not supported
            angular.forEach([ 'INPUT', 'TEXTAREA' ], function (val) {
                needsShimByNodeName[val] = $document[0].createElement(val)[propName] === undefined;
            });
            return {
                require: "ngModel",
                restrict: "A",
                link: function (scope, $element, $attributes, $controller) {
                    var  text= $attributes[propName];//get placeholder text;

                    //if (needsShimByNodeName[$element[0].nodeName]) {
                        // These bound events handle user interaction
                        $element.bind("focus", function () {
                            $element.parent().addClass('placeholder-focus');
                            
                        });
                        $element.bind("blur", function () {
                            $element.parent().removeClass('placeholder-focus');
                            
                        });
                        $element.bind('keyup input', function () {
                            $element.parent().toggleClass('placeholder-changed',$element.val()!=='');
                            
                        });
                        //When directive is initialized model value is not populated so watch input value, needed for hiding initial placeholder when input is already pre populated with model value.   
                        scope.$watch($attributes.ngModel, function (newVal) {
                        var currentValue = newVal || "";
                        $element.parent().toggleClass('placeholder-changed',currentValue!=='');
                        
                        });
                        //initialize placeholder label top position
                        var  topOffset = scope.labelTopOffset?scope.labelTopOffset:'0px';
                        //create an id to be used for label so as to find the element and bind click event
                        labelId++;
                        var idstr = "placeHolder"+labelId;
                        //remove the placeholder text from input/textarea element
                        $element.attr('placeholder','');
                        //create the html string for wrapping the input control
                        var str = '<span class="placeholderWrap"><label id="'+idstr+'" class="placeholderWrap2" style="top:'+topOffset+'">'+text+'</label></span>'; 
                        
                        console.log(str);    
                        //update the dom now, input wrapped in outer span and child label
                        $element.wrap(str);
                        //find the label and bind click event. On click focus the input control
                        angular.element(document.getElementById(idstr)).bind('click', function () {
                            $element[0].focus();
                        });
                        
                            
                        
                        
                    //}
                }
            };
        }
    ]);
}());
