//weight in percentage
var weight = 30;

var age_Calc = function(game_Rating, comp_Rating, age_Map) {

    var map_Array =  age_Map[game_Rating];

    for (var i = 0, len = map_Array.length; i < len; i++) {
        if (comp_Rating === map_Array[i][0]) {
            return map_Array[i][1] * weight;
        }
    }

    return 0;

};

module.exports.age_Calc = age_Calc;
