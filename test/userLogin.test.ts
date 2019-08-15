import request from "supertest";
import app from "../src/app";

enum ERROR {
    SUCCESS = 0,
    EMAIL,
    USER_PASSWORD,
    CREDENTIALS
}

const userData = [
    //true login
    {
        email: 'aaronwoolee95@gmail.com',
        password: 'lee2010'
    },
    //email error
    {
        email: 'aaronwoolee95@gmail',
        password: 'lee2010'
    },
    //user error
    {
        email: 'aaronwoolee95@gmail.com',
        password: '123'
    },
    //credentials error
    {
        email: '',
        password: ''
    }
]


describe("POST /user/login", () => {

    ERROR.SUCCESS
    test("should return 200 with token", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.SUCCESS])
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.success).toBe(true);
                expect(res.body.token).toBeDefined();
                done();
            })
    });

    ERROR.EMAIL
    test("should return 400 with email error", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.EMAIL])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(`Email ${userData[1].email} not found.`);
                done();
            })
    });

    ERROR.USER_PASSWORD
    test("should return 400 with password error", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.USER_PASSWORD])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(`Invalid email or password.`);
                done();
            })
    });

    ERROR.CREDENTIALS
    test("should return 400 with missing credentials error", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.CREDENTIALS])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.message).toBe(`Missing credentials`);
                done();
            })
    });
});