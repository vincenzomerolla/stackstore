//weight in percentage
var weight = 10;

var num_players_Calc = function(game_number_of_Players, comp_number_of_Players) {
    if (game_number_of_Players === comp_number_of_Players) {
        return weight;
    } else {
        return 0;
    }
};

module.exports.num_players_Calc = num_players_Calc;
