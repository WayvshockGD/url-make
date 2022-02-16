let url = require("./url");

let uri = url("https").path("google").domain("com").query("q", "why");

console.log(uri.build());