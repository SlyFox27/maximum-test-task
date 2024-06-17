const express = require("express");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const url = process.env.MONGODB_URI;
const dbName = "hrTest";

app.use(cors());

let db;

MongoClient.connect(url)
    .then((client) => {
        db = client.db(dbName);
        console.log(`Установлено подключение к базе данных "${dbName}"`);
    })
    .catch((err) => console.error(err));

app.get("/brands", async (req, res) => {
    try {
        const brands = await db
            .collection("stock")
            .aggregate([
                { $group: { _id: "$mark", count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ])
            .toArray();
        res.json(brands);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/models/:brand", async (req, res) => {
    try {
        const models = await db
            .collection("stock")
            .distinct("model", { mark: req.params.brand });
        res.json(models);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/stock", async (req, res) => {
    try {
        const { brand, models = [] } = req.query;
        const query = {};
        if (brand) query.mark = brand;
        if (models.length > 0) query.model = { $in: models.split(",") };

        const stocks = await db.collection("stock").find(query).toArray();

        res.json(stocks);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => {
    console.log(`Сервер работает на порту ${port}`);
});
