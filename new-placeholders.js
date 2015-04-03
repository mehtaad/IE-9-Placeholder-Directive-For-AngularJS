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
    

    angular.module("PlaceholderDirective").directive("placeholder", ["$document",'$interval','$timeout',function ($document, $interval,$timeout) {
            // Determine if we need to perform the visual shimming if placeholder is not supported
            angular.forEach([ 'INPUT', 'TEXTAREA' ], function (val) {
                needsShimByNodeName[val] = true;//$document[0].createElement(val)[propName] === undefined;
            });
            return {
                require: "ngModel",
                restrict: "A",
                link: function ($scope, element, $attributes, ctrl) {


                    $interval(function () {
                        if (element.val() === '') {
                            element.val(element.attr('placeholder')).addClass('placeholder');
                            element.attr('data-placeholder-type', element.attr('type'));
                            element.attr('type', 'text');
                        }
                        var oldmodelval = ctrl.$modelValue;
                        element.bind("focus",function () {

                            if (element.val() === element.attr('placeholder')) {
                                element.val('').removeClass('placeholder');
                                if (element.attr('data-placeholder-type')) {
                                    element.attr('type', element.attr('data-placeholder-type'));
                                }
                            }

                        });
                        element.bind("blur", function () {
                            if (element.val() === '') {
                                oldmodelval = ctrl.$modelValue;
                                $timeout(function() {
                                    element.val(element.attr('placeholder')).addClass('placeholder');
                                    element.attr('data-placeholder-type', element.attr('type'));
                                    element.attr('type', 'text');
                                    ctrl.$modelValue = oldmodelval;
                                });
                            }



                        });
                    }, 0, 1);


                    //}
                }
            };
        }
    ]);
}());
