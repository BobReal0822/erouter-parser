import {
    Express,
    Router as ExpressRouter,
    IRouterMatcher as ExpressRouterMatcher,
    Request as ExpressRequest,
    Response as ExpressResponse,
    RequestHandler as ExpressRequestHandler
} from "express";
import * as Bytes from "bytes";
import * as HttpErrors from "http-errors";
import * as ContentType from "content-type";

export interface ParserOptions {
    [key: string]: string | number | boolean;
    encoding: string;
    limit: string;
}

const DefaultParserOptions: ParserOptions = {
    encoding: "utf8",
    limit: ""
}

export default class ErouterParser {
    private options: ParserOptions;
    private req: ExpressRequest;
    private errors: string[];

    constructor(options?: ParserOptions) {
        this.options = <ParserOptions>{};

        Object.keys(DefaultParserOptions).forEach((key: string) => {
            let value = options && options[key];
            console.log("options key & value: ", key, value);
            this.options[key] = key && value ? options[key] : DefaultParserOptions[key]; 
        });

        console.log("in constructor options = ", this.options);
    }

    private bindReq(req: ExpressRequest): ErouterParser {
        this.req = req;
        return this;
    }

    private parserBody(req: ExpressRequest): void {

        if (this.req.body) {
            console.warn(`req already parsed.`);
        }

        this.onReqAborted()
            .onReqClose()
            .onReqData()
            .onReqEnd()
            .onReqError();
    }

    public static parser(options?: ParserOptions): ExpressRouter {
        let _router = ExpressRouter();

        _router.use((req: ExpressRequest, res: ExpressResponse, next: Function) => {
            let _parser =  new ErouterParser(options).bindReq(req);

            _parser.errors.length ? next() : next(HttpErrors(_parser.errors.join(",-")));
        });

        return _router;
    }

    private onReqAborted(): ErouterParser {
        this.req.on("aborted", this.handleReqAborted.bind(this));
        return this;
    }

    private onReqData(): ErouterParser {
        this.req.on("data", this.handleReqData.bind(this));
        return this;
    }

    private onReqEnd(): ErouterParser {
        this.req.on("end", this.handleReqEnd.bind(this));
        return this;
    }

    private onReqError(): ErouterParser {
        this.req.on("error", this.handleReqError.bind(this));
        return this;
    }

    private onReqClose(): ErouterParser {
        this.req.on("close", this.handleReqClose.bind(this));
        return this;
    }

    private handleReqAborted() {
        console.log("-----req on aborted: ", arguments);
        this.errors.push(`request aborted.`);
    }

    private handleReqData(chunk: Buffer) {
        let reqData = chunk.toString(this.getReqCharset() || this.options.encoding);
        console.log("-----req on data: ", reqData);
        console.log("-----chunk length: ", chunk && chunk.length);

        if (chunk.length > Bytes.parse(this.options.limit)) {
            this.errors.push((`Chunk[${ chunk.length }] is too large.`));
        }

        try {
            console.log("in try");
            this.req.body = JSON.parse(reqData) || {};
        } catch (error) {
            console.log("in catch: ", error);
            this.req.body = reqData || {};
        }
    }

    private handleReqEnd() {
        console.log("-----req on end: ", arguments);
    }

    private handleReqError(error: any) {
        console.log("-----req on error: ", arguments);
        this.onReqClose();
        this.errors.push(`request error: ${ error }.`);
    }

    private handleReqClose() {
        console.log("-----req on close: ", arguments);
        this.req.removeListener("aborted", this.handleReqAborted);
        this.req.removeListener("data", this.handleReqData);
        this.req.removeListener("end", this.handleReqEnd);
        this.req.removeListener("error", this.handleReqError);
        this.req.removeListener("close", this.handleReqClose);
    }

    private getReqCharset() {
        try {
            return ContentType.parse(this.req).parameters.charset.toLowerCase();
        } catch (error) {
            return "";
        }
    }
}

