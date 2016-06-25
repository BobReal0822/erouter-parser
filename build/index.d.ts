import { Router as ExpressRouter } from "express";
export interface ParserOptions {
    [key: string]: string | number | boolean;
    charset: string;
    limit: string;
}
export default class ErouterParser {
    private options;
    private req;
    private next;
    constructor(options?: ParserOptions);
    private bindReq(req);
    private bindNext(next);
    private static parserBody(req, next, options);
    static parser(options?: ParserOptions): ExpressRouter;
    private onReqAborted();
    private onReqData();
    private onReqEnd();
    private onReqError();
    private onReqClose();
    private handleReqAborted();
    private handleReqData(chunk);
    private handleReqEnd();
    private handleReqError(error);
    private handleReqClose();
}
