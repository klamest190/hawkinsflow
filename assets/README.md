# Die Icons

Quellen dieses Ordners, Ergebnisse in `public/`. Nichts hier wird ausgeliefert —
gebaut wird von Hand, weil sich das Zeichen praktisch nie ändert und ein
Build-Schritt dafür teurer wäre als der Befehl.

| Quelle                  | Ergebnis                        | Größe | Wofür                                        |
| ----------------------- | ------------------------------- | ----- | -------------------------------------------- |
| `public/favicon.svg`    | `public/icon-192.png`           | 192   | Manifest, `purpose: any` — runde Ecken        |
| `public/favicon.svg`    | `public/icon-512.png`           | 512   | Manifest, `purpose: any` — runde Ecken        |
| `assets/icon-square.svg`| `public/apple-touch-icon.png`   | 180   | iOS-Startbildschirm; iOS maskiert selbst      |
| `assets/icon-square.svg`| `public/icon-maskable-512.png`  | 512   | Manifest, `purpose: maskable` — randlos       |

Neu erzeugen (macOS, ohne zusätzliche Werkzeuge — `qlmanage` rendert SVG):

```sh
for size in 192 512; do
  qlmanage -t -s $size -o /tmp public/favicon.svg
  sips -z $size $size /tmp/favicon.svg.png --out public/icon-$size.png
done

qlmanage -t -s 180 -o /tmp assets/icon-square.svg
sips -z 180 180 /tmp/icon-square.svg.png --out public/apple-touch-icon.png

qlmanage -t -s 512 -o /tmp assets/icon-square.svg
sips -z 512 512 /tmp/icon-square.svg.png --out public/icon-maskable-512.png
```

`qlmanage` liefert eine Vorschau und hält sich nicht immer exakt an die
gewünschte Kantenlänge — `sips -z` zieht sie deshalb hinterher auf das genaue
Maß, das im Manifest steht.
