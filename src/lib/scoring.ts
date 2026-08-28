import { THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Answers, Level } from '../types.ts'

/* Die Ebenenliste kommt von außen herein, statt hier importiert zu werden — sie
   ist inzwischen übersetzt (siehe `i18n/levels.ts`), und die Auswertung soll
   nicht wissen müssen, welche Sprache gerade eingestellt ist. Rang, Wert und ID
   sind in jeder Sprache dieselben, also rechnet sie mit jeder Fassung gleich. */

/**
 * Ein Vorbehalt gegen das Antwortbild — nicht gegen die Rechnung.
 *
 * Die Auswertung liefert zu jedem Bogen ein Ergebnis, auch zu einem, in dem
 * keine Auskunft steckt. Wer überall dasselbe ankreuzt, bekommt heute einen
 * vollständigen Befund: „Mut, Scham zieht dich herunter, du reichst bis
 * Erleuchtung." In diesen Antworten steht nichts davon — vier der fünf
 * gleichförmigen Muster liefern sogar denselben Befund, weil sich gleiche
 * Gewichte auf allen Ebenen zur Mitte der Skala aufheben.
 *
 * - `uniform`  — alle beantworteten Aussagen tragen denselben Wert. Daraus ist
 *                nichts zu lesen; die Ergebnisseite zeigt deshalb keinen Befund,
 *                und der Durchgang kommt nicht in den Verlauf.
 * - `bothEnds` — die untersten und die obersten Ebenen leuchten gleichzeitig.
 *                Beides gleichzeitig gibt es nicht: Wer fast immer ausweicht,
 *                spricht nicht fast immer an. Der Befund wird gezeigt, aber mit
 *                einem Vorbehalt davor.
 * - `null`     — nichts spricht dagegen, das Ergebnis zu lesen.
 */
export type Reservation = 'uniform' | 'bothEnds' | null

/** Wie stark eine einzelne Ebene im Antwortbild vertreten ist. */
export type LevelScore = {
  level: Level
  /** 0 … 1 — Mittel der Antworten dieser Ebene, auf die Skala 0…4 bezogen. */
  strength: number
}

export type Result = {
  /** Alle 17 Ebenen mit ihrem Anteil, in der Ordnung der Skala. */
  scores: LevelScore[]
  /**
   * Der interpolierte Zahlenwert (20 … 700). Er entscheidet, welche Ebene die
   * dominante ist — angezeigt wird er nicht.
   *
   * Eine dreistellige Zahl aus 34 Kreuzen sieht aus wie ein Messwert und ist
   * keiner: zwei Aussagen je Ebene, alle gleichgerichtet, keine Normstichprobe.
   * Was der Bogen trägt, ist eine Ebene und die Richtung, in die es von dort
   * kippt — und das steht in `dominant` und `band`.
   */
  calibration: number
  /** Die Ebene, auf der die Kalibrierung zu liegen kommt. */
  dominant: Level
  /**
   * Die beiden benachbarten Ebenen, zwischen denen der Schwerpunkt liegt — das,
   * was die Oberfläche anstelle der Zahl zeigt. Immer zwei verschiedene, immer
   * mit `dominant` als einer von beiden.
   */
  band: [Level, Level]
  /** Die höchste Ebene, die spürbar erreichbar ist — dein Spielraum nach oben. */
  reach: Level
  /** Die tiefste Ebene, die noch deutlich zieht; null, wenn keine darunter liegt. */
  drag: Level | null
  /** Was gegen das Lesen dieses Ergebnisses spricht; null, wenn nichts. */
  reservation: Reservation
}

/* Antworten sind 0…4; ab hier gilt eine Ebene als deutlich vorhanden. 0.5
   entspricht "manchmal" — darunter ist ein Muster eher Rauschen als Haltung. */
const PRESENT = 0.5

/* Für den Spielraum nach oben liegt die Latte höher: dass man eine hohe Ebene
   "manchmal" erreicht, ist noch kein Ort, an dem man schon gewesen ist. Erst ab
   "oft" ist sie mehr als eine Ahnung. */
const REACHING = 0.6

/* Ab so vielen beantworteten Aussagen gilt lauter Gleiches als durchgeklickt.
   Darunter nicht: Fünf gleiche Kreuze hintereinander sind Zufall, und der Bogen
   lässt sich absichtlich abbrechen und fortsetzen. Acht Aussagen verteilen sich
   über mindestens sechs verschiedene Ebenen — dass die alle dasselbe Kreuz
   verdienen, kommt in der Sache nicht vor. */
const UNIFORM_MIN = 8

/* Wie viele Ebenen an jedem Ende der Skala für den Widerspruch zählen: unten
   Scham bis Angst (alle bis 100), oben Liebe bis Erleuchtung (alle ab 500).
   Dazwischen liegt genug Platz, dass ein Mensch beides zugleich sein könnte —
   an den Enden nicht mehr. */
const BOTTOM = 5
const TOP = 4

/* Ab hier gilt ein Ende als deutlich beleuchtet. Höher als `PRESENT`, weil ein
   Widerspruch erst einer ist, wenn beide Seiten laut sind. */
const LOUD = 0.7

/* Der Exponent schärft das Bild: ohne ihn zöge jede schwach angekreuzte Ebene
   den Schnitt zur Mitte, und praktisch jedes Ergebnis läge bei Akzeptanz. Mit
   der dritten Potenz zählt eine Ebene mit 0.8 rund viermal so viel wie eine mit
   0.5, und das Ergebnis folgt dem, was wirklich ausgeprägt ist. */
const SHARPEN = 3

/**
 * Mittelwert der Antworten je Ebene, normiert auf 0…1.
 * Unbeantwortete Fragen zählen nicht mit — ein halb ausgefüllter Bogen ergibt
 * so ein vorläufiges, aber nicht verfälschtes Bild.
 */
export function scoreLevels(levels: Level[], answers: Answers): LevelScore[] {
  return levels.map((level) => {
    const values = QUESTIONS.filter((question) => question.level === level.id)
      .map((question) => answers[question.id])
      .filter((value): value is NonNullable<typeof value> => value !== undefined)

    const strength =
      values.length === 0
        ? 0
        : values.reduce<number>((sum, value) => sum + value, 0) / (values.length * 4)

    return { level, strength }
  })
}

/**
 * Der Schwerpunkt als gewichtetes Mittel der *Ränge* — nicht der Zahlenwerte.
 * Zwischen 600 und 700 liegen 100 Punkte, zwischen 20 und 30 nur zehn; ein
 * Mittel über die Zahlen würde deshalb von den obersten Ebenen regiert. Über den
 * Rang zählt jede Ebene gleich viel.
 *
 * Das Ergebnis ist gebrochen: 8.4 heißt "im unteren Drittel von Mut". Genau
 * diese Nachkommastelle sagt, zu welchem Nachbarn hin das Bild kippt — mehr
 * Aussagekraft hat sie nicht, und deshalb wird sie nirgends angezeigt.
 */
export function focusRank(scores: LevelScore[]): number {
  let weightSum = 0
  let rankSum = 0

  scores.forEach((score, rank) => {
    const weight = Math.pow(score.strength, SHARPEN)
    weightSum += weight
    rankSum += weight * rank
  })

  // Alles auf "Nie": kein Gewicht, kein Mittel. Dann steht das Ergebnis am
  // unteren Ende der Skala — mehr gibt der Bogen nicht her.
  if (weightSum === 0) return 0

  return rankSum / weightSum
}

/**
 * Der Rang, umgerechnet in Hawkins' Zahlen — zwischen den beiden Nachbarebenen
 * interpoliert. Diese Zahl bestimmt, welche Ebene die dominante ist, und sie
 * wird bewusst nicht angezeigt: siehe die Anmerkung an `Result.calibration`.
 */
export function calibrate(levels: Level[], scores: LevelScore[]): number {
  const rank = focusRank(scores)
  const lower = levels[Math.floor(rank)]
  const upper = levels[Math.min(Math.ceil(rank), levels.length - 1)]
  const fraction = rank - Math.floor(rank)

  return Math.round(lower.value + (upper.value - lower.value) * fraction)
}

/** Die Ebene, auf der ein Kalibrierungswert liegt: die höchste, die er erreicht. */
export function levelAt(levels: Level[], calibration: number): Level {
  let found = levels[0]
  for (const level of levels) {
    if (calibration >= level.value) found = level
  }
  return found
}

/**
 * Der Vorbehalt gegen ein Antwortbild — siehe `Reservation`.
 *
 * Bewusst am Antwortbild und nicht am Ergebnis gemessen: Ob ein Befund zu lesen
 * ist, entscheidet sich davor. Ein Ergebnis, das aus lauter gleichen Kreuzen
 * gerechnet wurde, sieht danach genauso aus wie ein echtes — daran ist es nicht
 * mehr zu erkennen.
 */
export function reservationOf(scores: LevelScore[], answers: Answers): Reservation {
  const given = QUESTIONS.map((question) => answers[question.id]).filter(
    (value): value is NonNullable<typeof value> => value !== undefined,
  )

  if (given.length >= UNIFORM_MIN && given.every((value) => value === given[0])) return 'uniform'

  const meanOf = (from: number, to: number): number =>
    scores.slice(from, to).reduce((sum, score) => sum + score.strength, 0) / (to - from)

  const bottom = meanOf(0, BOTTOM)
  const top = meanOf(scores.length - TOP, scores.length)

  return bottom >= LOUD && top >= LOUD ? 'bothEnds' : null
}

export function evaluate(levels: Level[], answers: Answers): Result {
  const scores = scoreLevels(levels, answers)
  const calibration = calibrate(levels, scores)
  const dominant = levelAt(levels, calibration)
  const dominantRank = levels.indexOf(dominant)

  // Das Band: die dominante Ebene und die Nachbarin auf der Seite, zu der das
  // Antwortbild neigt. Liegt der Schwerpunkt im unteren Teil seiner Ebene, ist
  // das die darunter, sonst die darüber — mehr Auflösung als "zwischen diesen
  // beiden" gibt der Bogen nicht her.
  //
  // Das `length - 2` fängt das obere Ende ab: bei Erleuchtung gibt es keine
  // Nachbarin darüber, das Band ist dort Frieden–Erleuchtung. So sind es immer
  // zwei verschiedene Ebenen und die Oberfläche braucht keinen Sonderfall.
  const leansDown = focusRank(scores) - dominantRank < 0.5
  const bandStart = Math.min(
    Math.max(leansDown ? dominantRank - 1 : dominantRank, 0),
    levels.length - 2,
  )
  const band: [Level, Level] = [levels[bandStart], levels[bandStart + 1]]

  // Die höchste Ebene, die überhaupt erreichbar scheint — mindestens die
  // dominante, denn unter ihr kann der Spielraum nicht liegen.
  const reach = scores.filter((score) => score.strength >= REACHING).at(-1)?.level ?? dominant

  // Was von unten zieht: die tiefste deutlich vorhandene Ebene unterhalb der
  // dominanten. Genau dort liegt in der Regel die eigentliche Arbeit.
  //
  // Nur unterhalb der Schwelle: über 200 zehrt keine Ebene mehr. Wer bei
  // Bereitschaft steht und daneben viel Mut zeigt, wird von diesem Mut nicht
  // heruntergezogen — ihn dort als Ballast auszuweisen wäre schlicht falsch.
  const drag =
    scores.find(
      (score, rank) =>
        rank < dominantRank && score.level.value < THRESHOLD && score.strength >= PRESENT,
    )?.level ?? null

  return {
    scores,
    calibration,
    dominant,
    band,
    reach: levels.indexOf(reach) > dominantRank ? reach : dominant,
    drag,
    reservation: reservationOf(scores, answers),
  }
}

/** Wie viele Fragen bereits beantwortet sind. */
export function answeredCount(answers: Answers): number {
  return QUESTIONS.filter((question) => answers[question.id] !== undefined).length
}
