const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const request = require("supertest");
require('dotenv').config();

const {User} = require("../models/user");
const app = require('../app');
const {DB_HOST_TEST} = process.env;

describe("test /users/login route", ()=> {
    let server = null;
    beforeAll( async() => {
      server = app.listen(3000);
      await mongoose.connect(DB_HOST_TEST);
    });

    test('test login route with correct data', async () => {
        const newUser = {
            email: "nandin@gmail.com", 
            password: await bcrypt.hash("23898765", 10),
        };

        const user = await User.create(newUser);

        const loginUser = {
            email: "nandin@gmail.com",
            password: '23898765',
        };
     
        const res = await request(app).post("/users/login").send(loginUser);
        expect(res.statusCode).toBe(200);
        const {body} = res;
        const {token} = await User.findById(user._id);
        expect(body.token).toBe(token);
    });

    afterEach( async() => {
      await User.deleteMany({});
    });

    afterAll( async() => {
        server.close();
        await mongoose.connection.close();
    });
});
