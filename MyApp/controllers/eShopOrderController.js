app.controller('eShopOrderController', function ($scope, $window) {

    $scope.orderItemsTitles = ['Артикул', 'Товар', 'Цена', 'Количество', 'Общая цена', '+', '-'];
    $scope.orderItems = JSON.parse($window.localStorage.getItem('order'));

    $scope.summ = function () {
        var result = 0;
        for (item of $scope.orderItems) {
            result += item.price * item.count;
        }
        return result;
    };

    $scope.emptyTrash = function () {
        $window.localStorage.removeItem('order');
        $scope.orderItems = null;
    };

    // добавление товара в корзину
    $scope.updateTrash = function (updateFlag, itemIndex, itemName, itemPrice) {
        console.log("updateFlag : " + updateFlag);
        console.log("id : " + itemIndex);
        return;

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