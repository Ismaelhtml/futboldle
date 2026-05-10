// Equipos por liga.
// Atributos por equipo:
//   name, league, country, city, founded, titles (ligas locales),
//   cup1, cup2 (copas continentales: Champions/Europa L. para Europa,
//               Libertadores/Sudamericana para Sudamérica),
//   color (array de tokens de color de la camiseta principal).
// Cifras aproximadas — fácil de actualizar.

const LEAGUES = {
  // ===== EUROPA =====
  laliga: {
    label: "LaLiga", country: "España", region: "europa", flag: "🇪🇸",
    teams: [
      { name: "Real Madrid",        country: "España", city: "Madrid",       founded: 1902, titles: 36, cup1: 15, cup2: 2, color: ["blanco"] },
      { name: "FC Barcelona",       country: "España", city: "Barcelona",    founded: 1899, titles: 28, cup1: 5,  cup2: 0, color: ["azul","granate"] },
      { name: "Atlético de Madrid", country: "España", city: "Madrid",       founded: 1903, titles: 11, cup1: 0,  cup2: 3, color: ["rojo","blanco"] },
      { name: "Athletic Club",      country: "España", city: "Bilbao",       founded: 1898, titles: 8,  cup1: 0,  cup2: 0, color: ["rojo","blanco"] },
      { name: "Real Sociedad",      country: "España", city: "San Sebastián",founded: 1909, titles: 2,  cup1: 0,  cup2: 0, color: ["azul","blanco"] },
      { name: "Villarreal CF",      country: "España", city: "Villarreal",   founded: 1923, titles: 0,  cup1: 0,  cup2: 1, color: ["amarillo"] },
      { name: "Real Betis",         country: "España", city: "Sevilla",      founded: 1907, titles: 1,  cup1: 0,  cup2: 0, color: ["verde","blanco"] },
      { name: "Sevilla FC",         country: "España", city: "Sevilla",      founded: 1890, titles: 1,  cup1: 0,  cup2: 7, color: ["blanco"] },
      { name: "Valencia CF",        country: "España", city: "Valencia",     founded: 1919, titles: 6,  cup1: 0,  cup2: 1, color: ["blanco","naranja"] },
      { name: "Getafe CF",          country: "España", city: "Getafe",       founded: 1983, titles: 0,  cup1: 0,  cup2: 0, color: ["azul"] },
      { name: "CA Osasuna",         country: "España", city: "Pamplona",     founded: 1920, titles: 0,  cup1: 0,  cup2: 0, color: ["rojo"] },
      { name: "RC Celta",           country: "España", city: "Vigo",         founded: 1923, titles: 0,  cup1: 0,  cup2: 0, color: ["celeste"] },
      { name: "RCD Mallorca",       country: "España", city: "Palma",        founded: 1916, titles: 0,  cup1: 0,  cup2: 0, color: ["rojo","negro"] },
      { name: "UD Las Palmas",      country: "España", city: "Las Palmas",   founded: 1949, titles: 0,  cup1: 0,  cup2: 0, color: ["amarillo","azul"] },
      { name: "Rayo Vallecano",     country: "España", city: "Madrid",       founded: 1924, titles: 0,  cup1: 0,  cup2: 0, color: ["blanco","rojo"] },
      { name: "RCD Espanyol",       country: "España", city: "Barcelona",    founded: 1900, titles: 0,  cup1: 0,  cup2: 0, color: ["azul","blanco"] },
      { name: "Deportivo Alavés",   country: "España", city: "Vitoria",      founded: 1921, titles: 0,  cup1: 0,  cup2: 0, color: ["azul","blanco"] },
      { name: "Girona FC",          country: "España", city: "Girona",       founded: 1930, titles: 0,  cup1: 0,  cup2: 0, color: ["rojo","blanco"] },
      { name: "CD Leganés",         country: "España", city: "Leganés",      founded: 1928, titles: 0,  cup1: 0,  cup2: 0, color: ["azul","blanco"] },
      { name: "Real Valladolid",    country: "España", city: "Valladolid",   founded: 1928, titles: 0,  cup1: 0,  cup2: 0, color: ["violeta","blanco"] },
    ],
  },

  premier: {
    label: "Premier League", country: "Inglaterra", region: "europa", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    teams: [
      { name: "Manchester City",        country: "Inglaterra", city: "Mánchester",   founded: 1880, titles: 10, cup1: 1, cup2: 0, color: ["celeste"] },
      { name: "Manchester United",      country: "Inglaterra", city: "Mánchester",   founded: 1878, titles: 20, cup1: 3, cup2: 1, color: ["rojo"] },
      { name: "Liverpool FC",           country: "Inglaterra", city: "Liverpool",    founded: 1892, titles: 20, cup1: 6, cup2: 3, color: ["rojo"] },
      { name: "Arsenal FC",             country: "Inglaterra", city: "Londres",      founded: 1886, titles: 13, cup1: 0, cup2: 1, color: ["rojo","blanco"] },
      { name: "Chelsea FC",             country: "Inglaterra", city: "Londres",      founded: 1905, titles: 6,  cup1: 2, cup2: 2, color: ["azul"] },
      { name: "Tottenham Hotspur",      country: "Inglaterra", city: "Londres",      founded: 1882, titles: 2,  cup1: 0, cup2: 3, color: ["blanco"] },
      { name: "Newcastle United",       country: "Inglaterra", city: "Newcastle",    founded: 1892, titles: 4,  cup1: 0, cup2: 1, color: ["blanco","negro"] },
      { name: "Aston Villa",            country: "Inglaterra", city: "Birmingham",   founded: 1874, titles: 7,  cup1: 1, cup2: 0, color: ["granate","celeste"] },
      { name: "West Ham United",        country: "Inglaterra", city: "Londres",      founded: 1895, titles: 0,  cup1: 0, cup2: 0, color: ["granate","azul"] },
      { name: "Brighton & Hove Albion", country: "Inglaterra", city: "Brighton",     founded: 1901, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "Crystal Palace",         country: "Inglaterra", city: "Londres",      founded: 1905, titles: 0,  cup1: 0, cup2: 0, color: ["azul","rojo"] },
      { name: "Everton FC",             country: "Inglaterra", city: "Liverpool",    founded: 1878, titles: 9,  cup1: 0, cup2: 0, color: ["azul"] },
      { name: "Fulham FC",              country: "Inglaterra", city: "Londres",      founded: 1879, titles: 0,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
      { name: "Brentford FC",           country: "Inglaterra", city: "Londres",      founded: 1889, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Wolverhampton",          country: "Inglaterra", city: "Wolverhampton",founded: 1877, titles: 3,  cup1: 0, cup2: 1, color: ["naranja","negro"] },
      { name: "AFC Bournemouth",        country: "Inglaterra", city: "Bournemouth",  founded: 1899, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "Nottingham Forest",      country: "Inglaterra", city: "Nottingham",   founded: 1865, titles: 1,  cup1: 2, cup2: 0, color: ["rojo"] },
      { name: "Leicester City",         country: "Inglaterra", city: "Leicester",    founded: 1884, titles: 1,  cup1: 0, cup2: 0, color: ["azul"] },
      { name: "Ipswich Town",           country: "Inglaterra", city: "Ipswich",      founded: 1878, titles: 1,  cup1: 0, cup2: 1, color: ["azul","blanco"] },
      { name: "Southampton FC",         country: "Inglaterra", city: "Southampton",  founded: 1885, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
    ],
  },

  seriea: {
    label: "Serie A", country: "Italia", region: "europa", flag: "🇮🇹",
    teams: [
      { name: "Inter de Milán",  country: "Italia", city: "Milán",     founded: 1908, titles: 20, cup1: 3, cup2: 3, color: ["azul","negro"] },
      { name: "Juventus FC",     country: "Italia", city: "Turín",     founded: 1897, titles: 36, cup1: 2, cup2: 3, color: ["blanco","negro"] },
      { name: "AC Milan",        country: "Italia", city: "Milán",     founded: 1899, titles: 19, cup1: 7, cup2: 0, color: ["rojo","negro"] },
      { name: "SSC Napoli",      country: "Italia", city: "Nápoles",   founded: 1926, titles: 4,  cup1: 0, cup2: 1, color: ["celeste"] },
      { name: "AS Roma",         country: "Italia", city: "Roma",      founded: 1927, titles: 3,  cup1: 0, cup2: 0, color: ["granate","amarillo"] },
      { name: "SS Lazio",        country: "Italia", city: "Roma",      founded: 1900, titles: 2,  cup1: 0, cup2: 0, color: ["celeste","blanco"] },
      { name: "Atalanta BC",     country: "Italia", city: "Bérgamo",   founded: 1907, titles: 0,  cup1: 0, cup2: 1, color: ["azul","negro"] },
      { name: "ACF Fiorentina",  country: "Italia", city: "Florencia", founded: 1926, titles: 2,  cup1: 0, cup2: 0, color: ["violeta"] },
      { name: "Bologna FC",      country: "Italia", city: "Bolonia",   founded: 1909, titles: 7,  cup1: 0, cup2: 0, color: ["rojo","azul"] },
      { name: "Torino FC",       country: "Italia", city: "Turín",     founded: 1906, titles: 7,  cup1: 0, cup2: 0, color: ["granate"] },
      { name: "Udinese Calcio",  country: "Italia", city: "Údine",     founded: 1896, titles: 0,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
      { name: "Genoa CFC",       country: "Italia", city: "Génova",    founded: 1893, titles: 9,  cup1: 0, cup2: 0, color: ["rojo","azul"] },
      { name: "Cagliari Calcio", country: "Italia", city: "Cagliari",  founded: 1920, titles: 1,  cup1: 0, cup2: 0, color: ["rojo","azul"] },
      { name: "US Lecce",        country: "Italia", city: "Lecce",     founded: 1908, titles: 0,  cup1: 0, cup2: 0, color: ["amarillo","rojo"] },
      { name: "Hellas Verona",   country: "Italia", city: "Verona",    founded: 1903, titles: 1,  cup1: 0, cup2: 0, color: ["azul","amarillo"] },
      { name: "Empoli FC",       country: "Italia", city: "Empoli",    founded: 1920, titles: 0,  cup1: 0, cup2: 0, color: ["azul"] },
      { name: "Parma Calcio",    country: "Italia", city: "Parma",     founded: 1913, titles: 0,  cup1: 0, cup2: 2, color: ["amarillo","azul"] },
      { name: "Como 1907",       country: "Italia", city: "Como",      founded: 1907, titles: 0,  cup1: 0, cup2: 0, color: ["azul"] },
      { name: "AC Monza",        country: "Italia", city: "Monza",     founded: 1912, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Venezia FC",      country: "Italia", city: "Venecia",   founded: 1907, titles: 0,  cup1: 0, cup2: 0, color: ["negro","verde","naranja"] },
    ],
  },

  bundesliga: {
    label: "Bundesliga", country: "Alemania", region: "europa", flag: "🇩🇪",
    teams: [
      { name: "Bayern de Múnich",         country: "Alemania", city: "Múnich",       founded: 1900, titles: 34, cup1: 6, cup2: 1, color: ["rojo"] },
      { name: "Borussia Dortmund",        country: "Alemania", city: "Dortmund",     founded: 1909, titles: 8,  cup1: 1, cup2: 0, color: ["amarillo","negro"] },
      { name: "RB Leipzig",               country: "Alemania", city: "Leipzig",      founded: 2009, titles: 0,  cup1: 0, cup2: 0, color: ["blanco","rojo"] },
      { name: "Bayer 04 Leverkusen",      country: "Alemania", city: "Leverkusen",   founded: 1904, titles: 1,  cup1: 0, cup2: 1, color: ["rojo","negro"] },
      { name: "Eintracht Frankfurt",      country: "Alemania", city: "Fráncfort",    founded: 1899, titles: 1,  cup1: 0, cup2: 2, color: ["negro","rojo"] },
      { name: "VfB Stuttgart",            country: "Alemania", city: "Stuttgart",    founded: 1893, titles: 5,  cup1: 0, cup2: 0, color: ["blanco","rojo"] },
      { name: "Borussia Mönchengladbach", country: "Alemania", city: "Mönchengladbach", founded: 1900, titles: 5, cup1: 0, cup2: 2, color: ["blanco"] },
      { name: "VfL Wolfsburg",            country: "Alemania", city: "Wolfsburgo",   founded: 1945, titles: 1,  cup1: 0, cup2: 0, color: ["verde"] },
      { name: "Werder Bremen",            country: "Alemania", city: "Bremen",       founded: 1899, titles: 4,  cup1: 0, cup2: 0, color: ["verde"] },
      { name: "TSG Hoffenheim",           country: "Alemania", city: "Sinsheim",     founded: 1899, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "1. FSV Mainz 05",          country: "Alemania", city: "Maguncia",     founded: 1905, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "FC Augsburg",              country: "Alemania", city: "Augsburgo",    founded: 1907, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Union Berlin",             country: "Alemania", city: "Berlín",       founded: 1966, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "SC Freiburg",              country: "Alemania", city: "Friburgo",     founded: 1904, titles: 0,  cup1: 0, cup2: 0, color: ["rojo"] },
      { name: "1. FC Heidenheim",         country: "Alemania", city: "Heidenheim",   founded: 1846, titles: 0,  cup1: 0, cup2: 0, color: ["azul","rojo"] },
      { name: "Holstein Kiel",            country: "Alemania", city: "Kiel",         founded: 1900, titles: 1,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "FC St. Pauli",             country: "Alemania", city: "Hamburgo",     founded: 1910, titles: 0,  cup1: 0, cup2: 0, color: ["marron"] },
      { name: "VfL Bochum",               country: "Alemania", city: "Bochum",       founded: 1938, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
    ],
  },

  ligue1: {
    label: "Ligue 1", country: "Francia", region: "europa", flag: "🇫🇷",
    teams: [
      { name: "Paris Saint-Germain",   country: "Francia", city: "París",       founded: 1970, titles: 13, cup1: 1, cup2: 0, color: ["azul","rojo"] },
      { name: "Olympique de Marsella", country: "Francia", city: "Marsella",    founded: 1899, titles: 9,  cup1: 1, cup2: 0, color: ["blanco","celeste"] },
      { name: "AS Mónaco",             country: "Mónaco",  city: "Mónaco",      founded: 1924, titles: 8,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Olympique de Lyon",     country: "Francia", city: "Lyon",        founded: 1950, titles: 7,  cup1: 0, cup2: 0, color: ["blanco","azul","rojo"] },
      { name: "LOSC Lille",            country: "Francia", city: "Lille",       founded: 1944, titles: 4,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "OGC Niza",              country: "Francia", city: "Niza",        founded: 1904, titles: 4,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "RC Lens",               country: "Francia", city: "Lens",        founded: 1906, titles: 1,  cup1: 0, cup2: 0, color: ["amarillo","rojo"] },
      { name: "Stade Rennais",         country: "Francia", city: "Rennes",      founded: 1901, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "RC Strasbourg",         country: "Francia", city: "Estrasburgo", founded: 1906, titles: 1,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "FC Nantes",             country: "Francia", city: "Nantes",      founded: 1943, titles: 8,  cup1: 0, cup2: 0, color: ["amarillo","verde"] },
      { name: "Toulouse FC",           country: "Francia", city: "Tolosa",      founded: 1970, titles: 0,  cup1: 0, cup2: 0, color: ["violeta","blanco"] },
      { name: "Montpellier HSC",       country: "Francia", city: "Montpellier", founded: 1919, titles: 1,  cup1: 0, cup2: 0, color: ["naranja","azul"] },
      { name: "Stade de Reims",        country: "Francia", city: "Reims",       founded: 1931, titles: 6,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Stade Brestois",        country: "Francia", city: "Brest",       founded: 1950, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "AJ Auxerre",            country: "Francia", city: "Auxerre",     founded: 1905, titles: 1,  cup1: 0, cup2: 0, color: ["blanco","azul"] },
      { name: "Le Havre AC",           country: "Francia", city: "Le Havre",    founded: 1872, titles: 0,  cup1: 0, cup2: 0, color: ["azul","celeste"] },
      { name: "Angers SCO",            country: "Francia", city: "Angers",      founded: 1919, titles: 0,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
      { name: "AS Saint-Étienne",      country: "Francia", city: "Saint-Étienne",founded: 1933, titles: 10, cup1: 0, cup2: 0, color: ["verde","blanco"] },
    ],
  },

  // ===== SUDAMÉRICA =====
  brasileirao: {
    label: "Brasileirão Série A", country: "Brasil", region: "sudamerica", flag: "🇧🇷",
    teams: [
      { name: "Flamengo",                country: "Brasil", city: "Río de Janeiro",   founded: 1895, titles: 8,  cup1: 3, cup2: 0, color: ["rojo","negro"] },
      { name: "Palmeiras",               country: "Brasil", city: "São Paulo",        founded: 1914, titles: 12, cup1: 3, cup2: 0, color: ["verde"] },
      { name: "São Paulo FC",            country: "Brasil", city: "São Paulo",        founded: 1930, titles: 6,  cup1: 3, cup2: 1, color: ["rojo","blanco","negro"] },
      { name: "Corinthians",             country: "Brasil", city: "São Paulo",        founded: 1910, titles: 7,  cup1: 1, cup2: 0, color: ["blanco","negro"] },
      { name: "Atlético Mineiro",        country: "Brasil", city: "Belo Horizonte",   founded: 1908, titles: 2,  cup1: 1, cup2: 0, color: ["blanco","negro"] },
      { name: "Cruzeiro",                country: "Brasil", city: "Belo Horizonte",   founded: 1921, titles: 4,  cup1: 2, cup2: 0, color: ["azul"] },
      { name: "Internacional",           country: "Brasil", city: "Porto Alegre",     founded: 1909, titles: 3,  cup1: 2, cup2: 1, color: ["rojo"] },
      { name: "Grêmio",                  country: "Brasil", city: "Porto Alegre",     founded: 1903, titles: 2,  cup1: 3, cup2: 0, color: ["celeste","azul","negro"] },
      { name: "Botafogo",                country: "Brasil", city: "Río de Janeiro",   founded: 1904, titles: 3,  cup1: 1, cup2: 0, color: ["blanco","negro"] },
      { name: "Fluminense",              country: "Brasil", city: "Río de Janeiro",   founded: 1902, titles: 4,  cup1: 1, cup2: 0, color: ["granate","verde","blanco"] },
      { name: "Vasco da Gama",           country: "Brasil", city: "Río de Janeiro",   founded: 1898, titles: 4,  cup1: 1, cup2: 0, color: ["blanco","negro"] },
      { name: "EC Bahia",                country: "Brasil", city: "Salvador",         founded: 1931, titles: 2,  cup1: 0, cup2: 0, color: ["azul","rojo","blanco"] },
      { name: "Athletico Paranaense",    country: "Brasil", city: "Curitiba",         founded: 1924, titles: 1,  cup1: 0, cup2: 2, color: ["rojo","negro"] },
      { name: "Fortaleza",               country: "Brasil", city: "Fortaleza",        founded: 1918, titles: 0,  cup1: 0, cup2: 0, color: ["azul","rojo"] },
      { name: "RB Bragantino",           country: "Brasil", city: "Bragança Paulista",founded: 1928, titles: 0,  cup1: 0, cup2: 0, color: ["blanco"] },
      { name: "Vitória",                 country: "Brasil", city: "Salvador",         founded: 1899, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "Juventude",               country: "Brasil", city: "Caxias do Sul",    founded: 1913, titles: 0,  cup1: 0, cup2: 0, color: ["verde","blanco"] },
      { name: "Cuiabá",                  country: "Brasil", city: "Cuiabá",           founded: 2001, titles: 0,  cup1: 0, cup2: 0, color: ["verde","amarillo"] },
      { name: "Criciúma",                country: "Brasil", city: "Criciúma",         founded: 1947, titles: 0,  cup1: 0, cup2: 0, color: ["amarillo","negro"] },
      { name: "Atlético Goianiense",     country: "Brasil", city: "Goiânia",          founded: 1937, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
    ],
  },

  argentina: {
    label: "Liga Profesional Argentina", country: "Argentina", region: "sudamerica", flag: "🇦🇷",
    teams: [
      { name: "Boca Juniors",        country: "Argentina", city: "Buenos Aires",     founded: 1905, titles: 35, cup1: 6, cup2: 2, color: ["azul","amarillo"] },
      { name: "River Plate",         country: "Argentina", city: "Buenos Aires",     founded: 1901, titles: 38, cup1: 4, cup2: 1, color: ["blanco","rojo"] },
      { name: "Racing Club",         country: "Argentina", city: "Avellaneda",       founded: 1903, titles: 18, cup1: 1, cup2: 1, color: ["celeste","blanco"] },
      { name: "Independiente",       country: "Argentina", city: "Avellaneda",       founded: 1905, titles: 16, cup1: 7, cup2: 2, color: ["rojo"] },
      { name: "San Lorenzo",         country: "Argentina", city: "Buenos Aires",     founded: 1908, titles: 15, cup1: 1, cup2: 0, color: ["azul","granate"] },
      { name: "Estudiantes (LP)",    country: "Argentina", city: "La Plata",         founded: 1905, titles: 6,  cup1: 4, cup2: 0, color: ["rojo","blanco"] },
      { name: "Vélez Sarsfield",     country: "Argentina", city: "Buenos Aires",     founded: 1910, titles: 10, cup1: 1, cup2: 0, color: ["blanco","azul"] },
      { name: "Newell's Old Boys",   country: "Argentina", city: "Rosario",          founded: 1903, titles: 6,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "Rosario Central",     country: "Argentina", city: "Rosario",          founded: 1889, titles: 4,  cup1: 0, cup2: 0, color: ["azul","amarillo"] },
      { name: "Lanús",               country: "Argentina", city: "Lanús",            founded: 1915, titles: 1,  cup1: 0, cup2: 1, color: ["granate","blanco"] },
      { name: "Banfield",            country: "Argentina", city: "Banfield",         founded: 1896, titles: 1,  cup1: 0, cup2: 0, color: ["verde","blanco"] },
      { name: "Talleres",            country: "Argentina", city: "Córdoba",          founded: 1913, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "Argentinos Juniors",  country: "Argentina", city: "Buenos Aires",     founded: 1904, titles: 3,  cup1: 1, cup2: 0, color: ["rojo","blanco"] },
      { name: "Huracán",             country: "Argentina", city: "Buenos Aires",     founded: 1908, titles: 1,  cup1: 0, cup2: 0, color: ["blanco","rojo"] },
      { name: "Defensa y Justicia",  country: "Argentina", city: "Florencio Varela", founded: 1935, titles: 0,  cup1: 0, cup2: 1, color: ["amarillo","verde"] },
      { name: "Tigre",               country: "Argentina", city: "Victoria",         founded: 1902, titles: 1,  cup1: 0, cup2: 0, color: ["azul","rojo"] },
      { name: "Belgrano",            country: "Argentina", city: "Córdoba",          founded: 1905, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "Gimnasia (LP)",       country: "Argentina", city: "La Plata",         founded: 1887, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "Godoy Cruz",          country: "Argentina", city: "Mendoza",          founded: 1921, titles: 0,  cup1: 0, cup2: 0, color: ["azul","blanco"] },
      { name: "Platense",            country: "Argentina", city: "Vicente López",    founded: 1905, titles: 1,  cup1: 0, cup2: 0, color: ["blanco","marron"] },
    ],
  },

  uruguay: {
    label: "Primera División Uruguaya", country: "Uruguay", region: "sudamerica", flag: "🇺🇾",
    teams: [
      { name: "Peñarol",                  country: "Uruguay", city: "Montevideo",            founded: 1891, titles: 51, cup1: 5, cup2: 0, color: ["amarillo","negro"] },
      { name: "Nacional",                 country: "Uruguay", city: "Montevideo",            founded: 1899, titles: 49, cup1: 3, cup2: 0, color: ["blanco","azul","rojo"] },
      { name: "Defensor Sporting",        country: "Uruguay", city: "Montevideo",            founded: 1913, titles: 4,  cup1: 0, cup2: 0, color: ["violeta","blanco"] },
      { name: "Danubio",                  country: "Uruguay", city: "Montevideo",            founded: 1932, titles: 4,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
      { name: "Liverpool FC (Mvd)",       country: "Uruguay", city: "Montevideo",            founded: 1915, titles: 1,  cup1: 0, cup2: 0, color: ["azul","negro"] },
      { name: "Wanderers",                country: "Uruguay", city: "Montevideo",            founded: 1902, titles: 4,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
      { name: "River Plate (Mvd)",        country: "Uruguay", city: "Montevideo",            founded: 1932, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco","negro"] },
      { name: "Cerro",                    country: "Uruguay", city: "Montevideo",            founded: 1922, titles: 0,  cup1: 0, cup2: 0, color: ["celeste","blanco"] },
      { name: "Plaza Colonia",            country: "Uruguay", city: "Colonia del Sacramento",founded: 1917, titles: 1,  cup1: 0, cup2: 0, color: ["blanco","rojo"] },
      { name: "Boston River",             country: "Uruguay", city: "Montevideo",            founded: 1939, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Racing (Mvd)",             country: "Uruguay", city: "Montevideo",            founded: 1919, titles: 1,  cup1: 0, cup2: 0, color: ["verde","blanco"] },
      { name: "Progreso",                 country: "Uruguay", city: "Montevideo",            founded: 1917, titles: 1,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "Cerro Largo",              country: "Uruguay", city: "Melo",                  founded: 2002, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","negro"] },
      { name: "Miramar Misiones",         country: "Uruguay", city: "Montevideo",            founded: 1980, titles: 0,  cup1: 0, cup2: 0, color: ["rojo","blanco"] },
      { name: "Fénix",                    country: "Uruguay", city: "Montevideo",            founded: 1916, titles: 0,  cup1: 0, cup2: 0, color: ["violeta"] },
      { name: "Juventud (Las Piedras)",   country: "Uruguay", city: "Las Piedras",           founded: 1935, titles: 0,  cup1: 0, cup2: 0, color: ["blanco","negro"] },
    ],
  },
};

// Inyectar `league` y `region` en cada equipo (basado en su liga).
for (const [key, lg] of Object.entries(LEAGUES)) {
  for (const t of lg.teams) {
    t.league = lg.label;
    t.region = lg.region;
  }
}

// Modos combinados (cada uno es una liga "virtual" jugable).
const SA_KEYS = ["argentina", "brasileirao", "uruguay"];
const EU_KEYS = ["laliga", "premier", "seriea", "bundesliga", "ligue1"];
const BASE_KEYS = [...EU_KEYS, ...SA_KEYS];

LEAGUES.all = {
  label: "Todas las Ligas",
  country: "Mundo",
  region: "mixto",
  flag: "🌍",
  teams: BASE_KEYS.flatMap(k => LEAGUES[k].teams),
  combined: true,
};

LEAGUES.southam = {
  label: "Ligas Sudamericanas",
  country: "Sudamérica",
  region: "sudamerica",
  flag: "🌎",
  teams: SA_KEYS.flatMap(k => LEAGUES[k].teams),
  combined: true,
};

LEAGUES.europa = {
  label: "Ligas Europeas",
  country: "Europa",
  region: "europa",
  flag: "🇪🇺",
  teams: EU_KEYS.flatMap(k => LEAGUES[k].teams),
  combined: true,
};

// Atributos de comparación. Las etiquetas de las copas continentales se
// ajustan en tiempo real según la región (ver app.js).
function attrsForLeague(leagueKey) {
  const lg = LEAGUES[leagueKey];
  let cup1Label, cup2Label;
  if (lg.region === "mixto") {
    cup1Label = "Copa Cont. (1ª)";
    cup2Label = "Copa Cont. (2ª)";
  } else if (lg.region === "europa") {
    cup1Label = "Champions";
    cup2Label = "Europa L.";
  } else {
    cup1Label = "Libertadores";
    cup2Label = "Sudamericana";
  }
  return [
    { key: "league",  label: "Liga" },
    { key: "country", label: "País" },
    { key: "city",    label: "Ciudad" },
    { key: "founded", label: "Fundación", numeric: true, tolerance: 15 },
    { key: "titles",  label: "Ligas",     numeric: true, tolerance: 3 },
    { key: "cup1",    label: cup1Label,   numeric: true, tolerance: 1, zeroAsX: true },
    { key: "cup2",    label: cup2Label,   numeric: true, tolerance: 1, zeroAsX: true },
    { key: "color",   label: "Color" },
  ];
}
