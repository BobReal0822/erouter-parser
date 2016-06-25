import * as Path from 'path';
import * as Request from 'supertest';
import * as Express from 'express';
import * as Mocha from 'mocha';
import Parserfrom from './../';

let app = Express();

app.get('/user', function(req: Express.Request, res: Express.Response) {
    res.status(200).json({ name: 'tobi' });
});

