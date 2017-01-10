var myApp = angular.module('myApp',['angularUtils.directives.dirPagination']);

		
	/* This controller manipulates the Peoples */
	myApp.controller('Person', ['$scope','$http'	,  function($scope, $http) {

		/* 	this method Attributed to a scope get in the api all results of person
			Description:
			This method get in the api and returns all persons.
		*/

		$scope.person = $http.get('http://localhost:3000/people').then(function(response){
			$scope.person = response.data;
		}).catch(function(err){
            console.log(err);
		});
		
		/*
			This method Attributed to a scope post new people
			Description:
			This method Receives as parameter an array of person and is sent by "POST" to the api.

		*/

		$scope.SendData = function (people) {
			var data = {
		        "person" : {
		            "name": people.name,
		            "age": people.age,	
		            "gender": people.gender,
		            "lonlat": people.lonlat,
		            "infected": people.infected
		        }		        				 
		    };
		    $http({
		        method: 'POST',
		        url: 'http://localhost:3000/people',
		        headers: {'Content-Type': 'application/json'},
		        data: data
		    }).then(function(response) {
		        location.reload();
		    }).catch(function(err){
				console.log(err)
		    });
        };


        /*

        	This method Attributed to a scope post inventory
        	Description:
        	This method takes the data from the form and sends by post to controller inventories of the api

        */


        $scope.inventoryPost = function (inventory) {
			var data = {
		        "inventory" : {		        	
		        	"person_id":inventory.person_id,
		            "water": inventory.water,
		            "food": inventory.food,
		            "medication": inventory.medication,
		            "ammunition": inventory.ammunition,
		        }		        				 
		    };
		    $http({
		        method: 'POST',
		        url: 'http://localhost:3000/inventories',
		        headers: {'Content-Type': 'application/json'},
		        data: data
		    }).then(function(response) {
		        location.reload();
		    }).catch(function(err){
				console.log(err)
		    });
        };



        /*

        	This method Attributed to a scope put infection 
        	Description:
        	This method receives the id of the person and is sent by put to the api to update the infection

        */

        $scope.UpdateData = function (id) {
            var data = {
		        "person" : {
		            "id": id,
		            "infected": true
		        }
		    };
		    var urlMount  = 'http://localhost:3000/people/' + id ;
            $http({
		        method: 'PUT',
		        url: urlMount,
		        headers: {'Content-Type': 'application/json'},
		        data: data
            }).then(function(response) {
		        location.reload();	
		    }).catch(function(err){
				console.log(err)
		    });
        };

        /*

        	This method Attributed to a scope put localizaton 
        	Description:
        	This method receives the id and localization of the person and is sent by put to the api to update the localization

        */

        $scope.UpdateLonlat = function (people) {
	       	var data = {
		        "person" : {
		            "id": people.id,
		            "lonlat": people.lonlat
		        }
		    };
	        var urlMount  = 'http://localhost:3000/people/' + people.id;
	        $http({
			        method: 'PUT',
			        url: urlMount,
			        headers: {'Content-Type': 'application/json'},
			        data: data
	            }).then(function(response) {
			        location.reload();	
			    }).catch(function(err){
					console.log(err)
			});
        };

         /*

        	This method Attributed to a scope post trade 
        	Description:
        	This method takes the data from the form and sends by post to controller trade of the api

        */

        $scope.Trade = function (trade) {
			var data = {
		        "trade" : {
		            "person_id": trade.person_id,	
		            "water": trade.water,
		            "food": trade.food,
		            "medication": trade.medication,
		            "ammunition": trade.ammunition,
		            "person_id2": trade.person_id2,	
		            "water2": trade.water2,
		            "food2": trade.food2,
		            "medication2": trade.medication2,
		            "ammunition2": trade.ammunition2,
		        }
		    };
		    $http({
		        method: 'POST',
		        url: 'http://localhost:3000/trade',
		        headers: {'Content-Type': 'application/json'},
		        data: data
		    }).then(function(response) {
		    	//location.reload(); 
		        console.log(data)
		    }).catch(function(err){
				console.log(err)
		    });
        };


        

    }]);




	// This controller manipulates the reports
	myApp.controller('Report', ['$scope','$http',  function($scope, $http) {

		/*
		this method attributed to a scope get in the api the number of infected person
		Description:
		This method get in the api and returns the percentage of infected
		*/
		$scope.infecteds = $http.get('http://localhost:3000/reports/infected_count').then(function(response){
			$scope.infecteds  	= response.data;
		}).catch(function(err){
		    console.log(err);
		});

		/*
		this method attributed to a scope get in the api the number of no infected person
		Description:
		This method get in the api and returns the percentage of non-infected
		*/

		$scope.nonInfecteds = $http.get('http://localhost:3000/reports/non_infected_count').then(function(response){
			$scope.nonInfecteds   = response.data;
		}).catch(function(err){
		    console.log(err);
		});

		/*
		this method attributed to a scope get in the api the number of person points in inventory and all points inventory
		Description:
		This method get in the api and returns the average amount of each kind of resource by survivor
		*/
		$scope.people_inventory = $http.get('http://localhost:3000/reports/people_inventory').then(function(response){
			$scope.people_inventory = response.data;
		}).catch(function(err){
		    console.log(err);
		});

		/*
		this method attributed to a scope get in the api the number of points lost because infection
		Description:
		This method get in the api and returns the Points lost because of infected survivor.
		*/
		$scope.infecteds_points = $http.get('http://localhost:3000/reports/infecteds_people_inventory').then(function(response){
			$scope.infecteds_points = response.data;
		}).catch(function(err){
		    console.log(err);
		});
	}]);
