const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var database = {
    games: [
        {
            id: 1,
            name: 'Minecraft',
            year: 2011
        },
        {
            id: 2,
            name: 'The Witcher 3',
            year: 2015
        },
        {
            id: 3,
            name: 'Call of Duty: Warzone',
            year: 2020
        }
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(database.games);
});

app.get("/game/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        var numericId = parseInt(id);

        var game = database.games.find(g => g.id == numericId);

        if(game != undefined) {
            res.statusCode = 200;
            res.json(game);
        } else {
            res.sendStatus(400);
        }
    }
});

app.post("/game", (req, res) => {
    const {name, year} = req.body;

    if(isNaN(year)) {
        res.sendStatus(400);
    } else {
        var nextId = database.games.length + 1;

        database.games.push({
            id: nextId,
            name: name,
            year: year
        });
    
        res.sendStatus(200);
    }
});

app.put("/game/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        var numericId = parseInt(id);
        var game = database.games.find(g => g.id == numericId);

        if(game != undefined) {
            const {name, year} = req.body;

            if(name != undefined) {
                game.name = name;
            }

            if(year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    }
});

app.delete("/game/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)) {
        res.sendStatus(400);
    } else {
        var numericId = parseInt(id);
        var index = database.games.findIndex(g => g.id == numericId);

        if(index >= 0) {
            database.games.splice(index, 1);
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }
});

app.listen(3000, () => {
    console.log("Api rodando!");
});