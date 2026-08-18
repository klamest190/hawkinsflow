import { THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Answers, Level } from '../types.ts'

/* Die Ebenenliste kommt von außen herein, statt hier importiert zu werden — sie
   ist inzwischen übersetzt (siehe `i18n/levels.ts`), und die Auswertung soll
   nicht wissen müssen, welche Sprache gerade eingestellt ist. Rang, Wert und ID
   sind in jeder Sprache dieselben, also rechnet sie mit jeder Fassung gleich. */

/** Wie stark eine einzelne Ebene im Antwortbild vertreten ist. */
export type LevelScore = {
  level: Level
  /** 0 … 1 — Mittel der Antworten dieser Ebene, auf die Skala 0…4 bezogen. */
  strength: number
}

export type Result = {
  /** Alle 17 Ebenen mit ihrem Anteil, in der Ordnung der Skala. */
  scores: LevelScore[]
  /** Der Kalibrierungswert, interpoliert zwischen den Ebenen (20 … 700). */
  calibration: number
  /** Die Ebene, auf der die Kalibrierung zu liegen kommt. */
  dominant: Level
  /** Die höchste Ebene, die spürbar erreichbar ist — dein Spielraum nach oben. */
  reach: Level
  /** Die tiefste Ebene, die noch deutlich zieht; null, wenn keine darunter liegt. */
  drag: Level | null
}

/* Antworten sind 0…4; ab hier gilt eine Ebene als deutlich vorhanden. 0.5
   entspricht "manchmal" — darunter ist ein Muster eher Rauschen als Haltung. */
const PRESENT = 0.5

/* Für den Spielraum nach oben liegt die Latte höher: dass man eine hohe Ebene
   "manchmal" erreicht, ist noch kein Ort, an dem man schon gewesen ist. Erst ab
   "oft" ist sie mehr als eine Ahnung. */
const REACHING = 0.6

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
 * Die Kalibrierung entsteht als gewichtetes Mittel der *Ränge* — nicht der
 * Zahlenwerte. Zwischen 600 und 700 liegen 100 Punkte, zwischen 20 und 30 nur
 * zehn; ein Mittel über die Zahlen würde deshalb von den obersten Ebenen
 * regiert. Über den Rang zählt jede Ebene gleich viel, und der Zahlenwert wird
 * erst am Ende zwischen den beiden Nachbarebenen interpoliert.
 */
export function calibrate(levels: Level[], scores: LevelScore[]): number {
  let weightSum = 0
  let rankSum = 0

  scores.forEach((score, rank) => {
    const weight = Math.pow(score.strength, SHARPEN)
    weightSum += weight
    rankSum += weight * rank
  })

  // Alles auf "Nie": kein Gewicht, kein Mittel. Dann steht das Ergebnis am
  // unteren Ende der Skala — mehr gibt der Bogen nicht her.
  if (weightSum === 0) return levels[0].value

  const rank = rankSum / weightSum
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

export function evaluate(levels: Level[], answers: Answers): Result {
  const scores = scoreLevels(levels, answers)
  const calibration = calibrate(levels, scores)
  const dominant = levelAt(levels, calibration)
  const dominantRank = levels.indexOf(dominant)

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
    reach: levels.indexOf(reach) > dominantRank ? reach : dominant,
    drag,
  }
}

/** Wie viele Fragen bereits beantwortet sind. */
export function answeredCount(answers: Answers): number {
  return QUESTIONS.filter((question) => answers[question.id] !== undefined).length
}
