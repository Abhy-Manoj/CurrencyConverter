class HomeCtrl {
    constructor($scope, $http) {
      'ngInject';
  
      $scope.enteredAmount = 100;
      $scope.amount = null;
      $scope.fromCurrency = 'INR';
      $scope.toCurrency = 'USD';
      $scope.exchangeRates = null;
      $scope.currencies = [];
  
      $http
        .get('https://open.er-api.com/v6/latest')
        .then(function (response) {
          if (response.data.rates) {
            $scope.exchangeRates = response.data.rates;
            $scope.currencies = Object.keys(response.data.rates);
          }
        })
        .catch(function (error) {
          console.error('Error fetching exchange rates:', error);
        });
  
      $scope.convertCurrency = function () {
        if ($scope.exchangeRates) {
          var fromRate = $scope.exchangeRates[$scope.fromCurrency];
          var toRate = $scope.exchangeRates[$scope.toCurrency];
  
          if (fromRate !== undefined && toRate !== undefined) {
            $scope.amount = $scope.enteredAmount;
            $scope.toCurr = $scope.toCurrency;
            $scope.frmCurr = $scope.fromCurrency;
            $scope.convertedAmount = ($scope.amount / fromRate) * toRate;
          } else {
            console.error('Invalid currency codes or rates.');
          }
        }
      };
    }
}
  
export default HomeCtrl;  