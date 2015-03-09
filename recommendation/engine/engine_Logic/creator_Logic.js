//weight in percentage
var weight = 10;

var creator_Calc = function(game_Manufacturer, comp_Manufacturer) {
    if (game_Manufacturer === comp_Manufacturer) {
        return weight;
    } else {
        return 0;
    }
};

module.exports.creator_Calc = creator_Calc;
