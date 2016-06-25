import { Router as ExpressRouter } from "express";
export interface ParserOptions {
    [key: string]: string | number | boolean;
    encoding?: string;
    limit?: string;
}
declare let Parser: (options?: ParserOptions) => ExpressRouter;
export default Parser;
