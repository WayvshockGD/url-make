declare namespace Link {
    interface URIProxy {
        path(name: string): URIProxy;
        domain(ends: string): URIProxy;
        query(key: string, val: string): URIProxy;
        build(): string;
    }

    export const url: {
        make: (proto: "https" | "http" | "https://" | "http://") => URIProxy;
    }
}