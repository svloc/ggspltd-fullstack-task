const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 8080
const db = require('./api/models');
const Role = db.role;
const dbConfig = require('./api/config/db.config');
const corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Grow Global Strategies Private Limited API" });
});
app.use(
    cookieSession({
        name: "bezkoder-session",
        secret: "COOKIE_SECRET", // should use as secret environment variable
        httpOnly: true
    })
);


require("./api/routes/auth.routes")(app);
require("./api/routes/user.routes")(app);
async function connectToMongoDB() {
    try {
        await db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to MongoDB.");
        initial();
    } catch (err) {
        console.error("Connection error", err);
        process.exit(1);
    }
}

async function initial() {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count === 0) {
            await Role.create({ name: 'user' });
            await Role.create({ name: 'admin' });
            console.log("Added user and admin to roles collection");
        }
    } catch (err) {
        console.log("Error", err);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectToMongoDB();

