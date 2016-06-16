controllers.controller('ImportarEditalCtrl', function ($scope, $rootScope, $window, $http) {
    $scope.title = 'Importar Edital';

    $scope.ufs = [{'id' : 'BR', 'sigla' : 'BR'},
                  {'id' : 'AC', 'sigla' : 'AC'},
                  {'id' : 'AL', 'sigla' : 'AL'},
                  {'id' : 'AP', 'sigla' : 'AP'},
                  {'id' : 'AM', 'sigla' : 'AM'},
                  {'id' : 'BA', 'sigla' : 'BA'},
                  {'id' : 'CE', 'sigla' : 'CE'},
                  {'id' : 'DF', 'sigla' : 'DF'},
                  {'id' : 'ES', 'sigla' : 'ES'},
                  {'id' : 'GO', 'sigla' : 'GO'},
                  {'id' : 'MA', 'sigla' : 'MA'},
                  {'id' : 'MT', 'sigla' : 'MT'},
                  {'id' : 'MS', 'sigla' : 'MS'},
                  {'id' : 'MG', 'sigla' : 'MG'},
                  {'id' : 'PA', 'sigla' : 'PA'},
                  {'id' : 'PB', 'sigla' : 'PB'},
                  {'id' : 'PR', 'sigla' : 'PR'},
                  {'id' : 'PE', 'sigla' : 'PE'},
                  {'id' : 'PI', 'sigla' : 'PI'},
                  {'id' : 'RJ', 'sigla' : 'RJ'},
                  {'id' : 'RN', 'sigla' : 'RN'},
                  {'id' : 'RS', 'sigla' : 'RS'},
                  {'id' : 'RO', 'sigla' : 'RO'},
                  {'id' : 'RR', 'sigla' : 'RR'},
                  {'id' : 'SC', 'sigla' : 'SC'},
                  {'id' : 'SP', 'sigla' : 'SP'},
                  {'id' : 'SE', 'sigla' : 'SE'},
                  {'id' : 'TO', 'sigla' : 'TO'}];
    
    $scope.tipoEditalList = [{'id' : 'CONC', 'value' : 'Concurso'},
                             {'id' : 'VEST', 'value' : 'Vestibular'},
                             {'id' : 'ENEM', 'value' : 'ENEM'},
                             {'id' : 'OAB', 'value' : 'OAB'},
                             {'id' : 'MILT', 'value' : 'Militar'},
                             {'id' : 'IFED', 'value' : 'Institutos Federais'}];

  $scope.editaisList = [];
  $scope.edital = {};
  $scope.waiting = false;

  $scope.buscarEditais = function () {
    var url = "http://cadastro-editaisconcurso.rhcloud.com/BuscaEditaisService";
    $scope.editaisList = [];
    $scope.waiting = true;

  	$http({
        method: "GET",
        url: url,
        params: $scope.edital,
        contentType: 'application/json'
      }).then(function success(result){
        if (result.data.success) {
            $scope.editaisList = result.data.data;
            $scope.waiting = false;
        } else {
            $window.alert("Erro");
            $scope.waiting = false;
        }
      })
  }

  $scope.selecionarEdital = function (edital) {
		var url = "http://cadastro-editaisconcurso.rhcloud.com/ObterEditaisService";
		$http.get(url, {
    		params: {
    			id : edital.id
    		}
    	}).success(function success(result){
            $window.console.log(result);
    		if (result.success) {
    			$rootScope.edital = result.data;
                $window.location = "#/edital/import/new";
    		} else {
    			$window.alert("Erro");
    		}
    	})
    }
});
