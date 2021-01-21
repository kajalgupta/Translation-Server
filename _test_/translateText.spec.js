const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);

describe("Testing the API", () => {

    it("tests the base route and returns true for status", async(done) => {

        const response = await request.get('/')
        expect(response.status).toBe(200)
        done()

    });

    // Testing the POST /translate endpoint
    it("tests the post translate endpoint and returns as success message", async(done) => {

        const response = await request.post('/translate').send({
            "sourceLanguage": "kannada",
            "targetLanguage": "German",
            "message": "Live life to the fullest"

        });

        expect(response.status).toBe(200);
        done()
    });

});