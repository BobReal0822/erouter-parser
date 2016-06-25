import { Router as ExpressRouter } from "express";
export interface ParserOptions {
    [key: string]: string | number | boolean;
    encoding: string;
    limit: string;
}
export default class ErouterParser {
    private options;
    private req;
    private errors;
    constructor(options?: ParserOptions);
    private bindReq(req);
    private parserBody(req);
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
    private getReqCharset();
}
