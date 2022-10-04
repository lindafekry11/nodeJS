const express = require('express');
const post = require('body-parser');
const fs = require('fs');

const app = express();
const url = post.json();


var db = [];
let lastID = 0;


/*app.get("/addContact", function (req, res) {
    res.sendFile(__dirname + "/views/add.html")
});
*/


app.post("/submit", url, function (req, res) {
    req.body.id = lastID++;
    updateDB(req.body);
    res.send("<h1>done</h1>")
});


app.get("/allcontacts", function (req, res) {
    let dbReadData = fs.readFileSync('DB.txt', function () {
    });

    if (dbReadData && dbReadData.length > 2)
        res.send(JSON.parse(dbReadData));

    res.send("empty db");
})

app.get("/getcontact", function (req, res) {
    updateDB();

    //    let result = db.filter((element) => { return element.firstname.toLocaleLowerCase() === req.query.name.toLocaleLowerCase() });
    let result = db.filter((element) => { return element.id == req.query.id });
    res.send(result);

})


app.get("/deletecontact", function (req, res) {
    updateDB();
    //    let result = db.find((element) => { return element.firstname.toLocaleLowerCase() === req.query.name.toLocaleLowerCase() });
    let result = db.findIndex((element) => { return element.id == req.query.id });

    db.splice(result, 1);

    if (db)
        fs.writeFile('DB.txt', JSON.stringify(db), function (err) {
            console.log('Saved!');
        });


    res.send("done");
})





function updateDB(data) {
    let dbReadData = fs.readFileSync('DB.txt', function () {
    });

    if (dbReadData && dbReadData.length > 2)
        db = JSON.parse(dbReadData);

        if (data) {
        db.push(data);

        fs.writeFile('DB.txt', JSON.stringify(db), function (err) {
            console.log('Saved!');
        });
    }
}



app.listen(8080);