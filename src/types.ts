/** Die beiden Sprachen der App. */
export type Language = 'de' | 'en'

/**
 * Was an einer Ebene von der Sprache unabhängig ist: ihre Stelle auf der Skala
 * und ihre Farbe. Diese Werte stehen in `data/levels.ts` und sind das, womit die
 * Auswertung rechnet — sie muss nie wissen, in welcher Sprache jemand liest.
 *
 * `original` gehört bewusst hierher und nicht zu den Texten: Hawkins' Begriffe
 * sind englisch, und zwar in jeder Sprache. Im deutschen Bogen steht deshalb
 * „Mut · Courage", im englischen fällt die Zeile weg, weil sie dort dasselbe
 * Wort zweimal wäre.
 */
export type LevelShape = {
  /** Stabiler Schlüssel — steht in den Fragen und im gespeicherten Ergebnis. */
  id: LevelId
  /** Der Kalibrierungswert, den Hawkins der Ebene gibt (20 … 700). */
  value: number
  /** Hawkins' englischer Originalbegriff. */
  original: string
  /** OKLCH-Farbe der Ebene; treibt Verläufe, Balken und Akzente. */
  color: string
}

/** Was an einer Ebene übersetzt werden muss. Siehe `i18n/levels.ts`. */
export type LevelText = {
  /** Der Name in der gelesenen Sprache, z. B. „Mut" / "Courage". */
  name: string
  /** Die vorherrschende Emotion auf dieser Ebene. */
  emotion: string
  /** Wie die Welt von hier aus aussieht. */
  worldview: string
  /** Zwei, drei Sätze: wie sich das Leben hier anfühlt. */
  essence: string
  /** Woran man erkennt, dass man gerade hier steht. */
  signs: string[]
  /** Was auf dieser Ebene festhält — der Preis, den sie heimlich zahlt. */
  trap: string
  /** Konkrete Schritte auf die nächste Ebene. */
  steps: string[]
  /** Eine Übung, die man heute machen kann. */
  practice: Practice
  /** Ein Satz zum Mitnehmen. */
  mantra: string
}

/**
 * Die praktische Übung einer Ebene. Bewusst kein weiterer Aufzählungspunkt: Die
 * Ebene hat schon zwei Listen (`signs`, `steps`), und eine dritte läse sich wie
 * mehr vom Gleichen. Die Übung ist eine einzelne Sache mit Namen und Dauer —
 * etwas, das man heute anfangen und morgen wiederholen kann.
 */
export type Practice = {
  /** Wie die Übung heißt, z. B. „Zwei Minuten, dann Schluss". */
  name: string
  /** Wie lange und wie oft: „10 Minuten, einmal", „täglich". */
  duration: string
  /** Die Anleitung — zwei bis vier Sätze, konkret genug zum Loslegen. */
  body: string
}

/**
 * Beides zusammen — das, womit die Oberfläche arbeitet. Sie bekommt die Ebenen
 * bereits in einer Sprache und muss deshalb nirgends nachschlagen.
 */
export type Level = LevelShape & LevelText

export type LevelId =
  | 'shame'
  | 'guilt'
  | 'apathy'
  | 'grief'
  | 'fear'
  | 'desire'
  | 'anger'
  | 'pride'
  | 'courage'
  | 'neutrality'
  | 'willingness'
  | 'acceptance'
  | 'reason'
  | 'love'
  | 'joy'
  | 'peace'
  | 'enlightenment'

/** Eine Frage des Bogens ohne ihren Text — der steht in `i18n/questions.ts`. */
export type Question = {
  id: QuestionId
  level: LevelId
}

/** Die Schlüssel q01 … q34, aus der Fragenliste abgeleitet. */
export type QuestionId = string

/** 0 = nie … 4 = fast immer. Der Index in `answerLabels`. */
export type AnswerValue = 0 | 1 | 2 | 3 | 4

/** Antworten liegen als Frage-ID → Wert vor; unbeantwortet heißt: kein Eintrag. */
export type Answers = Partial<Record<QuestionId, AnswerValue>>
