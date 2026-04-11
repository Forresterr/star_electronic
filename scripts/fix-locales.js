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
  en: {
    address: "Address copied",
    email: "Email copied",
    phone: "Phone number copied",
  },
  sk: {
    address: "Adresa skopírovaná",
    email: "E-mail skopírovaný",
    phone: "Telefónne číslo skopírované",
  },
  cs: {
    address: "Adresa zkopírována",
    email: "E-mail zkopírován",
    phone: "Telefonní číslo zkopírováno",
  },
  de: {
    address: "Adresse kopiert",
    email: "E-Mail kopiert",
    phone: "Telefonnummer kopiert",
  },
  fr: {
    address: "Adresse copiée",
    email: "E-mail copié",
    phone: "Numéro de téléphone copié",
  },
  hu: {
    address: "Cím másolva",
    email: "E-mail másolva",
    phone: "Telefonszám másolva",
  },
  pl: {
    address: "Adres skopiowany",
    email: "E-mail skopiowany",
    phone: "Numer telefonu skopiowany",
  },
  uk: {
    address: "Адресу скопійовано",
    email: "E-mail скопійовано",
    phone: "Номер телефону скопійовано",
  },
};

files.forEach(function (f) {
  const p = "./messages/" + f;
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, "utf8");
  const d = JSON.parse(content.replace(/^\uFEFF/, ""));

  const lang = f.split(".")[0];
  const trans = t[lang] || t["en"];

  if (!d.footer) d.footer = {};
  d.footer.addressCopied = trans.address;
  d.footer.emailCopied = trans.email;
  d.footer.phoneCopied = trans.phone;

  fs.writeFileSync(p, JSON.stringify(d, null, 2), "utf8");
});
