/** @format */

const fs = require("fs");
let content = fs.readFileSync("app/[locale]/dashboard/page.client.js", "utf8");

// Reset to a clean state for setPopover missing ID
content = content.replace(
  /setPopover\({ message:/g,
  "setPopover({ id: Date.now(), message:",
);
content = content.replace(
  /setPopover\({\s+message:/g,
  "setPopover({\n      id: Date.now(),\n      message:",
);
content = content.replace(
  /<ActionPopover\s*message/g,
  "<ActionPopover key={popover.id} message",
);

content = content.replace(
  /key=\{popover\.id\} key=\{popover\.id\}/g,
  "key={popover.id}",
);

fs.writeFileSync("app/[locale]/dashboard/page.client.js", content, "utf8");
