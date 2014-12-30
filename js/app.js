
var agenda = angular.module('agendaApp',['ngRoute']);
        
        agenda.controller('controllerAnimales',['$scope', function($scope){
            $scope.animales = ['Andres fernandez','Mathias Gil','Pepito perez','Calamar']
            $scope.mostrarAnimales = function(){
                $scope.animales.push($scope.animalextra)
                
            }
        }]);
        
		agenda.config([ '$routeProvider' , function($routeProvider){
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

      
        agenda.controller('todoSqliteCtrl', ['$scope', 'todoService', function($scope, todoService)
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
                    	var sql = "CREATE TABLE IF NOT EXISTS agenda_curso ( "+
                                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                                    "nombre VARCHAR(50), " +
                                    "apellidos VARCHAR(50), " +
                                    "telefono VARCHAR(30), " +
                                    "categoria VARCHAR(30), " +
                                    "foto VARCHAR(200), " + 
                                    "email VARCHAR(30)," +
                                    "peticion VARCHAR(255), "+
                                    "ciudad VARCHAR(50), "+
                                    "direccion VARCHAR(255), "+
                                    "genero VARCHAR(20))";
		
                        tx.executeSql(sql);

                        tx.executeSql("INSERT INTO  AGENDA (id,nombre,apellidos,telefono,categoria,foto,email,peticion,ciudad,direccion,genero) VALUES (1,'José','Pérez','+34566222666','amigo','','paco@paco.com','Hogar','Tunja','calle falsa 123','Hombre')");
                        tx.executeSql("INSERT INTO  AGENDA (id,nombre,apellidos,telefono,categoria,foto,email,peticion,ciudad,direccion,genero) VALUES (2,'Siro','González','+34555434567','familia','','siro@test.com','Finanzas','Duitama','calle falsa 123','Hombre')");
                        tx.executeSql("INSERT INTO  AGENDA (id,nombre,apellidos,telefono,categoria,foto,email,peticion,ciudad,direccion,genero) VALUES (3,'Julio','Rodríguez','+34756222666','trabajo','','julio@test.com','Santidad','Tunja','calle falsa 123','Hombre')");
                                        tx.executeSql('CREATE TABLE IF NOT EXISTS AGENDA(id integer primary key, nombres text, apellidos text, edad int, peticion text)');
                                        tx.executeSql()
                });
            }
        }]);

        app.service('todoService', function($q) 
        {
            this.getItems = function() 
            {
                var deferred, result = [];
                deferred = $q.defer();
                db.transaction(function(tx) 
                {
                    
                    tx.executeSql("select * from AGENDA", [], function(tx, res) 
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
                    tx.executeSql('CREATE TABLE IF NOT EXISTS AGENDA(id integer primary key, nombres text, apellidos text, edad int, peticion text)');
                    return tx.executeSql("INSERT INTO AGENDA(nombres, apellidos, edad, peticion) VALUES (?,?,?,?)", [item], function(tx, res) 
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

        // Creación de DB
        var db;
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() 
            {
                db = window.openDatabase('agendaDB', '1.0', 'agendaDB', 200000);
                angular.bootstrap(document, ['app']);
            }


                                  
                                  

