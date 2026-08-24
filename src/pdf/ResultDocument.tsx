import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import interItalic from '@fontsource/inter/files/inter-latin-400-italic.woff?url'
import interNormal from '@fontsource/inter/files/inter-latin-400-normal.woff?url'
import interSemi from '@fontsource/inter/files/inter-latin-600-normal.woff?url'
import interBold from '@fontsource/inter/files/inter-latin-700-normal.woff?url'
import { nextLevelId, THRESHOLD } from '../data/levels.ts'
import { QUESTIONS } from '../data/questions.ts'
import type { Copy } from '../i18n/copy.ts'
import { levelIn } from '../i18n/levels.ts'
import { mix, oklchToHex } from '../lib/oklch.ts'
import type { Result as Evaluation } from '../lib/scoring.ts'
import type { Language, Level, Plan } from '../types.ts'

/* Das Ergebnis als Dokument.
 *
 * Der Bildschirm ist fast schwarz, das Papier ist weiß — dieselben Inhalte in
 * denselben Farben umzusetzen ginge schief. Was hier bleibt, ist die Ordnung des
 * Ergebnisschirms und die Ebenenfarbe als Akzent; was sich ändert, ist der
 * Grund und die Helligkeit der Farbe (siehe `levelInk`).
 *
 * Diese Datei wird bewusst von nichts statisch importiert. `@react-pdf` wiegt
 * rund ein Megabyte, und eine App, die in einer Sekunde startet, soll das nicht
 * für einen Knopf bezahlen, den nicht jeder drückt. `exportResult.ts` holt sie
 * per `import()` beim Klick.
 */

Font.register({
  family: 'Inter',
  fonts: [
    { src: interNormal, fontWeight: 400 },
    { src: interItalic, fontWeight: 400, fontStyle: 'italic' },
    { src: interSemi, fontWeight: 600 },
    { src: interBold, fontWeight: 700 },
  ],
})

/* Ohne das trennt `@react-pdf` deutsche Wörter nach englischen Regeln — aus
   „Selbstwahrnehmung" wird dann „Selbstwahrneh-mung". Lieber ein breiterer
   Flattersatz als eine falsche Trennung. */
Font.registerHyphenationCallback((word) => [word])

/* Die Neutralen des PDFs. Wie in der App leicht ins Violette gezogen, damit der
   Regenbogen der Ebenen nicht auf einem fremden Grau sitzt — nur eben von der
   hellen Seite her gedacht. */
const PAPER = '#ffffff'
const INK = '#1a1523'
const INK_SOFT = '#4c4459'
const INK_FAINT = '#7d7489'
const RULE = '#e5e1eb'
const TRACK = '#efecf4'

/**
 * Die Ebenenfarbe als Schriftfarbe.
 *
 * Die Farben in `data/levels.ts` sind für einen fast schwarzen Grund gemacht:
 * Mut ist ein helles Gold, auf Weiß gerade noch 1,7:1 — unlesbar. Der Deckel bei
 * 0.5 lässt den Farbton stehen und nimmt nur die Helligkeit heraus; damit
 * kommt jede der 17 Ebenen auf mindestens 5,2:1, nachgerechnet in
 * `lib/oklch.test.ts`.
 *
 * Flächen — Balken, Bandstreifen, Tönungen — bekommen weiterhin die volle
 * Farbe: dort trägt sie keine Schrift.
 */
const levelInk = (level: Level): string => oklchToHex(level.color, 0.5)
const levelFill = (level: Level): string => oklchToHex(level.color)

const styles = StyleSheet.create({
  page: {
    backgroundColor: PAPER,
    color: INK,
    fontFamily: 'Inter',
    fontSize: 9.5,
    /* Hier stand `lineHeight: 1.5`, und daran ist die Seitenzahl in der
       Fußzeile lange gescheitert: Ein `lineHeight` auf der Seite verhindert,
       dass `@react-pdf` die `render`-Funktionen fester Elemente überhaupt
       aufruft — der Text blieb leer, ohne Fehler, ohne Warnung. Der
       Zeilenabstand steht deshalb an den Fließtext-Stilen selbst; Überschriften
       und Beschriftungen fahren mit dem Wert der Schrift ohnehin besser. */
    paddingTop: 38,
    paddingBottom: 46,
    paddingHorizontal: 48,
  },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  wordmark: { fontSize: 11, fontWeight: 700, letterSpacing: 0.6 },
  headerDate: { fontSize: 9, color: INK_SOFT },
  headerRule: { height: 2, marginTop: 7, marginBottom: 26 },

  eyebrow: { fontSize: 7.5, fontWeight: 600, letterSpacing: 1.4, color: INK_FAINT },
  // `lineHeight` ausdrücklich: die Voreinstellung der Seite gilt für 9,5 pt und
  // lässt eine 34-pt-Zeile in die darunter hineinlaufen.
  levelName: { fontSize: 34, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.15, marginTop: 6 },
  levelMeta: { fontSize: 9.5, color: INK_SOFT, marginTop: 3 },

  band: { flexDirection: 'row', height: 7, marginTop: 20 },
  bandLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  bandLabel: { fontSize: 8.5, fontWeight: 600 },
  note: { fontSize: 8.5, lineHeight: 1.5, color: INK_FAINT, marginTop: 9 },

  chips: { flexDirection: 'row', gap: 7, marginTop: 16 },
  chip: {
    borderWidth: 0.7,
    borderColor: RULE,
    borderRadius: 9,
    paddingVertical: 3.5,
    paddingHorizontal: 9,
    fontSize: 8.5,
    color: INK_SOFT,
  },

  verdict: { fontSize: 10, lineHeight: 1.5, marginTop: 16, color: INK },

  sectionTitle: {
    fontSize: 7.5,
    fontWeight: 700,
    letterSpacing: 1.4,
    marginBottom: 10,
  },
  section: { marginTop: 16 },

  bar: { flexDirection: 'row', alignItems: 'center', marginBottom: 3.5 },
  barName: { width: 78, fontSize: 8.5, textAlign: 'right', paddingRight: 8, color: INK_SOFT },
  barTrack: { flexGrow: 1, height: 6, backgroundColor: TRACK, borderRadius: 3 },
  barFill: { height: 6, borderRadius: 3 },
  barValue: { width: 26, fontSize: 8, textAlign: 'right', color: INK_FAINT },
  barMark: { width: 52, fontSize: 7.5, paddingLeft: 7, color: INK_FAINT },

  pair: { flexDirection: 'row', gap: 12 },
  box: {
    flexBasis: 0,
    flexGrow: 1,
    borderWidth: 0.7,
    borderColor: RULE,
    borderRadius: 5,
    padding: 12,
  },
  boxTitle: { fontSize: 7.5, fontWeight: 700, letterSpacing: 1.2, color: INK_FAINT },
  boxLevel: { fontSize: 13, fontWeight: 700, marginTop: 5, marginBottom: 5 },
  boxBody: { fontSize: 8.5, lineHeight: 1.5, color: INK_SOFT },

  essence: { fontSize: 10.5, lineHeight: 1.5, marginBottom: 16 },
  subTitle: { fontSize: 7.5, fontWeight: 700, letterSpacing: 1.2, marginBottom: 7, marginTop: 14 },

  signRow: { flexDirection: 'row', marginBottom: 4 },
  dot: { width: 2.5, height: 2.5, borderRadius: 1.25, marginTop: 5, marginRight: 7 },
  signText: { flexBasis: 0, flexGrow: 1, fontSize: 9, lineHeight: 1.5, color: INK_SOFT },

  trap: { borderLeftWidth: 2, paddingLeft: 10, fontSize: 9, lineHeight: 1.5, fontStyle: 'italic', color: INK_SOFT },

  stepRow: { flexDirection: 'row', marginBottom: 6 },
  // Der Kreis ist ein View und die Ziffer ein Text darin. Beides in einem
  // einzigen Text mit fester Höhe und `paddingTop` gab leere Kreise: die Zeile
  // wurde am unteren Rand abgeschnitten.
  stepNumber: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 0.8,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: { fontSize: 7.5, fontWeight: 700, lineHeight: 1 },
  stepText: { flexBasis: 0, flexGrow: 1, fontSize: 9, lineHeight: 1.5 },

  practice: { borderRadius: 5, padding: 12 },
  practiceHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  practiceName: { fontSize: 11, fontWeight: 700 },
  practiceDuration: { fontSize: 7.5, fontWeight: 600, letterSpacing: 0.8 },
  practiceBody: { fontSize: 9, lineHeight: 1.5, color: INK_SOFT, marginTop: 6 },

  mantra: {
    borderWidth: 0.7,
    borderColor: RULE,
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    fontSize: 11,
    lineHeight: 1.4,
    textAlign: 'center',
  },

  planBox: { borderWidth: 0.7, borderRadius: 5, padding: 14 },
  planLine: { fontSize: 11, lineHeight: 1.6 },
  planKey: { fontWeight: 700 },

  nextBox: { borderWidth: 0.7, borderColor: RULE, borderRadius: 5, padding: 14 },
  nextName: { fontSize: 15, fontWeight: 700 },
  nextMeta: { fontSize: 8.5, color: INK_SOFT, marginTop: 2 },
  nextBody: { fontSize: 9, lineHeight: 1.5, color: INK_SOFT, marginTop: 6 },

  disclaimer: { fontSize: 7.5, color: INK_FAINT, marginTop: 12, lineHeight: 1.55 },

  /* Zwei einzeln gesetzte Texte statt einer Zeile mit `space-between`: ein
     absolut gesetztes View mit `fixed` blieb leer. Links und rechts verankert
     bekommt jeder Text die volle Zeilenbreite und richtet sich an seiner Seite
     aus, ohne umzubrechen. */
  // Ohne `right`: der linke Text ist nur so breit wie sein Inhalt. Spannten
  // beide Texte die volle Zeile, blieb der rechte unsichtbar.
  footerLeft: { position: 'absolute', bottom: 26, left: 48, fontSize: 7.5, color: INK_FAINT },
  footerRight: {
    position: 'absolute',
    bottom: 26,
    left: 48,
    right: 48,
    textAlign: 'right',
    fontSize: 7.5,
    color: INK_FAINT,
  },
  footerRule: { position: 'absolute', bottom: 42, left: 48, right: 48, height: 0.7, backgroundColor: RULE },
})

/** Eine kleine, gesperrte Überschrift in der Ebenenfarbe. */
function SectionTitle({ children, color }: { children: string; color: string }) {
  return <Text style={[styles.sectionTitle, { color }]}>{children.toUpperCase()}</Text>
}

/**
 * Das Band zwischen den beiden Nachbarebenen.
 *
 * Auf dem Bildschirm ist das ein `linear-gradient`; Verläufe kennt `@react-pdf`
 * nicht. Vierzig schmale Streifen, deren Farbe Schritt für Schritt von der einen
 * zur anderen wandert, sehen aus einem halben Meter genauso aus.
 */
function Band({ from, to }: { from: string; to: string }) {
  const SLICES = 40

  return (
    <View style={styles.band}>
      {Array.from({ length: SLICES }, (_, index) => (
        <View
          key={index}
          style={{
            flexGrow: 1,
            // Eine halbe Einheit Überlappung. Ohne sie stehen zwischen den
            // Streifen weiße Haarlinien: die Kanten fallen auf gebrochene
            // Punktwerte, und der Setzer rundet jede für sich.
            marginRight: index === SLICES - 1 ? 0 : -0.5,
            backgroundColor: mix(from, to, index / (SLICES - 1)),
          }}
        />
      ))}
    </View>
  )
}

export type ResultDocumentProps = {
  result: Evaluation
  language: Language
  t: Copy
  answered: number
  plan: Plan | null
  /** Der Tag, an dem exportiert wird — steht im Kopf und in jeder Fußzeile. */
  createdAt: Date
}

export function ResultDocument({
  result,
  language,
  t,
  answered,
  plan,
  createdAt,
}: ResultDocumentProps) {
  const { band, calibration, dominant, drag, reach, scores } = result
  const nextId = nextLevelId(dominant.id)
  const next = nextId === null ? null : levelIn(language, nextId)
  const courage = levelIn(language, 'courage').name

  const accent = levelInk(dominant)
  const tint = mix(levelFill(dominant), PAPER, 0.9)

  /* Britisches Englisch, weil die Übersetzung der App es ist („recognise",
     „centre") — und dort steht der Tag vor dem Monat, wie im Deutschen. */
  const dateLong = new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(createdAt)

  return (
    <Document
      title={`${t.appName} — ${dominant.name}, ${dateLong}`}
      author={t.appName}
      subject={t.pdfSubtitle}
      creationDate={createdAt}
    >
      <Page size="A4" style={styles.page}>
        {/* ── Kopf ─────────────────────────────────────────────────────────
            Der Tag steht hier zum ersten Mal. Ein Blatt, das aus dem Drucker
            kommt, weiß sonst nicht mehr, wann es entstanden ist. */}
        <View style={styles.header}>
          <Text style={styles.wordmark}>{t.appName}</Text>
          <Text style={styles.headerDate}>{dateLong}</Text>
        </View>
        <View style={[styles.headerRule, { backgroundColor: accent }]} />

        {/* ── Der Schwerpunkt ────────────────────────────────────────────── */}
        <View wrap={false}>
          <Text style={styles.eyebrow}>{t.focusLabel.toUpperCase()}</Text>
          <Text style={[styles.levelName, { color: accent }]}>{dominant.name}</Text>
          <Text style={styles.levelMeta}>
            {dominant.name === dominant.original
              ? `${dominant.value}`
              : `${dominant.original} · ${dominant.value}`}
          </Text>

          <Band from={levelFill(band[0])} to={levelFill(band[1])} />
          <View style={styles.bandLabels}>
            <Text style={[styles.bandLabel, { color: levelInk(band[0]) }]}>
              {band[0].name} · {band[0].value}
            </Text>
            <Text style={[styles.bandLabel, { color: levelInk(band[1]) }]}>
              {band[1].name} · {band[1].value}
            </Text>
          </View>
          <Text style={styles.note}>{t.bandNote(band[0].name, band[1].name, QUESTIONS.length)}</Text>

          <View style={styles.chips}>
            <Text style={styles.chip}>
              {t.emotionLabel}: {dominant.emotion}
            </Text>
            <Text style={styles.chip}>
              {t.worldviewLabel}: {dominant.worldview}
            </Text>
          </View>

          <Text style={styles.verdict}>
            {calibration >= THRESHOLD
              ? t.aboveThreshold(THRESHOLD)
              : t.belowThreshold(THRESHOLD, courage)}
          </Text>
          {answered < QUESTIONS.length && (
            <Text style={styles.note}>{t.partial(answered, QUESTIONS.length)}</Text>
          )}
        </View>

        {/* ── Das Profil ──────────────────────────────────────────────────
            Siebzehn Balken, oben die höchste Ebene — wie auf dem Schirm.

            Die Oberfläche markiert mit ◆ und ↓. Diese Zeichen liegen in keiner
            der üblichen PDF-Schriften verlässlich vor und kämen als leeres
            Rechteck heraus; hier markieren stattdessen Fettung und ein Wort. */}
        <View style={styles.section}>
          <SectionTitle color={accent}>{t.profileTitle}</SectionTitle>
          {[...scores].reverse().map(({ level, strength }) => {
            const isDominant = level.id === dominant.id
            const isDrag = level.id === drag?.id

            return (
              <View key={level.id} style={styles.bar}>
                <Text
                  style={[
                    styles.barName,
                    isDominant ? { fontWeight: 700, color: levelInk(level) } : {},
                  ]}
                >
                  {level.name}
                </Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        // Auch eine Null bleibt als Strich sichtbar — sonst sähe
                        // die Zeile aus, als wäre sie nicht ausgewertet worden.
                        width: `${Math.max(strength * 100, 1.5)}%`,
                        backgroundColor: levelFill(level),
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barValue}>{level.value}</Text>
                <Text style={styles.barMark}>
                  {isDominant ? t.pdfMarkFocus : isDrag ? t.pdfMarkDrag : ''}
                </Text>
              </View>
            )
          })}
        </View>

        {/* ── Was zieht und was trägt ─────────────────────────────────────
            Dieselbe Bedingung wie auf dem Schirm: beides kann fehlen. */}
        {(drag !== null || reach.id !== dominant.id) && (
          <View style={[styles.section, styles.pair]} wrap={false}>
            {drag !== null && (
              <View style={styles.box}>
                <Text style={styles.boxTitle}>{t.dragTitle.toUpperCase()}</Text>
                <Text style={[styles.boxLevel, { color: levelInk(drag) }]}>
                  {drag.name} · {drag.value}
                </Text>
                <Text style={styles.boxBody}>
                  {t.dragBody(drag.trap.charAt(0).toLowerCase() + drag.trap.slice(1))}
                </Text>
              </View>
            )}
            {reach.id !== dominant.id && (
              <View style={styles.box}>
                <Text style={styles.boxTitle}>{t.reachTitle.toUpperCase()}</Text>
                <Text style={[styles.boxLevel, { color: levelInk(reach) }]}>
                  {reach.name} · {reach.value}
                </Text>
                <Text style={styles.boxBody}>{t.reachBody}</Text>
              </View>
            )}
          </View>
        )}

        {/* ── Die Ebene im Detail ─────────────────────────────────────────
            Der Teil, wegen dem sich das Ausdrucken lohnt: hier steht, was zu
            tun ist. Er darf umbrechen, die einzelnen Kästen nicht — ein
            erzwungener Seitenwechsel davor ließ ein Drittel Seite eins leer. */}
        <View style={styles.section}>
          <View wrap={false}>
            <SectionTitle color={accent}>{t.levelHeading(dominant.value, dominant.name)}</SectionTitle>
            <Text style={styles.essence}>{dominant.essence}</Text>
          </View>

          <Text style={[styles.subTitle, { color: accent }]}>{t.signsHeading.toUpperCase()}</Text>
          {dominant.signs.map((sign) => (
            <View key={sign} style={styles.signRow}>
              <View style={[styles.dot, { backgroundColor: accent }]} />
              <Text style={styles.signText}>{sign}</Text>
            </View>
          ))}

          <Text style={[styles.subTitle, { color: accent }]}>{t.trapHeading.toUpperCase()}</Text>
          <Text style={[styles.trap, { borderLeftColor: accent }]}>{dominant.trap}</Text>

          <Text style={[styles.subTitle, { color: accent }]}>
            {(next ? t.wayTo(next.name) : t.wayEnds).toUpperCase()}
          </Text>
          {dominant.steps.map((step, position) => (
            <View key={step} style={styles.stepRow} wrap={false}>
              <View style={[styles.stepNumber, { borderColor: accent }]}>
                <Text style={[styles.stepNumberText, { color: accent }]}>{position + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}

          <Text style={[styles.subTitle, { color: accent }]}>{t.practiceHeading.toUpperCase()}</Text>
          <View style={[styles.practice, { backgroundColor: tint }]} wrap={false}>
            <View style={styles.practiceHead}>
              <Text style={styles.practiceName}>{dominant.practice.name}</Text>
              <Text style={[styles.practiceDuration, { color: accent }]}>
                {dominant.practice.duration.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.practiceBody}>{dominant.practice.body}</Text>
          </View>

          <Text style={styles.mantra} wrap={false}>
            {language === 'de' ? `„${dominant.mantra}“` : `“${dominant.mantra}”`}
          </Text>
        </View>

        {/* ── Der Wenn-Dann-Plan ──────────────────────────────────────────
            Nur, wenn einer steht. Ein leeres Formular gehört nicht in ein
            Dokument, das man wegheftet. */}
        {plan !== null && (
          <View style={styles.section} wrap={false}>
            <SectionTitle color={accent}>{t.planTitle}</SectionTitle>
            <View style={[styles.planBox, { borderColor: accent, backgroundColor: tint }]}>
              <Text style={styles.planLine}>
                <Text style={[styles.planKey, { color: accent }]}>{t.planWhen} </Text>
                {plan.when}
                <Text style={[styles.planKey, { color: accent }]}>, {t.planThen} </Text>
                {plan.then}
              </Text>
            </View>
          </View>
        )}

        {/* ── Als Nächstes ────────────────────────────────────────────────── */}
        {next !== null && (
          <View style={styles.section} wrap={false}>
            <SectionTitle color={accent}>{t.nextLabel}</SectionTitle>
            <View style={styles.nextBox}>
              <Text style={[styles.nextName, { color: levelInk(next) }]}>{next.name}</Text>
              <Text style={styles.nextMeta}>
                {next.name === next.original
                  ? `${next.value}`
                  : `${next.original} · ${next.value}`}
              </Text>
              <Text style={styles.nextBody}>{next.essence}</Text>
            </View>
          </View>
        )}

        {/* Der Vorbehalt steht in der App zweimal. Ein PDF verlässt ihren
            Zusammenhang und wird weitergereicht — hier braucht er ihn erst
            recht. */}
        <Text style={styles.disclaimer}>{t.resultDisclaimer}</Text>

        {/* ── Fußzeile ────────────────────────────────────────────────────
            Der Tag zum zweiten Mal, und diesmal auf jedem Blatt: gedruckte
            Seiten gehen auseinander. */}
        <View style={styles.footerRule} fixed />
        <Text style={styles.footerLeft} fixed>
          {t.pdfSource} · {dateLong}
        </Text>
        <Text
          style={styles.footerRight}
          fixed
          render={({ pageNumber, totalPages }) => t.pdfPage(pageNumber, totalPages)}
        />
      </Page>
    </Document>
  )
}
