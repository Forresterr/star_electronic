/** @format */

const fs = require("fs");
const files = [
  "cs.json",
  "de.json",
  "en.json",
  "fr.json",
  "hu.json",
  "pl.json",
  "sk.json",
  "uk.json",
];

const t = {
  en: { call: "Call Us", email: "Email Us", visit: "Visit Us" },
  sk: { call: "Zavolajte nám", email: "Napíšte nám", visit: "Navštívte nás" },
  cs: { call: "Zavolejte nám", email: "Napište nám", visit: "Navštivte nás" },
  de: {
    call: "Rufen Sie uns an",
    email: "Schreiben Sie uns eine E-Mail",
    visit: "Besuchen Sie uns",
  },
  fr: {
    call: "Appelez-nous",
    email: "Envoyez-nous un e-mail",
    visit: "Rendez-nous visite",
  },
  hu: {
    call: "Hívjon minket",
    email: "Küldjön e-mailt",
    visit: "Látogasson el hozzánk",
  },
  pl: { call: "Zadzwoń do nas", email: "Napisz e-mail", visit: "Odwiedź nas" },
  uk: {
    call: "Зателефонуйте нам",
    email: "Надішліть e-mail",
    visit: "Завітайте до нас",
  },
};

files.forEach((f) => {
  const p = "./messages/" + f;
  if (!fs.existsSync(p)) return;
  const d = JSON.parse(fs.readFileSync(p, "utf8"));

  if (!d.contact.callUs) {
    const lang = f.split(".")[0];
    const trans = t[lang] || t["en"];

    d.contact.callUs = trans.call;
    d.contact.emailUs = trans.email;
    d.contact.visitUs = trans.visit;
    // copy from footer so it's consistent
    d.contact.address =
      d.footer?.address || "123 Star Street, Tech City, TC 90210";
    d.contact.phoneNumber = d.footer?.phone || "+1 (555) 123-4567";
    d.contact.emailAddress = d.footer?.email || "info@star-electronic.example";

    fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf8");
  }
});
