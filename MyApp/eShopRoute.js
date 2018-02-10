app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'myapp/views/main.html',
            controller: 'eShopController'
        })
        .when('/main', {
            templateUrl: 'myapp/views/main.html',
            controller: 'eShopController'
        })
        .when('/products', {
            templateUrl: 'myapp/views/products.html',
            controller: 'eShopProductsController'
        })
        .when('/order', {
            templateUrl: 'myapp/views/order.html',
            controller: 'eShopOrderController'
        })
        .when('/orders', {
            templateUrl: 'myapp/views/orders.html',
            controller: 'eShopOrdersController'
        })
        .otherwise({
            template: '<h2>Страница не найдена!</h2>'
        })
});