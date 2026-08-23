# Consegne

Ogni file `<codice>.json` contiene schede e diete destinate a un dispositivo.

Il codice si legge nell'app in **Impostazioni · Consegne**, dove si puo anche
cambiare con uno scelto da te. L'app prova il codice cosi come e scritto,
poi in minuscolo e in maiuscolo.

Formato del pacchetto:

```json
{
  "formato": "v8consegna/1",
  "aggiornato": "AAAA-MM-GG",
  "nota": "Messaggio mostrato prima dell'importazione",
  "schede": [ ... file .v8w ... ],
  "diete":  [ ... file .v8d ... ]
}
```

Le schede e le diete con lo stesso identificativo vengono **aggiornate**,
le altre aggiunte. Gli allenamenti gia registrati non vengono toccati.
