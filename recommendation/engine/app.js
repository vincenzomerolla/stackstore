//mapping files
var platform_Mapping = require('./mapping_Table/system_Mapping.js');
var platform_Norm = platform_Mapping.platform_Norm;
var age_Mapping = require('./mapping_Table/age_Mapping.js');
var age_Map = age_Mapping.age_Map;
var desc_Mapping = require('./mapping_Table/description_Mapping.js');
var desc_Map = desc_Mapping.desc_Map;

//logic files
var price_Logic = require('./engine_Logic/price_Logic.js');
var age_Logic = require('./engine_Logic/age_Logic.js');
var creator_Logic = require('./engine_Logic/creator_Logic.js');
var num_players_Logic = require('./engine_Logic/num_players_Logic.js');
var description_Logic = require('./engine_Logic/description_Logic.js');

var recommend = function(products){

    var reco_Object = {};

    //loop through all games
    for (var i = 0, len = products.length; i < len; i++) {



        var game_Id = products[i]._id,
            game_Title = products[i].title,
            game_Desc = products[i].description,
            game_Price = products[i].price,
            game_Inventory = products[i].inventory,
            game_Manufacturer = products[i].manufacturer,
            game_Platform = products[i].platform,
            game_number_of_Players = +products[i].numberOfPlayers,
            game_Rating = products[i].esrbRating;


        //store top 3 comps per game
        var game_top_three_Array = [];

        //results of all comps scores
        var all_comp_Scores = [];

        for (var x = 0, len = products.length; x < len; x++) {

            var comp_Id = products[x]._id,
                comp_Title = products[x].title,
                comp_Desc = products[x].description,
                comp_Price = products[x].price,
                comp_Inventory = products[x].inventory,
                comp_Manufacturer = products[x].manufacturer,
                comp_Platform = products[x].platform,
                comp_number_of_Players = +products[x].numberOfPlayers,
                comp_Rating = products[x].esrbRating;

            //id of each game and relative score
            var single_comp_Score = [comp_Id];
            var comp_Score = 0;

            //Do not evaluate same game, games with no inventory, or games on non-compatible systems
            if (game_Title !== comp_Title && comp_Inventory > 0 && platform_Norm[game_Platform].indexOf(comp_Platform) !== -1) {

                //Recommendation Logic (Price, num_Players, Age, Creator)
                comp_Score += price_Logic.price_Calc(game_Price, comp_Price);
                comp_Score += num_players_Logic.num_players_Calc(game_number_of_Players, comp_number_of_Players);
                comp_Score += age_Logic.age_Calc(game_Rating, comp_Rating, age_Map);
                comp_Score += creator_Logic.creator_Calc(game_Manufacturer, comp_Manufacturer);

                //ADD DESC FUNCTIONALITY TODAY
                comp_Score += description_Logic.desc_Calc(game_Desc, comp_Desc);

            }

            //add score to individual comp array
            single_comp_Score.push(comp_Score);
            single_comp_Score.push(comp_Title);
            single_comp_Score.push(comp_Price);

            //add comp/score to all scores array
            all_comp_Scores.push(single_comp_Score);
        }

        //sort all comps in descending order by on comp_Score
        all_comp_Scores.sort(function(a, b) {return b[1] - a[1]});

        //add top 3 matches to game array
        for (var w = 0; w < 4; w++){
            var push_Array = []
            for (var r = 0; r < 4; r++){
                push_Array.push(all_comp_Scores[w][r])
            }
            game_top_three_Array.push(push_Array);
        }
        
        //push original game, plus top 3 comps to final array
        reco_Object[game_Id] = game_top_three_Array

    }

    return reco_Object;
};

module.exports.recommend = recommend;
