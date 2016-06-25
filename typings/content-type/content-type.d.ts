// Type definitions for content-type v0.0.1
// Project: https://github.com/jshttp/content-type

declare namespace ContentType {
    interface parseInfo {
        type: string;
        parameters: {
            charset: string;
        }
    }

    interface ContentTypeStatic {
        parse: (req: Express.Request | Express.Response | {}) => parseInfo;
    }
}

declare module "content-type" {
    var x: ContentType.ContentTypeStatic;
    export = x;
}
