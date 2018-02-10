app.controller('eShopProductsController', function ($scope, $http, $window) {
    $http({
        method: 'GET',
        url: 'api/Products'
    }).then(
        function success(response) {
            // инициализация продуктов через WebApi
            $scope.products = angular.fromJson(response.data);
            $scope.productTitles = ['Артикул', 'Товар', 'Цена', 'Заказ товара'];
        },
        function error(response) {
            console.log(response);
        }
    );

    // добавление товара в корзину
    $scope.addToTrash = function (itemIndex, itemName, itemPrice) {
        console.log("id : " + itemIndex);
        let orderItem = JSON.parse($window.localStorage.getItem('order'));
        let newItem = { id: itemIndex, name: itemName, price: itemPrice, count: 1 };
        let existed = false;
        // инициализация
        if (orderItem == null) {
            orderItem = [];
        }
        // обновим значение
        for (var item of orderItem) {
            if (item.id === itemIndex) {
                item.count += 1;
                existed = true;
                break;
            }
        }
        // добавим значение
        if (existed == false) {
            orderItem.push(newItem);
        }
        $window.localStorage.setItem('order', JSON.stringify(orderItem));
    }
});