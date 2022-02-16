/**
 * @param {string} proto 
 * @returns 
 */
module.exports = function(proto) {
    let noop = () => {};

    let uri = proto.endsWith("://") ? proto : `${proto}://`;

    /**
     * @type {ProxyHandler}
     */
    let obj = {
        get(_, name) {
            switch (name) {
                case "path":
                    return (name) => {
                        uri += name;
                        return new Proxy(noop, obj);
                    }
                case "domain":
                    return (ends) => {
                        uri += ends.startsWith(".") ? ends : `.${ends}`;
                        return new Proxy(noop, obj);
                    }
                case "query":
                    return (key, val) => {
                        uri = uri.endsWith("/") ? uri : `${uri}/`;
                        uri += uri.includes("?") ? `&${key}=${val}` : `?${key}=${val}`;
                        return new Proxy(noop, obj);
                    }
                case "build":
                    return () => uri;
            }

            return new Proxy(noop, obj);
        }
    }
    return new Proxy(noop, obj);
}