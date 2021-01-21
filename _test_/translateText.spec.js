const supertest = require('supertest');
const app = require('../server');
var connection = require('../connect');

const request = supertest(app);

describe("Testing the API", () => {

    it("tests the base route and returns true for status", async(done) => {

        const response = await request.get('/')
        expect(response.status).toBe(200)
        done()

    });

    // Testing the POST /movies endpoint
    it("tests the post translate endpoint and returns as success message", async(done) => {

        const response = await request.post('/translate').send({
            "sourceLanguage": "kannada",
            "targetLanguage": "German",
            "message": "Live life to the fullest"

        });

        expect(response.status).toBe(200);
        // expect(response.body.status).toBe('success');
        // expect(response.body.message).toBe('Language Translated Successfully.');
        done()
    });



    // afterAll(async(done) => {
    //     // Closing the DB connection allows Jest to exit successfully.
    //     try {
    //         //await mongoose.connection.close();
    //         connection.end();
    //         //server.close();
    //         done()
    //     } catch (error) {
    //         console.log(error);
    //         done()
    //     }
    //     // done()
    // })

});


// describe("Testing the movies API", () => {
//     it("tests our testing framework if it works", () => {
//         expect(2).toBe(2);
//     });
// });