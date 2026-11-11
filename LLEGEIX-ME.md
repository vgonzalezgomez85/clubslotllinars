# Web Club Slot Llinars

Web estàtica, sense base de dades ni instal·lació. Només cal pujar la carpeta al hosting.

## Estructura

```
index.html      pàgina principal (no cal tocar-la)
style.css       estils
app.js          lògica (idioma, calendari, etc.)
data.js         ← AQUÍ s'edita tot el contingut
logo.png        logo del club (ja inclòs)
ajuntament.png  ← posa aquí el logo de l'Ajuntament (peu de pàgina). Si no hi és, surt el nom en text.
pdf/
  reglaments/   PDF dels reglaments
  resultats/    PDF dels resultats
  verificacions/ PDF de les verificacions tècniques
```

## Com actualitzar

Obre `data.js` amb qualsevol editor de text.

- **Nova cursa al calendari:** copia un bloc dins de `calendar` i canvia data (`AAAA-MM-DD`), hora, nom i lloc.
  La web marca sola quina és la "propera cursa" i quines ja s'han disputat segons la data d'avui.
- **Publicar resultats:** puja el PDF a `pdf/resultats/` i afegeix un bloc dins de `results`
  amb la data, el nom i el camí del PDF.
- **Publicar verificacions:** puja el PDF a `pdf/verificacions/` i posa'n el camí a `verification`
  del resultat corresponent. Mentrestant, deixa `verification: null` i la web mostrarà "properament".
- **Reglaments:** puja el PDF a `pdf/reglaments/` i posa'n el camí a `pdf`. Amb `pdf: null` surt "Properament".
- Quan ja no hi hagi dades d'exemple, posa `sample: false` a dalt de `data.js`.

Els textos tenen versió en català (`ca`) i castellà (`es`).

## Provar-la en local

Obre `index.html` fent doble clic al navegador. Funciona sense servidor.
