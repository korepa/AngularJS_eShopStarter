app.controller('eShopOrdersController', function ($scope, $http) {
    $http({
        method: 'GET',
        url: 'api/Orders'
    }).then(
    function success(response) {

        $scope.orderTitles = ['Заказ', 'Дата', 'Клиент', 'Комментарий', 'Детали заказа'];
        // инициализация заказов через WebApi
        $scope.orders = angular.fromJson(response.data);
        for (let order of $scope.orders) {
            order.details = '';
            for (let orderLine of order.OrderLines) {
                let delimiter = (order.details == '' ? '' : ', ');
                order.details += delimiter +
                    orderLine.Product.title + ' (цена: ' +
                    orderLine.price + ', количество: ' +
                    orderLine.quantity + ')';
            }
        }
    },
        function error(response) {
            console.log(response);
    });
});