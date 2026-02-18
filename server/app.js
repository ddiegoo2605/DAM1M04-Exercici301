const express = require("express");
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Configurar HBS
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Helper lte (a <= b)
hbs.registerHelper("lte", (a, b) => {
  // Si population no existe (null/undefined), devuelve false para evitar líos
  if (a === null || a === undefined) return false;
  return a <= b;
});

// Servir estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Cargar JSON
function loadJSON(relPath) {
  const fullPath = path.join(__dirname, relPath);
  return JSON.parse(fs.readFileSync(fullPath, "utf-8"));
}

// Ruta /
app.get("/", (req, res) => {
  const site = loadJSON("data/site.json");
  res.render("index", site);
});

// Ruta /informe
app.get("/informe", (req, res) => {
  const site = loadJSON("data/site.json");
  const cities = loadJSON("data/cities.json");
  const countries = loadJSON("data/countries.json");

  res.render("informe", {
    ...site,
    ...cities,
    ...countries,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en marxa: http://localhost:${PORT}`);
});
