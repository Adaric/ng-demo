var app = angular.module('CTS', ['fundoo.services'])
	.controller('MainCtrl', ['$scope', 'createDialog', function($scope,$http, createDialogService) 
  {
     $scope.url = 'search.php'; // The url of our search
     $scope.easy1= ' Easy ';
    // The function that will be executed on button click (ng-click="search()")
  
		$scope.launchInlineModal = function(x) 
    {
       $scope.keywords=x;
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.post($scope.url, { "data" : $scope.keywords}).
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = "data"; // Show result from server in our <pre></pre> element
            $scope.easy1= data;
        })
        .
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;         
        });
			createDialogService({
              id: 'simpleDialog',
              template:
                '<div class="row-fluid">' +
                ' <h3>Easy</h3>' +
                ' <div>' +
                '   <div class="codebox">' +
                '<pre>' +
                $scope.result+
                '</pre>\n' +
                '   </div>\n' +
                ' </div>\n' +
                '</div>',
              title: 'Question 1',
              backdrop: true,
              success: {label: 'Success', fn: function() {console.log('Inline modal closed');}}
            });
		};

		$scope.launchObjectModal = function() {
			createDialogService({
              id: 'simpleDialog',
              template: angular.element(
                '<div class="row-fluid">' +
                ' <h3>This is how the Simple Modal was launched</h3>' +
                ' <div>' +
                '   <div class="codebox">' +
                '<pre>' +
                'createDialog({\n' +
                '    id: "objectDialog",\n' +
                '    <span style="color:red">template: angular.element("...")</span>\n' +
                '    title: "A Object Modal Dialog",\n' +
                '    backdrop: true,\n' +
                '    success: {\n' +
                '        label: "Yay",\n' +
                '        fn: function(){\n' +
                '            console.log("Object modal closed");\n' +
                '        }\n' +
                '    }\n' +
                '});\n' +
                '</pre>\n' +
                '   </div>\n' +
                ' </div>\n' +
                '</div>'),
              title: 'A Object Modal Dialog',
              backdrop: true,
              success: {label: 'Success', fn: function() {console.log('Object modal closed');}}
            });
		};
		$scope.launchSimpleModal = function() {
			createDialogService('simpleModal.html', {
              id: 'simpleDialog',
              title: 'A Simple Modal Dialog',
              backdrop: true,
              success: {label: 'Success', fn: function() {console.log('Simple modal closed');}}
            });
		};
		$scope.launchComplexModal = function() {
			createDialogService('complexModal.html', {
              id: 'complexDialog',
              title: 'A Complex Modal Dialog',
              backdrop: true,
              controller: 'ComplexModalController',
              success: {label: 'Success', fn: function() {console.log('Complex modal closed');}}
            }, {
        	  myVal: 15,
        	  assetDetails: {
        	  	name: 'My Asset',
        	  	description: 'A Very Nice Asset'
        	  }
        	});
		};
	}])

 

	.factory('SampleFactory', function() {
		return {
			sample: function() {
				console.log('This is a sample');
			}
		};
	})
	.controller('ComplexModalController', ['$scope', 'SampleFactory', 'myVal', 'assetDetails',
		 function($scope, SampleFactory, myVal, assetDetails) {
		 	$scope.myVal = myVal;
		 	$scope.asset = assetDetails;
		 	SampleFactory.sample();
	}]);
