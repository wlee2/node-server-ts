import request from "supertest";
import app from "../src/app";


enum ERROR {
    USED = 0,
    LESS,
    WRONG,
    OVER,
    CREDENTIAL
}

const registerData = [
    //USED
    {
        Email: 'aaronwoolee95@gmail.com',
        Password: '123123',
        Name: 'wooseok',
        Address: '3 Pemberton Ave'
    },
    //LESS
    {
        Email: '123@123.com',
        Password: '123123',
    },
    //WRONG
    {
        Email: '123@123.com',
        Test: '123123',
        Name: 'weoqoe',
        Who: '123'
    },
    //OVER
    {
        Email: 'aaronwoolee95@gmail.com',
        Password: '123',
        Name: 'wooseok',
        Address: '3 Pemberton Ave',
        Test: '123'
    },
    //credentials error
    {
        Email: '',
        Password: '',
        Name: '',
        Address: '',
    }
]

describe("POST /user/register", () => {
    // ERROR.USED
    test("should return 400 with used email error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.USED])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('email already used');
                done();
            })
    });

    // ERROR.LESS
    test("should return 400 with less field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.LESS])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('model fields is out of range');
                done();
            })
    });

    // ERROR.WRONG
    test("should return 400 with wrong field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.WRONG])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('Test is not belong to register model');
                done();
            })
    });

    // ERROR.OVER
    test("should return 400 with wrong field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.OVER])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('model fields is out of range');
                done();
            })
    });

    // ERROR.CREDENTIAL
    test("should return 400 with wrong field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.CREDENTIAL])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('model has empty data');
                done();
            })
    });
});