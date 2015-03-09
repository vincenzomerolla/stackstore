//weight in percentage
var weight = 10;

var price_Calc = function(game_Price, comp_Price) {

    var price_Variance = game_Price / (Math.abs(game_Price - comp_Price));

    if (price_Variance < .1) {
        return weight
    } else if (price_Variance < .2) {
        return weight * .8
    } else if (price_Variance < .3) {
        return weight * .5
    } else {
        return 0;
    }
};

module.exports.price_Calc = price_Calc;



