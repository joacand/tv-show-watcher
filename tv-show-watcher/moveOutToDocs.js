const fs = require("fs");
const path = require("path");

// Source and destination
const src = path.join(__dirname, "out");
const dest = path.join(__dirname, "..", "docs");

// Delete destination if it exists
if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
}

// Move 'out' to '../docs'
fs.renameSync(src, dest);

console.log("'out' has been moved to '../docs'");
