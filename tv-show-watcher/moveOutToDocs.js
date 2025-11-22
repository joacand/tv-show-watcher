const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "out");
const dest = path.join(__dirname, "..", "docs");

if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}

fs.renameSync(src, dest);

console.log("'out' has been moved to '../docs'");
