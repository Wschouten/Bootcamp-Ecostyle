// Pure datumlogica — geen DOM, zodat test.cjs 'm kan laden.
(function (root) {
  const DINSDAG = 2;

  function pad(n) { return String(n).padStart(2, '0'); }

  // Lokale datum als YYYY-MM-DD (toISOString zou in de zomer naar UTC verschuiven).
  function isoDatum(d) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  // De komende `aantal` dinsdagen vanaf `nu`. Vandaag telt mee tot `eindUur`
  // (de les is dan voorbij; daarna schuift de lijst door naar volgende week).
  function komendeDinsdagen(nu, aantal, eindUur) {
    const start = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate());
    let delta = (DINSDAG - start.getDay() + 7) % 7;
    if (delta === 0 && nu.getHours() >= eindUur) delta = 7;
    start.setDate(start.getDate() + delta);
    return Array.from({ length: aantal }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + 7 * i);
      return d;
    });
  }

  const api = { isoDatum, komendeDinsdagen };
  if (typeof module !== 'undefined') module.exports = api;
  else root.agenda = api;
})(typeof window !== 'undefined' ? window : globalThis);
