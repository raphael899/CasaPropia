var myApp = angular.module('rutas', [
  'ui.router',
	'ui.bootstrap'
]);

myApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise("modulos/Proyectos/Proyectos.html");
  $stateProvider
  .state('Proyectos',{
    name: 'Proyectos',
    url: '/Proyectos/Proyectos',
    templateUrl: 'modulos/Proyectos/Proyectos.html'
  })
  .state('Integraciones',{
    name: 'Integraciones',
    url: '/Integraciones/Integraciones',
    templateUrl: 'modulos/Integraciones/Integraciones.html'
  })
  .state('Funciones',{
    name: 'Funciones',
    url: '/Funciones/Funciones',
    templateUrl: 'modulos/Funciones/Funciones.html'
  })
}]);