"use strict";
var express_1 = require("express");
var Bytes = require("bytes");
var HttpErrors = require("http-errors");
var DefaultParserOptions = {
    charset: "utf8",
    limit: ""
};
var ErouterParser = (function () {
    function ErouterParser(options) {
        var _this = this;
        this.options = {};
        Object.keys(DefaultParserOptions).forEach(function (key) {
            var value = options && options[key];
            console.log("options key & value: ", key, value);
            _this.options[key] = key && value ? options[key] : DefaultParserOptions[key];
        });
        console.log("in constructor options = ", this.options);
    }
    ErouterParser.prototype.bindReq = function (req) {
        this.req = req;
        return this;
    };
    ErouterParser.prototype.bindNext = function (next) {
        this.next = next;
        return this;
    };
    ErouterParser.parserBody = function (req, next, options) {
        var parser = new ErouterParser(options).bindReq(req).bindNext(next);
        if (req.body) {
        }
        parser.onReqAborted()
            .onReqClose()
            .onReqData()
            .onReqEnd()
            .onReqError();
    };
    ErouterParser.parser = function (options) {
        var _this = this;
        var router = express_1.Router();
        router.use(function (req, res, next) {
            _this.parserBody(req, next, options);
            next();
        });
        return router;
    };
    ErouterParser.prototype.onReqAborted = function () {
        this.req.on("aborted", this.handleReqAborted.bind(this));
        return this;
    };
    ErouterParser.prototype.onReqData = function () {
        this.req.on("data", this.handleReqData.bind(this));
        return this;
    };
    ErouterParser.prototype.onReqEnd = function () {
        this.req.on("end", this.handleReqEnd.bind(this));
        return this;
    };
    ErouterParser.prototype.onReqError = function () {
        this.req.on("error", this.handleReqError.bind(this));
        return this;
    };
    ErouterParser.prototype.onReqClose = function () {
        this.req.on("close", this.handleReqClose.bind(this));
        return this;
    };
    ErouterParser.prototype.handleReqAborted = function () {
        console.log("-----req on aborted: ", arguments);
        this.next(HttpErrors("request aborted, ErouterParser options is: " + this.options));
    };
    ErouterParser.prototype.handleReqData = function (chunk) {
        var reqData = chunk.toString(this.options.charset);
        console.log("-----req on data: ", reqData);
        console.log("-----chunk length: ", chunk && chunk.length);
        if (chunk.length > Bytes.parse(this.options.limit)) {
            this.next(HttpErrors("Chunk[" + chunk.length + "] is too large, length is limited: ", {
                limit: this.options.limit
            }));
        }
        try {
            console.log("in try");
            this.req.body = JSON.parse(reqData) || {};
        }
        catch (error) {
            console.log("in catch: ", error);
            this.req.body = reqData || {};
        }
    };
    ErouterParser.prototype.handleReqEnd = function () {
        console.log("-----req on end: ", arguments);
    };
    ErouterParser.prototype.handleReqError = function (error) {
        console.log("-----req on error: ", arguments);
        this.onReqClose();
        this.next("request error: " + error + ", ErouterParser options: " + this.options);
    };
    ErouterParser.prototype.handleReqClose = function () {
        console.log("-----req on close: ", arguments);
        this.req.removeListener("aborted", this.handleReqAborted);
        this.req.removeListener("data", this.handleReqData);
        this.req.removeListener("end", this.handleReqEnd);
        this.req.removeListener("error", this.handleReqError);
        this.req.removeListener("close", this.handleReqClose);
    };
    return ErouterParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErouterParser;
//# sourceMappingURL=index.js.map