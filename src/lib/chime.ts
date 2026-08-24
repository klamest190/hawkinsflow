/**
 * Ein kurzer Zweiklang zum Ende einer Übung.
 *
 * Warum überhaupt ein Ton: Die halbe Liste der Übungen sagt „hör auf, wenn es
 * klingelt". Wer dafür aufs Display schauen muss, sitzt nicht mehr still — die
 * Uhr wäre dann eine weitere Sache, die Aufmerksamkeit verlangt, statt sie
 * freizugeben.
 *
 * Erzeugt statt geladen: eine Audiodatei wären hundert Kilobyte für zwei
 * Sekunden Sinuston, und der Ton lässt sich so leise und weich halten, dass er
 * niemanden aus der Stille reißt. Zwei Töne im Quintabstand, der zweite eine
 * Sekunde später, beide mit langer Ausklingzeit.
 *
 * Schlägt fehl, wo der Browser keinen Ton erlaubt — dann bleibt es still, und
 * die Anzeige im Kasten sagt es weiterhin.
 */
export function chime(): void {
  try {
    const audio = new AudioContext()

    // Der Aufruf steht am Ende eines Countdowns, den jemand angetippt hat; die
    // Seite hatte also ihre Geste. Wo der Browser das anders sieht, bleibt der
    // Kontext angehalten und es passiert schlicht nichts.
    void audio.resume()

    for (const [index, frequency] of [528, 792].entries()) {
      const at = audio.currentTime + index * 0.9
      const tone = audio.createOscillator()
      const level = audio.createGain()

      tone.type = 'sine'
      tone.frequency.value = frequency

      // Weich einblenden und lang ausklingen: ein hart gesetzter Ton klickt am
      // Anfang und schneidet am Ende ab.
      level.gain.setValueAtTime(0.0001, at)
      level.gain.exponentialRampToValueAtTime(0.12, at + 0.04)
      level.gain.exponentialRampToValueAtTime(0.0001, at + 2.2)

      tone.connect(level).connect(audio.destination)
      tone.start(at)
      tone.stop(at + 2.4)
    }

    // Der Kontext hält sonst ein Audiogerät offen, bis die Seite geht.
    window.setTimeout(() => void audio.close(), 4000)
  } catch {
    /* Ohne Ton läuft die Übung genauso; die Anzeige sagt es ohnehin. */
  }
}
