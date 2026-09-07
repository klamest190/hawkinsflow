import { LEVELS } from '../data/levels.ts'
import type { Language, Level, LevelId, LevelText } from '../types.ts'

/**
 * Die Texte der 17 Ebenen. Das deutsche Objekt ist die Vorlage: `LevelCopy` wird
 * daraus abgeleitet, und jede weitere Sprache muss deshalb genau dieselben
 * Schlüssel tragen — fehlt eine Ebene, meldet das der Compiler, statt dass im
 * Ergebnis eine leere Karte steht.
 *
 * Die Übersetzung ist keine Wort-für-Wort-Fassung. Beide Sprachen sollen sich
 * lesen, als wären sie das Original; entscheidend ist derselbe Inhalt, nicht
 * dasselbe Bild.
 *
 * Zum Ton: normale Sprache. Subjekt vorn, ein Gedanke pro Satz, direkte Anrede
 * statt „Wer …, der …", Verben statt Substantivketten. Wer das hier liest, hat
 * unter Umständen einen schlechten Tag und keine Lust auf Feuilleton.
 *
 * Jede Ebene trägt drei Übungen, immer in derselben Reihenfolge: eine zum
 * Schreiben, eine zum Tun, eine zum Sitzen (siehe `PracticeKind` in
 * `types.ts`). Die Sorte ist kein Etikett, sondern eine Vorgabe an den Inhalt —
 * ohne sie wären es überall drei Schreibübungen, weil die sich am leichtesten
 * formulieren lassen. Und wer bei Zorn oder Angst herauskommt, ist mit einem
 * Stift am schlechtesten bedient.
 */
const de = {
  shame: {
    name: 'Scham',
    emotion: 'Demütigung',
    worldview: 'erbärmlich',
    essence:
      'Du schämst dich nicht für etwas, das du getan hast, sondern für dich selbst. Aus „ich habe einen Fehler gemacht“ ist „ich bin ein Fehler“ geworden. Das kostet so viel Kraft, dass für alles andere kaum noch etwas übrig bleibt.',
    strength:
      'Scham zeigt, dass dir wichtig ist, wie du auf andere wirkst. Dieses Gespür ist nicht das Problem. Es ist nur gerade gegen dich selbst gerichtet.',
    advice:
      'Fang nicht damit an, die Scham zu verstehen. Sie lebt davon, dass niemand von ihr weiß. Such dir einen Menschen, dem du vertraust, und erzähl ihm eine Sache, die du bisher versteckt hast. Wenn diese Person danach noch da ist, hat die Scham ihren Boden verloren. Mehr brauchst du diese Woche nicht zu tun. Alles andere wird danach leichter.',
    signs: [
      'Du willst nicht gesehen werden und gehst aus Räumen, in denen du auffallen könntest.',
      'Alte Peinlichkeiten fallen dir ungefragt ein und treffen dich sofort.',
      'Lob ist dir unangenehm. Es fühlt sich an, als hätte sich jemand in dir getäuscht.',
    ],
    trap:
      'Scham verspricht dir Schutz: Wer sich klein macht, kann nicht tief fallen. Der Preis ist, dass dich niemand kennenlernt, du selbst auch nicht. Und fast alle versuchen hier dasselbe: zu beweisen, dass sie in Ordnung sind. Noch eine Leistung, noch ein Gefallen. Das hält ein paar Tage, dann ist die Frage schärfer zurück. Denn was du dir verdienen musst, kannst du auch wieder verlieren.',
    progress:
      'Erwarte nicht, dass es sich bald gut anfühlt. Das erste Zeichen ist kleiner: Du bleibst in einem Raum, aus dem du sonst gegangen wärst. Das zählt, auch wenn du dabei zitterst. Wenn die Scham seit Monaten deinen Alltag bestimmt, musst du damit nicht allein bleiben. Therapeutische Hilfe ist genau dafür da.',
    steps: [
      'Trenne die Tat von dir selbst. Schreib auf, was passiert ist, und zwar so, wie es ein Außenstehender aufschreiben würde — ohne Urteil über dich.',
      'Erzähl einem Menschen, dem du vertraust, etwas, das du bisher versteckt hast. Scham übersteht es selten, wenn jemand davon weiß.',
      'Sorg für deinen Körper wie für einen Gast: essen, schlafen, duschen, rausgehen. Selbstachtung fängt oft ganz praktisch an.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die zwei Fassungen',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib den Vorfall zweimal auf, für den du dich schämst. Einmal so, wie du ihn dir selbst erzählst. Und einmal so, wie ihn jemand aufschreiben würde, der nur gesehen hat, was passiert ist. Lies beide Fassungen laut vor. Der Unterschied dazwischen ist die Scham. Jetzt steht sie auf dem Papier und wirkt nicht mehr unsichtbar in dir.',
      },
      {
        kind: 'action',
        name: 'Einmal gesehen werden',
        duration: '5 Minuten, einmal täglich',
        minutes: 5,
        body:
          'Geh an einen Ort, an dem Menschen sind: Bäckerei, Bahnsteig, Park. Bleib fünf Minuten dort, ohne aufs Handy zu schauen. Sag einem Menschen einen belanglosen Satz — einen Gruß, ein Danke, eine Frage nach der Uhrzeit. Die Scham behauptet, alle würden dir etwas ansehen. Die fünf Minuten zeigen dir jedes Mal, dass niemand hinschaut.',
      },
      {
        kind: 'sitting',
        name: 'Die Hand auf dem Brustbein',
        duration: '6 Minuten täglich',
        minutes: 6,
        body:
          'Setz dich hin, leg eine Hand flach auf dein Brustbein und lass sie liegen. Sag dir innerlich drei Sätze: Das ist gerade schwer. So etwas kennt jeder. Ich möchte freundlich mit mir umgehen. Wenn du dabei denkst „das ist albern“, gehört das dazu. Sag die Sätze trotzdem.',
      },
    ],
    mantra: 'Ich habe Fehler gemacht. Ich bin kein Fehler.',
  },
  guilt: {
    name: 'Schuld',
    emotion: 'Vorwurf',
    worldview: 'strafend',
    essence:
      'In dir läuft ein Gerichtsverfahren, das nie zu Ende geht. Du gehst alte Geschichten immer wieder durch, und das Urteil fällt jedes Mal gegen dich aus.',
    strength:
      'Schuld heißt, dass du ein Gewissen hast und Verantwortung ernst nimmst. Genau das brauchst du, um etwas wiedergutzumachen.',
    advice:
      'Mach aus dem Gefühl eine Rechnung. Wem schuldest du was, ganz konkret? Meistens ist die Antwort kürzer als der Vorwurf. Bezahl es, entschuldige dich, reparier es, und setz dir ein Datum, bis wann dein Teil erledigt ist. Danach ist die Sache abgeschlossen, auch wenn das Gefühl noch eine Weile nachhallt.',
    signs: [
      'Du entschuldigst dich für Dinge, für die du nicht verantwortlich bist.',
      'Wenn es anderen schlecht geht, suchst du zuerst deinen Anteil daran.',
      'Du kannst schwer etwas Gutes annehmen. Es fühlt sich unverdient an.',
    ],
    trap:
      'Schuld fühlt sich moralisch an, ist aber oft bequem. Solange du dich anklagst, musst du nichts wiedergutmachen. Das ist der Fehler, den hier fast alle machen: Sie bezahlen mit Leiden statt mit einer Handlung. Der Mensch, dem du etwas schuldest, hat nichts von deinen schlechten Nächten. Ein Anruf, ein Satz oder ein Betrag würde ihm helfen.',
    progress:
      'Richte dich nach der Rechnung, nicht nach dem Gefühl. Wenn dein Teil getan ist, ist es erledigt, auch wenn es sich wochenlang anders anfühlt. Und wenn niemand mehr da ist, der etwas bekommen könnte, weil der Mensch gestorben ist oder es dreißig Jahre her ist, dann ist das keine Schuld mehr. Dann ist es Trauer, und die musst du durchleben, nicht bezahlen.',
    steps: [
      'Mach aus der Schuld eine Rechnung: Wem schuldest du was, ganz konkret? Bezahl es, entschuldige dich, repariere es. Danach ist es erledigt.',
      'Setz ein Ende. Ein Datum, ab dem die Sache abgehakt ist. Wenn du danach noch alte Vorwürfe wiederholst, ist das keine Reue mehr, sondern Gewohnheit.',
      'Frag dich bei jedem Vorwurf: Würde ein Gericht das genauso sehen? Meistens bleibt ein kleiner Rest übrig, und mit dem kannst du etwas anfangen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die Rechnung',
        duration: '15 Minuten, einmal pro Fall',
        minutes: 15,
        body:
          'Mach drei Spalten auf ein Blatt: Was ist passiert? Was war wirklich mein Anteil? Was würde es wiedergutmachen? In die dritte Spalte gehört eine konkrete Handlung mit Datum — oder das Wort „nichts“. Danach führst du die Handlung aus oder wirfst das Blatt weg. Liegen lassen solltest du es nicht.',
      },
      {
        kind: 'action',
        name: 'Danke, ohne Zusatz',
        duration: 'einmal täglich',
        body:
          'Nimm heute etwas an: ein Lob, eine Hilfe, ein Geschenk. Sag nur „Danke“. Kein „Das wäre doch nicht nötig gewesen“, kein Gegenangebot, keine Erklärung, warum du es eigentlich nicht verdienst. Der Satz dauert zwei Sekunden. Wie schwer er dir fällt, merkst du erst dabei.',
      },
      {
        kind: 'sitting',
        name: 'Gehört, vertagt',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Setz dich hin und warte auf den ersten Vorwurf. Er kommt. Hör ihn einmal ganz an, ohne dich zu verteidigen. Sag dir dann innerlich drei Worte: gehört, geprüft, vertagt. Danach zurück zum Atem, und beim nächsten Vorwurf dieselben drei Worte. Der Ankläger in dir wird nicht leiser, wenn du mit ihm streitest. Er wird leiser, wenn ihm niemand mehr zuhört.',
      },
    ],
    mantra: 'Ich mache es wieder gut — und dann lasse ich es hinter mir.',
  },
  apathy: {
    name: 'Apathie',
    emotion: 'Verzweiflung',
    worldview: 'hoffnungslos',
    essence:
      'Nichts lohnt sich, alles ist zu schwer. Die Welt ist dir nicht feindlich, sie ist dir egal geworden. Hilfe kommt bei dir an, aber sie ändert nichts.',
    strength:
      'Apathie ist oft Erschöpfung, die sich als Gleichgültigkeit tarnt. Dein System hat abgeschaltet, um dich zu schützen. Das ist ein Signal, kein Urteil.',
    advice:
      'Warte nicht auf Lust. Hier kommt sie nicht zuerst, sie kommt hinterher. Nimm dir den kleinsten Schritt vor, den du auch an einem schlechten Tag schaffst: ein Fenster auf, einmal um den Block, eine Nachricht an einen Menschen. Und verabrede ihn mit jemandem. Fremde Energie trägt dich, solange deine eigene fehlt.',
    signs: [
      'Aufgaben stapeln sich, weil schon kleine Schritte riesig wirken.',
      'Du sagst oft „egal“ und meinst es auch so.',
      'Andere machen sich Sorgen um dich, und dich lässt das ziemlich kalt.',
    ],
    trap:
      'Apathie spart Energie und hält sich damit selbst am Leben: Wer nichts versucht, scheitert an nichts, aber ihm gelingt auch nichts, was der Leere widersprechen könnte. Der häufigste Fehler ist, zu groß anzufangen. Weil du nichts spürst, planst du den großen Neuanfang ab Montag. Der ist zu schwer, du schaffst ihn nicht, und schon hast du den Beweis, dass nichts geht. Sätze wie „bringt sowieso nichts“ gehören zum Zustand. Sie sagen nichts über deine Zukunft.',
    progress:
      'Miss die Woche nicht an deiner Stimmung, sondern an drei Fragen: Hast du dich bewegt? Warst du bei Tageslicht draußen? Hattest du mit einem Menschen zu tun? Wenn Ärger oder Traurigkeit zurückkommen, ist das kein Rückfall, sondern ein Schritt nach oben. Und wenn das seit Wochen so geht, ist das keine Charakterfrage. Dann gehört es in eine ärztliche Praxis.',
    steps: [
      'Mach den ersten Schritt so klein, dass er lächerlich wirkt: ein Glas Wasser, eine Zeile, zwei Minuten vor die Tür. Erst kommt die Bewegung, dann die Motivation.',
      'Verabrede dich und nutz die Energie der anderen. Was du allein nicht schaffst, geht zu zweit oft doch.',
      'Wenn die Apathie anhält, ist das auch ein medizinisches Thema. Hol dir Hilfe. Das ist kein Zeichen von Schwäche.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was mir früher etwas bedeutet hat',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib zehn Dinge auf, die dir früher etwas bedeutet haben: Musik, ein Mensch, ein Ort, eine Arbeit. Du musst nichts davon wieder anfangen. Es geht nur darum, sie aufzuschreiben. Die Apathie behauptet, es habe nie etwas gegeben. Die Liste beweist dir das Gegenteil, und mehr musst du dafür nicht tun.',
      },
      {
        kind: 'action',
        name: 'Zwei Minuten, dann Schluss',
        duration: '2 Minuten, zweimal täglich',
        minutes: 2,
        body:
          'Such dir die kleinste sichtbare Sache im Raum: einen Teller, drei Schritte vor die Tür, eine Zeile. Stell zwei Minuten, fang an und hör auf, wenn es klingelt — auch wenn du weitermachen könntest. Das Aufhören gehört dazu. So bleibt die Übung klein genug, dass du sie morgen wiederholst.',
      },
      {
        kind: 'sitting',
        name: 'Fünf Dinge im Raum',
        duration: '3 Minuten, zweimal täglich',
        minutes: 3,
        body:
          'Du sollst nicht meditieren, nur zählen: fünf Dinge, die du siehst, vier, die du hörst, drei, die du spürst, zwei, die du riechst, eins, das du schmeckst. Wenn du nicht weiterkommst, fang von vorn an. Das ist der kleinste mögliche Kontakt mit der Welt, und du brauchst dafür keine Motivation.',
      },
    ],
    mantra: 'Ich muss es nicht fühlen. Ich fange trotzdem an.',
  },
  grief: {
    name: 'Trauer',
    emotion: 'Bedauern',
    worldview: 'tragisch',
    essence:
      'Der Verlust hat einen Namen, und das ist schon ein Fortschritt. In der Trauer steckt Kraft, in der Apathie steckte keine. Du schaust nur noch auf das, was fehlt, und nicht mehr auf das, was da ist.',
    strength:
      'Trauer ist Liebe, die ihr Gegenüber verloren hat. Dass sie so groß ist, sagt, wie viel dir etwas bedeutet hat.',
    advice:
      'Gib der Trauer jeden Tag einen festen Platz: zwanzig Minuten, ein Stuhl, eine Uhrzeit. Dann braucht sie nicht den ganzen Tag. Und tu einmal am Tag etwas für einen anderen Menschen. Nicht als Trost, sondern weil du so am schnellsten wieder nach außen schaust. Abkürzen kannst du die Trauer nicht. Auf dieser Skala ist sie schon ein Schritt nach oben.',
    signs: [
      'Vieles erinnert dich an früher, und früher war besser.',
      'Tränen kommen dir leicht, manchmal ohne klaren Anlass.',
      'Wenn du etwas Neues anfängst, fühlt es sich wie Verrat an dem an, was du verloren hast.',
    ],
    trap:
      'Die Trauer kann zur letzten Verbindung werden. Dann hast du Angst loszulassen, weil du sonst ein zweites Mal verlierst. Der andere Weg, sie festzuhalten, heißt Funktionieren: Wenn sie keinen Platz bekommt, verschwindet sie nicht. Sie kommt später wieder, als Erschöpfung, als Gereiztheit, als ein Körper, dem dauernd etwas fehlt.',
    progress:
      'Trauer kommt in Wellen, nicht auf einer geraden Linie. Ein Geruch, ein Datum, ein Lied, und du bist wieder am ersten Tag. Achte deshalb nicht darauf, ob die Wellen kleiner werden, sondern wie schnell du danach wieder auftauchst. Wenn sich über Wochen gar nichts bewegt oder nichts mehr bei dir ankommt, auch nichts Gutes, hol dir Unterstützung. Und sag den Menschen um dich herum, was du brauchst. Sonst raten sie, und meistens raten sie falsch.',
    steps: [
      'Gib der Trauer eine feste Zeit und einen festen Ort: zwanzig Minuten am Tag, in denen sie da sein darf. Was einen Platz hat, überschwemmt seltener alles andere.',
      'Schreib auf, was geblieben ist: Menschen, Fähigkeiten, Erinnerungen. Nicht als Trost, sondern als Bestandsaufnahme.',
      'Tu etwas für jemand anderen. Die Trauer dreht deinen Blick nach innen, eine helfende Hand dreht ihn wieder nach außen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der ungesendete Brief',
        duration: '30 Minuten, einmal',
        minutes: 30,
        body:
          'Schreib einen Brief an das, was fehlt: an einen Menschen oder an ein Leben, das es nie gegeben hat. Alles darf hinein — der Dank, der Vorwurf, das Unerledigte. Zum Schluss schreibst du einen Satz darüber, was du behalten wirst. Den Brief schickst du nicht ab und wirfst ihn auch nicht weg. Du legst ihn weg.',
      },
      {
        kind: 'action',
        name: 'Eine Hand für jemanden',
        duration: 'einmal pro Woche',
        body:
          'Such dir eine kleine Sache, die du für einen anderen Menschen tun kannst: etwas tragen, etwas kochen, einmal anrufen. Sie muss nichts bedeuten und niemanden ersetzen. Gegen den Blick nach innen hilft kein Gedanke. Es hilft eine halbe Stunde, in der deine Hände etwas anderes tun.',
      },
      {
        kind: 'sitting',
        name: 'Die verabredete Zeit',
        duration: '20 Minuten täglich, feste Zeit',
        minutes: 20,
        body:
          'Gib der Trauer einen Termin: jeden Tag zur selben Zeit, auf demselben Stuhl. Dort ist alles erlaubt — Fotos, Tränen, Briefe. Wenn sie außerhalb dieser Zeit kommt, schreib den Gedanken auf einen Zettel und leg ihn auf den Stuhl für morgen. Du machst sie damit nicht kleiner. Sie bekommt nur ein Zimmer statt der ganzen Wohnung.',
      },
    ],
    mantra: 'Ich habe verloren. Ich bin nicht verloren.',
  },
  fear: {
    name: 'Angst',
    emotion: 'Sorge',
    worldview: 'bedrohlich',
    essence:
      'Überall könnte etwas schiefgehen, und dein Kopf hat alles schon durchgespielt. Angst schützt dich wirklich — bis sie anfängt, dein Leben zu bestimmen.',
    strength:
      'Angst ist ein Schutzsystem, das funktioniert. Sie hat dich schon oft vor Dummheiten bewahrt. Sie ist nur gerade zu oft eingeschaltet.',
    advice:
      'Fang beim Körper an, nicht beim Argument: langsam ausatmen, länger als einatmen. Der Kopf folgt dem Atem. Dann schreib die Angst zu Ende. Was genau passiert im schlimmsten Fall, und was tust du dann? Mit einem Plan wird aus Panik ein Problem. Und geh diese Woche einmal freiwillig in etwas hinein, das dir unangenehm ist. Kleiner wird die Angst nur an Dingen, die du wirklich getan hast.',
    signs: [
      'Du spielst Katastrophen durch, die fast nie eintreten.',
      'Du schiebst Entscheidungen auf, weil jede Möglichkeit ein Risiko hat.',
      'Du sagst Ja, um Streit zu vermeiden, und nicht, weil du willst.',
    ],
    trap:
      'Am Leben hält die Angst nicht dein Denken, sondern dein Ausweichen. Es sieht harmlos aus: eine Absage, ein Anruf, den du auf morgen schiebst, eine Frage, die du sicherheitshalber dreimal stellst. Jedes Mal bist du sofort erleichtert, und jedes Mal lernt dein Nervensystem: Die Gefahr war echt. Prüf deshalb bei jeder Vorsicht, was daraus folgt. Bei echter Gefahr tust du etwas. Bei Angst lässt du etwas.',
    progress:
      'Rechne damit, dass es zuerst schlimmer wird. Wenn du dich einer Sache näherst, der du lange ausgewichen bist, steigt die Angst erst an und fällt nur, wenn du bleibst. Das dauert eher zwanzig Minuten als zwei. Frag dich deshalb nicht, wie ruhig du bist, sondern wie kurz die Liste der Dinge wird, um die du herumgehst. Bei Panikattacken, oder wenn die Angst deinen Tag bestimmt: Dagegen gibt es Behandlungen, die gut wirken.',
    steps: [
      'Schreib die Angst zu Ende: Was genau passiert im schlimmsten Fall, und was tust du dann? Mit einem Plan wird aus Panik ein Problem.',
      'Such dir jede Woche eine kleine Sache, die dir unangenehm ist, und mach sie freiwillig. Mut wächst nur an Dingen, die du wirklich getan hast.',
      'Beruhige zuerst den Körper: langsam ausatmen, länger als einatmen. Der Kopf folgt dem Atem, nicht dem Argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Und dann?',
        duration: '10 Minuten, wenn eine Angst kreist',
        minutes: 10,
        body:
          'Schreib die Angst als einen Satz auf. Dann frag „und dann?“ und beantworte es. Dann wieder „und dann?“. Mach so lange weiter, bis du an einen Punkt kommst, an dem du wieder handelst. Die Angst hört meistens beim Schreckensbild auf. Auf dem Papier kommst du darüber hinaus.',
      },
      {
        kind: 'action',
        name: 'Die freiwillige Unbequemlichkeit',
        duration: 'einmal pro Woche',
        body:
          'Such dir am Wochenanfang eine kleine Sache aus, um die du dich drückst: ein Anruf, eine Frage, ein Widerspruch. Erledige sie, bevor die Woche vorbei ist. Sie sollte klein genug sein, dass sie sicher klappt, und groß genug, dass dir kurz vorher mulmig wird.',
      },
      {
        kind: 'sitting',
        name: 'Länger aus als ein',
        duration: '6 Minuten, wenn es eng wird',
        minutes: 6,
        body:
          'Atme vier Zählzeiten ein und sechs aus, ohne Pause dazwischen. Mehr nicht. Du musst dich nicht beruhigen und dir nicht gut zureden. Das lange Ausatmen ist der einzige Schalter an der Angst, den du bewusst bedienen kannst. Der Kopf folgt dem Atem, und die Argumente kommen zuletzt.',
      },
    ],
    mantra: 'Ich gehe hin, auch mit weichen Knien.',
  },
  desire: {
    name: 'Verlangen',
    emotion: 'Gier',
    worldview: 'enttäuschend',
    essence:
      'Dir fehlt immer etwas, und das Nächste soll es richten. Verlangen bewegt eine Menge — hinter den meisten Karrieren steckt es — und es kommt nie an.',
    strength:
      'Verlangen ist Antrieb. Ohne es hättest du nichts von dem, was du dir aufgebaut hast. Es muss nicht weg, es braucht eine Richtung.',
    advice:
      'Du musst nicht aufhören zu wollen. Hinter den meisten guten Dingen in deinem Leben steckt Verlangen. Was dir fehlt, ist die Pause dazwischen. Leg zwischen Impuls und Kauf vierundzwanzig Stunden, und genauso zwischen Idee und Zusage. Was danach noch zieht, war echt. Der Rest war Unruhe.',
    signs: [
      'Ein erreichtes Ziel fühlt sich kurz gut an, dann steht schon das nächste an.',
      'Sobald es still wird, greifst du zur Ablenkung: Handy, Kaufen, Essen, Serien.',
      'Wenn andere etwas haben, denkst du zuerst daran, was dir fehlt.',
    ],
    trap:
      'Verlangen verwechselt wollen mit brauchen. Du bist immer nur eine Anschaffung von der Erfüllung entfernt und kommst deshalb nie an. Denn nicht der Gegenstand zählt, sondern das Gefühl, das er verspricht. Frag dich bei dem, was dich gerade zieht: Wovon wäre ich frei, wenn ich es hätte? Die Antwort heißt selten „Schuhe“. Meistens heißt sie Ruhe, Anerkennung oder Sicherheit, und die bekommst du direkt billiger.',
    progress:
      'Es geht nicht ums Verzichten, sondern ums Fertigwerden: weniger anfangen, mehr abschließen. Das zweite Zeichen ist die Stille. Wenn du nichts brauchst, um die nächsten zehn Minuten auszuhalten, bist du ein gutes Stück weiter. Und wenn du die vierundzwanzig Stunden regelmäßig nicht schaffst, geht es nicht mehr um Verlangen, sondern um eine Abhängigkeit. Damit solltest du nicht allein bleiben.',
    steps: [
      'Lass zwischen Impuls und Handlung 24 Stunden vergehen. Was danach noch zieht, war echt.',
      'Frag dich bei jedem „Ich will“: Welches Gefühl erwarte ich davon? Meistens bekommst du dieses Gefühl auch anders.',
      'Üb dich eine Woche lang darin, nichts Neues zu kaufen. Schreib dabei auf, was du längst besitzt, ohne es zu bemerken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Welches Gefühl kaufe ich?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib die letzten fünf Dinge auf, die du gekauft, gegessen oder angefangen hast, als es dir schlecht ging. Mach zwei Spalten daneben: Welches Gefühl hast du dir davon versprochen, und welches kam wirklich? Die zweite Spalte bleibt meistens leer, und genau das ist das Ergebnis.',
      },
      {
        kind: 'action',
        name: 'Die Zehn-Minuten-Kurve',
        duration: '10 Minuten, bei jedem Impuls',
        minutes: 10,
        body:
          'Wenn der Impuls kommt — Handy, Kaufen, Essen —, stell zehn Minuten und tu nichts dagegen. Nicht „nie“, nur „nicht jetzt“. Schreib auf einer Skala von 0 bis 10 auf, wie stark er am Anfang war und wie stark am Ende. Nach einer Woche hast du deine eigene Kurve und siehst, was das Verlangen von allein macht.',
      },
      {
        kind: 'sitting',
        name: 'Die Welle',
        duration: '8 Minuten, wenn es zieht',
        minutes: 8,
        body:
          'Setz dich hin, wenn der Impuls kommt, und tu nichts. Such das Verlangen im Körper: Brust, Magen, Hände. Benenne, was du findest — Enge, Kribbeln, Druck — und bleib dabei. Es steigt, es hält, es fällt. Du musst nichts dagegen tun. Schau nur lange genug zu, um zu merken, dass es von allein vergeht.',
      },
    ],
    mantra: 'Ich darf wollen, ohne getrieben zu sein.',
  },
  anger: {
    name: 'Zorn',
    emotion: 'Hass',
    worldview: 'feindselig',
    essence:
      'Endlich hast du Kraft, und sie brennt. Zorn entsteht, wenn dein Wollen auf Widerstand trifft. Er kann schlechte Zustände beenden oder Beziehungen. Das hängt davon ab, ob er ein Ziel bekommt.',
    strength:
      'Zorn ist Energie, die eine Grenze verteidigt. Er sagt dir klarer als jedes andere Gefühl, was dir wichtig ist.',
    advice:
      'Sag nichts, solange es brennt. Der Zorn zeigt dir, dass eine Grenze überschritten wurde. Was du jetzt tun sollst, sagt er dir nicht. Bring ihn zuerst durch den Körper: Treppen, Laufen, Gewichte. Danach sagst du in einem Satz, was du brauchst, statt einen Vorwurf zu machen. Auf einen Vorwurf folgt eine Verteidigung. Auf eine Bitte kann jemand eingehen.',
    signs: [
      'Du wirst schneller gereizt, als dir lieb ist, vor allem bei Kleinigkeiten.',
      'Du streitest im Kopf mit Leuten, mit denen es gar keinen Streit gab.',
      'Du hast recht, und es hilft niemandem.',
    ],
    trap:
      'Zorn fühlt sich stark an, ist aber nur eine Reaktion. Solange er brennt, bestimmt der andere, was du fühlst. Zwei Fehler sehen hier aus wie Gegensätze: rauslassen und runterschlucken. Beide sparen denselben Satz aus, den, in dem du sagst, was du willst. Und meistens ist der Zorn das zweite Gefühl. Das erste war Angst, Kränkung oder Ohnmacht. Wenn du nur das zweite zeigst, bekommst du nie, worum es dir eigentlich ging.',
    progress:
      'Frag dich nicht, wie selten du wütend wirst, sondern wie schnell aus der Hitze ein Satz wird: am besten noch am selben Tag, an eine bestimmte Person, mit einer Frist. Wenn aus dem Zorn keine Handlung wird, wird Groll daraus, und der hält Jahre. Und wenn die Menschen um dich herum vorsichtig werden oder etwas zu Bruch geht, hol dir Hilfe. Vor dem nächsten Mal, nicht danach.',
    steps: [
      'Schau unter den Zorn: Was wurde verletzt — eine Grenze, ein Wert, ein Bedürfnis? Der Zorn zeigt in eine Richtung, aber er ist keine Antwort.',
      'Bring ihn körperlich aus dem System, bevor du sprichst: laufen, Gewichte, Treppen. Sag danach, was du brauchst, statt Vorwürfe zu machen.',
      'Zieh eine klare Grenze, statt weiter zu grollen. Groll ist Zorn, aus dem nie eine Handlung werden durfte.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz ohne Du',
        duration: 'nach jedem Aufflammen',
        body:
          'Nimm zuerst den Körper: zwanzig Kniebeugen, die Treppe, einmal um den Block. Dann schreib einen einzigen Satz darüber, was du wolltest und nicht bekommen hast. In diesem Satz darf das Wort „du“ nicht vorkommen. Nur diesen einen Satz sagst du laut. Der Vorwurf bleibt auf dem Papier.',
      },
      {
        kind: 'action',
        name: 'Die Bitte',
        duration: 'einmal, sobald es geht',
        body:
          'Sag dem Menschen, um den es geht, in einem Satz, was du brauchst — und nicht, was er falsch gemacht hat. Ohne „immer“, ohne „nie“, ohne Vorgeschichte. Auf einen Vorwurf folgt eine Verteidigung. Auf eine Bitte kann jemand eingehen.',
      },
      {
        kind: 'sitting',
        name: 'Die Hitze aufsuchen',
        duration: '7 Minuten, nach dem Aufflammen',
        minutes: 7,
        body:
          'Setz dich hin und such die Wut im Körper, statt sie wegzuatmen: Kiefer, Nacken, Brust, Hände. Geh mit der Aufmerksamkeit dorthin, wo es am heißesten ist, und bleib dort. Drück sie nicht aus und schluck sie nicht runter, beides macht sie größer. Wenn du ihr einfach zusiehst, lässt sie nach ein paar Minuten von allein nach.',
      },
    ],
    mantra: 'Meine Wut zeigt mir, was mir wichtig ist.',
  },
  pride: {
    name: 'Stolz',
    emotion: 'Verachtung',
    worldview: 'fordernd',
    essence:
      'Dir geht es hier deutlich besser als weiter unten. Stolz gibt dir Halt, du leistest etwas und gehörst irgendwo dazu. Der Haken ist, dass das an Bedingungen hängt: an deinem Status, an deiner Rolle, daran, recht zu haben. Und das kann wegbrechen.',
    strength:
      'Stolz gibt dir Halt und Antrieb. Du hast etwas geleistet, und das darf sich gut anfühlen. Die Frage ist nur, was passiert, wenn es infrage gestellt wird.',
    advice:
      'Lies diese Ebene nicht als Vorwurf. Der Stolz hat dich hierher getragen, und er trägt weiter als alles darunter. Teuer wird er erst, wenn du etwas lernen müsstest. Deshalb ein einfacher Test, jeden Tag: Gib einmal laut zu, dass du etwas nicht weißt. Vor anderen, dort, wo es dich etwas kostet. Wie schwer dir das fällt, zeigt dir genau, was dich hier festhält.',
    signs: [
      'Kritik trifft dich hart, auch wenn sie sachlich stimmt.',
      'Du machst die Sache lieber allein und brauchst doppelt so lange, als dass du um Hilfe bittest.',
      'Du vergleichst dich oft und stellst dabei still fest, wo du besser bist.',
    ],
    trap:
      'Stolz musst du verteidigen. Weil dein Selbstbild an deinen Erfolgen hängt, wird jeder Fehler zur Bedrohung. Der Fehler dabei: Du hältst deine Meinung für einen Teil von dir. Dann fühlt sich jede Korrektur wie ein Angriff an, und du verteidigst eine Position länger, als du selbst noch an sie glaubst. Du merkst das kaum, die anderen aber schon. Irgendwann sagen sie dir nichts mehr, und du erfährst als Letzter, was über dich gedacht wird.',
    progress:
      'Zähl nicht deine Erfolge, sondern zwei Sätze pro Woche: „Da hattest du recht“ und „Das weiß ich nicht“. Beim ersten Mal kostet das etwas, danach wird es leicht. Und du bekommst Menschen zurück, die dir wieder etwas sagen. Geh außerdem regelmäßig dorthin, wo du ganz am Anfang stehst: ein Kurs, eine fremde Sprache, ein Sport, den du nicht kannst. Von dort geht es nach oben, nicht von der Bühne.',
    steps: [
      'Gib einmal am Tag zu, dass du etwas nicht weißt. Laut, vor anderen.',
      'Trenne deine Meinung von dir selbst. Du kannst eine Meinung fallen lassen, ohne dich zu verlieren.',
      'Bitte diese Woche um echte Hilfe. Nicht als Test, sondern weil du sie brauchst.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was bliebe',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Beschreib dich auf einer halben Seite, ohne ein Wort über Beruf, Können, Besitz, Rolle oder Erfolge zu schreiben. Was übrig bleibt, kann dir kein Rückschlag nehmen. Wenn die Seite fast leer bleibt, hast du das Ergebnis der Übung schwarz auf weiß.',
      },
      {
        kind: 'action',
        name: 'Der teure Satz',
        duration: 'einmal täglich',
        body:
          'Sag einmal am Tag laut „Da kenne ich mich nicht aus“ oder „Du hattest recht“ — und zwar dort, wo es dich etwas kostet. Schreib abends auf, was daraufhin wirklich passiert ist. Fast immer: nichts. Genau darum geht es bei dieser Übung.',
      },
      {
        kind: 'sitting',
        name: 'Nichts erreichen',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Sitz zehn Minuten und erreiche dabei nichts: Du sollst nicht ruhiger werden, nicht besser und nicht weiter kommen. Jedes Mal, wenn du denkst „das bringt nichts“ oder „andere können das besser“, hast du den Stolz bei der Arbeit erwischt. Dieses Bemerken ist die Übung, nicht die Stille.',
      },
    ],
    mantra: 'Ich muss nicht recht haben, um in Ordnung zu sein.',
  },
  courage: {
    name: 'Mut',
    emotion: 'Bejahung',
    worldview: 'machbar',
    essence:
      'Das ist die Schwelle. Ab hier gibst du der Welt mehr Kraft, als sie dich kostet. Deine Probleme sind nicht weg, aber sie sind zu Aufgaben geworden, und du traust dir zu, sie anzugehen.',
    strength:
      'Mut heißt nicht, keine Angst zu haben, sondern trotzdem zu handeln. Das kannst du bereits. Alles Weitere baut darauf auf.',
    advice:
      'Du bist über der Schwelle. Was dir jetzt droht, ist nicht der Rückfall, sondern die Überlastung. Nimm dir deshalb zweierlei vor: eine unangenehme Sache pro Woche, die du dir bewusst aussuchst, und bei jedem Ärger die Frage, ob du hier wirklich kämpfen musst oder ob es reicht, die Lage zu nehmen, wie sie ist. Auf dieser Ebene ist das Loslassen die schwierigere Übung, nicht das Anpacken.',
    signs: [
      'Du sprichst schwierige Dinge an, obwohl dir dabei mulmig ist.',
      'Ein Fehler kostet dich nicht mehr dein Selbstwertgefühl.',
      'Du übernimmst Verantwortung, ohne nach Schuldigen zu suchen.',
    ],
    trap:
      'Aus Mut kann Dauerstress werden: alles anpacken, nichts loslassen. Mut fühlt sich an wie eine Kraft, die nie ausgeht, und weil sich jetzt tatsächlich etwas bewegt, packst du leicht alles auf einmal an. Wenn du dich ständig überwinden musst, brennst du aus. Sortier deshalb: Liegt die Sache in deiner Hand oder nicht? Für die erste lohnt sich dein Einsatz. Die zweite kostet dich Kraft und ändert nichts.',
    progress:
      'Frag dich am Monatsende nicht, wie viel du angepackt hast, sondern ob du auch etwas losgelassen hast. Rechne Schlaf und Erholung zur Arbeit, nicht zur Belohnung. Und erwarte nicht, dass die Angst verschwindet. Auf dieser Ebene bleibt sie da, sie entscheidet nur nicht mehr. Das gute Gefühl kommt nach der Handlung, nicht davor.',
    steps: [
      'Bleib in Bewegung: eine unangenehme Sache pro Woche, die du dir bewusst aussuchst.',
      'Üb das Loslassen im Kleinen. Du musst nicht jeden Widerstand überwinden. Manches wird leichter, wenn du aufhörst zu ziehen.',
      'Frag dich, wenn du dich ärgerst: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Kämpfen oder lassen',
        duration: '15 Minuten, wöchentlich',
        minutes: 15,
        body:
          'Schreib die drei Dinge auf, die dich gerade am meisten Kraft kosten. Frag dich bei jedem: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist? Streich eines davon. Auf dieser Ebene ist das Streichen die schwierigere Übung, nicht das Anpacken.',
      },
      {
        kind: 'action',
        name: 'Die eine Sache am Morgen',
        duration: 'einmal pro Woche',
        body:
          'Such dir am Sonntag die eine Sache aus, um die du dich die ganze Woche gedrückt hast. Erledige sie am Montag in der ersten Stunde, bevor sich etwas anderes davorschieben kann. Eine, nicht drei. Wenn du dich auf zu vieles verteilst, wird aus Mut nur Hetze.',
      },
      {
        kind: 'sitting',
        name: 'Zwei Minuten vor der Schwelle',
        duration: '2 Minuten, vor der unangenehmen Sache',
        minutes: 2,
        body:
          'Setz dich zwei Minuten hin, bevor du das Unangenehme tust, und tu nichts dagegen. Du musst dir nicht Mut machen und dir keine Sätze zurechtlegen. Spür nur, wie sich das Kurz-davor anfühlt. Dann steh auf und mach es. Mut heißt nicht, dieses Gefühl nicht zu haben. Mut heißt, danach aufzustehen.',
      },
    ],
    mantra: 'Ich kann das — und wenn nicht, lerne ich es.',
  },
  neutrality: {
    name: 'Neutralität',
    emotion: 'Vertrauen',
    worldview: 'zufriedenstellend',
    essence:
      'Es ist gut, wie es ist, und wenn nicht, hältst du das auch aus. Neutralität ist der erste wirklich entspannte Ort auf der Skala: kein Müssen, kein Rechthaben, wenig Drama.',
    strength:
      'Du hast gelernt, dass nicht alles an dir hängt. Diese Ruhe ist ein echter Gewinn, und sie ist der Boden, auf dem Engagement überhaupt erst möglich wird.',
    advice:
      'Halt das hier nicht für das Ziel. Neutralität ist der erste wirklich entspannte Ort auf der Skala, und genau deshalb bleiben viele hier stehen. Such dir eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden, und sag Ja dazu, bevor du weißt, ob sie sich lohnt. Weiter nach oben kommst du mit Einsatz, nicht mit noch mehr Ruhe.',
    signs: [
      'Ein Nein von außen wirft dich nicht mehr um.',
      'Du kannst Pläne ändern, ohne dich als Verlierer zu fühlen.',
      'Andere kommen gern zu dir, weil du nichts hochkochst.',
    ],
    trap:
      'Gelassenheit kann in Gleichgültigkeit kippen, und von innen fühlt sich beides gleich an. Gelassen heißt: Es ist mir wichtig, und ich halte es aus, wenn es anders kommt. Gleichgültig heißt: Ich habe aufgehört, es wichtig zu finden, damit es nicht mehr wehtun kann. Das Zweite ist bequem, und es kostet dich genau die Beteiligung, aus der die Ebenen darüber bestehen.',
    progress:
      'Der Test ist eine einzige Frage: Wofür würdest du dich blamieren? Wenn dir etwas einfällt, bist du auf dem Weg. Wenn nicht, hast du das eigentliche Ergebnis dieser Ebene. Nimm dir dann etwas vor, bei dem du scheitern kannst, und setz ein Datum dafür. Nur was schiefgehen kann, geht dich noch etwas an.',
    steps: [
      'Sag bewusst Ja zu etwas, das dich Aufwand kostet. Aus Neutralität wird erst Bereitschaft, wenn du dich einsetzt.',
      'Such dir eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden.',
      'Bring deine Ruhe aktiv ein: Übernimm dort, wo andere sich verhakt haben.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Drei Dinge, für die ich unbequem werde',
        duration: '15 Minuten, dann wöchentlich prüfen',
        minutes: 15,
        body:
          'Schreib drei Dinge auf, für die du dich einsetzen würdest, auch wenn es dich etwas kostet. Nimm dir diese Woche das kleinste davon vor. Neutralität ist ein guter Boden, aber eine schlechte Wohnung. Diese Übung zeigt dir, ob dir noch etwas wichtig genug ist.',
      },
      {
        kind: 'action',
        name: 'Einmal einmischen',
        duration: 'einmal pro Woche',
        body:
          'Misch dich diese Woche in eine Sache ein, aus der du dich sonst heraushalten würdest: in eine Diskussion, in eine Aufgabe, in einen Streit zwischen anderen. Nicht, um recht zu haben, sondern weil du ruhiger bleiben kannst als die, die sich verhakt haben.',
      },
      {
        kind: 'sitting',
        name: 'Kommen und gehen lassen',
        duration: '12 Minuten täglich',
        minutes: 12,
        body:
          'Setz dich hin und lass alles vorbeiziehen: Gedanken, Geräusche, ein Jucken, Pläne. Halt nichts fest, schieb nichts weg, kommentier nichts. Diese Übung fällt dir auf dieser Ebene leicht, und sie ist gleichzeitig die Probe: Wo du doch festhältst oder wegschiebst, steckt noch etwas anderes als Gelassenheit.',
      },
    ],
    mantra: 'Ich bin einverstanden — und ich packe trotzdem an.',
  },
  willingness: {
    name: 'Bereitschaft',
    emotion: 'Optimismus',
    worldview: 'hoffnungsvoll',
    essence:
      'Aus „es geht auch so“ ist „ich mache das gern“ geworden. Arbeit fühlt sich nicht mehr nach Widerstand an, du lernst gern, und andere merken, dass sie mit dir rechnen können.',
    strength:
      'Du bist jemand, mit dem andere rechnen können. Diese Verlässlichkeit ist selten und wertvoll. Sie braucht nur eine Grenze, damit sie dir erhalten bleibt.',
    advice:
      'Dein Ja ist deine Stärke, und es ist deine Rechnung. Die Frage ist hier nicht mehr, ob du etwas übernimmst, sondern wofür du dein nächstes Ja aufhebst. Sag diese Woche eine Zusage ab, die du nur aus Gewohnheit gegeben hast, und steck die Kraft in etwas, das dich wirklich fordert. Auf dieser Ebene sieht Erschöpfung lange wie Engagement aus.',
    signs: [
      'Du meldest dich freiwillig, bevor jemand fragen muss.',
      'Ein Rückschlag ist für dich eine Information und kein Urteil.',
      'Du bringst Dinge zu Ende, auch die langweiligen.',
    ],
    trap:
      'Nicht das Ja ist das Problem, sondern dass es selbstverständlich geworden ist. Wenn du für alle die verlässliche Person bist, fragt man dich zuerst und entlastet dich zuletzt. Die Rechnung kommt nicht als Müdigkeit, sondern als stiller Groll gegen Leute, die nie erfahren haben, was es dich gekostet hat. Vieles können auch andere machen. Was nur du kannst, macht sonst niemand.',
    progress:
      'Miss die Woche an einem einzigen Nein, das gehalten hat. Nicht wegerklärt und nicht mit einer Ersatzleistung erkauft. Und prüf, ob du bei deinem Ja noch etwas lernst. Wenn du nur Bekanntes abarbeitest, ist das Fleiß, kein Fortschritt. Weiter kommst du über die Aufgabe, bei der du am Anfang nicht weißt, wie sie geht.',
    steps: [
      'Setz Prioritäten, statt nur zuzusagen: Wozu sagst du Ja, damit ein wichtigeres Ja möglich bleibt?',
      'Nimm dir etwas vor, das dich fachlich fordert. An anspruchsvollen Aufgaben wächst die Bereitschaft.',
      'Üb das Annehmen: Lass etwas so, wie es ist, ohne es verbessern zu wollen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wozu ich Ja gesagt habe',
        duration: '15 Minuten, sonntags',
        minutes: 15,
        body:
          'Schreib auf, wozu du in dieser Woche Ja gesagt hast. Alles, auch die Kleinigkeiten. Markier dann, was du aus Überzeugung übernommen hast und was aus Gewohnheit. Die zweite Liste ist die Stelle, an der aus Hilfsbereitschaft Erschöpfung wird.',
      },
      {
        kind: 'action',
        name: 'Ein Ja, ein Nein',
        duration: 'zu Wochenbeginn',
        body:
          'Leg am Montag beides fest: ein Ja zu etwas, das dich ein Stück fordert, und ein Nein zu etwas, das du sonst aus Gewohnheit übernommen hättest. Schreib beides auf. Das Nein ist die schwerere Hälfte, und es ist die Hälfte, die das Ja überhaupt möglich macht.',
      },
      {
        kind: 'sitting',
        name: 'Der ehrliche Zustand',
        duration: '6 Minuten, abends',
        minutes: 6,
        body:
          'Setz dich hin und geh deinen Körper durch, von den Füßen bis zum Kopf. Du sollst dich nicht entspannen, sondern herausfinden, wie viel Kraft heute noch da ist. Wenn du gern Ja sagst, merkst du zuletzt, dass du leer wirst. Diese sechs Minuten sind die einzige Stelle am Tag, an der die Antwort nicht von deiner Stimmung abhängt.',
      },
    ],
    mantra: 'Ich mache mit — mit ganzer Kraft und offenen Augen.',
  },
  acceptance: {
    name: 'Akzeptanz',
    emotion: 'Vergebung',
    worldview: 'harmonisch',
    essence:
      'Wie es dir geht, entscheidet sich in dir und nicht in den Umständen. Damit hörst du auf, mit der Wirklichkeit zu streiten, und fängst an, sie zu gestalten.',
    strength:
      'Du kannst die Wirklichkeit nehmen, wie sie ist, ohne dich ihr zu unterwerfen. Das ist die Fähigkeit, aus der Gestaltung entsteht.',
    advice:
      'Pass auf den Satz auf, der hier am leichtesten fällt: „So bin ich eben.“ Etwas anzunehmen heißt nicht, dass es sich nicht ändern lässt. Nimm dir eine Sache vor, die du bisher hingenommen hast, und schau nüchtern nach, was daran wirklich feststeht. Und vergib einem bestimmten Menschen, schriftlich, notfalls ohne den Brief abzuschicken.',
    signs: [
      'Du fragst zuerst, was du beitragen kannst, und nicht, wer schuld ist.',
      'Menschen dürfen anders sein, ohne dass es dich stört.',
      'Du kannst vergeben, ohne die Sache zu verharmlosen.',
    ],
    trap:
      'Am teuersten ist hier eine Verwechslung: annehmen und gutheißen sind nicht dasselbe. Annehmen heißt nur, dass du aufhörst, mit dem zu streiten, was ohnehin so ist. Ob es in Ordnung ist, sagt das nicht. Du kannst ein Unrecht annehmen und trotzdem etwas dagegen tun. Und umgekehrt: Was du nicht annimmst, kannst du auch nicht ändern, weil du noch damit beschäftigt bist, dass es nicht so sein sollte.',
    progress:
      'Du merkst es daran, dass deine Kraft zurückkommt. Der Streit mit den Tatsachen war teuer, und wie teuer, zeigt sich erst, wenn er aufhört. Vergeben ist hier kein Gefühl, sondern ein Verzicht: Du gibst die Forderung auf, dass die Vergangenheit anders gelaufen sein soll. Ob das geklappt hat, siehst du nicht daran, wie du über den Menschen denkst, sondern daran, dass du seltener an ihn denkst.',
    steps: [
      'Prüf deine Annahmen an der Sache: Was davon ist nachweisbar wahr, und was ist dir nur vertraut?',
      'Bring Ordnung in dein Denken: lesen, rechnen, argumentieren. Mit Klarheit wird aus Akzeptanz Vernunft.',
      'Vergib einem bestimmten Menschen, notfalls schriftlich und ohne den Brief abzuschicken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'So bin ich eben — stimmt das?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib drei Sätze auf, die mit „Ich bin nun mal …“ anfangen. Frag dich bei jedem: War das vor fünf Jahren auch schon so? Würde jemand, der mich gut kennt, das unterschreiben? Was würde es kosten, das zu ändern? Etwas anzunehmen heißt nicht, dass es sich nicht ändern lässt.',
      },
      {
        kind: 'action',
        name: 'Der erste Schritt zurück',
        duration: 'einmal, wenn es ansteht',
        body:
          'Melde dich bei einem Menschen, mit dem etwas offen geblieben ist. Eine Nachricht reicht, drei Sätze, ohne die alte Geschichte aufzurollen. Du musst die Sache nicht klären und nichts verzeihen, was noch nicht verziehen ist. Es geht nur darum, dass die Tür wieder eine Tür ist und keine Wand.',
      },
      {
        kind: 'sitting',
        name: 'Das ist gerade so',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Nimm eine Sache, die dir gerade nicht passt, und setz dich damit hin. Sag dir bei jedem Ausatmen innerlich: Das ist gerade so. Das ist weder Einverständnis noch Aufgeben. Du hörst nur auf, mit einer Wirklichkeit zu streiten, die sich davon ohnehin nicht beeindrucken lässt. Was danach zu tun ist, siehst du klarer.',
      },
    ],
    mantra: 'Ich nehme an, was ist — und gestalte, was geht.',
  },
  reason: {
    name: 'Vernunft',
    emotion: 'Verstehen',
    worldview: 'sinnvoll',
    essence:
      'Dein Verstand ist auf seiner Höhe: Du siehst Zusammenhänge, dein Wissen ordnet sich, und du kannst deine Entscheidungen begründen. Das ist die Ebene der Wissenschaft, der Medizin und des guten Handwerks.',
    strength:
      'Du kannst denken, ordnen und begründen. Das trägt Medizin, Wissenschaft und gutes Handwerk. Es hat nur eine Grenze, und die liegt nicht im Denken.',
    advice:
      'Dein Verstand ist hier ein ausgezeichnetes Werkzeug. Er weiß nur nicht, wann er aufhören soll. Nimm dir jeden Tag zehn Minuten, in denen du etwas einfach wahrnimmst, ohne es zu deuten: Musik, ein Gesicht, das Wetter. Und frag dich im nächsten Streit nicht, wer recht hat, sondern was der andere gerade braucht. Der nächste Schritt ist keine bessere Analyse, sondern eine andere Art zu schauen.',
    signs: [
      'Du unterscheidest sauber zwischen Fakten, Meinung und Gefühl.',
      'Du bringst komplizierte Dinge in eine Ordnung, statt dich davon erschlagen zu lassen.',
      'Du änderst deine Meinung, wenn die Daten es verlangen.',
    ],
    trap:
      'Der Verstand hält sich für das Ganze. Er kann alles erklären und niemanden trösten, und er verwechselt leicht sein Modell mit der Wirklichkeit. Der Fehler dabei: Verstehen fühlt sich nach Fortschritt an und kostet nichts, also analysierst du weiter, während sich an der Sache nichts ändert. Und ein guter Kopf findet auch die besseren Gründe dafür, warum er recht hat. Je klüger du bist, desto länger kannst du deine Irrtümer verteidigen.',
    progress:
      'Triff einmal pro Woche eine Entscheidung, bevor die Lage ganz geklärt ist, mit Datum und ohne Vorbehalt. Und schau am Ende der Woche nicht darauf, was du verstanden hast, sondern ob dich etwas berührt hat: ein Mensch, ein Stück Musik, ein Satz, den du nicht sofort einordnen konntest. Weiter kommst du nicht über den nächsten Gedanken, sondern an ihm vorbei.',
    steps: [
      'Üb, etwas wahrzunehmen, ohne es zu analysieren: zehn Minuten Musik, Natur oder ein Gesicht, ohne es zu deuten.',
      'Frag dich im Streit nicht „Wer hat recht?“, sondern „Was braucht dieser Mensch?“.',
      'Tu etwas Gutes, das dir nichts einbringt und in keiner Bilanz auftaucht.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das stärkste Gegenargument',
        duration: '25 Minuten, einmal',
        minutes: 25,
        body:
          'Nimm eine Überzeugung, die dir wirklich wichtig ist, und schreib die beste Fassung des Gegenteils auf. So gut, dass jemand, der das glaubt, sie unterschreiben würde. Keine Karikatur und kein Halbsatz zur Widerlegung am Ende. Wo es dir beim Schreiben eng wird, hört das Denken auf und fängt dein Selbstbild an.',
      },
      {
        kind: 'action',
        name: 'Was braucht dieser Mensch?',
        duration: 'im nächsten Konflikt',
        body:
          'Frag dich im nächsten Streit einmal nicht, wer recht hat, sondern was der andere gerade braucht. Und dann stell die Frage laut. Der Verstand kann alles erklären und niemanden trösten. Mit diesem einen Satz gibst du das zu.',
      },
      {
        kind: 'sitting',
        name: 'Zehn Minuten ohne Deutung',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Verbring zehn Minuten mit etwas, das nichts von dir will: mit Musik, einem Baum, einem Gesicht. Sobald du anfängst zu erklären, einzuordnen oder zu bewerten, merk es und geh zurück zum bloßen Anschauen. Es geht nicht um die Ruhe. Es geht darum, zu bemerken, wie schnell dein Kopf anspringt.',
      },
    ],
    mantra: 'Verstehen ist viel. Es ist nicht alles.',
  },
  love: {
    name: 'Liebe',
    emotion: 'Ehrfurcht',
    worldview: 'wohlwollend',
    essence:
      'Nicht das Gefühl aus den Liedern, sondern eine Haltung: ohne Bedingung, dauerhaft und ohne Gegenleistung. Du siehst, was an einem Menschen oder an einer Sache wesentlich ist, statt daran vorbeizusehen.',
    strength:
      'Dein Wohlwollen ist echt und hängt nicht von Bedingungen ab. Menschen spüren das, und es verändert Räume.',
    advice:
      'Der blinde Fleck auf dieser Ebene bist du selbst. Dein Wohlwollen fließt reichlich nach außen und kommt bei dir am seltensten an. Prüf das ehrlich, bevor du weiterliest. Dann nimm dir etwas Konkretes vor: Lass diese Woche einen Menschen einen Fehler machen, ohne ihn davor zu bewahren, und bleib dabei erreichbar. Das ist schwerer als jede Hilfe.',
    signs: [
      'Du willst, dass es anderen gut geht, auch wenn du nichts davon hast.',
      'Du entscheidest eher aus dem Bauch als nach Kalkül, und die Entscheidungen halten.',
      'Es beruhigt die Leute schon, dass du da bist.',
    ],
    trap:
      'Auch hier kannst du dich festhalten: an der Rolle des Liebenden und an Menschen, die du retten willst. Liebe, die festhält, ist wieder ein Wollen. Der feine Fehler dabei: Du machst aus dem Helfen eine Währung. Wenn du immer gibst und nie nimmst, stehen die anderen unmerklich in deiner Schuld, und du bleibst außerhalb der Beziehung. Nehmen ist die verletzlichere Hälfte.',
    progress:
      'Es geht nicht darum, wie viel du fühlst, sondern wie wenig du darauf angewiesen bist, dass die anderen sich richtig verhalten. Prüf es an einer Kleinigkeit: Wann hast du zuletzt etwas angenommen, ohne es innerhalb einer Woche auszugleichen? Wenn dir ein Beispiel einfällt, wirkt es.',
    steps: [
      'Lass es geschehen: Menschen dürfen ihren eigenen Weg gehen, auch den unbequemen.',
      'Sei jeden Tag für etwas Konkretes dankbar, auch ohne besonderen Anlass.',
      'Nimm dich selbst in dein Wohlwollen mit hinein. Das ist der häufigste blinde Fleck auf dieser Ebene.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Dank, der ankommt',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Schreib einem Menschen auf, was er für dich getan hat. Konkret, mit Datum, ohne allgemeine Sätze darüber, wie gut er ist. Dann schick es ab. Der stille Teil dieser Ebene fällt dir leicht. Unbequem wird es erst, wenn jemand erfährt, was er dir bedeutet.',
      },
      {
        kind: 'action',
        name: 'Einmal nicht retten',
        duration: 'wenn es so weit ist',
        body:
          'Lass einen Menschen den Weg gehen, von dem du ihn sonst abgehalten hättest: den unbequemen, den du für falsch hältst. Da sein: ja. Eingreifen: nein. Wenn du festhältst, willst du wieder etwas, und der Unterschied zeigt sich genau hier.',
      },
      {
        kind: 'sitting',
        name: 'Der stille gute Wunsch',
        duration: '2 Minuten täglich',
        minutes: 2,
        body:
          'Denk an einen Menschen und wünsch ihm etwas Konkretes und Gutes. Er soll es nicht erfahren, und du sollst nichts dafür tun. Am ersten Tag jemand, der dir nahesteht, am zweiten ein Fremder, am dritten jemand, den du schwierig findest. Am siebten Tag du selbst. Den siebten Tag lassen die meisten aus.',
      },
    ],
    mantra: 'Ich will dein Bestes, ohne Bedingung.',
  },
  joy: {
    name: 'Freude',
    emotion: 'Heiterkeit',
    worldview: 'vollkommen',
    essence:
      'Eine Freude, die nicht davon abhängt, was gerade passiert. Sie kommt von innen, sie ist geduldig und hält lange an. Und sie steckt andere an, ohne laut zu sein.',
    strength:
      'Du brauchst keinen Anlass, um dich zu freuen. Das ist selten, und es steckt an, ohne dass du etwas dafür tun musst.',
    advice:
      'Versuch nicht, das hier festzuhalten. In dem Moment, in dem du diese Freude wiederhaben willst, ist sie ein Verlangen geworden, und du bist zwölf Ebenen tiefer. Lass die schönen Zustände kommen und gehen wie das Wetter. Und wenn du etwas tun willst, tu es im Stillen, an einer Stelle, an der es niemand mitbekommt.',
    signs: [
      'Ganz gewöhnliche Momente berühren dich: Licht, Stimmen, Alltägliches.',
      'Geduld fällt dir leicht, weil du nichts erzwingen musst.',
      'Menschen fühlen sich in deiner Nähe wohler, ohne dass dafür etwas passieren muss.',
    ],
    trap:
      'Du willst die Erfahrung wiederholen: dasselbe Seminar, derselbe Ort, dieselbe Musik, dieselbe Substanz. Aus einem Zustand wird dabei ein Besitz, den du verteidigen musst, und damit ist er wieder ein Verlangen. Das Erzählen gehört dazu. Sobald du aus der Erfahrung eine Auskunft über dich selbst machst, hast du sie gegen Stolz eingetauscht.',
    progress:
      'Du erkennst diese Ebene nicht am Höhepunkt, sondern am Dienstag: daran, wie es dir geht, wenn nichts Besonderes passiert, wie lange du in einer Schlange stehen kannst, wie du mit einem langweiligen Menschen redest. Und wenn die Freude geht, lass sie gehen, ohne ihr etwas nachzurufen. Sie kommt zurück, und zwar zu denen, die nicht darauf warten.',
    steps: [
      'Lass die schönen Zustände kommen und gehen, ohne sie zu konservieren.',
      'Hilf im Stillen: Tu etwas, das niemand mitbekommt.',
      'Verbring Zeit in der Stille, ohne Programm und ohne Ziel.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das Unbemerkte',
        duration: 'abends, 5 Minuten',
        minutes: 5,
        body:
          'Schreib einen Moment des Tages auf, der gut war und den sonst niemand bemerkt hätte: Licht an einer Wand, ein Satz, das Geräusch der Tür. Am Ende der Woche wirfst du die Zettel weg. Du übst das Bemerken und nicht das Sammeln. Festgehaltene Freude wird wieder zum Verlangen.',
      },
      {
        kind: 'action',
        name: 'Etwas ziehen lassen',
        duration: 'wenn ein Moment gut ist',
        body:
          'Wenn dir heute ein Moment gut gefällt, mach kein Foto, erzähl niemandem davon und schreib ihn nirgends auf. Lass ihn vorbeigehen wie jeden anderen. Sonst wird daraus ein Zustand, den du wiederhaben willst, und damit ist es wieder ein Verlangen.',
      },
      {
        kind: 'sitting',
        name: 'Eine Sache lange ansehen',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Nimm einen gewöhnlichen Gegenstand: eine Tasse, deine Hand, ein Blatt. Sieh ihn so lange an, bis er aufhört, das zu sein, wofür du ihn hältst. Du sollst ihn nicht deuten, nicht bewundern und nicht fotografieren. Die Freude auf dieser Ebene kommt nicht von besonderen Dingen, sondern davon, wie lange du hinschaust.',
      },
    ],
    mantra: 'Nichts muss geschehen, damit es gut ist.',
  },
  peace: {
    name: 'Frieden',
    emotion: 'Glückseligkeit',
    worldview: 'vollständig',
    essence:
      'Die Grenze zwischen dir und dem, was du wahrnimmst, wird durchlässig. Alles bewegt sich, nichts drängt. Das ist sehr selten — Hawkins schätzt: ein Mensch unter zehn Millionen.',
    strength:
      'Du hast aufgehört, mit dem zu ringen, was ist. Was bleibt, ist eine Stille, die andere beruhigt, ohne dass du etwas dafür tust.',
    advice:
      'Bleib im Alltag. Auf dieser Höhe ist es verlockend, sich zurückzuziehen, und meistens verlierst du dabei etwas. Halt an ganz gewöhnlichen Verpflichtungen fest: an Rechnungen, an Terminen, an Menschen, die nichts von Ebenen wissen. Und mach weiter mit der Übung, die dich hierher gebracht hat. Es gibt keinen Zustand, den du besitzt, und keinen, der ohne Übung bleibt.',
    signs: [
      'Die Stille fühlt sich für dich voll an und nicht leer.',
      'Getrenntsein kommt dir weniger echt vor als Verbundensein.',
      'Du handelst wie von selbst, ohne inneren Antreiber.',
    ],
    trap:
      'Der Rückzug tarnt sich hier gut. Er sieht nach Reife aus und ist oft nur bequemer. Ein Frieden, der niemandem mehr nützt, verliert seinen Boden. Verlockend ist außerdem, zu lehren: Wenn du hier stehst, fragen dich die Leute, und dann antwortest du leicht früher, als du verstehst.',
    progress:
      'Ein Frieden, der einen Werktag nicht aushält, ist keiner. Die Fragen dazu sind unspektakulär: Kann man dich im Streit noch ansprechen? Hörst du Kritik, ohne sie sofort zu erklären? Setzt du dich morgens auch dann zur Übung hin, wenn es gar nicht nötig scheint? Und behalt einen Menschen in deiner Nähe, der dir widersprechen darf, ohne dass es ihn etwas kostet. Hier oben fehlt dir am ehesten der Widerspruch.',
    steps: [
      'Bleib im Alltag: Der Frieden bewährt sich in der Küche und nicht auf dem Berg.',
      'Gib weiter, was du kannst — schlicht und ohne dich als Lehrer aufzuspielen.',
      'Mach weiter mit der Übung, die dich hierher gebracht hat. Es gibt keinen Zustand, den du besitzt.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wem hat das genützt?',
        duration: '10 Minuten, wöchentlich',
        minutes: 10,
        body:
          'Schreib auf, wem deine Ruhe in der vergangenen Woche konkret genützt hat: Wer hat sich beruhigt? Wem war geholfen? Wer ist geblieben? Wenn die Liste leer bleibt, sagt dir das mehr als jede weitere Übung. Dann hat sich dieser Frieden aus der Welt zurückgezogen.',
      },
      {
        kind: 'action',
        name: 'Die Küche',
        duration: 'täglich, so lange es dauert',
        body:
          'Nimm eine gewöhnliche Arbeit — den Abwasch, die Treppe, den Weg zur Mülltonne — und mach sie ganz: ohne Musik, ohne Handy und ohne nebenbei etwas zu planen. Wenn dein Kopf abschweift, komm zurück zu deinen Händen. Hier bewährt sich der Frieden und nicht auf dem Berg.',
      },
      {
        kind: 'sitting',
        name: 'Der Atem, der sich selbst atmet',
        duration: '20 Minuten täglich',
        minutes: 20,
        body:
          'Setz dich hin und mach nichts mit dem Atem: nicht verlängern, nicht zählen, nicht vertiefen. Bemerk nur, dass geatmet wird, ohne dass jemand es tut. Das ist die schlichteste Übung dieser Liste und die einzige, die nicht besser wird, wenn du dir mehr Mühe gibst.',
      },
    ],
    mantra: 'Alles ist, wie es ist. Und das genügt.',
  },
  enlightenment: {
    name: 'Erleuchtung',
    emotion: 'Unaussprechlich',
    worldview: 'so, wie sie ist',
    essence:
      'Hier endet die Skala (700 bis 1000). Es gibt kein Ich mehr, das etwas erlebt, sondern nur noch das Sein selbst. Hawkins ordnet dieser Ebene die großen Lehrer der Menschheitsgeschichte zu.',
    strength:
      'Diese Ebene ist eine Richtung, keine Position. Wenn sie dich anzieht, ist das schon etwas: Du weißt, wohin.',
    advice:
      'Hier gibt es nichts zu raten. Wenn diese Ebene als dein Ergebnis erscheint, sagt das etwas über die Skala und die Rechnung dahinter, aber nichts über dich. Hawkins ordnet ihr die großen Lehrer der Menschheitsgeschichte zu, und über einen Fragebogen kommt dort niemand hin. Nimm sie als Richtung. Alles Praktische steht auf den sechzehn Ebenen darunter.',
    signs: [
      'Von innen beschreibt sich diese Ebene nicht.',
      'Wenn jemand sie für sich beansprucht, spricht meistens der Stolz.',
      'Was von ihr bleibt, sind die Menschen, die davon berührt wurden.',
    ],
    trap:
      'Das Wort selbst. Sobald du die Erleuchtung zum Ziel machst, ist sie das ehrgeizigste Verlangen von allen. Und der Fragebogen misst nur, was du über dich selbst sagst. Wenn du überall zustimmst, kommen überall hohe Werte heraus. Das kann heißen, dass es dir wirklich gut geht. Es kann auch heißen, dass du so geantwortet hast, wie du gern wärst. Beides ist menschlich, und beides ist kein Vorwurf.',
    progress:
      'Praktisch wird es eine Ebene tiefer. Geh die Skala durch und such die Ebene, auf der du an einem schlechten Tag landest, nicht die, auf der du an einem guten Tag stehst. Die erste sagt mehr über deinen Alltag. Und frag Menschen, die dich lange kennen, wo sie dich sehen würden. Diese Antwort ist unbequemer als jedes Ergebnis, und nur mit ihr kannst du arbeiten.',
    steps: [
      'Hier ist nichts zu tun. An dieser Stelle endet die Skala. Der Weg dorthin sind die 16 Ebenen darunter, gelebt.',
      'Wichtig ist die Richtung und nicht das Ende: Eine Ebene nach oben verändert ein Leben.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz, der übrig bleibt',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib in einem Satz auf, was du suchst. Dann streich jedes Wort, das ein Ziel, einen Zustand oder einen Zeitpunkt benennt. Lies, was übrig bleibt. Meistens ist es nichts. Das ist keine Niederlage, sondern das ehrlichste Ergebnis auf dieser Höhe.',
      },
      {
        kind: 'action',
        name: 'Eine Ebene tiefer',
        duration: 'heute',
        body:
          'Nimm dir heute eine Übung von einer Ebene vor, auf der du tatsächlich stehst, und mach sie zu Ende. Diese Ebene hier ist keine Aufgabe, sondern eine Richtung. Der Weg dorthin sind die sechzehn Ebenen darunter, gelebt. Wenn du bei 700 anfängst, übst du Verlangen.',
      },
      {
        kind: 'sitting',
        name: 'Wer fragt?',
        duration: 'kein Zeitrahmen',
        body:
          'Wenn ein Gedanke auftaucht, frag einmal, wem er auftaucht — und beantworte die Frage nicht. Dann lass ihn ziehen. Das ist die einzige Übung auf dieser Liste, die nichts erreichen soll. Wenn du sie benutzt, um irgendwohin zu kommen, übst du Verlangen.',
      },
    ],
    mantra: 'Sein.',
  },
} satisfies Record<LevelId, LevelText>

/** Aus der deutschen Vorlage abgeleitet — jede Sprache trägt dieselben Ebenen. */
type LevelCopy = typeof de

const en: LevelCopy = {
  shame: {
    name: 'Shame',
    emotion: 'Humiliation',
    worldview: 'miserable',
    essence:
      'You are not ashamed of something you did, you are ashamed of yourself. “I made a mistake” has turned into “I am a mistake”. That costs so much strength that almost nothing is left for anything else.',
    strength:
      'Shame shows that how you come across to others matters to you. That sensitivity is not the problem. Right now it is only pointed at yourself.',
    advice:
      'Do not start by trying to understand the shame. It lives on nobody knowing about it. Find one person you trust and tell them one thing you have kept hidden until now. If they are still there afterwards, the shame has lost its ground. That is all you need to do this week. Everything else gets easier from there.',
    signs: [
      'You do not want to be seen, and you leave rooms where you might stand out.',
      'Old embarrassments come to mind unasked and hit you straight away.',
      'Praise makes you uncomfortable. It feels as though someone had misjudged you.',
    ],
    trap:
      'Shame promises protection: make yourself small and you cannot fall far. The price is that nobody gets to know you, including you. And almost everyone tries the same thing here: to prove that they are all right. One more achievement, one more favour. It works for a few days, then the question is back and sharper than before. Anything you have to earn can be lost again.',
    progress:
      'Do not expect it to feel good soon. The first sign is smaller than that: you stay in a room you would otherwise have left. That counts, even if you are shaking. If shame has been running your days for months, you do not have to carry that alone. Therapy exists for exactly this.',
    steps: [
      'Separate the deed from yourself. Write down what happened the way an outsider would write it — without any verdict on you.',
      'Tell someone you trust something you have kept hidden so far. Shame rarely survives someone else knowing about it.',
      'Look after your body the way you would look after a guest: eat, sleep, shower, go outside. Self-respect often starts somewhere very practical.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The two versions',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down the incident you are ashamed of twice. Once the way you tell it to yourself. And once the way someone would write it who only saw what happened. Read both versions out loud. The difference between them is the shame. Now it is on paper instead of working invisibly inside you.',
      },
      {
        kind: 'action',
        name: 'Seen once',
        duration: '5 minutes, once a day',
        minutes: 5,
        body:
          'Go somewhere there are people: a bakery, a platform, a park. Stay there for five minutes without looking at your phone. Say something unremarkable to one person — a greeting, a thank you, a question about the time. Shame claims that everyone can see something in you. Those five minutes show you every time that nobody is looking.',
      },
      {
        kind: 'sitting',
        name: 'A hand on the breastbone',
        duration: '6 minutes daily',
        minutes: 6,
        body:
          'Sit down, lay one hand flat on your breastbone and leave it there. Say three sentences to yourself: this is hard right now. Everyone knows something like it. I would like to be kind to myself. If you think “this is ridiculous” while you do it, that belongs to the exercise. Say the sentences anyway.',
      },
    ],
    mantra: 'I have made mistakes. I am not one.',
  },
  guilt: {
    name: 'Guilt',
    emotion: 'Blame',
    worldview: 'punishing',
    essence:
      'There is a trial running inside you that never ends. You go through old stories again and again, and the verdict comes back against you every time.',
    strength:
      'Guilt means you have a conscience and take responsibility seriously. That is exactly what you need in order to put something right.',
    advice:
      'Turn the feeling into a bill. Who do you owe what, in concrete terms? The answer is usually shorter than the accusation. Pay it, apologise, repair it, and set a date by which your part is done. After that the matter is closed, even if the feeling lingers for a while.',
    signs: [
      'You apologise for things you are not responsible for.',
      'When other people are struggling, you look for your part in it first.',
      'You find it hard to accept something good. It feels undeserved.',
    ],
    trap:
      'Guilt feels moral, but it is often comfortable. As long as you are accusing yourself, you do not have to make anything right. That is the mistake almost everyone makes here: they pay with suffering instead of with an action. The person you owe gets nothing from your bad nights. A call, a sentence or a sum would actually help them.',
    progress:
      'Go by the bill, not by the feeling. Once your part is done, it is done, even if it feels different for weeks. And if there is nobody left who could receive anything, because the person has died or it was thirty years ago, then it is no longer guilt. It is grief, and grief has to be lived through, not paid off.',
    steps: [
      'Turn the guilt into an account: who do you owe what, concretely? Pay it, apologise, repair it. After that it is done.',
      'Set an end. A date from which the matter is settled. If you keep repeating old accusations after that, it is not remorse any more, it is habit.',
      'Ask yourself with every accusation: would a court see it that way? Usually a small part is left over, and you can do something with that part.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The account',
        duration: '15 minutes, once per case',
        minutes: 15,
        body:
          'Make three columns on a sheet of paper: what happened? What was really my part in it? What would make it good? The third column needs a concrete action with a date — or the word “nothing”. Then carry the action out or throw the sheet away. Do not leave it lying around.',
      },
      {
        kind: 'action',
        name: 'Thank you, nothing after it',
        duration: 'once a day',
        body:
          'Accept something today: a compliment, some help, a present. Say only “thank you”. No “you really should not have”, no offer in return, no explanation of why you do not deserve it. The sentence takes two seconds. How hard it is for you, you only notice while saying it.',
      },
      {
        kind: 'sitting',
        name: 'Heard, adjourned',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Sit down and wait for the first accusation. It will come. Listen to it once, all the way, without defending yourself. Then say three words to yourself: heard, checked, adjourned. Then go back to your breath, and use the same three words for the next accusation. The prosecutor inside you does not get quieter when you argue with him. He gets quieter when nobody listens any more.',
      },
    ],
    mantra: 'I will make it good — and then I will leave it behind.',
  },
  apathy: {
    name: 'Apathy',
    emotion: 'Despair',
    worldview: 'hopeless',
    essence:
      'Nothing is worth it, everything is too hard. The world is not against you, you simply stopped caring. Help reaches you, but it changes nothing.',
    strength:
      'Apathy is often exhaustion disguised as indifference. Your system has shut down to protect you. That is a signal, not a verdict.',
    advice:
      'Do not wait for motivation. Here it does not come first, it comes afterwards. Pick the smallest step you can manage even on a bad day: open a window, walk once around the block, send one message to one person. And arrange it with somebody. Borrowed energy carries you while your own is missing.',
    signs: [
      'Tasks pile up because even small steps look enormous.',
      'You often say “never mind” and you mean it.',
      'Other people worry about you, and it leaves you fairly cold.',
    ],
    trap:
      'Apathy saves energy, and that is how it keeps itself alive: if you try nothing, you fail at nothing, but nothing succeeds either that could contradict the emptiness. The most common mistake is starting too big. Because you feel nothing, you plan the great new beginning from Monday. It is too heavy, you do not manage it, and there is your proof that nothing works. Thoughts like “what is the point” are part of the state. They say nothing about your future.',
    progress:
      'Measure the week by three questions, not by your mood: Did you move? Were you outside in daylight? Did you deal with another person? If anger or sadness come back, that is not a relapse but a step up. And if this has been going on for weeks, it is not a question of character. It belongs in a doctor’s office.',
    steps: [
      'Make the first step so small that it looks ridiculous: a glass of water, one line, two minutes outside the door. Movement comes first, motivation second.',
      'Arrange to meet someone and use their energy. What you cannot manage alone often works with someone else.',
      'If the apathy lasts, it is also a medical matter. Get help. That is not a sign of weakness.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What used to matter to me',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down ten things that used to matter to you: music, a person, a place, a piece of work. You do not have to take any of them up again. It is only about writing them down. Apathy claims there was never anything. The list proves the opposite, and you do not have to do more than that.',
      },
      {
        kind: 'action',
        name: 'Two minutes, then stop',
        duration: '2 minutes, twice a day',
        minutes: 2,
        body:
          'Find the smallest visible thing in the room: a plate, three steps outside the door, one line. Set two minutes, start, and stop when it rings — even if you could carry on. Stopping is part of it. That keeps the exercise small enough for you to repeat it tomorrow.',
      },
      {
        kind: 'sitting',
        name: 'Five things in the room',
        duration: '3 minutes, twice a day',
        minutes: 3,
        body:
          'You are not supposed to meditate, only to count: five things you can see, four you can hear, three you can feel, two you can smell, one you can taste. If you get stuck, start again. This is the smallest possible contact with the world, and you need no motivation for it.',
      },
    ],
    mantra: 'I do not have to feel it. I will start anyway.',
  },
  grief: {
    name: 'Grief',
    emotion: 'Regret',
    worldview: 'tragic',
    essence:
      'The loss has a name, and that is already progress. There is strength in grief; there was none in apathy. You are only looking at what is missing, and no longer at what is there.',
    strength:
      'Grief is love that has lost its counterpart. Its size tells you how much something meant to you.',
    advice:
      'Give grief a fixed place every day: twenty minutes, one chair, one time. Then it does not need the whole day. And do one thing a day for another person. Not as comfort, but because it is the quickest way to look outward again. You cannot shortcut grief. On this scale it is already a step up.',
    signs: [
      'A lot reminds you of the past, and the past was better.',
      'Tears come easily, sometimes for no clear reason.',
      'When you start something new, it feels like a betrayal of what you lost.',
    ],
    trap:
      'Grief can become the last connection. Then you are afraid to let go, because otherwise you lose a second time. The other way of holding on is called functioning: if grief gets no room, it does not disappear. It comes back later as exhaustion, as irritability, as a body that is always missing something.',
    progress:
      'Grief comes in waves, not in a straight line. A smell, a date, a song, and you are back on day one. So do not watch whether the waves get smaller, but how quickly you surface afterwards. If nothing moves for weeks, or nothing reaches you any more, not even good things, get support. And tell the people around you what you need. Otherwise they guess, and they usually guess wrong.',
    steps: [
      'Give the grief a fixed time and place: twenty minutes a day when it is allowed to be there. What has a place of its own floods everything else less often.',
      'Write down what is left: people, abilities, memories. Not as consolation, but as an inventory.',
      'Do something for someone else. Grief turns your eyes inward, a helping hand turns them outward again.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unsent letter',
        duration: '30 minutes, once',
        minutes: 30,
        body:
          'Write a letter to what is missing: to a person, or to a life that never happened. Everything is allowed in it — the thanks, the reproach, the unfinished business. At the end, write one sentence about what you will keep. You do not send the letter and you do not throw it away. You put it aside.',
      },
      {
        kind: 'action',
        name: 'A hand for someone',
        duration: 'once a week',
        body:
          'Find one small thing you can do for another person: carry something, cook something, make one call. It does not have to mean anything or replace anyone. No thought helps against the inward gaze. Half an hour in which your hands are doing something else does help.',
      },
      {
        kind: 'sitting',
        name: 'The appointment',
        duration: '20 minutes daily, at a fixed time',
        minutes: 20,
        body:
          'Give the grief an appointment: every day at the same time, in the same chair. Everything is allowed there — photographs, tears, letters. If it comes outside that time, write the thought on a slip of paper and put it on the chair for tomorrow. You are not making it smaller. It simply gets one room instead of the whole flat.',
      },
    ],
    mantra: 'I have lost. I am not lost.',
  },
  fear: {
    name: 'Fear',
    emotion: 'Worry',
    worldview: 'threatening',
    essence:
      'Something could go wrong everywhere, and your mind has already played it all through. Fear really does protect you — until it starts running your life.',
    strength:
      'Fear is a protective system that works. It has saved you from plenty of mistakes. It is just switched on too often right now.',
    advice:
      'Start with the body, not with the argument: breathe out slowly, longer than you breathe in. The mind follows the breath. Then write the fear to its end. What exactly happens in the worst case, and what do you do then? With a plan, panic becomes a problem. And once this week, walk voluntarily into something that makes you uncomfortable. Fear only shrinks on things you have actually done.',
    signs: [
      'You play through disasters that almost never happen.',
      'You put decisions off because every option carries a risk.',
      'You say yes to avoid an argument, not because you want to.',
    ],
    trap:
      'What keeps fear alive is not your thinking but your avoiding. It looks harmless: a cancellation, a call you push to tomorrow, a question you ask three times to be safe. Each time you feel relief at once, and each time your nervous system learns: the danger was real. So check every precaution for what follows from it. In real danger you do something. In fear you leave something undone.',
    progress:
      'Expect it to get worse first. When you approach something you have avoided for a long time, the fear rises before it falls, and it only falls if you stay. That takes twenty minutes rather than two. So do not ask how calm you are, but how short the list of things you walk around is getting. If you have panic attacks, or fear runs your day: there are treatments for that, and they work well.',
    steps: [
      'Write the fear through to the end: what exactly happens in the worst case, and what do you do then? With a plan, panic turns into a problem.',
      'Find one small thing every week that makes you uncomfortable, and do it voluntarily. Courage only grows around things you have actually done.',
      'Calm your body first: breathe out slowly, longer than you breathe in. Your mind follows the breath, not the argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'And then?',
        duration: '10 minutes, whenever a fear circles',
        minutes: 10,
        body:
          'Write the fear down as one sentence. Then ask “and then?” and answer it. Then ask “and then?” again. Keep going until you reach a point where you are acting again. Fear usually stops at the frightening image. On paper you get past it.',
      },
      {
        kind: 'action',
        name: 'The chosen discomfort',
        duration: 'once a week',
        body:
          'At the start of the week, pick one small thing you have been dodging: a call, a question, an objection. Get it done before the week is over. It should be small enough to be sure it works, and big enough that you feel uneasy just before.',
      },
      {
        kind: 'sitting',
        name: 'Out longer than in',
        duration: '6 minutes, when it closes in',
        minutes: 6,
        body:
          'Breathe in for four counts and out for six, with no pause in between. Nothing else. You do not have to calm down and you do not have to talk yourself round. The long out-breath is the only switch on fear that you can operate deliberately. Your mind follows the breath, and the arguments come last.',
      },
    ],
    mantra: 'I go anyway, even with shaking knees.',
  },
  desire: {
    name: 'Desire',
    emotion: 'Craving',
    worldview: 'disappointing',
    essence:
      'Something is always missing, and the next thing is supposed to fix it. Desire moves a lot — it is behind most careers — and it never arrives.',
    strength:
      'Desire is drive. Without it you would have none of what you have built. It does not need to go away, it needs a direction.',
    advice:
      'You do not have to stop wanting. Most of the good things in your life came from desire. What you are missing is the pause in between. Put twenty-four hours between impulse and purchase, and the same between idea and commitment. Whatever still pulls after that was real. The rest was restlessness.',
    signs: [
      'Reaching a goal feels good briefly, and then the next one is already there.',
      'As soon as it goes quiet, you reach for a distraction: phone, shopping, food, another episode.',
      'When other people have something, you think first about what you are missing.',
    ],
    trap:
      'Desire mistakes wanting for needing. You are always one purchase away from fulfilment, and that is exactly why you never arrive. Because it is not the object that counts but the feeling it promises. Ask yourself about whatever is pulling at you right now: what would I be free of if I had it? The answer is rarely “shoes”. It is usually calm, recognition or safety, and those you can get more cheaply direct.',
    progress:
      'This is not about giving things up but about finishing: start less, complete more. The second sign is silence. When you need nothing to get through the next ten minutes, you have come a good way. And if you regularly cannot manage the twenty-four hours, this is no longer desire but a dependency. Do not stay alone with that.',
    steps: [
      'Let 24 hours pass between the impulse and the action. What still pulls at you afterwards was real.',
      'Ask yourself with every “I want”: which feeling am I expecting from it? Usually you can get that feeling another way too.',
      'Spend a week practising buying nothing new. Write down what you already own without noticing it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Which feeling am I buying?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down the last five things you bought, ate or started when you were feeling bad. Make two columns next to them: which feeling did you promise yourself, and which one actually came? The second column usually stays empty, and that is the result.',
      },
      {
        kind: 'action',
        name: 'The ten-minute curve',
        duration: '10 minutes, at every impulse',
        minutes: 10,
        body:
          'When the impulse comes — phone, shopping, food — set ten minutes and do nothing about it. Not “never”, just “not now”. Write down on a scale of 0 to 10 how strong it was at the start and how strong at the end. After a week you have your own curve and you can see what desire does on its own.',
      },
      {
        kind: 'sitting',
        name: 'The wave',
        duration: '8 minutes, when it pulls',
        minutes: 8,
        body:
          'Sit down when the impulse comes, and do nothing. Look for the desire in your body: chest, stomach, hands. Name what you find — tightness, tingling, pressure — and stay with it. It rises, it holds, it falls. You do not have to do anything about it. Just watch long enough to notice that it passes by itself.',
      },
    ],
    mantra: 'I am allowed to want without being driven.',
  },
  anger: {
    name: 'Anger',
    emotion: 'Hate',
    worldview: 'hostile',
    essence:
      'You finally have strength, and it burns. Anger comes up when what you want meets resistance. It can end bad situations, and it can end relationships. That depends on whether it gets a direction.',
    strength:
      'Anger is energy defending a line. It tells you more clearly than any other feeling what matters to you.',
    advice:
      'Say nothing while it burns. Anger tells you that a line has been crossed. It does not tell you what to do now. Move it through the body first: stairs, running, weights. Then say in one sentence what you need, instead of making an accusation. An accusation gets a defence. A request is something a person can respond to.',
    signs: [
      'You get irritated faster than you would like, especially about small things.',
      'You argue in your head with people you never actually argued with.',
      'You are right, and it helps nobody.',
    ],
    trap:
      'Anger feels strong, but it is only a reaction. As long as it burns, the other person decides what you feel. Two mistakes look like opposites here: letting it out and swallowing it. Both skip the same sentence, the one where you say what you want. And anger is usually the second feeling. The first was fear, hurt or helplessness. If you only show the second, you never get what it was really about.',
    progress:
      'Do not ask how rarely you get angry, but how quickly the heat becomes a sentence: ideally the same day, addressed to a specific person, with a deadline. Anger that never becomes an action turns into resentment, and resentment lasts years. And if the people around you are becoming careful, or things get broken, get help. Before the next time, not after.',
    steps: [
      'Look underneath the anger: what was hurt — a boundary, a value, a need? The anger points in a direction, but it is not an answer.',
      'Get it out of your system physically before you speak: running, weights, stairs. Then say what you need instead of making accusations.',
      'Draw a clear line instead of going on resenting. Resentment is anger that was never allowed to become an action.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence without you',
        duration: 'after every flare-up',
        body:
          'Take your body first: twenty squats, the stairs, once round the block. Then write a single sentence about what you wanted and did not get. The word “you” must not appear in that sentence. That one sentence is the only thing you say out loud. The accusation stays on the paper.',
      },
      {
        kind: 'action',
        name: 'The request',
        duration: 'once, as soon as you can',
        body:
          'Tell the person it concerns, in one sentence, what you need — and not what they did wrong. No “always”, no “never”, no history. An accusation is met with a defence. A request is something someone can respond to.',
      },
      {
        kind: 'sitting',
        name: 'Going to the heat',
        duration: '7 minutes, after a flare-up',
        minutes: 7,
        body:
          'Sit down and look for the anger in your body instead of breathing it away: jaw, neck, chest, hands. Take your attention to the hottest place and stay there. Do not express it and do not swallow it, both make it bigger. If you simply watch it, it lets go by itself after a few minutes.',
      },
    ],
    mantra: 'My anger shows me what matters to me.',
  },
  pride: {
    name: 'Pride',
    emotion: 'Contempt',
    worldview: 'demanding',
    essence:
      'You are doing noticeably better here than further down. Pride gives you footing, you achieve something and you belong somewhere. The catch is that all of it depends on conditions: on your status, on your role, on being right. And those can break away.',
    strength:
      'Pride gives you footing and drive. You have achieved something, and that is allowed to feel good. The only question is what happens when it is challenged.',
    advice:
      'Do not read this level as an accusation. Pride carried you here, and it carries further than anything below it. It only gets expensive at the moment you would have to learn something. So here is a simple test, every day: admit out loud once that you do not know something. In front of others, where it costs you a little. How hard that is tells you exactly what keeps you here.',
    signs: [
      'Criticism hits you hard, even when it is factually correct.',
      'You would rather do it alone and take twice as long than ask for help.',
      'You compare yourself often, and quietly note where you are better.',
    ],
    trap:
      'Pride has to be defended. Because your self-image hangs on your successes, every mistake becomes a threat. The mistake inside that: you treat your opinion as part of yourself. Then every correction feels like an attack, and you defend a position longer than you yourself still believe in it. You hardly notice, but the others do. At some point they stop telling you things, and you are the last to hear what people think of you.',
    progress:
      'Do not count your successes but two sentences a week: “You were right” and “I do not know”. The first time costs something, after that it gets easy. And you get people back who tell you things again. Also, go regularly to places where you are the beginner: a class, a foreign language, a sport you cannot do. The way up starts there, not on stage.',
    steps: [
      'Admit once a day that you do not know something. Out loud, in front of others.',
      'Separate your opinion from yourself. You can drop an opinion without losing yourself.',
      'Ask for real help this week. Not as a test, but because you need it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What would be left',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Describe yourself on half a page without writing a single word about your job, your abilities, your possessions, your role or your achievements. What is left is what no setback can take from you. If the page stays almost empty, you have the result of the exercise in black and white.',
      },
      {
        kind: 'action',
        name: 'The expensive sentence',
        duration: 'once a day',
        body:
          'Say out loud once a day “I do not know about that” or “you were right” — and say it somewhere it costs you something. In the evening, write down what actually happened afterwards. Almost always: nothing. That is exactly the point of this exercise.',
      },
      {
        kind: 'sitting',
        name: 'Achieving nothing',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Sit for ten minutes and achieve nothing while you do: you are not supposed to get calmer, or better, or further on. Every time you think “this is pointless” or “other people are better at this”, you have caught pride at work. That noticing is the exercise, not the silence.',
      },
    ],
    mantra: 'I do not have to be right to be all right.',
  },
  courage: {
    name: 'Courage',
    emotion: 'Affirmation',
    worldview: 'workable',
    essence:
      'This is the threshold. From here you give the world more strength than it costs you. Your problems have not gone away, but they have turned into tasks, and you trust yourself to take them on.',
    strength:
      'Courage does not mean having no fear. It means acting anyway. You can already do that, and everything further builds on it.',
    advice:
      'You are above the threshold. What threatens you now is not relapse but overload. So take on two things at once: one uncomfortable task a week that you choose deliberately, and with every irritation the question whether you really have to fight here or whether it is enough to take the situation as it is. On this level, letting go is the harder practice, not taking action.',
    signs: [
      'You say difficult things even though you feel uneasy doing it.',
      'A mistake no longer costs you your sense of self-worth.',
      'You take responsibility without looking for someone to blame.',
    ],
    trap:
      'Courage can turn into permanent stress: take on everything, let go of nothing. Courage feels like a strength that never runs out, and because things are actually moving now, you easily take on everything at once. If you constantly have to push yourself, you burn out. So sort: is this in your hands or not? The first is worth your effort. The second costs you strength and changes nothing.',
    progress:
      'At the end of the month, do not ask how much you took on, but whether you also let something go. Count sleep and rest as work, not as reward. And do not expect the fear to disappear. On this level it stays, it just no longer decides. The good feeling comes after the action, not before it.',
    steps: [
      'Keep moving: one unpleasant thing a week that you pick deliberately.',
      'Practise letting go with small things. You do not have to overcome every resistance. Some things get easier when you stop pulling.',
      'Ask yourself when you are annoyed: do I have to fight here, or is it enough to take the situation as it is?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Fight it or leave it',
        duration: '15 minutes, weekly',
        minutes: 15,
        body:
          'Write down the three things that are costing you the most strength right now. Ask yourself about each one: do I have to fight here, or is it enough to take the situation as it is? Cross one of them out. On this level, crossing out is the harder exercise, not taking things on.',
      },
      {
        kind: 'action',
        name: 'The one thing in the morning',
        duration: 'once a week',
        body:
          'On Sunday, pick the one thing you have been dodging all week. Do it on Monday in the first hour, before anything else can get in front of it. One, not three. If you spread yourself across too much, courage turns into rushing.',
      },
      {
        kind: 'sitting',
        name: 'Two minutes at the threshold',
        duration: '2 minutes, before the uncomfortable thing',
        minutes: 2,
        body:
          'Sit down for two minutes before you do the uncomfortable thing, and do nothing about it. You do not have to give yourself a pep talk or prepare any sentences. Just feel what the moment just before feels like. Then stand up and do it. Courage does not mean not having that feeling. Courage means standing up afterwards.',
      },
    ],
    mantra: 'I can do this — and if not, I will learn it.',
  },
  neutrality: {
    name: 'Neutrality',
    emotion: 'Trust',
    worldview: 'satisfactory',
    essence:
      'It is fine as it is, and if it is not, you can live with that too. Neutrality is the first genuinely relaxed place on the scale: no having to, no being right, very little drama.',
    strength:
      'You have learned that not everything depends on you. That calm is a real gain, and it is the ground on which commitment becomes possible at all.',
    advice:
      'Do not mistake this for the goal. Neutrality is the first truly relaxed place on the scale, and that is exactly why many people stop here. Find one thing that matters enough to you to get uncomfortable for it, and say yes to it before you know whether it will pay off. The way up is through commitment, not through even more calm.',
    signs: [
      'A no from outside no longer knocks you over.',
      'You can change your plans without feeling like a loser.',
      'People like coming to you because you do not blow things up.',
    ],
    trap:
      'Calm can tip into indifference, and from the inside both feel the same. Calm means: it matters to me, and I can bear it if things turn out differently. Indifferent means: I have stopped letting it matter so that it cannot hurt any more. The second is comfortable, and it costs you exactly the involvement the levels above are made of.',
    progress:
      'The test is a single question: what would you embarrass yourself for? If something comes to mind, you are on your way. If nothing does, you have the real result of this level. Then take on something you can fail at, and set a date for it. Only what can go wrong still concerns you.',
    steps: [
      'Say yes deliberately to something that costs you effort. Neutrality only turns into willingness when you commit.',
      'Find something that matters enough to you to be uncomfortable for.',
      'Bring your calm in actively: take over where other people have got stuck.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Three things worth the discomfort',
        duration: '15 minutes, then a weekly check',
        minutes: 15,
        body:
          'Write down three things you would stand up for even if it cost you something. Take on the smallest of them this week. Neutrality is good ground but a poor place to live. This exercise shows you whether anything still matters enough to you.',
      },
      {
        kind: 'action',
        name: 'Getting involved once',
        duration: 'once a week',
        body:
          'This week, get involved in something you would normally stay out of: a discussion, a task, an argument between other people. Not in order to be right, but because you can stay calmer than the people who have got stuck in it.',
      },
      {
        kind: 'sitting',
        name: 'Letting it come and go',
        duration: '12 minutes daily',
        minutes: 12,
        body:
          'Sit down and let everything pass by: thoughts, sounds, an itch, plans. Hold on to nothing, push nothing away, comment on nothing. This exercise comes easily to you on this level, and at the same time it is the test: wherever you do hold on or push away, there is still something other than calm.',
      },
    ],
    mantra: 'I accept it — and I get on with it anyway.',
  },
  willingness: {
    name: 'Willingness',
    emotion: 'Optimism',
    worldview: 'hopeful',
    essence:
      '“It will do” has turned into “I am glad to do it”. Work no longer feels like resistance, you like learning, and other people notice that they can count on you.',
    strength:
      'You are someone people can count on. That reliability is rare and valuable. It only needs a boundary so that it stays yours.',
    advice:
      'Your yes is your strength, and it is your bill. The question here is no longer whether you take something on, but what you are saving your next yes for. This week, cancel one commitment you only made out of habit, and put that energy into something that genuinely stretches you. On this level, exhaustion looks like commitment for a long time.',
    signs: [
      'You volunteer before anyone has to ask.',
      'A setback is information to you, not a verdict.',
      'You finish things, including the boring ones.',
    ],
    trap:
      'The problem is not the yes but that it has come to be taken for granted. If you are the reliable one for everybody, you are asked first and relieved last. The bill does not arrive as tiredness but as quiet resentment against people who never learned what it cost you. Much of it others could do as well. What only you can do, nobody else will.',
    progress:
      'Measure the week by a single no that held. Not explained away, not bought off with a substitute favour. And check whether you still learn something from your yes. If you are only working through what you already know, that is diligence, not progress. The way forward is the task where, at the start, you do not know how it goes.',
    steps: [
      'Set priorities instead of just agreeing: what are you saying yes to so that a more important yes stays possible?',
      'Take on something that stretches you professionally. Willingness grows on demanding tasks.',
      'Practise accepting: leave something as it is without wanting to improve it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What I said yes to',
        duration: '15 minutes, on Sundays',
        minutes: 15,
        body:
          'Write down what you said yes to this week. Everything, including the small things. Then mark what you took on out of conviction and what you took on out of habit. The second list is where being helpful turns into exhaustion.',
      },
      {
        kind: 'action',
        name: 'One yes, one no',
        duration: 'at the start of the week',
        body:
          'On Monday, decide both: one yes to something that stretches you a little, and one no to something you would otherwise have taken on out of habit. Write both down. The no is the harder half, and it is the half that makes the yes possible in the first place.',
      },
      {
        kind: 'sitting',
        name: 'The honest reading',
        duration: '6 minutes, in the evening',
        minutes: 6,
        body:
          'Sit down and go through your body, from your feet to your head. You are not supposed to relax, you are supposed to find out how much strength is still there today. If you like saying yes, you are the last to notice that you are running empty. These six minutes are the only point in the day where the answer does not depend on your mood.',
      },
    ],
    mantra: 'I am in — with all my strength and my eyes open.',
  },
  acceptance: {
    name: 'Acceptance',
    emotion: 'Forgiveness',
    worldview: 'harmonious',
    essence:
      'How you are doing is decided inside you and not by your circumstances. That is where you stop arguing with reality and start shaping it.',
    strength:
      'You can take reality as it is without submitting to it. That is the ability from which shaping things begins.',
    advice:
      'Watch out for the sentence that comes easiest here: “That is just how I am.” Accepting something does not mean it cannot change. Take one thing you have been putting up with and look soberly at what about it is actually fixed. And forgive one specific person, in writing, without sending the letter if need be.',
    signs: [
      'You ask first what you can contribute, and not whose fault it is.',
      'People are allowed to be different without it bothering you.',
      'You can forgive without playing the matter down.',
    ],
    trap:
      'The most expensive thing here is a mix-up: accepting and approving are not the same. Accepting only means you stop arguing with what is already the case. Whether it is all right, that does not say. You can accept an injustice and still do something about it. And the other way round: what you do not accept, you cannot change either, because you are still busy with the fact that it should not be so.',
    progress:
      'You notice it by your strength coming back. Arguing with the facts was expensive, and how expensive only shows once it stops. Forgiving here is not a feeling but a renunciation: you give up the demand that the past should have gone differently. Whether that has worked, you do not see in how you think about the person, but in how much less often you think of them.',
    steps: [
      'Check your assumptions against the facts: what of it is demonstrably true, and what is just familiar to you?',
      'Bring order into your thinking: read, calculate, argue. With clarity, acceptance turns into reason.',
      'Forgive one particular person, in writing if necessary, even without sending the letter.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'That is just how I am — is it?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down three sentences that start with “I am just …”. Ask yourself about each one: was that true five years ago as well? Would someone who knows me well sign it? What would it cost to change it? Accepting something does not mean it cannot change.',
      },
      {
        kind: 'action',
        name: 'The first step back',
        duration: 'once, when it is due',
        body:
          'Get in touch with someone with whom something was left unresolved. A message is enough, three sentences, without going back over the old story. You do not have to settle the matter and you do not have to forgive anything that is not forgiven. It is only about the door being a door again instead of a wall.',
      },
      {
        kind: 'sitting',
        name: 'This is how it is',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Take something you are not happy about right now and sit down with it. With every out-breath, say to yourself: this is how it is right now. That is neither agreement nor giving up. You are only stopping an argument with a reality that is not impressed by it anyway. What to do next is easier to see afterwards.',
      },
    ],
    mantra: 'I accept what is — and shape what can be shaped.',
  },
  reason: {
    name: 'Reason',
    emotion: 'Understanding',
    worldview: 'meaningful',
    essence:
      'Your mind is at its best: you see how things connect, your knowledge falls into order, and you can justify your decisions. This is the level of science, of medicine and of good craftsmanship.',
    strength:
      'You can think, order and give reasons. That is what carries medicine, science and good craft. It has just one limit, and that limit is not inside thinking.',
    advice:
      'Your mind is an excellent tool here. It just does not know when to stop. Take ten minutes every day to simply perceive something without interpreting it: music, a face, the weather. And in the next argument, do not ask who is right, but what the other person needs right now. The next step is not a better analysis but a different way of looking.',
    signs: [
      'You distinguish cleanly between facts, opinion and feeling.',
      'You put complicated things in order instead of letting them overwhelm you.',
      'You change your mind when the data call for it.',
    ],
    trap:
      'The mind takes itself for the whole. It can explain everything and comfort nobody, and it easily mistakes its model for reality. The mistake inside that: understanding feels like progress and costs nothing, so you keep analysing while nothing about the matter itself changes. And a good mind also finds the better reasons why it is right. The cleverer you are, the longer you can defend your errors.',
    progress:
      'Once a week, make a decision before the situation is fully clear, with a date and without reservation. And at the end of the week, do not look at what you have understood, but at whether something touched you: a person, a piece of music, a sentence you could not place straight away. The way forward is not through the next thought but past it.',
    steps: [
      'Practise perceiving something without analysing it: ten minutes of music, nature or a face, without interpreting it.',
      'In an argument, do not ask “who is right?”, ask “what does this person need?”.',
      'Do something good that gains you nothing and appears in no balance sheet.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The strongest counter-argument',
        duration: '25 minutes, once',
        minutes: 25,
        body:
          'Take a conviction that really matters to you and write down the best version of its opposite. So good that someone who believes it would sign it. No caricature, and no half-sentence of refutation at the end. Where it gets tight while you write, thinking stops and your self-image begins.',
      },
      {
        kind: 'action',
        name: 'What does this person need?',
        duration: 'in the next conflict',
        body:
          'In your next argument, ask yourself once not who is right but what the other person needs right now. And then ask the question out loud. The mind can explain everything and comfort nobody. With that one sentence you admit it.',
      },
      {
        kind: 'sitting',
        name: 'Ten minutes without interpreting',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Spend ten minutes with something that wants nothing from you: music, a tree, a face. As soon as you start explaining, classifying or judging, notice it and go back to simply looking. It is not about the calm. It is about noticing how quickly your mind starts up.',
      },
    ],
    mantra: 'Understanding is a lot. It is not everything.',
  },
  love: {
    name: 'Love',
    emotion: 'Reverence',
    worldview: 'benign',
    essence:
      'Not the feeling from the songs but an attitude: without conditions, lasting, and with nothing expected in return. You see what is essential about a person or a thing instead of looking past it.',
    strength:
      'Your goodwill is real and does not depend on conditions. People feel it, and it changes the rooms you are in.',
    advice:
      'The blind spot on this level is you. Your goodwill flows generously outward and reaches you least of all. Check that honestly before you read on. Then take on something concrete: this week, let one person make a mistake without protecting them from it, and stay reachable while they do. That is harder than any help.',
    signs: [
      'You want other people to be well, even when there is nothing in it for you.',
      'You decide more from the gut than by calculation, and the decisions hold.',
      'It calms people down simply that you are there.',
    ],
    trap:
      'Even here you can hold on: to the role of the one who loves, and to people you want to rescue. Love that holds on is wanting again. The subtle mistake inside that: you turn helping into a currency. If you always give and never take, the others end up quietly in your debt, and you stay outside the relationship. Receiving is the more vulnerable half.',
    progress:
      'It is not about how much you feel, but about how little you depend on the others behaving properly. Test it on something small: when did you last accept something without balancing it out within a week? If an example comes to mind, it is working.',
    steps: [
      'Let it happen: people are allowed to go their own way, including the uncomfortable one.',
      'Be grateful for something concrete every day, even without a particular occasion.',
      'Include yourself in your goodwill. That is the most common blind spot on this level.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Thanks that arrive',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Write down for one person what they have done for you. Concretely, with dates, without general sentences about how good they are. Then send it. The quiet part of this level comes easily to you. It only gets uncomfortable when someone finds out what they mean to you.',
      },
      {
        kind: 'action',
        name: 'Not rescuing, once',
        duration: 'when the moment comes',
        body:
          'Let someone take the path you would otherwise have talked them out of: the uncomfortable one, the one you think is wrong. Being there: yes. Stepping in: no. If you hold on, you are wanting something again, and the difference shows exactly here.',
      },
      {
        kind: 'sitting',
        name: 'The silent good wish',
        duration: '2 minutes daily',
        minutes: 2,
        body:
          'Think of a person and wish them something concrete and good. They are not supposed to find out, and you are not supposed to do anything about it. On the first day someone close to you, on the second a stranger, on the third someone you find difficult. On the seventh day, yourself. Most people skip the seventh day.',
      },
    ],
    mantra: 'I want the best for you, with no conditions.',
  },
  joy: {
    name: 'Joy',
    emotion: 'Serenity',
    worldview: 'complete',
    essence:
      'A joy that does not depend on what is happening. It comes from inside, it is patient and it lasts. And it is catching, without being loud.',
    strength:
      'You do not need a reason to be glad. That is rare, and it spreads without you having to do anything for it.',
    advice:
      'Do not try to hold on to this. The moment you want this joy back, it has become desire, and you are twelve levels down. Let the good states come and go like the weather. And if you want to do something, do it quietly, somewhere nobody notices.',
    signs: [
      'Entirely ordinary moments move you: light, voices, everyday things.',
      'Patience comes easily to you because you do not have to force anything.',
      'People feel better around you without anything having to happen.',
    ],
    trap:
      'You want to repeat the experience: the same seminar, the same place, the same music, the same substance. A state turns into a possession you have to defend, and with that it is desire again. Telling people about it is part of the same move. As soon as you turn the experience into a statement about yourself, you have traded it for pride.',
    progress:
      'You recognise this level not at the peak but on a Tuesday: by how you are when nothing special happens, how long you can stand in a queue, how you talk to a boring person. And when the joy leaves, let it go without calling after it. It comes back, and it comes back to those who are not waiting for it.',
    steps: [
      'Let the good states come and go without preserving them.',
      'Help quietly: do something nobody notices.',
      'Spend time in silence, with no programme and no goal.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unnoticed',
        duration: 'evenings, 5 minutes',
        minutes: 5,
        body:
          'Write down one moment of the day that was good and that nobody else would have noticed: light on a wall, a sentence, the sound of the door. At the end of the week you throw the notes away. You are practising the noticing, not the collecting. Joy you hold on to turns back into desire.',
      },
      {
        kind: 'action',
        name: 'Letting one go',
        duration: 'when a moment is good',
        body:
          'If a moment today is good, do not take a photo, do not tell anyone and do not write it down anywhere. Let it pass like any other. Otherwise it turns into a state you want back, and with that it is desire again.',
      },
      {
        kind: 'sitting',
        name: 'Looking at one thing for a long time',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Take an ordinary object: a cup, your hand, a leaf. Look at it until it stops being what you take it for. You are not supposed to interpret it, admire it or photograph it. The joy on this level does not come from special things, it comes from how long you look.',
      },
    ],
    mantra: 'Nothing has to happen for it to be good.',
  },
  peace: {
    name: 'Peace',
    emotion: 'Bliss',
    worldview: 'whole',
    essence:
      'The border between you and what you perceive becomes permeable. Everything moves, nothing presses. This is very rare — Hawkins estimates one person in ten million.',
    strength:
      'You have stopped wrestling with what is. What remains is a stillness that calms others without you doing anything for it.',
    advice:
      'Stay in everyday life. At this height it is tempting to withdraw, and you usually lose something by it. Hold on to perfectly ordinary obligations: bills, appointments, people who know nothing about levels. And keep up the practice that brought you here. There is no state you own, and none that stays without practice.',
    signs: [
      'Silence feels full to you, not empty.',
      'Being separate seems less real to you than being connected.',
      'You act as if by itself, without an inner driver.',
    ],
    trap:
      'Withdrawal disguises itself well here. It looks like maturity and is often just more comfortable. A peace that no longer benefits anyone loses its ground. Teaching is tempting too: when you stand here, people ask you, and then you easily answer sooner than you understand.',
    progress:
      'A peace that cannot survive a working day is not one. The questions for it are unspectacular: can people still approach you in an argument? Do you hear criticism without explaining it away at once? Do you sit down to practise in the morning even when it does not seem necessary? And keep one person close who is allowed to contradict you at no cost to them. Up here, contradiction is what you are most likely to miss.',
    steps: [
      'Stay in everyday life: peace proves itself in the kitchen and not on the mountain.',
      'Pass on what you can — plainly, without playing the teacher.',
      'Keep up the practice that brought you here. There is no state you own.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Who did that help?',
        duration: '10 minutes, weekly',
        minutes: 10,
        body:
          'Write down who concretely benefited from your calm this past week: who settled down? Who was helped? Who stayed? If the list stays empty, that tells you more than any further exercise. Then this peace has withdrawn from the world.',
      },
      {
        kind: 'action',
        name: 'The kitchen',
        duration: 'daily, for as long as it takes',
        body:
          'Take an ordinary job — the washing-up, the stairs, the walk to the bin — and do it fully: no music, no phone, and no planning on the side. When your mind wanders off, come back to your hands. This is where peace proves itself, not on the mountain.',
      },
      {
        kind: 'sitting',
        name: 'The breath that breathes itself',
        duration: '20 minutes daily',
        minutes: 20,
        body:
          'Sit down and do nothing with your breath: do not lengthen it, do not count it, do not deepen it. Just notice that breathing is happening without anyone doing it. This is the plainest exercise on the list and the only one that does not get better if you try harder.',
      },
    ],
    mantra: 'Everything is as it is. And that is enough.',
  },
  enlightenment: {
    name: 'Enlightenment',
    emotion: 'Ineffable',
    worldview: 'as it is',
    essence:
      'This is where the scale ends (700 to 1000). There is no self left that experiences anything, only being itself. Hawkins assigns this level to the great teachers in human history.',
    strength:
      'This level is a direction, not a position. If it draws you, that already counts for something: you know which way.',
    advice:
      'There is nothing to advise here. If this level appears as your result, that says something about the scale and the arithmetic behind it, but nothing about you. Hawkins assigns it to the great teachers of human history, and nobody gets there through a questionnaire. Take it as a direction. Everything practical is on the sixteen levels below.',
    signs: [
      'From the inside, this level does not describe itself.',
      'People who claim it are usually speaking out of pride.',
      'What remains of it are the people who were touched by it.',
    ],
    trap:
      'The word itself. As soon as you make enlightenment a goal, it is the most ambitious desire of all. And the questionnaire only measures what you say about yourself. If you agree everywhere, high values come out everywhere. That can mean you are genuinely well. It can also mean you answered the way you would like to be. Both are human, and neither is an accusation.',
    progress:
      'It gets practical one level down. Go through the scale and look for the level you land on during a bad day, not the one you stand on during a good one. The first says more about your everyday life. And ask people who have known you for a long time where they would place you. That answer is less comfortable than any result, and it is the only one you can work with.',
    steps: [
      'There is nothing to do here. This is where the scale ends. The way there is the 16 levels below, lived.',
      'What matters is the direction and not the end: one level up changes a life.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence that is left',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down in one sentence what you are looking for. Then cross out every word that names a goal, a state or a point in time. Read what is left. Usually it is nothing. That is not a defeat, it is the most honest result at this height.',
      },
      {
        kind: 'action',
        name: 'One level down',
        duration: 'today',
        body:
          'Take on an exercise today from a level you are actually on, and see it through. This level here is not a task, it is a direction. The way there is the sixteen levels below, lived. If you start at 700, you are practising desire.',
      },
      {
        kind: 'sitting',
        name: 'Who is asking?',
        duration: 'no fixed time',
        body:
          'When a thought comes up, ask once who it is coming up for — and do not answer the question. Then let it go. This is the only exercise on the list that is not meant to achieve anything. If you use it to get somewhere, you are practising desire.',
      },
    ],
    mantra: 'Being.',
  },
}

/* Beide Sprachfassungen einmal beim Laden zusammengesetzt statt bei jedem
   Rendern: die Liste bleibt so identisch (===) und React muss nichts neu
   berechnen, was sich nicht geändert hat. Siebzehn Objekte pro Sprache. */
const LOCALIZED: Record<Language, Level[]> = {
  de: LEVELS.map((shape) => ({ ...shape, ...de[shape.id] })),
  en: LEVELS.map((shape) => ({ ...shape, ...en[shape.id] })),
}

const LOCALIZED_BY_ID: Record<Language, Record<LevelId, Level>> = {
  de: Object.fromEntries(LOCALIZED.de.map((level) => [level.id, level])) as Record<LevelId, Level>,
  en: Object.fromEntries(LOCALIZED.en.map((level) => [level.id, level])) as Record<LevelId, Level>,
}

/** Die 17 Ebenen in einer Sprache, aufsteigend — Index ist der Rang. */
export function levelsIn(language: Language): Level[] {
  return LOCALIZED[language]
}

/** Eine einzelne Ebene in einer Sprache. */
export function levelIn(language: Language, id: LevelId): Level {
  return LOCALIZED_BY_ID[language][id]
}
