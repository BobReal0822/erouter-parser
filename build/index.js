"use strict";
var express_1 = require("express");
var Bytes = require("bytes");
var HttpErrors = require("http-errors");
var ContentType = require("content-type");
var DefaultParserOptions = {
    encoding: "utf8",
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
    ErouterParser.prototype.parserBody = function (req) {
        if (this.req.body) {
            console.warn("req already parsed.");
        }
        this.onReqAborted()
            .onReqClose()
            .onReqData()
            .onReqEnd()
            .onReqError();
    };
    ErouterParser.parser = function (options) {
        var _router = express_1.Router();
        _router.use(function (req, res, next) {
            var _parser = new ErouterParser(options).bindReq(req);
            _parser.errors.length ? next() : next(HttpErrors(_parser.errors.join(",-")));
        });
        return _router;
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
        this.errors.push("request aborted.");
    };
    ErouterParser.prototype.handleReqData = function (chunk) {
        var reqData = chunk.toString(this.getReqCharset() || this.options.encoding);
        console.log("-----req on data: ", reqData);
        console.log("-----chunk length: ", chunk && chunk.length);
        if (chunk.length > Bytes.parse(this.options.limit)) {
            this.errors.push(("Chunk[" + chunk.length + "] is too large."));
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
        this.errors.push("request error: " + error + ".");
    };
    ErouterParser.prototype.handleReqClose = function () {
        console.log("-----req on close: ", arguments);
        this.req.removeListener("aborted", this.handleReqAborted);
        this.req.removeListener("data", this.handleReqData);
        this.req.removeListener("end", this.handleReqEnd);
        this.req.removeListener("error", this.handleReqError);
        this.req.removeListener("close", this.handleReqClose);
    };
    ErouterParser.prototype.getReqCharset = function () {
        try {
            return ContentType.parse(this.req).parameters.charset.toLowerCase();
        }
        catch (error) {
            return "";
        }
    };
    return ErouterParser;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErouterParser;
//# sourceMappingURL=index.js.map