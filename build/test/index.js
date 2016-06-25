"use strict";
var Express = require('express');
var _1 = require('./../');
var app = Express(), port = 3000, 
// r1 = Express.Router(),
r2 = Express.Router(), options = {
    limit: "500kb",
    encoding: "utf8"
};
app.use(_1.default(options));
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
r2.use("/test", function (req, res, next) {
    console.log("--------test begin-------");
    console.log("req method in test: ", req.method);
    console.log("req body in test: ", req.body, typeof req.body);
    // console.log("req body.test in test: ", req.body.test);
    console.log("--------test end---------");
    res.send("test res.");
});
app.use(r2);
app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});
//# sourceMappingURL=index.js.map