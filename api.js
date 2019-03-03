var friendsData = require("./friends");


module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    app.post("/api/friends", function (req, res) {
        var a = 0;
        var rank = [];
        var indexMatch;

        compareFriends(req, a, rank);
        var min = Math.min.apply(null, rank);
        indexMatch = rank.indexOf(min);
        res.json(friendsData[indexMatch]);
        friendsData.push(req.body);
    });

};

function compareFriends(req, a, rank) {
    friendsData.forEach(function (value, index) {
        a = 0;
        for (i = 0; i < friendsData[index].scores.length; i++) {
            let b = Math.abs(friendsData[index].scores[i] - req.body.scores[i])
            a += b
        }
        rank.push(a);
    });
}