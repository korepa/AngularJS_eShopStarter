app.controller('eShopOrderController', function ($scope, $window, $timeout) {

    $scope.orderItemsTitles = ['Артикул', 'Товар', 'Цена', 'Количество', 'Общая цена', 'Добавить', 'Удалить'];
    $scope.orderItems = JSON.parse($window.localStorage.getItem('order'));
    $scope.orderItemsSum = 0;

    // сумма заказа
    $scope.summ = function () {
        var result = 0;
        if ($scope.orderItems != null && $scope.orderItems.length > 0) {
            for (item of $scope.orderItems) {
                result += item.price * item.count;
            }
        }
        return result;
    };

    // очистка корзины
    $scope.emptyTrash = function () {

        $window.localStorage.removeItem('order');

        $scope.orderItems = [];
        $scope.orderItemsSum = $scope.summ();

        $scope.showMessage('Корзина очищена!', false);
    };

    // показать сообщение
    $scope.showMessage = function (message, isError) {

        $scope.orderStatus = message;
        $scope.errorStatus = isError;
        $timeout(function () {
            $scope.orderStatus = '';
        }, 3000);
    };

    // добавление товара в корзину
    $scope.updateTrash = function (updateFlag, itemIndex, itemName, itemPrice) {

        let orderItem = JSON.parse($window.localStorage.getItem('order'));
        let newItem = { id: itemIndex, name: itemName, price: itemPrice, count: 1 };
        let itemToRemove = null;
        // инициализация
        if (orderItem == null) {
            orderItem = [];
        }
        // флаг модификации 
        var flag = updateFlag == '+' ? 1 : -1;
        // обновим значение
        for (var item of orderItem) {
            if (item.id === itemIndex) {
                item.count += flag;
                if (item.count == 0) {
                    itemToRemove = item;
                }
                break;
            }
        }
        // добавим значение
        if (itemToRemove != null) {
            const index = orderItem.indexOf(itemToRemove);
            orderItem.splice(index, 1);
        }
        $window.localStorage.setItem('order', JSON.stringify(orderItem));
        $scope.orderItems = orderItem;
        $scope.orderItemsSum = $scope.summ();
    }

    // отправка заказа
    $scope.sendOrder = function () {

        let orderItem = JSON.parse($window.localStorage.getItem('order'));
        console.log('sendOrder: ' + orderItem);

        $http({
            method: 'POST',
            url: 'api/Products'
        }).then(
            function success(response) {
                console.log(response);
            },
            function error(response) {
                console.log(response);
            }
        );
    };

    // сумма заказа
    $scope.orderItemsSum = $scope.summ();
});