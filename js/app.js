
var zoo = angular.module('zooApp',['ngRoute']);
        
        zoo.controller('controllerAnimales',['$scope', function($scope){
            $scope.animales = ['Andres fernandez','Mathias Gil','Pepito perez','Calamar']
            $scope.mostrarAnimales = function(){
                $scope.animales.push($scope.animalextra)
            }
        }]);
        
		zoo.config([ '$routeProvider' , function($routeProvider){
            $routeProvider.
            when('/inicio',{
                templateUrl: 'plantillas/inicio.html',
            }).
            when('/agregar',{
                templateUrl: 'plantillas/form.html',
            }).
            when('/acerca',{
                templateUrl: 'plantillas/acerca.html',
            }).
            otherwise({
                redirectTo: '/',
                templateUrl: 'plantillas/inicio.html',
            })
        }])

zoo.controller('todoSqliteCtrl', ['$scope', 'todoService', function($scope, todoService)
{
 
    todoService.getItems().then(function(items)
    {
        $scope.items = items;
    });
 
    $scope.addItem = function(item)
    {  
        todoService.setItem(item);
        todoService.getItems().then(function(items)
        {
            $scope.items = items;
        });
    }
 
    $scope.removeItem = function(id)
    {
        todoService.removeItem(id);
        todoService.getItems().then(function(items)
        {
            $scope.items = items;
        });
    }
 
    $scope.removeAll = function()
    {
        todoService.removeAll();
        todoService.getItems().then(function(items)
        {
            $scope.items = items;
        });
    }
 
    $scope.populate = function()
    {
        db.transaction(function(tx) 
        {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos(id integer primary key, todo text)');
        });
    }
}]);
 
zoo.service('todoService', function($q) 
{
    this.getItems = function() 
    {
        var deferred, result = [];
        deferred = $q.defer();
        db.transaction(function(tx) 
        {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos(id integer primary key, todo text)');
            tx.executeSql("select * from todos", [], function(tx, res) 
            {
                for(var i = 0; i < res.rows.length; i++)
                {
                    result.push({id : res.rows.item(i).id, todo : res.rows.item(i).todo})
                }
                deferred.resolve(result);
            });
        });
        return deferred.promise;
    },
    this.setItem = function(item) 
    {
        db.transaction(function(tx) 
        {
            tx.executeSql('CREATE TABLE IF NOT EXISTS todos(id integer primary key, todo text)');
            return tx.executeSql("INSERT INTO todos (todo) VALUES (?)", [item], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    },
    this.removeItem = function(id) {
        db.transaction(function(tx) 
        {
            return tx.executeSql("DELETE FROM todos WHERE id = " + id, [], function(tx, res) 
            {
                return true;
            });
        });
        return false;
    },
    this.removeAll = function() 
    {
        db.transaction(function(tx) 
        {
            return tx.executeSql("DROP TABLE todos", [], function(tx, res) {
                return true;
            });
        });
        return false;
    }
});        
        
        
        
var db;
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() 
    {
        db = window.openDatabase('agendaDB', '1.0', 'TodoDB', 200000);
        angular.bootstrap(document, ['app']);
    }
