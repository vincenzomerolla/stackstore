//numbers represent percent of total allowable points received
var age_Map = {
    "M (Mature 17+)":[["M (Mature 17+)" , 1],["T (Teen 13+)",.5],["E10+=Everyone 10+",.1]],
    "E (Everyone)":[["E (Everyone)", 1],["E=Everyone" , 1],["E10+ (Everyone 10+)",.5],["E10+=Everyone 10+",.5]],
    "RP (Rating Pending)":[["RP (Rating Pending)", 0]],
    null:[[null , 0]],
    "E10+ (Everyone 10+)":[["E10+ (Everyone 10+)",1 ],["T (Teen 13+)",.8],["E10+=Everyone 10+",1],["E (Everyone)",.5],["E=Everyone",.5]],
    "T (Teen 13+)":[["T (Teen 13+)",1],["M (Mature 17+)",.8],["E10+ (Everyone 10+)",.2],["E10+=Everyone 10+",1]],
    "E10+=Everyone 10+":[["E10+=Everyone 10+",1],["E10+ (Everyone 10+)",1 ],["T (Teen 13+)",.8],["E (Everyone)",.5],["E=Everyone",.5]],
    "E=Everyone":[["E=Everyone",1],["E (Everyone)", 1],["E10+ (Everyone 10+)",.5],["E10+=Everyone 10+",.5]],
    "RP=Rating Pending":[["RP=Rating Pending",0]]
};

module.exports.age_Map = age_Map;
