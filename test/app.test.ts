import request from "supertest";
import app from "../src/app";

describe("GET /", () => {
    test("should return 200", (done) => {
        request(app).get("/")
            .then(res => {
                expect(res.status).toBe(200);
                done();
            })
    });
});