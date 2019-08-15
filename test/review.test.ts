import request from "supertest";
import app from "../src/app";
import ModelValidator from "../src/util/validator";
import { ReviewDTO } from "../src/repository/reviewRepository";

const sample_review_data = {
    Photos: [
        'CmRaAAAAul4OSVMINi-aYI9v8Tw8EFrpx2vaaT_MMg20QS2tz9MRIy3xveuT0redt8e_2HQBIWvay938F4QfObMvB4pbEVLmcpgGSLblEEcNn7Vhpi2s1jWdoMuluqOqQ8Y1xnfqEhBI0RN039008CsANWLbzKwTGhTrIYr7Mx4kWyBBOae38nz6b4VxGA',
        'CmRaAAAAul4OSVMINi-aYI9v8Tw8EFrpx2vaaT_MMg20QS2tz9MRIy3xveuT0redt8e_2HQBIWvay938F4QfObMvB4pbEVLmcpgGSLblEEcNn7Vhpi2s1jWdoMuluqOqQ8Y1xnfqEhBI0RN039008CsANWLbzKwTGhTrIYr7Mx4kWyBBOae38nz6b4VxGA'
    ],
    ReviewContentText: 'This place was good!',
    PlaceRate: 3,
    LocationReferenceID: 'a123123',
    LocationName: 'My home',
    Address: '3 Pemberton Ave',
    GeoLocation: {
        Lat: 45.12,
        Lng: 85.56444
    }
}


describe("review test", () => {

    let token: string = '';
    let reviewData: ReviewDTO[] = [];

    test("prepare - should return 200 with token", (done) => {
        request(app).post("/user/login")
            .send({
                email: 'stoneage95xp@gmail.com',
                password: 'lee2010'
            })
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.success).toBe(true);
                expect(res.body.token).toBeDefined();
                token = res.body.token;
                done();
            })
    });

    test("post a review data - should return 200 with success", (done) => {
        request(app).post('/review')
            .set('Authorization', `Bearer ${token}`)
            .send(sample_review_data)
            .then(res => {
                expect(res.status).toBe(200);
                expect(res.body.status).toBe('success');
                done();
            })
    })

    test("get reviews - should return 200 with review data", (done) => {
        request(app).get('/review?page=0')
            .then(res => {
                expect(res.status).toBe(200);
                res.body.forEach((review: any) => {
                    ModelValidator(review, new ReviewDTO, (err: any) => {
                        expect(err).toBe(null)
                    })
                });
                reviewData = res.body;
                done();
            })
    })

    // test("get photo - should return 200 with picture", (done) => {
    //     const url = `/photo/${reviewData[0].ID}/${reviewData[0].Photos[0]}.png`;
    //     console.log(url);
    //     request(app).get(url)
    //         .then(res => {
    //             expect(res.status).toBe(200);
    //             done();
    //         })
    //     });

    //         request(app).delete(`/review/${reviewData[0].ID}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .then(res => {
    //             expect(res.status).toBe(200);
    //             expect(res.body.status).toBe('success');
    //             done();
    //         })
    // })

    // test("should return 200 with success delete", (done) => {
    //     request(app).delete(`/review/${reviewData[0].ID}`)
    //         .set('Authorization', `Bearer ${token}`)
    //         .then(res => {
    //             expect(res.status).toBe(200);
    //             expect(res.body.status).toBe('success');
    //             done();
    //         })
    // })
});