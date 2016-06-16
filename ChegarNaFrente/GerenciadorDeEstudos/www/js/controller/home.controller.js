controllers.controller("HomeCtrl", function($scope, $window) {
    $scope.title = "Projetos";
    $scope.viewSearchBox = false;
    $scope.optionsVisible = false;
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.projetosList = [{id : 1, descricao : "Projeto 1", dataInicio : new Date("01/01/2016"), dataFim : new Date("02/01/2016")},
                           {id : 2, descricao : "Projeto 2", dataInicio : new Date("02/02/2016"), dataFim : new Date("03/01/2016")},
                           {id : 3, descricao : "Projeto 3", dataInicio : new Date("03/02/2016"), dataFim : new Date("04/01/2016")},
                           {id : 4, descricao : "Projeto 4", dataInicio : new Date("04/02/2016"), dataFim : new Date("05/01/2016")},
                           {id : 5, descricao : "Projeto 5", dataInicio : new Date("05/02/2016"), dataFim : new Date("06/01/2016")},
                           {id : 6, descricao : "Projeto 6", dataInicio : new Date("06/02/2016"), dataFim : new Date("07/01/2016")},
                           {id : 7, descricao : "Projeto 7", dataInicio : new Date("07/02/2016"), dataFim : new Date("08/01/2016")},
                           {id : 8, descricao : "Projeto 8", dataInicio : new Date("08/02/2016"), dataFim : new Date("09/01/2016")},
                           {id : 9, descricao : "Projeto 9", dataInicio : new Date("09/02/2016"), dataFim : new Date("10/01/2016")}];
    
    $scope.totalPages = Math.ceil($scope.projetosList.length / $scope.pageSize);
    
    $scope.first = function () {
        $scope.currentPage = 0;
    }
        
    $scope.prior = function () {
        if ($scope.currentPage > 0)
            $scope.currentPage--;
    }
    
    $scope.next = function () {
        if ($scope.currentPage < $scope.totalPages-1)
            $scope.currentPage++;
    }
    
    $scope.last = function () {
        scope.currentPage = $scope.totalPages;
    }
    
    $scope.showHideSearchBox = function () {
        $scope.viewSearchBox = !$scope.viewSearchBox;  
    }
    
    $scope.showOptions = function () {
        $scope.optionsVisible = !$scope.optionsVisible;
        $(".hB").tooltip(true);
    }
        
    $scope.editProjeto = function (projeto) {
        $window.console.log(projeto);
    }
    
    $scope.novoProjeto = function () {
        $window.location = "#/edital/new";
    }
    
    $scope.importarEdital = function () {
        $window.location = "#/edital/import";   
    }
});