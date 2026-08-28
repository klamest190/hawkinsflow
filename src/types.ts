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
  /** Drei Übungen: eine zum Schreiben, eine zum Tun, eine zum Sitzen. */
  practices: Practices
  /** Ein Satz zum Mitnehmen. */
  mantra: string
}

/**
 * Woraus eine Übung besteht. Die drei Sorten sind kein Etikett, sondern der
 * Grund, warum es überhaupt drei sind: Ein Mensch, der bei Zorn herauskommt,
 * bekommt sonst dreimal einen Stift in die Hand, obwohl das Naheliegendste wäre,
 * einmal um den Block zu gehen und einmal still sitzen zu bleiben.
 *
 * - `writing` — etwas wird aufgeschrieben; wirkt, weil es aus dem Kopf heraus
 *   auf Papier muss, wo es sich nicht mehr von selbst umschreibt.
 * - `action` — etwas geschieht draußen, vor anderen, mit Folgen.
 * - `sitting` — nichts geschieht; die Übung ist das Bleiben.
 */
export type PracticeKind = 'writing' | 'action' | 'sitting'

/**
 * Die praktische Übung einer Ebene: eine einzelne Sache mit Namen und Dauer —
 * etwas, das man heute anfangen und morgen wiederholen kann.
 */
export type Practice = {
  /** Schreiben, Tun oder Sitzen — jede Ebene hat von jeder Sorte genau eine. */
  kind: PracticeKind
  /** Wie die Übung heißt, z. B. „Zwei Minuten, dann Schluss". */
  name: string
  /** Wie lange und wie oft: „10 Minuten, einmal", „täglich". */
  duration: string
  /**
   * Die Länge in Minuten — der Wert, mit dem die Uhr im Übungskasten läuft.
   *
   * Fehlt dort, wo die Übung keine feste Länge hat („einmal pro Fall", „bei
   * jedem Impuls"); dann steht auch keine Uhr dabei. Bewusst als eigenes Feld
   * und nicht aus `duration` gelesen: Die Zeile ist Fließtext und in zwei
   * Sprachen verschieden gebaut — „20 Minuten täglich" und „20 minutes daily"
   * ließen sich noch fangen, „so lange es dauert" nicht mehr.
   */
  minutes?: number
  /** Die Anleitung — zwei bis vier Sätze, konkret genug zum Loslegen. */
  body: string
}

/**
 * Genau drei, immer in derselben Reihenfolge: schreiben, tun, sitzen.
 *
 * Als Tupel und nicht als Liste, damit der Compiler eine fehlende Übung meldet.
 * Die Reihenfolge ist auch die Reihenfolge der Karten — sie geht von dem, was
 * man allein am Tisch tun kann, zu dem, was Mut kostet, und endet in der Stille.
 */
export type Practices = [Practice, Practice, Practice]

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

/**
 * Die acht Ebenen unter der Schwelle von 200.
 *
 * Sie stehen hier als eigener Typ und nicht als Kommentar, weil der
 * Moment-Bogen ausschließlich mit ihnen arbeitet: Wer ihn aufmacht, steckt
 * fest, und über der Schwelle steckt niemand fest. Ein `Record` über diesen Typ
 * lässt den Compiler dann zählen — eine fehlende Rückfrage fällt beim Bauen auf
 * und nicht im Gebrauch.
 *
 * Dass die Aufzählung wirklich der Skala entspricht, prüft ein Test gegen
 * `BELOW_THRESHOLD` in `data/levels.ts`; von Hand gepflegte Listen laufen sonst
 * irgendwann auseinander.
 */
export type BelowLevelId = Extract<
  LevelId,
  'shame' | 'guilt' | 'apathy' | 'grief' | 'fear' | 'desire' | 'anger' | 'pride'
>

/**
 * Ein abgeschlossener Durchgang durch den Moment-Bogen.
 *
 * Gespeichert wird nur, wann und welche Ebene — nicht, was dabei gedacht wurde.
 * Die Rückfrage in Schritt drei ist absichtlich kein Formular: Was man
 * aufschreibt, schreibt man für einen Leser, und der einzige, der hier lesen
 * würde, wäre man in vier Wochen selbst.
 */
export type Moment = {
  /** ISO-Zeitpunkt des Abschlusses. */
  taken: string
  /** Die Ebene, mit der der Durchgang begonnen hat. */
  level: BelowLevelId
}

/** Die Momente, ältester zuerst. */
export type Moments = Moment[]

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

/**
 * Ein Wenn-Dann-Plan zu einer Ebene — ein Vorsatz, der seinen Auslöser schon
 * kennt.
 *
 * Die Schritte einer Ebene sagen, *was* zu tun ist. Das ist der Teil, an dem
 * Vorsätze regelmäßig scheitern: Sie stehen bereit, aber niemand sagt ihnen,
 * wann sie dran sind, und im entscheidenden Moment ist der Kopf mit dem Moment
 * beschäftigt. Ein Satz der Form „Wenn X, dann Y" verlagert die Entscheidung
 * nach vorn — die Situation ruft die Handlung ab, statt dass man sie jedes Mal
 * neu treffen müsste.
 *
 * Deshalb sind es zwei Felder und nicht eines: ein Vorhaben ohne Auslöser wäre
 * wieder nur ein guter Wille.
 */
export type Plan = {
  /** Zu welcher Ebene der Plan entstanden ist. */
  level: LevelId
  /** Der Auslöser: eine Situation, eine Uhrzeit, ein Ort. */
  when: string
  /** Was in genau diesem Moment geschieht. */
  then: string
  /** ISO-Datum der Anlage — die Startseite zeigt, seit wann der Plan steht. */
  created: string
}

/** Höchstens ein Plan je Ebene; mehr wären eine Liste und kein Vorsatz. */
export type Plans = Partial<Record<LevelId, Plan>>

/**
 * Ein abgeschlossener Durchgang, wie er in der Historie liegt.
 *
 * Gespeichert wird die Ebene und nicht die Antworten: Wer wissen will, wo er im
 * Mai stand, will keinen alten Bogen wieder aufmachen. Der Kalibrierungswert
 * kommt mit, weil die Linie sonst nur in Stufen springen könnte — angezeigt
 * wird er weiterhin nirgends.
 */
export type HistoryEntry = {
  /** ISO-Zeitpunkt des Abschlusses. */
  taken: string
  /** Die dominante Ebene dieses Durchgangs. */
  level: LevelId
  /** Der interpolierte Wert (20 … 700) — trägt die Höhe der Linie. */
  calibration: number
  /** Wie viele Fragen beantwortet waren; unter allen gilt ein Vorbehalt. */
  answered: number
}

/** Die Durchgänge, ältester zuerst. */
export type History = HistoryEntry[]
