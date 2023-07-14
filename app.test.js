process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("./app");
let items = require("./fakeDb");
let testItem = {"name":"popsicle", "price": 1.45};

beforeEach(function() {
    items.push(testItem)
});
  
afterEach(function() {
    items.length = 0
});

describe('GET /items', () => {
    test("Gets a list of all items", async function() {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([testItem]);
    });
});

describe('POST /items', () => {
    test("Creates a new item", async function() {
        const resp = await request(app).post(`/items`).send({"name":"chirios", "price": 3.40});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"added":{"name":"chirios", "price": 3.40}});
    });

    test("Responds with 400 if item already exists", async function() {
        const resp = await request(app).post(`/items`).send(testItem);
        expect(resp.statusCode).toBe(400);
    });
});

describe('GET /items/:name', () => {
    test("Gets an item by name", async function() {
        const resp = await request(app).get(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual(testItem);
    });

    test("Responds with 404 if item doesn't exist", async function() {
        const resp = await request(app).get(`/items/idontexist`);
        expect(resp.statusCode).toBe(404);
    });
});

describe('PATCH /items/:name', () => {
    test('Updates item using specifications', async function() {
        const resp = await request(app).patch(`/items/${testItem.name}`).send({"name":"popsicle", "price": 2.00});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"updated": {"name":"popsicle", "price": 2.00}});
    });

    test("Responds with 404 if item doesn't exist", async function() {
        const resp = await request(app).patch(`/items/idontexist`).send({"name":"popsicle", "price": 2.00});
        expect(resp.statusCode).toBe(404);
    });
});

describe('DELETE /items/:name', () => {
    test("Deletes a single item", async function() {
        const resp = await request(app).delete(`/items/${testItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ message: "Deleted" });
    });

    test("Responds with 404 if item doesn't exist", async function() {
        const resp = await request(app).delete(`/items/idontexist`);
        expect(resp.statusCode).toBe(404);
    });
})