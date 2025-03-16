import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { AppServer } from "../server";
import userSchema from "../db/user.model";
import Category from "../db/category.model";
import { hashPassword } from "../helpers/bcrypt";
import { loginToken } from "../helpers/util";

let mongoServer: any;
let authToken: any;
let userId: any;
let categoryId: any;

const server = new AppServer();

describe("AuthController Tests", () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    test("should register a user", async () => {
        const res = await request(server.app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "Test1234!"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("User registered successfully");
    });

    test("should login a user", async () => {
        const res = await request(server.app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "Test1234!"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty("token");
        authToken = res.body.data.token;
    });

    test("should not login with incorrect password", async () => {
        const res = await request(server.app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "WrongPassword"
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Invalid password");
    });
});

describe("CategoryController Tests", () => {
    beforeAll(async () => {
        const hashedPassword = await hashPassword("Test1234!");
        const user = await userSchema.create({ email: "test@example.com", password: hashedPassword });
        userId = user._id;
        authToken = loginToken({ user_id: userId.toString(), email: user.email });
    });

    test("should create a category", async () => {
        const res = await request(server.app)
            .post("/api/category")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name: "Electronics" });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Category created successfully");
        categoryId = res.body.data._id;
    });

    test("should fetch categories", async () => {
        const res = await request(server.app)
            .get("/api/category")
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test("should update a category", async () => {
        const res = await request(server.app)
            .put(`/api/category/${categoryId}`)
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name: "Home Appliances" });
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Category updated successfully");
    });

    test("should delete a category", async () => {
        const res = await request(server.app)
            .delete(`/api/category/${categoryId}`)
            .set("Authorization", `Bearer ${authToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Category deleted successfully");
    });
});
