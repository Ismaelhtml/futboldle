# Futboldle ⚽

Juego diario al estilo Wordle / onepiecedle.net pero con equipos de fútbol europeos.
Sitio **100% estático**: HTML + CSS + JS plano. No hay build, ni backend, ni dependencias.

## Estructura

```
futboldle/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── teams.js     ← lista de equipos por liga
└── README.md
```

## Cómo se juega

1. Eliges una liga (LaLiga, Premier League, Serie A, Bundesliga o Ligue 1).
2. Cada liga tiene **un equipo secreto distinto cada día**.
3. Escribes nombres de equipos. La tabla muestra para cada atributo:
   - 🟩 verde si coincide exactamente,
   - 🟨 amarillo si está cerca (mismo bloque de color, año o aforo cercano…),
   - 🟥 rojo si no coincide.
4. En atributos numéricos verás `▲` si el equipo secreto es mayor y `▼` si es menor.
5. No hay límite de intentos.

El estado de la partida se guarda por liga y día en `localStorage`, así que puedes
cerrar la pestaña y volver más tarde.

## Selección diaria

`getDailyTeam(leagueKey, date)` en [`app.js`](app.js) usa el siguiente esquema:

- Cuenta los días desde una fecha base.
- Por cada ciclo de N días (donde N = nº de equipos de la liga), genera una
  permutación distinta de los equipos con un PRNG sembrado por liga y ciclo.
- Dentro de un ciclo nunca se repite un equipo, garantizando que el equipo de
  hoy es **distinto al de ayer**.
- Al cambiar de ciclo se hace un swap de seguridad si por casualidad el primero
  del ciclo nuevo coincide con el último del anterior.

Esto significa que con N=20 equipos hay 20 días seguidos sin repetición, y
después una nueva permutación.

## Cómo publicarla

Cualquier hosting estático sirve. La carpeta a subir es **`futboldle/` entera**.

### Opción 1 — Netlify (drag & drop)
1. Entra en https://app.netlify.com/drop
2. Arrastra la carpeta `futboldle/`.
3. Listo: te da una URL pública.

### Opción 2 — Vercel
```bash
cd futboldle
npx vercel deploy --prod
```

### Opción 3 — GitHub Pages
1. Sube esta carpeta a un repositorio (puede ser la raíz del repo o una subcarpeta).
2. En **Settings → Pages**, elige la rama (`main`) y la carpeta (`/futboldle` o `/`).
3. Espera 1-2 min y abre la URL `https://<usuario>.github.io/<repo>/`.

### Opción 4 — Servidor propio
Sirve el contenido con cualquier servidor estático. Ejemplo rápido:
```bash
cd futboldle
python -m http.server 8080
# abre http://localhost:8080
```

## Cómo añadir o editar equipos

Edita [`data/teams.js`](data/teams.js). Cada equipo tiene:

```js
{
  name:    "Real Madrid",
  league:  "LaLiga",          // texto mostrado
  country: "España",
  city:    "Madrid",
  founded: 1902,              // año (numérico)
  stadium: "Santiago Bernabéu",
  capacity: 81044,            // aforo (numérico)
  titles:   36,               // ligas domésticas (numérico)
  ucl:      15,               // Champions / Copas de Europa (numérico)
  color:    "Blanco"          // color principal de la camiseta
}
```

Para añadir una nueva liga, añade una entrada a `LEAGUES` con `label` y `teams`.

Para cambiar las tolerancias de los atributos numéricos (cuándo se considera
"cerca" en lugar de fallo), edita `ATTRS` al final de `data/teams.js`.

## Personalización

- **Tema**: cambia las variables CSS al inicio de [`styles.css`](styles.css).
- **Idioma**: el código está en español; los textos visibles se cambian
  directamente en [`index.html`](index.html) y [`app.js`](app.js).
- **Bandera de cada liga**: se controla con el mapa `LEAGUE_FLAGS` en `app.js`.

## Notas legales

- Los nombres y datos de los equipos son aproximados. No incluye escudos ni
  imágenes de marca.
- Pensado como proyecto educativo / fan, no oficial.
