import * as Path from 'path';
import * as Request from 'supertest';
import * as Express from 'express';
import * as Mocha from 'mocha';
import Parser, { ParserOptions } from './../';

let app = Express(),
    port = 3000,
    // r1 = Express.Router(),
    r2 = Express.Router(),
    options: ParserOptions = {
        limit: "500kb",
        encoding: "utf8"
    };

app.use(Parser(options));
// r1.post("/test", Parser.parser());
// describe('GET /user', function() {
//     it('respond with json', function(done) {
//         let router = new Router(app, {
//                 path: Path.join(__dirname, 'routes')
//             });
        
//         return Request(app)
//             .get('/user')
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200, done);
//     });
// });

r2.use("/test", (req, res, next) => {
    console.log("--------test begin-------");
    console.log("req method in test: ", req.method);
    console.log("req body in test: ", req.body, typeof req.body);
    // console.log("req body.test in test: ", req.body.test);
    console.log("--------test end---------");
    res.send("test res.");
});

app.use(r2);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});