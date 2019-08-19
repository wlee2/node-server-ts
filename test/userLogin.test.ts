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
        Email: 'aaron@wooseok.lee',
        Password: 'lee2010'
    },
    //email error
    {
        Email: 'aaron@wooseok',
        Password: 'lee2010'
    },
    //user error
    {
        Email: 'aaron@wooseok.lee',
        Password: '123'
    },
    //credentials error
    {
        Email: '',
        Password: ''
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
                expect(res.body.error).toBe(`Email ${userData[1].Email} not found.`);
                done();
            })
    });

    ERROR.USER_PASSWORD
    test("should return 400 with password error", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.USER_PASSWORD])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe(`Invalid email or password.`);
                done();
            })
    });

    ERROR.CREDENTIALS
    test("should return 400 with missing credentials error", (done) => {
        request(app).post("/user/login")
            .send(userData[ERROR.CREDENTIALS])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe(`Missing credentials`);
                done();
            })
    });
});