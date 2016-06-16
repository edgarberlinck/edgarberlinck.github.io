controllers.controller('NovoEditalFromImportController', function ($scope, $window) {
    $scope.title = "Novo Edital";

    if ($scope.edital)
        $scope.projeto = {
            descricao : $scope.edital.titulo + ' - '+$scope.edital.cargo + ' - '+$scope.edital.uf
        }
});
