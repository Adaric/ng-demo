angular.module('plunker', ['ui.bootstrap']);
var ModalDemoCtrl = function ($scope, $modal, $log ,$http) {


	$scope.user = {
        user: 'me',
        password: null,
		answer: null
    };
    $scope.open = function (quest) {

      var modalInstance = $modal.open({
            templateUrl: 'questionbox.html',
            backdrop: 'static',
            windowClass: 'modal',
            controller: function ($scope, $modalInstance, $log, user) {
			$scope.user=user;
			$scope.quest = quest;
	
				 $scope.emptyanswer = true;
    
	//$scope.answer = 'mo';
			//console.log($scope,user.answer);
                $scope.submit = function ()
					{//console.log(answer);

					if(user.answer!=null && user.answer!="")
					{$modalInstance.close(user);
                    $log.log('Submiting user info.');
                    $log.log(quest);
                    $log.log(user);
					
					//pass it 
					
					user.answer=null;
					
                   } 
				   else
				   {
				   this.emptyanswer=false;}
                };
                $scope.cancel = function ()
                 {
                    $modalInstance.dismiss('cancel');
                };
            },
            resolve: {
                user: function () {
                    return $scope.user;
                }

            }
        });

		modalInstance.result.then(function (selectedItem) {
      $scope.answer = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
    };
};



function SearchCtrl($scope, $http) {
    $scope.url = 'search.php'; // The url of our search
    $scope.easy1= ' Click Here ';
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
         $scope.keywords="1";
        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.post($scope.url, { "data" : $scope.keywords}).
        success(function(data, status) {
            $scope.status = status;
            $scope.data = data;
            $scope.result = data; // Show result from server in our <pre></pre> element
            $scope.easy1= data;
        })
        .
        error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };
}
