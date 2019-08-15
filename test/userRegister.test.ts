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
        email: 'aaronwoolee95@gmail.com',
        password: '123',
        name: 'wooseok',
        address: '3 Pemberton Ave'
    },
    //LESS
    {
        email: '123@123.com',
        password: 'lee2010',
    },
    //WRONG
    {
        email: '123@123.com',
        password: 'lee2010',
        name: 'weoqoe',
        test: '123'
    },
    //OVER
    {
        email: 'aaronwoolee95@gmail.com',
        password: '123',
        name: 'wooseok',
        address: '3 Pemberton Ave',
        test: '123'
    },
    //credentials error
    {
        email: '',
        password: '',
        name: '',
        address: '',
    }
]

describe("POST /user/register", () => {
    ERROR.USED
    test("should return 400 with used email error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.USED])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('email already used');
                done();
            })
    });

    ERROR.LESS
    test("should return 400 with less field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.LESS])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('model fields is out of range');
                done();
            })
    });

    ERROR.WRONG
    test("should return 400 with wrong field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.WRONG])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('test is not belong to register model');
                done();
            })
    });

    ERROR.OVER
    test("should return 400 with wrong field error", (done) => {
        request(app).post("/user/register")
            .send(registerData[ERROR.OVER])
            .then(res => {
                expect(res.status).toBe(400);
                expect(res.body.error).toBe('model fields is out of range');
                done();
            })
    });

    ERROR.CREDENTIAL
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