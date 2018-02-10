app.controller('eShopOrdersController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'api/Orders'
    }).then(
    function success(response) {
        // инициализация заказов через WebApi
        $scope.orders = angular.fromJson(response.data);
        $scope.orderTitles = ['№', 'Дата', 'Клиент', 'Комментарий'];
    },
        function error(response) {
            console.log(response);
    });
});