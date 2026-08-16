# Consegne

File pubblici che l'app scarica per ricevere schede e diete.

Ogni file si chiama come il codice inserito nell'app: `CODICE.json`.
Il codice può essere l'ID del dispositivo (es. `SEL7-MXA4.json`)
oppure un nome condiviso (es. `FRATELLO.json`).

Formato:

```json
{
  "formato": "v8consegna/1",
  "nota": "descrizione breve",
  "schede": [ { ...contenuto .v8w... } ],
  "diete":  [ { ...contenuto .v8d... } ],
  "attiva": "id_scheda",
  "dietaAttiva": "id_dieta"
}
```

Sono file pubblici: non inserire dati personali.
