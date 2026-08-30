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
      'Du schämst dich nicht für etwas, das du getan hast, sondern für dich selbst. Aus „ich habe einen Fehler gemacht“ ist „ich bin ein Fehler“ geworden. Das kostet so viel Kraft, dass für alles andere kaum etwas übrig bleibt.',
    advice: [
      'Fang nicht damit an, die Scham verstehen zu wollen. Sie hält sich vor allem dadurch, dass niemand davon weiß, und sie übersteht es selten, wenn ein Mensch davon erfährt und trotzdem bleibt. Wenn du diese Woche nur eine Sache tust, dann diese. Alles andere fällt danach leichter.',
      'Der häufigste Fehler auf dieser Ebene ist der Beweis: noch eine Leistung, noch ein Gefallen, noch ein Grund, warum du doch in Ordnung bist. Das hilft ein paar Tage, danach ist die Frage schärfer als vorher — denn einen Wert, den man sich verdienen muss, kann man auch wieder verlieren. Scham lässt sich nicht widerlegen. Sie lässt sich teilen.',
      'Erwarte nicht, dass es sich bald besser anfühlt. Das erste Zeichen ist kleiner: Du bleibst in einem Raum, aus dem du sonst gegangen wärst. Zähl das als Fortschritt, auch wenn du dabei zitterst. Und wenn Gedanken dazukommen, dass es ohne dich leichter wäre, dann ruf noch heute jemanden an — eine Vertrauensperson oder eine Krisennummer.',
    ],
    signs: [
      'Du willst nicht gesehen werden und gehst aus Räumen, in denen du auffallen könntest.',
      'Erinnerungen an alte Peinlichkeiten kommen ungefragt und treffen sofort.',
      'Lob ist dir unangenehm, als hätte sich jemand in dir getäuscht.',
    ],
    trap:
      'Scham verspricht Schutz: Wer sich klein macht, kann nicht tief fallen. Der Preis ist, dass niemand dich kennenlernt — du selbst auch nicht.',
    steps: [
      'Trenne die Tat von der Person. Schreib auf, was passiert ist, in Sätzen, die auch ein Außenstehender unterschreiben würde — ohne Urteil über dich.',
      'Erzähl einem Menschen, dem du vertraust, etwas, das du bisher verborgen hast. Scham übersteht es selten, wenn jemand davon weiß.',
      'Sorg für deinen Körper wie für einen Gast: essen, schlafen, duschen, rausgehen. Selbstachtung fängt oft ganz praktisch an.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die zwei Fassungen',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib den Vorfall, für den du dich schämst, zweimal auf: einmal so, wie du ihn dir selbst erzählst, und einmal so, wie ihn jemand aufschreiben würde, der nur gesehen hat, was passiert ist. Lies beide Fassungen laut. Der Unterschied zwischen ihnen ist die Scham — und der steht jetzt auf Papier, statt unsichtbar in dir zu wirken.',
      },
      {
        kind: 'action',
        name: 'Einmal gesehen werden',
        duration: '5 Minuten, einmal täglich',
        minutes: 5,
        body:
          'Geh an einen Ort, an dem Menschen sind — Bäckerei, Bahnsteig, Park — und bleib fünf Minuten dort, ohne dich hinter dem Handy zu verstecken. Sag einem Menschen einen belanglosen Satz: einen Gruß, ein Danke, eine Frage nach der Uhrzeit. Scham behauptet, alle würden dir etwas ansehen. Die fünf Minuten zeigen dir jedes Mal, dass niemand hinsieht.',
      },
      {
        kind: 'sitting',
        name: 'Die Hand auf dem Brustbein',
        duration: '6 Minuten täglich',
        minutes: 6,
        body:
          'Sitz, leg eine Hand flach auf dein Brustbein und lass sie liegen. Sag innerlich drei Sätze: Das ist gerade schwer. So etwas kennt jeder. Ich möchte freundlich mit mir umgehen. Wenn dabei Widerstand kommt — „das ist albern“ —, gehört der zur Übung dazu.',
      },
    ],
    mantra: 'Ich habe Fehler gemacht. Ich bin kein Fehler.',
  },
  guilt: {
    name: 'Schuld',
    emotion: 'Vorwurf',
    worldview: 'strafend',
    essence:
      'In dir läuft ein Prozess, der nie zu Ende geht. Altes wird immer wieder verhandelt, und das Urteil fällt jedes Mal gegen dich aus.',
    advice: [
      'Prüf zuerst, ob überhaupt jemand etwas von dir zu bekommen hat. Die Antwort ist meistens kürzer als der Vorwurf. Was danach übrig bleibt, ist oft keine echte Reue mehr, sondern eine Gewohnheit, die sich moralisch anfühlt. Setz dir ein Datum, bis zu dem du deinen Teil erledigst, und behandle die Sache danach als abgeschlossen, auch wenn das Gefühl noch eine Weile nachhängt.',
      'Der teuerste Irrtum hier ist, mit Leiden zu bezahlen. Wer nicht wiedergutmachen kann oder will, bestraft stattdessen sich selbst — davon hat niemand etwas. Ein Mensch, dem du etwas schuldest, hat nichts von deinen schlechten Nächten. Er hätte etwas von einem Anruf, einem Satz, einem Betrag.',
      'Der Maßstab ist deshalb nicht dein Gefühl, sondern die Rechnung: Wenn dein Teil getan ist, ist die Sache erledigt, auch wenn sie sich noch wochenlang anders anfühlt. Und wenn niemand mehr da ist, der etwas bekommen könnte — weil der Mensch gestorben ist oder die Sache dreißig Jahre zurückliegt —, dann ist das keine Schuld mehr, sondern Trauer. Die will nicht beglichen, sondern durchlebt werden.',
    ],
    signs: [
      'Du entschuldigst dich für Dinge, für die du nicht verantwortlich bist.',
      'Geht es anderen schlecht, suchst du zuerst deinen Anteil daran.',
      'Gutes anzunehmen fällt dir schwer — es fühlt sich unverdient an.',
    ],
    trap:
      'Schuld fühlt sich moralisch an und ist doch bequem: Solange du dich anklagst, musst du nichts wiedergutmachen. Die Selbstbestrafung ersetzt die Handlung.',
    steps: [
      'Mach aus der Schuld eine Rechnung: Wem schuldest du was, ganz konkret? Bezahl, entschuldige dich, reparier es. Danach ist es erledigt.',
      'Setz ein Ende. Ein Datum, ab dem die Sache verhandelt ist. Alte Vorwürfe danach zu wiederholen ist keine Reue mehr, sondern Gewohnheit.',
      'Frag bei jedem Vorwurf: Würde ein Gericht das genauso sehen? Meist bleibt ein kleiner Rest übrig — und mit dem kannst du arbeiten.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die Rechnung',
        duration: '15 Minuten, einmal pro Fall',
        minutes: 15,
        body:
          'Drei Spalten auf ein Blatt: Was ist passiert. Was war tatsächlich mein Anteil. Was würde es wiedergutmachen. In die dritte Spalte gehört eine konkrete Handlung mit Datum — oder das Wort „nichts“. Führ die Handlung danach aus oder wirf das Blatt weg. Offen bleiben sollte keiner der beiden Fälle.',
      },
      {
        kind: 'action',
        name: 'Danke, ohne Zusatz',
        duration: 'einmal täglich',
        body:
          'Nimm heute etwas an — ein Lob, eine Hilfe, ein Geschenk — und sag nur „Danke“. Kein „Das wäre doch nicht nötig gewesen“, kein Gegenangebot, keine Erklärung, warum du es eigentlich nicht verdienst. Der Satz ist in zwei Sekunden gesagt. Wie viel er dich kostet, merkst du erst dabei.',
      },
      {
        kind: 'sitting',
        name: 'Gehört, vertagt',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Sitz und warte, bis der erste Vorwurf kommt — er kommt. Hör ihn einmal ganz an, ohne dich zu verteidigen, und sag dann innerlich drei Worte: gehört, verhandelt, vertagt. Dann zurück zum Atem, beim nächsten Vorwurf wieder dieselben drei Worte. Der innere Ankläger wird nicht durch Gegenrede leiser, sondern dadurch, dass ihm niemand mehr zuhört.',
      },
    ],
    mantra: 'Ich mache es wieder gut — und dann lasse ich es hinter mir.',
  },
  apathy: {
    name: 'Apathie',
    emotion: 'Verzweiflung',
    worldview: 'hoffnungslos',
    essence:
      'Nichts lohnt sich, alles ist zu schwer. Die Welt ist nicht feindlich, sie ist dir gleichgültig geworden. Hilfe kommt zwar an, aber sie bewirkt nichts.',
    advice: [
      'Warte nicht, bis du Lust hast — die kommt auf dieser Ebene nicht zuerst. Mach den ersten Schritt so klein, dass er sich fast zu klein anfühlt, und verabrede ihn mit jemandem: Fremde Energie trägt, wo eigene fehlt. Und wenn das seit Wochen so geht, ist es keine Charakterfrage, sondern ein Fall für eine Ärztin oder einen Arzt.',
      'Der Fehler ist fast immer die Größe des Vorhabens. Wer nichts spürt, plant zum Ausgleich den großen Neuanfang — neue Routine, alles anders, ab Montag —, und der Plan wird dann selbst zum Beweis, dass es nicht geht. Nimm lieber etwas, das du auch an einem schlechten Tag schaffst: eine Runde um den Block, ein Fenster auf, eine Nachricht an einen Menschen. Und behandle Sätze wie „bringt sowieso nichts“ als Teil des Zustands, nicht als Auskunft über die Zukunft.',
      'Miss die Woche nicht an deiner Stimmung, sondern an drei Dingen: Hast du dich bewegt, warst du im Tageslicht, hattest du mit einem Menschen zu tun? Wenn Ärger oder Traurigkeit zurückkommen, ist das kein Rückfall — auf dieser Skala liegen Trauer und Zorn über der Apathie. Es fängt an, sich schlechter anzufühlen, und geht dabei besser.',
    ],
    signs: [
      'Aufgaben stapeln sich, weil selbst kleine Schritte unmöglich groß wirken.',
      'Du sagst häufig „egal“ und meinst es auch so.',
      'Andere sorgen sich um dich, du selbst empfindest dabei kaum etwas.',
    ],
    trap:
      'Apathie ist ein Energiesparmodus, der sich selbst am Leben hält: Wer nichts versucht, erlebt kein Scheitern — aber auch nichts, was ihm widerspricht.',
    steps: [
      'Verkleinere den ersten Schritt, bis er lächerlich wirkt: ein Glas Wasser, eine Zeile, zwei Minuten vor die Tür. Die Bewegung kommt vor der Motivation, nicht umgekehrt.',
      'Nutz fremde Energie und verabrede dich. Was allein unmöglich ist, geht zu zweit oft doch.',
      'Anhaltende Apathie ist auch ein medizinisches Thema. Sie ist ein guter Grund, Hilfe zu holen, und kein Zeichen von Schwäche.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was mir früher etwas bedeutet hat',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib zehn Dinge auf, die dir früher etwas bedeutet haben: Musik, ein Mensch, ein Ort, eine Arbeit. Nicht, um sie wieder aufzunehmen — nur, um sie zu benennen. Apathie behauptet, es habe nie etwas gegeben. Die Liste zeigt dir das Gegenteil, ohne dass du dafür etwas anfangen musst.',
      },
      {
        kind: 'action',
        name: 'Zwei Minuten, dann Schluss',
        duration: '2 Minuten, zweimal täglich',
        minutes: 2,
        body:
          'Such dir die kleinste sichtbare Sache im Raum — ein Teller, drei Schritte vor die Tür, eine Zeile. Stell zwei Minuten, fang an und hör auf, wenn es klingelt, auch wenn du weitermachen könntest. Das Aufhören gehört dazu: Es hält die Übung klein genug, um sie morgen zu wiederholen.',
      },
      {
        kind: 'sitting',
        name: 'Fünf Dinge im Raum',
        duration: '3 Minuten, zweimal täglich',
        minutes: 3,
        body:
          'Nicht meditieren, nur zählen: fünf Dinge, die du siehst, vier, die du hörst, drei, die du spürst, zwei, die du riechst, eins, das du schmeckst. Wenn du nicht weiterkommst, fang von vorn an. Das ist der kleinstmögliche Kontakt mit der Welt — und er verlangt keine Motivation.',
      },
    ],
    mantra: 'Ich muss es nicht fühlen. Ich fange trotzdem an.',
  },
  grief: {
    name: 'Trauer',
    emotion: 'Bedauern',
    worldview: 'tragisch',
    essence:
      'Der Verlust hat einen Namen, und das ist schon Bewegung: Trauer hat Kraft, wo Apathie keine hatte. Der Blick hängt an dem, was fehlt, statt an dem, was da ist.',
    advice: [
      'Beeil dich nicht. Trauer ist auf dieser Skala ein Aufstieg, und sie abzukürzen bringt dich nicht weiter. Gib ihr jeden Tag einen festen Platz, damit sie nicht den ganzen Tag braucht. Und tu einmal täglich etwas für einen anderen Menschen — nicht als Trost, sondern weil das der schnellste Weg ist, den Blick wieder nach außen zu bekommen.',
      'Der Fehler auf dieser Ebene heißt Funktionieren. Trauer, die keinen Platz bekommt, verschwindet nicht. Sie meldet sich später und schwerer erkennbar: als Erschöpfung, als Gereiztheit, als ein Körper, dem ständig etwas fehlt. Und sie kommt in Wellen, nicht in einer geraden Linie: ein Geruch, ein Datum, ein Lied, und du bist wieder am ersten Tag. Das ist kein Rückschritt, sondern normal.',
      'Das Maß ist deshalb nicht, ob die Wellen kleiner werden, sondern wie schnell du danach wieder auftauchst. Wenn Wochen vergehen und sich nichts bewegt, oder wenn gar nichts mehr durchkommt, auch nichts Gutes, dann hol dir Unterstützung. Und sag den Menschen um dich herum, was du brauchst. Sonst raten sie, und sie raten meistens falsch.',
    ],
    signs: [
      'Vieles erinnert dich an früher — und früher war besser.',
      'Tränen kommen leicht, manchmal ohne klaren Anlass.',
      'Etwas Neues anzufangen fühlt sich wie Verrat an dem an, was du verloren hast.',
    ],
    trap:
      'Die Trauer kann zum Band werden, das die Verbindung aufrechterhält. Dann wird Loslassen zur Angst, den anderen ein zweites Mal zu verlieren.',
    steps: [
      'Gib der Trauer Zeit und Ort — täglich zwanzig Minuten, in denen sie da sein darf. Was einen festen Platz hat, überschwemmt seltener alles.',
      'Zähl auf, was geblieben ist: Menschen, Fähigkeiten, Erinnerungen. Nicht als Trost, sondern als Bestandsaufnahme.',
      'Tu etwas für jemand anderen. Trauer richtet den Blick nach innen; eine Hand, die hilft, dreht ihn nach außen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der ungesendete Brief',
        duration: '30 Minuten, einmal',
        minutes: 30,
        body:
          'Schreib einen Brief an das, was fehlt — an einen Menschen oder an ein Leben, das es nicht gegeben hat. Alles darf hinein: der Dank, der Vorwurf, das Unerledigte. Zum Schluss ein Satz darüber, was du behalten wirst. Der Brief wird nicht abgeschickt und nicht weggeworfen, sondern weggelegt.',
      },
      {
        kind: 'action',
        name: 'Eine Hand für jemanden',
        duration: 'einmal pro Woche',
        body:
          'Such dir eine kleine Sache für einen anderen Menschen: etwas tragen, etwas kochen, einmal anrufen. Sie muss nichts bedeuten und niemanden ersetzen. Gegen den Blick nach innen hilft kein Gedanke, sondern nur eine halbe Stunde, in der die Hände etwas anderes tun.',
      },
      {
        kind: 'sitting',
        name: 'Die verabredete Zeit',
        duration: '20 Minuten täglich, feste Zeit',
        minutes: 20,
        body:
          'Gib der Trauer einen Termin: jeden Tag zur selben Zeit, auf demselben Stuhl. Dort ist alles erlaubt — Fotos, Tränen, Briefe. Kommt sie außerhalb dieser Zeit, schreib den Gedanken auf einen Zettel und leg ihn auf den Stuhl für morgen. Nicht, um sie kleiner zu machen, sondern damit sie ein Zimmer hat statt der ganzen Wohnung.',
      },
    ],
    mantra: 'Ich habe verloren. Ich bin nicht verloren.',
  },
  fear: {
    name: 'Angst',
    emotion: 'Sorge',
    worldview: 'bedrohlich',
    essence:
      'Überall könnte etwas schiefgehen, und dein Kopf hat alles schon durchgespielt. Angst schützt tatsächlich — bis sie anfängt, dein Leben zu verwalten.',
    advice: [
      'Diskutier nicht mit der Angst, sie gewinnt jedes Argument. Fang beim Körper an: langsam ausatmen, länger als einatmen. Dann schreib den schlimmsten Fall zu Ende, samt der Frage, was du dann tun würdest. Und geh einmal in dieser Woche freiwillig in etwas Unbequemes hinein — Angst wird nur an Dingen kleiner, die man tatsächlich getan hat.',
      'Am Leben hält die Angst nicht das Denken, sondern das Ausweichen, und das ist selten dramatisch: eine Absage, ein Anruf, der auf morgen rutscht, eine Frage, die du sicherheitshalber dreimal stellst. Jedes Mal folgt sofort Erleichterung, und jedes Mal wird die Angst ein bisschen größer. Prüf deshalb bei jeder Vorsicht, ob etwas daraus folgt: Echte Gefahr führt zu etwas, das man tut. Angst führt zu etwas, das man lässt.',
      'Rechne damit, dass es zuerst schlimmer wird. Wer sich einer Sache nähert, der er lange ausgewichen ist, spürt die Angst steigen. Sie fällt erst, wenn man bleibt, meistens nach zwanzig Minuten und nicht nach zwei. Das Maß ist deshalb nicht, wie ruhig du bist, sondern wie kurz die Liste der Dinge wird, um die du herumgehst. Bei Panik oder wenn die Angst den Tag bestimmt, gibt es wirksame Behandlungen dafür.',
    ],
    signs: [
      'Du planst Katastrophen durch, die fast nie eintreten.',
      'Entscheidungen schiebst du auf, weil jede Möglichkeit ein Risiko trägt.',
      'Du sagst Ja, um Konflikte zu vermeiden, nicht weil du willst.',
    ],
    trap:
      'Ausweichen hilft sofort und macht die Angst langfristig größer: Jedes Ausweichen bestätigt dem Nervensystem, dass die Gefahr echt war.',
    steps: [
      'Schreib die Angst zu Ende: Was genau passiert im schlimmsten Fall — und was tust du dann? Ein Plan macht aus Panik ein Problem.',
      'Such dir jede Woche eine kleine, freiwillige Unbequemlichkeit. Mut wächst nur an Dingen, die man tatsächlich getan hat.',
      'Beruhige zuerst den Körper: langsam ausatmen, länger als einatmen. Der Kopf folgt dem Atem, nicht dem Argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Und dann?',
        duration: '10 Minuten, wenn eine Angst kreist',
        minutes: 10,
        body:
          'Schreib die Angst als einen Satz auf. Dann frag „und dann?“ und beantworte es. Wieder „und dann?“. Mach weiter, bis du an einem Punkt ankommst, an dem du wieder handelst. Die Angst hört meistens beim Schreckensbild auf; auf dem Papier kommst du darüber hinaus.',
      },
      {
        kind: 'action',
        name: 'Die freiwillige Unbequemlichkeit',
        duration: 'einmal pro Woche',
        body:
          'Wähl am Wochenanfang eine kleine Sache, um die du dich drückst — ein Anruf, eine Frage, ein Widerspruch — und erledige sie, bevor die Woche vorbei ist. Klein genug, dass sie sicher gelingt, groß genug, dass dir kurz davor mulmig wird. Mut wächst nur an Dingen, die tatsächlich getan wurden.',
      },
      {
        kind: 'sitting',
        name: 'Länger aus als ein',
        duration: '6 Minuten, wenn es eng wird',
        minutes: 6,
        body:
          'Vier Zählzeiten einatmen, sechs ausatmen, ohne Pause dazwischen. Mehr nicht — kein Beruhigen, kein Zureden. Das lange Ausatmen ist der einzige Schalter an der Angst, den man bewusst bedienen kann. Der Kopf folgt dem Atem, und die Argumente kommen zuletzt.',
      },
    ],
    mantra: 'Ich gehe hin, auch mit weichen Knien.',
  },
  desire: {
    name: 'Verlangen',
    emotion: 'Gier',
    worldview: 'enttäuschend',
    essence:
      'Es fehlt immer etwas, und das Nächste soll es richten. Verlangen bewegt viel — es steckt hinter den meisten Karrieren — und kommt nie an.',
    advice: [
      'Du musst nicht aufhören zu wollen. Verlangen steckt hinter den meisten guten Dingen in deinem Leben. Was fehlt, ist die Pause dazwischen. Leg zwischen Impuls und Kauf, zwischen Idee und Zusage vierundzwanzig Stunden, und schau, was das übersteht. Was danach noch zieht, war echt. Der Rest war Unruhe.',
      'Entscheidend ist nicht der Gegenstand, sondern das Gefühl, das er verspricht. Frag dich bei dem, was dich gerade zieht: Wovon wäre ich frei, wenn ich es hätte? Die Antwort heißt selten „Schuhe“ und meistens Ruhe, Anerkennung oder Sicherheit — und die drei sind auf direktem Weg billiger zu haben. Was du danach trotzdem kaufst, kaufst du wenigstens mit offenen Augen.',
      'Das Ziel auf dieser Ebene ist nicht Verzicht, sondern Fertigwerden: weniger Angefangenes, mehr Abgeschlossenes. Ein zweites Zeichen ist die Stille — wer nichts braucht, um die nächsten zehn Minuten auszuhalten, ist ein gutes Stück weiter. Und wenn die vierundzwanzig Stunden regelmäßig nicht zu schaffen sind, geht es nicht mehr um Verlangen, sondern um eine Abhängigkeit. Die klärt man nicht allein.',
    ],
    signs: [
      'Erreichte Ziele fühlen sich kurz gut an, dann steht schon das nächste an.',
      'Du greifst zu Ablenkung, sobald es still wird: Handy, Kaufen, Essen, Serien.',
      'Was andere haben, misst du an dem, was dir fehlt.',
    ],
    trap:
      'Verlangen verwechselt Wollen mit Brauchen. Die Erfüllung ist immer eine Anschaffung entfernt — und deshalb nie hier.',
    steps: [
      'Leg zwischen Impuls und Handlung eine Frist von 24 Stunden. Was danach noch zieht, war echt.',
      'Frag bei jedem „Ich will“: Welches Gefühl erwarte ich davon? Meistens ist dieses Gefühl auch anders zu bekommen.',
      'Üb dich in Genügsamkeit: eine Woche ohne Neuanschaffung. Notier dabei, was du längst besitzt, ohne es zu bemerken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Welches Gefühl kaufe ich?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib die letzten fünf Dinge auf, die du gekauft, gegessen oder angefangen hast, als es dir nicht gut ging. Daneben zwei Spalten: welches Gefühl du dir davon versprochen hast und welches tatsächlich kam. Die zweite Spalte bleibt meistens leer, und genau das ist das Ergebnis der Übung.',
      },
      {
        kind: 'action',
        name: 'Die Zehn-Minuten-Kurve',
        duration: '10 Minuten, bei jedem Impuls',
        minutes: 10,
        body:
          'Wenn der Impuls kommt — Handy, Kaufen, Essen —, stell zehn Minuten und tu nichts dagegen. Nicht „nie“, nur „nicht jetzt“. Notier von 0 bis 10, wie stark er am Anfang war und wie stark am Ende. Nach einer Woche hast du deine eigene Kurve und weißt, was das Verlangen von allein tut.',
      },
      {
        kind: 'sitting',
        name: 'Die Welle',
        duration: '8 Minuten, wenn es zieht',
        minutes: 8,
        body:
          'Setz dich hin, wenn der Impuls kommt, und tu nichts. Such das Verlangen im Körper: Brust, Magen, Hände. Benenne, was du findest — Enge, Kribbeln, Druck — und bleib dabei. Es steigt, es hält, es fällt. Du musst nichts dagegen tun, nur lange genug zusehen, um zu merken, dass es von allein vergeht.',
      },
    ],
    mantra: 'Ich darf wollen, ohne getrieben zu sein.',
  },
  anger: {
    name: 'Zorn',
    emotion: 'Hass',
    worldview: 'feindselig',
    essence:
      'Endlich Kraft — und sie brennt. Zorn entsteht, wo Verlangen auf Widerstand trifft. Er kann Missstände beenden oder Beziehungen; das hängt davon ab, ob er ein Ziel bekommt.',
    advice: [
      'Sprich nicht, solange es brennt. Zorn zeigt dir, dass eine Grenze oder ein Wert verletzt wurde. Was jetzt zu tun ist, sagt er dir nicht. Bring ihn zuerst körperlich aus dem System — Treppen, Laufen, Gewichte — und formulier danach eine Bitte statt eines Vorwurfs. Zorn, der zu keiner Handlung führt, wird zu Groll, und der hält Jahre.',
      'Es gibt hier zwei Fehler, und sie sehen aus wie Gegensätze: rauslassen und runterschlucken. Beide sparen denselben Satz aus, nämlich den, der sagt, was du willst. Sich Luft zu machen entlädt übrigens nichts, es trainiert eher. Und sieh nach, was unter dem Zorn liegt: Meistens ist er das zweite Gefühl, das erste war Angst, Kränkung oder Ohnmacht. Wer nur das zweite zeigt, bekommt nie, worum es ihm eigentlich ging.',
      'Das Maß ist nicht, wie selten du wütend wirst, sondern wie schnell aus der Hitze ein Satz wird — am besten am selben Tag, an eine bestimmte Person gerichtet und mit einer Frist. Richtet sich der Zorn gegen etwas, das niemand ändern kann, gehört er eigentlich zur Trauer weiter unten. Und wenn Menschen um dich herum vorsichtig werden oder etwas zu Bruch geht, dann hol dir Hilfe — vor dem nächsten Mal, nicht danach.',
    ],
    signs: [
      'Du reagierst schneller gereizt, als dir lieb ist, besonders bei Kleinigkeiten.',
      'Im Kopf führst du Streitgespräche, die es gar nicht gegeben hat.',
      'Du hast recht — und es hilft niemandem.',
    ],
    trap:
      'Zorn fühlt sich stark an, ist aber eine Reaktion: Solange er brennt, bestimmt der andere, was du fühlst.',
    steps: [
      'Such unter dem Zorn nach dem, was verletzt wurde: eine Grenze, ein Wert, ein Bedürfnis. Zorn zeigt in eine Richtung, er ist keine Antwort.',
      'Bring ihn körperlich aus dem System, bevor du sprichst — laufen, Gewichte, Treppen. Formulier danach eine Bitte statt eines Vorwurfs.',
      'Zieh eine klare Grenze, statt weiter zu grollen. Groll ist Zorn, der zu keiner Handlung führen durfte.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz ohne Du',
        duration: 'nach jedem Aufflammen',
        body:
          'Zuerst der Körper: zwanzig Kniebeugen, die Treppe, einmal um den Block. Dann schreib einen einzigen Satz darüber, was du wolltest und nicht bekommen hast — einen, in dem das Wort „du“ nicht vorkommt. Nur dieser Satz wird ausgesprochen. Der Vorwurf bleibt auf dem Papier.',
      },
      {
        kind: 'action',
        name: 'Die Bitte',
        duration: 'einmal, sobald es geht',
        body:
          'Sag dem Menschen, um den es geht, in einem Satz, was du brauchst — nicht, was er falsch gemacht hat. Ohne „immer“, ohne „nie“, ohne Vorgeschichte. Auf einen Vorwurf folgt eine Verteidigung. Auf eine Bitte kann jemand eingehen.',
      },
      {
        kind: 'sitting',
        name: 'Die Hitze aufsuchen',
        duration: '7 Minuten, nach dem Aufflammen',
        minutes: 7,
        body:
          'Sitz und such die Wut im Körper, statt sie wegzuatmen: Kiefer, Nacken, Brust, Hände. Geh mit der Aufmerksamkeit dorthin, wo es am heißesten ist, und bleib da. Nicht ausdrücken, nicht hinunterschlucken — beides macht sie größer. Wenn du ihr einfach zusiehst, lässt sie nach wenigen Minuten von allein nach.',
      },
    ],
    mantra: 'Meine Wut zeigt mir, was mir wichtig ist.',
  },
  pride: {
    name: 'Stolz',
    emotion: 'Verachtung',
    worldview: 'fordernd',
    essence:
      'Es geht dir spürbar besser als weiter unten: Stolz gibt Halt, Leistung und Zugehörigkeit. Nur hängt er an Bedingungen — an Status, Rolle, Rechthaben —, und die können wegbrechen.',
    advice: [
      'Lies diese Ebene nicht als Vorwurf. Stolz hat dich hierher gebracht und trägt weiter als alles darunter. Teuer wird er erst in dem Moment, in dem du etwas lernen müsstest. Der einfachste Test ist ein täglicher: einmal laut zugeben, dass du etwas nicht weißt. Wenn dir das schwerfällt, hast du gefunden, was dich hier festhält.',
      'Teuer macht den Stolz, dass Meinung und Person zusammenfallen: Wer sich mit seiner Position gleichsetzt, erlebt jede Korrektur als Angriff und verteidigt sie länger, als er sie glaubt. Der Preis fällt kaum auf — du erfährst Neuigkeiten über dich als Letzter, weil die Leute um dich herum es aufgegeben haben, sie dir zu sagen. Dazu kommt der Vergleich: Stolz braucht jemanden, der unter dir steht, und macht dich damit von anderen abhängig.',
      'Zähl deshalb nicht deine Erfolge, sondern zwei Sätze pro Woche: „Da hattest du recht“ und „Das weiß ich nicht.“ Beim ersten Mal kostet das etwas, danach wird es leicht — und du bekommst dafür Menschen zurück, die dir wieder etwas sagen. Geh außerdem regelmäßig irgendwohin, wo du der Unfähigste bist: ein Anfängerkurs, eine fremde Sprache, ein Sport, in dem du schlecht bist. Von dort geht es nach oben, nicht von der Bühne.',
    ],
    signs: [
      'Kritik trifft dich hart, auch wenn sie sachlich stimmt.',
      'Um Hilfe zu bitten fällt dir schwerer, als die Sache allein in der doppelten Zeit zu machen.',
      'Du vergleichst dich häufig — und stellst still fest, wo du besser bist.',
    ],
    trap:
      'Stolz muss verteidigt werden. Weil er dein Selbstbild an Erfolge bindet, wird jeder Irrtum zur Bedrohung — und Lernen wird teuer.',
    steps: [
      'Gib einmal am Tag zu, etwas nicht zu wissen. Laut, vor anderen.',
      'Trenne Position und Person: Du kannst eine Meinung fallen lassen, ohne dich selbst zu verlieren.',
      'Bitte diese Woche um echte Hilfe — nicht als Test, sondern weil du sie brauchst.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was bliebe',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Beschreib dich auf einer halben Seite, ohne ein Wort über Beruf, Können, Besitz, Rolle oder Erfolge zu verlieren. Was übrig bleibt, kann dir kein Rückschlag nehmen. Bleibt die Seite fast leer, hast du das Ergebnis der Übung schwarz auf weiß.',
      },
      {
        kind: 'action',
        name: 'Der teure Satz',
        duration: 'einmal täglich',
        body:
          'Sag einmal am Tag laut, und zwar dort, wo es dich etwas kostet: „Da kenne ich mich nicht aus“ oder „Du hattest recht“. Notier abends, was daraufhin tatsächlich passiert ist. Fast immer: nichts. Genau das ist der Inhalt der Übung.',
      },
      {
        kind: 'sitting',
        name: 'Nichts erreichen',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Sitz zehn Minuten und werde dabei nichts: nicht ruhiger, nicht besser, nicht weiter. Jedes Mal, wenn der Gedanke kommt „das bringt nichts“ oder „andere können das besser“, hast du den Stolz bei der Arbeit erwischt. Dieses Bemerken ist die Übung, nicht die Stille.',
      },
    ],
    mantra: 'Ich muss nicht recht haben, um in Ordnung zu sein.',
  },
  courage: {
    name: 'Mut',
    emotion: 'Bejahung',
    worldview: 'machbar',
    essence:
      'Die Schwelle. Ab hier gibst du der Welt mehr Kraft, als sie dich kostet. Die Probleme sind nicht verschwunden, aber sie sind zu Aufgaben geworden, und du traust dir zu, sie anzugehen.',
    advice: [
      'Du bist über der Schwelle. Die Gefahr ist jetzt nicht der Rückfall, sondern die Überlastung: Mut, der alles anpackt und nichts loslässt, brennt aus. Halte deshalb zwei Dinge nebeneinander — eine unbequeme Sache pro Woche, die du bewusst wählst, und bei jedem Ärger die Frage, ob hier wirklich zu kämpfen ist oder ob es reicht, die Lage zu nehmen, wie sie ist.',
      'Der Fehler hier ist die Menge. Mut fühlt sich an wie eine Kraft, die nie ausgeht, und weil sich ab der Schwelle tatsächlich etwas bewegt, packt man leicht alles gleichzeitig an. Unterscheide deshalb bei jeder Sache, ob sie in deiner Hand liegt oder nicht. Das Erste kostet Einsatz, das Zweite kostet Kraft und ändert nichts. Und rechne Schlaf und Erholung zur Arbeit, nicht zur Belohnung.',
      'Das Maß ist nicht, wie viel du anpackst, sondern ob du in diesem Monat auch etwas losgelassen hast. Und erwarte nicht, dass die Angst verschwindet: Auf dieser Ebene bleibt sie da, sie entscheidet nur nicht mehr. Wer wartet, bis es sich sicher anfühlt, wartet vergeblich — das gute Gefühl kommt nach der Handlung, nicht davor.',
    ],
    signs: [
      'Du sprichst schwierige Dinge an, obwohl dir dabei mulmig ist.',
      'Fehler kosten dich nicht mehr dein Selbstwertgefühl.',
      'Du übernimmst Verantwortung, ohne nach Schuldigen zu suchen.',
    ],
    trap:
      'Mut kann in Dauerbelastung umschlagen: alles anpacken, nichts loslassen. Wer sich ständig überwinden muss, brennt aus.',
    steps: [
      'Halt den Schwung: eine unbequeme Sache pro Woche, die du bewusst wählst.',
      'Üb das Loslassen im Kleinen — nicht jeder Widerstand muss überwunden werden. Manches wird leichter, wenn du aufhörst zu ziehen.',
      'Frag bei Ärger: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Kämpfen oder lassen',
        duration: '15 Minuten, wöchentlich',
        minutes: 15,
        body:
          'Schreib die drei Dinge auf, die dich gerade am meisten Kraft kosten. Frag bei jedem: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist? Streich eines davon. Auf dieser Ebene ist das Streichen die schwierigere Übung, nicht das Anpacken.',
      },
      {
        kind: 'action',
        name: 'Die eine Sache am Morgen',
        duration: 'einmal pro Woche',
        body:
          'Wähl am Sonntag die eine Sache aus, um die du dich die ganze Woche gedrückt hast, und erledige sie am Montag in der ersten Stunde, bevor sich etwas anderes davorschieben kann. Eine, nicht drei. Mut, der sich auf zu vieles verteilt, wird zu Hetze.',
      },
      {
        kind: 'sitting',
        name: 'Zwei Minuten vor der Schwelle',
        duration: '2 Minuten, vor der unangenehmen Sache',
        minutes: 2,
        body:
          'Bevor du das Unangenehme tust, setz dich zwei Minuten hin und tu nichts dagegen. Kein Mutmachen, keine zurechtgelegten Sätze — nur spüren, wie sich das Kurz-davor anfühlt. Dann steh auf und tu es. Mut heißt nicht, dieses Gefühl nicht zu haben, sondern danach aufzustehen.',
      },
    ],
    mantra: 'Ich kann das — und wenn nicht, lerne ich es.',
  },
  neutrality: {
    name: 'Neutralität',
    emotion: 'Vertrauen',
    worldview: 'zufriedenstellend',
    essence:
      'Es ist gut, wie es ist — und wenn nicht, hältst du das auch aus. Neutralität ist der erste wirklich entspannte Ort auf der Skala: kein Müssen, kein Rechthaben, wenig Drama.',
    advice: [
      'Halt das hier nicht für das Ziel. Neutralität ist der erste wirklich entspannte Ort auf der Skala, und genau deshalb bleiben viele hier stehen. Nach oben geht es nur über Einsatz. Such dir eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden, und sag Ja zu ihr, bevor du weißt, ob sie sich lohnt.',
      'Achte auf den Unterschied zwischen Gelassenheit und Gleichgültigkeit — von innen fühlen sich beide gleich an. Gelassenheit heißt: Es ist mir wichtig, und ich halte es aus, wenn es anders kommt. Gleichgültigkeit heißt: Ich habe aufgehört, es wichtig zu finden, damit es nicht mehr weh tun kann. Das Zweite ist bequem und kostet dich genau die Beteiligung, aus der die Ebenen darüber bestehen.',
      'Der Test dafür ist eine einzige Frage: Wofür würdest du dich blamieren? Wenn dir nichts einfällt, hast du das eigentliche Ergebnis dieser Ebene in der Hand. Nimm dir dann etwas vor, bei dem du scheitern kannst, und setz ein Datum dafür — nicht weil Scheitern gut wäre, sondern weil dich nur das noch etwas angeht, was auch schiefgehen kann.',
    ],
    signs: [
      'Ein Nein von außen wirft dich nicht mehr um.',
      'Du kannst Pläne ändern, ohne dich als Verlierer zu fühlen.',
      'Andere kommen gern zu dir, weil du nichts hochkochst.',
    ],
    trap:
      'Gelassenheit kann in Gleichgültigkeit umkippen. Wer nichts mehr braucht, engagiert sich manchmal auch für nichts mehr.',
    steps: [
      'Sag bewusst Ja zu etwas, das Aufwand bedeutet — aus Neutralität wird erst durch Einsatz Bereitschaft.',
      'Such dir eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden.',
      'Bring deine Ruhe aktiv ein: übernimm dort, wo andere sich verhaken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Drei Dinge, für die ich unbequem werde',
        duration: '15 Minuten, dann wöchentlich prüfen',
        minutes: 15,
        body:
          'Schreib drei Dinge auf, für die du dich einsetzen würdest, auch wenn es dich etwas kostet. Nimm dir diese Woche das kleinste davon vor. Neutralität ist ein guter Boden, aber eine schlechte Wohnung — die Übung prüft, ob dir noch etwas wichtig genug ist.',
      },
      {
        kind: 'action',
        name: 'Einmal einmischen',
        duration: 'einmal pro Woche',
        body:
          'Geh diese Woche in eine Sache hinein, aus der du dich sonst heraushalten würdest: eine Diskussion, eine Aufgabe, ein Streit unter anderen. Nicht, um recht zu haben, sondern weil du ruhiger bleiben kannst als die, die sich verhakt haben.',
      },
      {
        kind: 'sitting',
        name: 'Kommen und gehen lassen',
        duration: '12 Minuten täglich',
        minutes: 12,
        body:
          'Sitz und lass alles vorbeiziehen: Gedanken, Geräusche, ein Jucken, Pläne. Nichts festhalten, nichts wegschieben, nichts kommentieren. Diese Übung fällt auf dieser Ebene leicht — und sie ist zugleich die Probe: Wo du doch festhältst oder wegschiebst, steckt noch etwas anderes als Gelassenheit.',
      },
    ],
    mantra: 'Ich bin einverstanden — und ich packe trotzdem an.',
  },
  willingness: {
    name: 'Bereitschaft',
    emotion: 'Optimismus',
    worldview: 'hoffnungsvoll',
    essence:
      'Aus „es geht auch so“ wird „ich mache das gern“. Arbeit fühlt sich nicht mehr nach Widerstand an, Lernen macht Freude, und andere merken, dass mit dir zu rechnen ist.',
    advice: [
      'Dein Ja ist deine Stärke und deine Rechnung. Die Frage ist hier nicht mehr, ob du etwas übernimmst, sondern wofür du dein nächstes Ja aufsparst. Streich diese Woche eine Zusage, die du aus Gewohnheit gegeben hast, und steck die Kraft in etwas, das dich fachlich fordert. Erschöpfung sieht auf dieser Ebene lange wie Engagement aus.',
      'Der Fehler ist nicht das Ja, sondern dass es selbstverständlich geworden ist. Wer für alle der Verlässliche ist, wird zuerst gefragt und zuletzt entlastet. Irgendwann kommt die Rechnung, und zwar nicht als Erschöpfung, sondern als leiser Groll gegen Leute, die nie erfahren haben, was es dich gekostet hat. Sortier deshalb: Vieles können auch andere übernehmen. Was nur du kannst, macht sonst niemand.',
      'Das Maß der Woche ist ein einziges Nein, das gehalten hat — nicht wegerklärt und nicht durch eine Ersatzleistung erkauft. Und prüf, ob dein Ja dich noch wachsen lässt: Bereitschaft, die nur Bekanntes abarbeitet, ist Fleiß und kein Fortschritt. Weiter geht es über die Aufgabe, bei der du am Anfang nicht weißt, wie sie geht.',
    ],
    signs: [
      'Du meldest dich freiwillig, bevor jemand fragen muss.',
      'Rückschläge sind für dich Informationen, keine Urteile.',
      'Du bringst Dinge zu Ende, auch die unspektakulären.',
    ],
    trap:
      'Bereitschaft sagt leicht Ja — auch zu viel. Ohne Grenze wird aus Hilfsbereitschaft Erschöpfung.',
    steps: [
      'Setz Prioritäten statt nur Zusagen: Wozu sagst du Ja, damit ein wichtigeres Ja möglich bleibt?',
      'Nimm dir etwas vor, das dich fachlich fordert — Bereitschaft wächst an anspruchsvollen Aufgaben.',
      'Üb das Annehmen: Lass zu, dass etwas so bleibt, wie es ist, ohne es verbessern zu wollen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wozu ich Ja gesagt habe',
        duration: '15 Minuten, sonntags',
        minutes: 15,
        body:
          'Schreib auf, wozu du in dieser Woche Ja gesagt hast — alles, auch die Kleinigkeiten. Markier, was du aus Überzeugung übernommen hast und was aus Gewohnheit. Bereitschaft ohne Grenze führt zu Erschöpfung, und die zweite Liste ist der Ort, an dem sie entsteht.',
      },
      {
        kind: 'action',
        name: 'Ein Ja, ein Nein',
        duration: 'zu Wochenbeginn',
        body:
          'Leg am Montag beides fest: ein Ja zu etwas, das dich ein Stück fordert, und ein Nein zu etwas, das du sonst aus Gewohnheit übernommen hättest. Schreib beide auf. Das Nein ist die schwerere Hälfte — und die, die das Ja überhaupt möglich macht.',
      },
      {
        kind: 'sitting',
        name: 'Der ehrliche Zustand',
        duration: '6 Minuten, abends',
        minutes: 6,
        body:
          'Sitz und geh den Körper durch, von den Füßen bis zum Kopf. Nicht, um zu entspannen, sondern um festzustellen, wie viel Kraft heute noch da ist. Wer gern Ja sagt, merkt zuletzt, dass er leer wird. Diese sechs Minuten sind die einzige Stelle im Tag, an der die Antwort nicht von der Stimmung abhängt.',
      },
    ],
    mantra: 'Ich mache mit — mit ganzer Kraft und offenen Augen.',
  },
  acceptance: {
    name: 'Akzeptanz',
    emotion: 'Vergebung',
    worldview: 'harmonisch',
    essence:
      'Wie es dir geht, entscheidet sich in dir und nicht in den Umständen. Damit hört das Verhandeln mit der Wirklichkeit auf, und du fängst an, sie zu gestalten.',
    advice: [
      'Pass auf den Satz auf, der hier am leichtesten fällt: „So bin ich eben.“ Etwas anzunehmen heißt nicht, dass es unveränderlich ist — Akzeptanz ist der Boden, auf dem das Gestalten anfängt, und keine Erlaubnis, es zu lassen. Nimm dir eine Sache vor, die du bisher hingenommen hast, und prüf nüchtern, was daran wirklich feststeht. Und vergib einer konkreten Person, schriftlich, notfalls ohne den Brief abzuschicken.',
      'Der Irrtum, der hier am meisten kostet, ist die Verwechslung von Annehmen und Gutheißen. Akzeptanz heißt nur: Ich höre auf, mit dem zu streiten, was ohnehin der Fall ist. Sie sagt nichts darüber, ob es in Ordnung ist, und verpflichtet dich zu nichts — wer ein Unrecht annimmt, muss es deshalb nicht dulden. Umgekehrt gilt: Was du nicht annimmst, kannst du auch nicht ändern, weil du noch damit beschäftigt bist, dass es nicht so sein sollte.',
      'Das Zeichen dieser Ebene ist zurückkehrende Kraft. Der Streit mit den Tatsachen war teuer, und wie teuer, merkst du erst, wenn er aufhört. Vergeben ist hier kein Gefühl, sondern ein Verzicht: Du gibst die Forderung auf, dass die Vergangenheit anders ausgegangen sein möge. Ob es gewirkt hat, siehst du nicht daran, wie du über den Menschen denkst, sondern daran, dass du seltener an ihn denkst.',
    ],
    signs: [
      'Du fragst zuerst, was du beitragen kannst, und nicht, wer schuld ist.',
      'Menschen dürfen anders sein, ohne dass es dich stört.',
      'Du kannst vergeben, ohne die Sache zu verharmlosen.',
    ],
    trap:
      'Akzeptanz kann zur Ausrede werden: „So bin ich eben.“ Etwas anzunehmen ist nicht dasselbe, wie es für unveränderlich zu halten.',
    steps: [
      'Prüf deine Annahmen an der Sache: Was davon ist nachweisbar wahr, was nur vertraut?',
      'Bring Ordnung ins Denken — lies, rechne, argumentiere. Aus Akzeptanz wird durch Klarheit Vernunft.',
      'Vergib einer bestimmten Person, notfalls schriftlich und ohne den Brief abzuschicken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'So bin ich eben — stimmt das?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib drei Sätze auf, die mit „Ich bin nun mal …“ anfangen. Frag bei jedem: War das vor fünf Jahren auch schon so? Würde jemand, der mich gut kennt, das unterschreiben? Was würde es kosten, das zu ändern? Etwas anzunehmen ist nicht dasselbe, wie es für unveränderlich zu halten.',
      },
      {
        kind: 'action',
        name: 'Der erste Schritt zurück',
        duration: 'einmal, wenn es ansteht',
        body:
          'Nimm Kontakt zu einem Menschen auf, mit dem etwas offen geblieben ist. Eine Nachricht reicht, drei Sätze, ohne Aufarbeitung. Du musst die Sache nicht klären und nichts verzeihen, was noch nicht verziehen ist. Es geht nur darum, dass die Tür wieder eine Tür ist und keine Wand.',
      },
      {
        kind: 'sitting',
        name: 'Das ist gerade so',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Nimm eine Sache, die dir gerade nicht passt, und sitz damit. Sag dir bei jedem Ausatmen innerlich: das ist gerade so. Das ist weder Einverständnis noch Aufgeben, sondern das Ende des Streits mit einer Wirklichkeit, die sich davon ohnehin nicht beeindrucken lässt. Was danach zu tun ist, siehst du klarer.',
      },
    ],
    mantra: 'Ich nehme an, was ist — und gestalte, was geht.',
  },
  reason: {
    name: 'Vernunft',
    emotion: 'Verstehen',
    worldview: 'sinnvoll',
    essence:
      'Der Verstand auf seiner Höhe: Zusammenhänge werden sichtbar, Wissen ordnet sich, Entscheidungen lassen sich begründen. Die Ebene der Wissenschaft, der Medizin, des guten Handwerks.',
    advice: [
      'Dein Verstand ist auf dieser Ebene ein ausgezeichnetes Werkzeug. Nur weiß er nicht, wann er aufhören soll. Nimm dir täglich zehn Minuten, in denen du etwas wahrnimmst, ohne es zu deuten: Musik, ein Gesicht, das Wetter. Und frag im nächsten Konflikt nicht, wer recht hat, sondern was der andere braucht. Der nächste Schritt ist keine bessere Analyse, sondern eine andere Art zu schauen.',
      'Der Fehler auf dieser Ebene ist, das Verstehen als Aufschub zu benutzen. Es fühlt sich wie Fortschritt an und kostet nichts. Man kann beliebig lange weiter analysieren, während die Sache selbst unangetastet bleibt. Der zweite Fehler ist feiner: Ein guter Kopf findet auch die besseren Begründungen dafür, warum er recht hat. Je klüger jemand ist, desto teurer werden seine Irrtümer, weil er sie länger verteidigen kann.',
      'Triff deshalb pro Woche eine Entscheidung, bevor die Lage vollständig geklärt ist — mit Datum und ohne Vorbehalt. Und miss die Woche nicht daran, was du verstanden hast, sondern daran, ob dich etwas berührt hat: ein Mensch, ein Stück Musik, ein Satz, den du nicht sofort einordnen konntest. Weiter geht es nicht über den nächsten Gedanken, sondern an ihm vorbei.',
    ],
    signs: [
      'Du unterscheidest sauber zwischen Fakten, Meinung und Gefühl.',
      'Komplizierte Dinge ordnest du, statt dich davon erschlagen zu lassen.',
      'Du änderst deine Meinung, wenn die Daten es verlangen.',
    ],
    trap:
      'Der Verstand hält sich für das Ganze. Er kann alles erklären und niemanden trösten — und er verwechselt leicht das Modell mit der Wirklichkeit.',
    steps: [
      'Üb Wahrnehmen ohne Analysieren: zehn Minuten Musik, Natur, ein Gesicht — ohne es zu deuten.',
      'Frag bei Konflikten nicht „Wer hat recht?“, sondern „Was braucht dieser Mensch?“.',
      'Tu etwas Gutes, das dir nichts einbringt und in keiner Bilanz auftaucht.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das stärkste Gegenargument',
        duration: '25 Minuten, einmal',
        minutes: 25,
        body:
          'Nimm eine Überzeugung, die dir wirklich wichtig ist, und schreib die beste Fassung des Gegenteils auf — so gut, dass jemand, der sie glaubt, sie unterschreiben würde. Keine Karikatur und kein Halbsatz zur Widerlegung am Ende. Wo es dir beim Schreiben eng wird, hört das Denken auf und fängt dein Selbstbild an.',
      },
      {
        kind: 'action',
        name: 'Was braucht dieser Mensch?',
        duration: 'im nächsten Konflikt',
        body:
          'Frag dich im nächsten Streit einmal nicht, wer recht hat, sondern was der andere gerade braucht — und stell die Frage laut. Der Verstand kann alles erklären und niemanden trösten. Dieser eine Satz ist die Stelle, an der er das zugibt.',
      },
      {
        kind: 'sitting',
        name: 'Zehn Minuten ohne Deutung',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Zehn Minuten mit etwas, das nichts von dir will: Musik, ein Baum, ein Gesicht. Sobald du anfängst zu erklären, einzuordnen oder zu bewerten, merk es und geh zurück zum bloßen Wahrnehmen. Die Übung ist nicht die Ruhe, sondern das Bemerken, wie schnell der Kopf anspringt.',
      },
    ],
    mantra: 'Verstehen ist viel. Es ist nicht alles.',
  },
  love: {
    name: 'Liebe',
    emotion: 'Ehrfurcht',
    worldview: 'wohlwollend',
    essence:
      'Nicht das Gefühl aus den Liedern, sondern eine Haltung: bedingungslos, dauerhaft, ohne Gegenleistung. Du siehst das Wesentliche in Menschen und Dingen, statt daran vorbeizusehen.',
    advice: [
      'Der blinde Fleck auf dieser Ebene bist du selbst. Wohlwollen fließt hier reichlich nach außen und kommt bei dir am seltensten an — prüf das ehrlich, bevor du weiterliest. Und lass Menschen ihren eigenen Weg gehen, auch den unbequemen: Liebe, die retten will, hält fest, und Festhalten ist wieder Wollen.',
      'Der feine Fehler hier ist, das Helfen zur Währung zu machen. Wer immer gibt und nie nimmt, hält die anderen unmerklich in der Schuld — und sich selbst aus der Beziehung heraus, denn Nehmen ist die verletzlichere Hälfte. Prüf das an einer Kleinigkeit: Wann hast du zuletzt etwas angenommen, ohne es innerhalb einer Woche auszugleichen?',
      'Das Zeichen dieser Ebene ist nicht, wie viel du fühlst, sondern wie wenig du darauf angewiesen bist, dass sich jemand richtig verhält. Nimm dir konkret etwas vor: Lass in dieser Woche einen Menschen einen Fehler machen, ohne ihn davor zu bewahren — und bleib dabei erreichbar. Das ist schwerer als jede Hilfe.',
    ],
    signs: [
      'Du willst das Gute für andere, auch wenn du nichts davon hast.',
      'Entscheidungen fällst du eher aus dem Bauch als aus der Kalkulation — und sie tragen.',
      'Deine bloße Anwesenheit beruhigt.',
    ],
    trap:
      'Auch hier gibt es Anhaftung: an die Rolle des Liebenden, an Menschen, die man retten will. Liebe, die festhält, wird wieder zum Wollen.',
    steps: [
      'Lass geschehen: Menschen dürfen ihren eigenen Weg gehen, auch den unbequemen.',
      'Üb Dankbarkeit für Konkretes, täglich, auch ohne besonderen Anlass.',
      'Nimm dich selbst in dein Wohlwollen mit hinein — das ist der häufigste blinde Fleck auf dieser Ebene.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Dank, der ankommt',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Schreib einem Menschen auf, was er für dich getan hat — konkret, mit Datum, ohne allgemeine Sätze über seine Güte. Dann schick es ab. Der stille Teil dieser Ebene fällt leicht. Unbequem wird es erst, wenn jemand erfährt, was er dir bedeutet.',
      },
      {
        kind: 'action',
        name: 'Einmal nicht retten',
        duration: 'wenn es so weit ist',
        body:
          'Lass einen Menschen den Weg gehen, von dem du ihn sonst abgehalten hättest — den unbequemen, den du für falsch hältst. Da sein: ja. Eingreifen: nein. Liebe, die festhält, ist wieder Wollen, und der Unterschied zeigt sich genau hier.',
      },
      {
        kind: 'sitting',
        name: 'Der stille gute Wunsch',
        duration: '2 Minuten täglich',
        minutes: 2,
        body:
          'Denk an einen Menschen und wünsch ihm etwas Konkretes und Gutes — ohne dass er es erfährt und ohne etwas dafür zu tun. Am ersten Tag jemand Nahes, am zweiten ein Fremder, am dritten jemand Schwieriger. Am siebten du selbst. Der siebte Tag wird am häufigsten übersprungen.',
      },
    ],
    mantra: 'Ich will dein Bestes, ohne Bedingung.',
  },
  joy: {
    name: 'Freude',
    emotion: 'Heiterkeit',
    worldview: 'vollkommen',
    essence:
      'Eine Freude, die nicht von Ereignissen abhängt. Sie kommt von innen, ist geduldig und ausdauernd — und ansteckend, ohne laut zu sein.',
    advice: [
      'Versuch nicht, das hier festzuhalten. In dem Moment, in dem du diese Freude wiederherstellen willst, ist sie zu Verlangen geworden, und du bist zwölf Ebenen tiefer. Lass die schönen Zustände kommen und gehen wie das Wetter. Und wenn du etwas tun willst: Wirke im Stillen, an einer Stelle, an der es niemand mitbekommt.',
      'Verloren geht diese Ebene meistens durch den Versuch der Wiederholung: dasselbe Seminar noch einmal, derselbe Ort, dieselbe Musik, dieselbe Substanz. Aus einem Zustand wird dabei ein Besitz, den man verteidigen muss. Dazu gehört auch das Erzählen: Wer die Erfahrung zur Auskunft über sich selbst macht, hat sie schon gegen Stolz eingetauscht, und der liegt zwölf Ebenen tiefer.',
      'Diese Ebene erkennst du nicht am Höhepunkt, sondern am Dienstag: wie es dir geht, wenn nichts Besonderes passiert, wie lange du in einer Schlange stehen kannst, wie du mit einem langweiligen Menschen redest. Und wenn die Freude geht, lass sie gehen, ohne ihr etwas nachzurufen. Sie kommt zurück wie das Wetter — und zwar zu dem, der nicht darauf wartet.',
    ],
    signs: [
      'Ganz gewöhnliche Momente berühren dich: Licht, Stimmen, Alltägliches.',
      'Geduld fällt dir leicht, weil du nichts erzwingen musst.',
      'Menschen fühlen sich in deiner Nähe wohler, ohne dass etwas passieren muss.',
    ],
    trap:
      'Die Erfahrung selbst lässt sich festhalten. Dann wird die Freude zu einem Zustand, den man wiederherstellen will — und ist wieder Verlangen.',
    steps: [
      'Lass die schönen Zustände kommen und gehen, ohne sie zu konservieren.',
      'Hilf im Stillen: Tu etwas, das niemand mitbekommt.',
      'Verbring Zeit in Stille — ohne Programm und ohne Ziel.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das Unbemerkte',
        duration: 'abends, 5 Minuten',
        minutes: 5,
        body:
          'Notier einen Moment des Tages, der gut war und den niemand bemerkt hätte: Licht an einer Wand, ein Satz, das Geräusch der Tür. Am Ende der Woche wirfst du die Zettel weg. Geübt wird das Bemerken, nicht das Sammeln — festgehaltene Freude wird wieder zu Verlangen.',
      },
      {
        kind: 'action',
        name: 'Etwas ziehen lassen',
        duration: 'wenn ein Moment gut ist',
        body:
          'Wenn heute ein Moment gut ist, mach kein Foto, erzähl niemandem davon und schreib ihn nirgends auf. Lass ihn vorbeigehen wie jeden anderen. Festgehaltene Freude wird zu einem Zustand, den man wiederherstellen will — und damit wieder zu Verlangen.',
      },
      {
        kind: 'sitting',
        name: 'Eine Sache lange ansehen',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Nimm einen gewöhnlichen Gegenstand — eine Tasse, deine Hand, ein Blatt — und sieh ihn so lange an, bis er aufhört, das zu sein, wofür du ihn hältst. Nicht deuten, nicht bewundern, nicht fotografieren. Die Freude auf dieser Ebene kommt nicht von besonderen Dingen, sondern davon, wie lange du hinsiehst.',
      },
    ],
    mantra: 'Nichts muss geschehen, damit es gut ist.',
  },
  peace: {
    name: 'Frieden',
    emotion: 'Glückseligkeit',
    worldview: 'vollständig',
    essence:
      'Die Grenze zwischen dir und dem, was du wahrnimmst, wird durchlässig. Alles bewegt sich, nichts drängt. Sehr selten — Hawkins schätzt: ein Mensch unter zehn Millionen.',
    advice: [
      'Bleib im Alltag. Auf dieser Höhe ist der Rückzug verlockend und meistens ein Verlust: Frieden, der niemandem mehr nützt, verliert seinen Boden. Und halt die Praxis, die dich hierher gebracht hat. Es gibt keinen Zustand, den man besitzt, und keinen, der ohne Übung bleibt.',
      'Der Rückzug tarnt sich hier gut: Er sieht nach Reife aus und ist oft nur bequemer. Ein zweiter Sog ist die Rolle des Lehrers — wer hier steht, wird gefragt, und es ist verlockend, früher zu antworten, als man versteht. Halt deshalb an gewöhnlichen Verpflichtungen fest: Rechnungen, Termine, Menschen, die nichts von Ebenen wissen. Ein Frieden, der einen Werktag nicht aushält, ist keiner.',
      'Und behalt einen Menschen in deiner Nähe, der dir widersprechen darf, ohne dass es ihn etwas kostet — hier oben fehlt am ehesten der Widerspruch. Das Maß ist unspektakulär: Bist du im Streit noch ansprechbar? Hörst du Kritik, ohne sie zu erklären? Kommst du morgens auch dann zur Übung, wenn sie nicht nötig scheint?',
    ],
    signs: [
      'Stille fühlt sich voll an, nicht leer.',
      'Getrenntheit wirkt weniger real als Verbundenheit.',
      'Handeln geschieht wie von selbst, ohne inneren Antreiber.',
    ],
    trap:
      'Auf dieser Höhe ist der Rückzug aus der Welt verlockend. Frieden, der niemandem mehr nützt, verliert seinen Boden.',
    steps: [
      'Bleib im Alltag: Frieden bewährt sich in der Küche, nicht auf dem Berg.',
      'Gib weiter, was du kannst — schlicht und ohne Lehrerhaltung.',
      'Halt die Praxis, die dich hierher gebracht hat. Es gibt keinen Zustand, den man besitzt.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wem hat das genützt?',
        duration: '10 Minuten, wöchentlich',
        minutes: 10,
        body:
          'Schreib auf, wem deine Ruhe in der vergangenen Woche konkret zugutegekommen ist: wer sich beruhigt hat, wem geholfen war, wer geblieben ist. Bleibt die Liste leer, sagt das mehr als jede weitere Übung — dann hat sich dieser Frieden aus der Welt zurückgezogen.',
      },
      {
        kind: 'action',
        name: 'Die Küche',
        duration: 'täglich, so lange es dauert',
        body:
          'Nimm eine gewöhnliche Verrichtung — Abwasch, Treppe, der Weg zur Mülltonne — und mach sie ganz: ohne Musik, ohne Handy, ohne dabei etwas zu planen. Wandert der Kopf weg, komm zurück zu den Händen. Hier bewährt sich der Frieden, nicht auf dem Berg.',
      },
      {
        kind: 'sitting',
        name: 'Der Atem, der sich selbst atmet',
        duration: '20 Minuten täglich',
        minutes: 20,
        body:
          'Sitz und tu nichts mit dem Atem: nicht verlängern, nicht zählen, nicht vertiefen. Bemerk nur, dass geatmet wird, ohne dass jemand es tut. Das ist die schlichteste Übung dieser Liste und die einzige, die nicht besser wird, wenn man sich mehr Mühe gibt.',
      },
    ],
    mantra: 'Alles ist, wie es ist. Und das genügt.',
  },
  enlightenment: {
    name: 'Erleuchtung',
    emotion: 'Unaussprechlich',
    worldview: 'ist',
    essence:
      'Das Ende der Skala (700 bis 1000). Kein Ich mehr, das etwas erlebt — nur noch das Sein selbst. Hawkins ordnet dieser Ebene die großen Lehrer der Menschheitsgeschichte zu.',
    advice: [
      'Hier gibt es nichts zu raten. Wenn diese Ebene als dein Ergebnis erscheint, sagt sie etwas über die Skala und die Rechnung dahinter aus, nicht über dich. Hawkins ordnet ihr die großen Lehrer der Menschheitsgeschichte zu, und ein Fragebogen ist kein Weg dorthin. Nimm sie als Richtung. Alles Praktische steht auf den sechzehn Ebenen darunter.',
      'Wenn dieses Ergebnis trotzdem herauskommt, lohnt ein nüchterner Blick darauf, wie es zustande kam: Der Bogen misst Selbstauskunft und sonst nichts. Durchweg zustimmende Antworten ergeben durchweg hohe Werte. Das kann heißen, dass es dir tatsächlich gut geht, und es kann heißen, dass du geantwortet hast, wie du gern wärst. Beides ist menschlich und kein Vorwurf.',
      'Praktisch wird es eine Ebene tiefer. Geh die Skala durch und such die Ebene, auf der du an einem schlechten Tag landest — nicht die, auf der du an einem guten stehst. Die erste sagt mehr über deinen Alltag. Und frag einen Menschen, der dich lange kennt, wo er dich sehen würde. Diese Antwort ist unbequemer als jedes Ergebnis und die einzige, mit der sich arbeiten lässt.',
    ],
    signs: [
      'Diese Ebene beschreibt sich nicht von innen.',
      'Wer sie für sich beansprucht, spricht meistens aus Stolz.',
      'Was von ihr bleibt, sind die Menschen, die davon berührt wurden.',
    ],
    trap:
      'Der Begriff selbst. Als Ziel gedacht wird Erleuchtung zum ehrgeizigsten Verlangen von allen.',
    steps: [
      'Hier ist nichts zu tun. Die Skala endet an dieser Stelle — der Weg dorthin sind die 16 Ebenen darunter, gelebt.',
      'Wichtig ist die Richtung, nicht das Ende: Eine Ebene nach oben verändert ein Leben.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz, der übrig bleibt',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib in einem Satz auf, was du suchst. Dann streich jedes Wort, das ein Ziel benennt, einen Zustand oder einen Zeitpunkt. Lies, was übrig bleibt. Meistens ist es nichts — und das ist keine Niederlage, sondern das ehrlichste Ergebnis auf dieser Höhe.',
      },
      {
        kind: 'action',
        name: 'Eine Ebene tiefer',
        duration: 'heute',
        body:
          'Nimm dir heute die Übung einer Ebene vor, auf der du tatsächlich stehst, und mach sie zu Ende. Diese Ebene hier ist keine Aufgabe, sondern eine Richtung: Der Weg dorthin sind die sechzehn Ebenen darunter, gelebt. Wer bei 700 anfängt, übt Verlangen.',
      },
      {
        kind: 'sitting',
        name: 'Wer fragt?',
        duration: 'kein Zeitrahmen',
        body:
          'Wenn ein Gedanke auftaucht, frag einmal, wem er auftaucht — und beantworte es nicht. Dann lass ihn ziehen. Das ist die einzige Übung auf dieser Liste, die nichts erreichen soll: Wer sie benutzt, um irgendwohin zu kommen, übt Verlangen.',
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
      'You are not ashamed of something you did, you are ashamed of yourself. “I made a mistake” has turned into “I am a mistake”. Carrying that costs so much that almost nothing is left for anything else.',
    advice: [
      'Do not start by trying to understand the shame. What keeps it alive is mostly that nobody knows about it, and it rarely survives one person hearing it and staying. If you do only one thing this week, do that one. Everything else gets easier afterwards.',
      'The most common mistake here is trying to prove your worth: one more achievement, one more favour, one more reason you are all right after all. That works for a few days, and then the question comes back sharper — because worth you have to earn can be lost again. Shame cannot be argued away. It can be shared.',
      'Do not expect it to feel better soon. The first sign is smaller than that: you stay in a room you would otherwise have left. Count that as progress, even if you are shaking. And if you start thinking that things would be easier without you, call someone today — a person you trust or a crisis line.',
    ],
    signs: [
      'You would rather not be seen, and you leave rooms where you might stand out.',
      'Old embarrassments come back unasked and land instantly.',
      'Praise makes you uncomfortable, as though someone had misjudged you.',
    ],
    trap:
      'Shame promises protection: make yourself small and you cannot fall far. The price is that nobody gets to know you — including you.',
    steps: [
      'Separate the deed from the person. Write down what happened in sentences an outsider would sign — no verdict on yourself.',
      'Tell one person you trust something you have kept hidden. Shame rarely survives someone knowing about it.',
      'Look after your body the way you would look after a guest: eat, sleep, shower, go outside. Self-respect often starts somewhere very practical.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The two versions',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down the incident you are ashamed of twice: once the way you tell it to yourself, and once the way someone would write it who only saw what happened. Read both out loud. The difference between them is the shame — and now it is on paper instead of working invisibly inside you.',
      },
      {
        kind: 'action',
        name: 'Seen once',
        duration: '5 minutes, once a day',
        minutes: 5,
        body:
          'Go somewhere there are people — a bakery, a platform, a park — and stay five minutes without hiding behind your phone. Say one unremarkable thing to one person: a greeting, a thank you, a question about the time. Shame claims that everyone can see something in you. Those five minutes show you every time that nobody is looking.',
      },
      {
        kind: 'sitting',
        name: 'A hand on the breastbone',
        duration: '6 minutes daily',
        minutes: 6,
        body:
          'Sit, lay one hand flat on your breastbone and leave it there. Say three sentences inwardly: this is hard right now. Everyone knows something like it. I would like to be kind to myself. If resistance comes up — “this is ridiculous” — that belongs to the exercise.',
      },
    ],
    mantra: 'I have made mistakes. I am not one.',
  },
  guilt: {
    name: 'Guilt',
    emotion: 'Blame',
    worldview: 'punishing',
    essence:
      'A trial is running inside you that never ends. The past is heard again and again, and the verdict comes back against you every time.',
    advice: [
      'First check whether anyone is actually owed anything by you. The answer is usually shorter than the accusation. What is left after that is often no longer real remorse but a habit that feels moral. Set a date by which you will do your part, and treat the matter as closed afterwards, even if the feeling lags behind for a while.',
      'The most expensive mistake here is paying with suffering. People who cannot or will not make amends punish themselves instead, and nobody gets anything out of that. Someone you owe something to gets nothing from your bad nights. They would get something from a phone call, a sentence, an amount of money.',
      'So the measure is not your feeling but the account: once your part is done, the matter is settled, even if it feels otherwise for weeks. And if there is nobody left who could receive anything — because the person has died or it happened thirty years ago — then it is not guilt any more but grief. Grief does not want to be settled, it wants to be lived through.',
    ],
    signs: [
      'You apologise for things you are not responsible for.',
      'When others are struggling, you look for your share in it first.',
      'Accepting something good is hard — it feels undeserved.',
    ],
    trap:
      'Guilt feels moral and is actually comfortable: as long as you accuse yourself, you do not have to make anything good. Self-punishment takes the place of action.',
    steps: [
      'Turn the guilt into an account: who are you owing what, concretely? Pay, apologise, repair. After that it is done.',
      'Set an end. A date from which the matter has been dealt with. Repeating old accusations after that is not remorse any more, it is habit.',
      'Ask with every accusation: would a court see it that way? Usually a small part is left over — and that part you can work with.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The account',
        duration: '15 minutes, once per case',
        minutes: 15,
        body:
          'Three columns on a sheet of paper: what happened. What my share in it actually was. What would make it good. The third column needs a concrete action with a date — or the word “nothing”. Then carry the action out or throw the sheet away. Neither case should be left open.',
      },
      {
        kind: 'action',
        name: 'Thank you, nothing after it',
        duration: 'once a day',
        body:
          'Accept something today — a compliment, some help, a present — and say only “thank you”. No “you really should not have”, no offer in return, no explanation of why you do not deserve it. The sentence takes two seconds. How much it costs you, you notice while saying it.',
      },
      {
        kind: 'sitting',
        name: 'Heard, adjourned',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Sit and wait for the first accusation — it will come. Listen to it once, all the way through, without defending yourself, then say three words inwardly: heard, considered, adjourned. Then back to the breath, and the same three words next time. The inner prosecutor does not get quieter through argument, but through nobody listening any more.',
      },
    ],
    mantra: 'I will make it good — and then I will leave it behind.',
  },
  apathy: {
    name: 'Apathy',
    emotion: 'Despair',
    worldview: 'hopeless',
    essence:
      'Nothing is worth it, everything is too much. The world is not hostile, it has become a matter of indifference to you. Help reaches you, but it changes nothing.',
    advice: [
      'Do not wait until you feel like it — on this level the motivation does not come first. Make the first step so small that it feels almost too small, and arrange it with someone: other people’s energy carries where your own is missing. And if this has been going on for weeks, it is not a question of character but one for a doctor.',
      'The mistake is almost always the size of the plan. When you feel nothing, you compensate by planning the big new start — new routine, everything different, from Monday — and the plan itself then becomes proof that it cannot be done. Take something you can manage on a bad day instead: once round the block, a window opened, a message to one person. And treat sentences like “it will not help anyway” as part of the state, not as information about the future.',
      'Do not measure the week by your mood but by three things: did your body move, was there daylight, was there a person? If anger or sadness come back, that is not a relapse — on this scale, grief and anger are above apathy. It starts to feel worse and to go better.',
    ],
    signs: [
      'Tasks pile up because even small steps look impossibly large.',
      'You often say “never mind” and mean it.',
      'Others worry about you, and you barely feel anything about it.',
    ],
    trap:
      'Apathy is an energy-saving mode that keeps itself going: try nothing and you fail at nothing — but nothing proves you wrong either.',
    steps: [
      'Shrink the first step until it looks ridiculous: a glass of water, one line, two minutes outside the door. Movement comes before motivation, not the other way round.',
      'Use other people’s energy and arrange to meet. What is impossible alone often works with someone else.',
      'Lasting apathy is also a medical matter. It is a good reason to get help, not a sign of weakness.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What used to matter to me',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down ten things that used to matter to you: music, a person, a place, a piece of work. Not in order to take them up again — only to name them. Apathy claims there was never anything. The list shows you otherwise, without you having to start anything.',
      },
      {
        kind: 'action',
        name: 'Two minutes, then stop',
        duration: '2 minutes, twice a day',
        minutes: 2,
        body:
          'Find the smallest visible thing in the room — a plate, three steps outside the door, one line. Set two minutes, start, and stop when the timer rings, even if you could carry on. Stopping is part of it: it keeps the exercise small enough to repeat tomorrow.',
      },
      {
        kind: 'sitting',
        name: 'Five things in the room',
        duration: '3 minutes, twice a day',
        minutes: 3,
        body:
          'Not meditation, just counting: five things you can see, four you can hear, three you can feel, two you can smell, one you can taste. If you get stuck, start again. This is the smallest possible contact with the world — and it needs no motivation.',
      },
    ],
    mantra: 'I do not have to feel it. I will start anyway.',
  },
  grief: {
    name: 'Grief',
    emotion: 'Regret',
    worldview: 'tragic',
    essence:
      'The loss has a name, and that is already movement: grief has energy where apathy had none. Your eyes are on what is missing rather than on what is there.',
    advice: [
      'Do not hurry. On this scale, grief is a step up, and cutting it short does not get you anywhere. Give it a fixed place every day so that it does not need the whole day. And do something for another person once a day — not as consolation, but because it is the fastest way to turn your eyes outward again.',
      'The mistake on this level is called functioning. Grief that gets no room does not disappear. It comes back later and harder to recognise: as exhaustion, as irritability, as a body that always has something wrong with it. And it comes in waves, not in a straight line: a smell, a date, a song, and you are back on day one. That is not a step backwards, that is normal.',
      'So the measure is not whether the waves get smaller but how quickly you resurface afterwards. If weeks pass and nothing moves at all, or if nothing gets through to you any more, not even good things, then get support. And tell the people around you what you need. Otherwise they will guess, and they usually guess wrong.',
    ],
    signs: [
      'A lot reminds you of before — and before was better.',
      'Tears come easily, sometimes for no clear reason.',
      'Starting something new feels like a betrayal of what you lost.',
    ],
    trap:
      'Grief can become the thread that keeps the connection alive. Then letting go turns into the fear of losing the other a second time.',
    steps: [
      'Give the grief a time and a place — twenty minutes a day in which it is allowed to be there. What has a fixed place floods everything else less often.',
      'List what is left: people, abilities, memories. Not as consolation, but as an inventory.',
      'Do something for someone else. Grief turns your eyes inward; a helping hand turns them outward.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unsent letter',
        duration: '30 minutes, once',
        minutes: 30,
        body:
          'Write a letter to what is missing — to a person, or to a life that never happened. Everything is allowed in it: the thanks, the reproach, the unfinished business. At the end, one sentence about what you will keep. The letter is not sent and not thrown away. It is put aside.',
      },
      {
        kind: 'action',
        name: 'A hand for someone',
        duration: 'once a week',
        body:
          'Find one small thing to do for another person: carry something, cook something, make one call. It does not have to mean anything or replace anyone. No thought helps against the inward gaze — only half an hour in which your hands are doing something else.',
      },
      {
        kind: 'sitting',
        name: 'The appointment',
        duration: '20 minutes daily, at a fixed time',
        minutes: 20,
        body:
          'Give the grief an appointment: every day at the same time, in the same chair. Everything is allowed there — photographs, tears, letters. If it comes outside that time, write the thought on a slip of paper and put it on the chair for tomorrow. Not to make it smaller, but so that it has one room instead of the whole flat.',
      },
    ],
    mantra: 'I have lost. I am not lost.',
  },
  fear: {
    name: 'Fear',
    emotion: 'Worry',
    worldview: 'threatening',
    essence:
      'Everything could go wrong somewhere, and your mind has already played it all through. Fear does protect you — until it starts running your life.',
    advice: [
      'Do not argue with fear, it wins every argument. Start with the body: breathe out slowly, longer than you breathe in. Then write the worst case through to the end, including the question of what you would do then. And walk into something uncomfortable on purpose once this week — fear only shrinks around things you have actually done.',
      'What keeps fear alive is not the thinking but the avoiding, and avoiding is rarely dramatic: a cancellation, a call that slips to tomorrow, a question you ask three times to be safe. Every time, relief follows immediately, and every time the fear grows a little. So check with every piece of caution whether anything follows from it: real danger leads to something you do. Fear leads to something you leave undone.',
      'Expect it to get worse first. When you approach something you have avoided for a long time, the fear rises. It only falls if you stay, usually after twenty minutes and not after two. So the measure is not how calm you are, but how short the list of things gets that you walk around. If you have panic attacks, or if fear runs your day, there are effective treatments for it.',
    ],
    signs: [
      'You plan through disasters that almost never happen.',
      'You put decisions off because every option carries a risk.',
      'You say yes to avoid conflict, not because you want to.',
    ],
    trap:
      'Avoiding helps immediately and makes the fear bigger in the long run: every avoidance confirms to your nervous system that the danger was real.',
    steps: [
      'Write the fear through to the end: what exactly happens in the worst case — and what do you do then? A plan turns panic into a problem.',
      'Find one small, chosen discomfort every week. Courage only grows around things you have actually done.',
      'Calm the body first: breathe out slowly, longer than you breathe in. The mind follows the breath, not the argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'And then?',
        duration: '10 minutes, whenever a fear circles',
        minutes: 10,
        body:
          'Write the fear down as one sentence. Then ask “and then?” and answer it. Then “and then?” again. Carry on until you reach a point where you are acting again. Fear usually stops at the frightening image; on paper you get past it.',
      },
      {
        kind: 'action',
        name: 'The chosen discomfort',
        duration: 'once a week',
        body:
          'At the start of the week, pick one small thing you have been dodging — a call, a question, an objection — and get it done before the week is out. Small enough to be sure it works, large enough that you feel uneasy just before. Courage only grows around things actually done.',
      },
      {
        kind: 'sitting',
        name: 'Out longer than in',
        duration: '6 minutes, when it closes in',
        minutes: 6,
        body:
          'Breathe in for four counts, out for six, with no pause in between. Nothing else — no calming yourself down, no talking yourself round. The long out-breath is the only switch on fear you can operate deliberately. The mind follows the breath, and the arguments come last.',
      },
    ],
    mantra: 'I go anyway, even with shaking knees.',
  },
  desire: {
    name: 'Desire',
    emotion: 'Craving',
    worldview: 'disappointing',
    essence:
      'Something is always missing, and the next thing is supposed to fix it. Desire moves a great deal — it is behind most careers — and it never arrives.',
    advice: [
      'You do not have to stop wanting things. Desire is behind most of the good things in your life. What is missing is the pause in between. Put twenty-four hours between impulse and purchase, between idea and commitment, and see what survives that. What still pulls afterwards was real. The rest was restlessness.',
      'What matters is not the object but the feeling it promises. So ask about whatever is pulling at you: what would I be free of if I had it? The answer is rarely “shoes” and usually calm, recognition or security — and all three are cheaper to get directly. Whatever you buy after that, you at least buy with your eyes open.',
      'The goal on this level is not going without, it is finishing: fewer things started, more things completed. A second sign is silence — if you need nothing to get through the next ten minutes, you have come a good way. And if those twenty-four hours are regularly impossible, this is no longer about desire but about a dependency. That is not something to sort out alone.',
    ],
    signs: [
      'Reaching a goal feels good briefly, and then the next one is already there.',
      'You reach for a distraction as soon as it gets quiet: phone, shopping, food, another episode.',
      'You measure what others have against what you are missing.',
    ],
    trap:
      'Desire confuses wanting with needing. Fulfilment is always one purchase away — and therefore never here.',
    steps: [
      'Put a deadline of 24 hours between impulse and action. What still pulls afterwards was real.',
      'Ask with every “I want”: which feeling am I expecting from it? Usually that feeling is available another way too.',
      'Practise enough: one week without buying anything new. Note down what you already own without noticing it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Which feeling am I buying?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down the last five things you bought, ate or started when you were not feeling well. Next to them, two columns: which feeling you promised yourself, and which one actually came. The second column usually stays empty, and that is the result of the exercise.',
      },
      {
        kind: 'action',
        name: 'The ten-minute curve',
        duration: '10 minutes, at every impulse',
        minutes: 10,
        body:
          'When the impulse comes — phone, shopping, food — set ten minutes and do nothing about it. Not “never”, just “not now”. Note from 0 to 10 how strong it was at the start and how strong at the end. After a week you have your own curve and know what desire does on its own.',
      },
      {
        kind: 'sitting',
        name: 'The wave',
        duration: '8 minutes, when it pulls',
        minutes: 8,
        body:
          'Sit down when the impulse comes, and do nothing. Look for the desire in your body: chest, stomach, hands. Name what you find — tightness, tingling, pressure — and stay with it. It rises, it holds, it falls. You do not have to do anything about it, just watch long enough to notice that it passes by itself.',
      },
    ],
    mantra: 'I am allowed to want without being driven.',
  },
  anger: {
    name: 'Anger',
    emotion: 'Hate',
    worldview: 'hostile',
    essence:
      'Strength at last — and it burns. Anger appears where desire meets resistance. It can end bad situations or end relationships, depending on whether it is given a direction.',
    advice: [
      'Do not speak while it is burning. Anger tells you that a boundary or a value has been crossed. It does not tell you what to do now. Get it out of your system physically first — stairs, running, weights — and then formulate a request instead of an accusation. Anger that leads to no action turns into resentment, and that lasts for years.',
      'There are two mistakes here, and they look like opposites: letting it out and swallowing it down. Both leave out the same sentence, the one that says what you want. Venting, by the way, discharges nothing; it is more like practice. And look at what is underneath the anger: it is usually the second feeling, the first was fear, hurt or helplessness. If you only show the second one, you never get what it was actually about.',
      'The measure is not how rarely you get angry, but how quickly the heat turns into a sentence — ideally the same day, addressed to a particular person and with a deadline. If the anger is aimed at something nobody can change, it really belongs to grief, further down. And if people around you start being careful, or if things get broken, get help — before the next time, not after it.',
    ],
    signs: [
      'You get irritated faster than you would like, especially about small things.',
      'You hold arguments in your head that never took place.',
      'You are right — and it helps nobody.',
    ],
    trap:
      'Anger feels strong but it is a reaction: as long as it burns, someone else decides what you feel.',
    steps: [
      'Look underneath the anger for what was hurt: a boundary, a value, a need. Anger points somewhere, it is not an answer.',
      'Get it out of your system physically before you speak — running, weights, stairs. Then formulate a request instead of an accusation.',
      'Draw a clear boundary instead of going on resenting. Resentment is anger that was never allowed to lead to an action.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence without you',
        duration: 'after every flare-up',
        body:
          'The body first: twenty squats, the stairs, once round the block. Then write a single sentence about what you wanted and did not get — one in which the word “you” does not appear. Only that sentence gets said out loud. The accusation stays on the paper.',
      },
      {
        kind: 'action',
        name: 'The request',
        duration: 'once, as soon as you can',
        body:
          'Tell the person it concerns, in one sentence, what you need — not what they did wrong. No “always”, no “never”, no history. An accusation is met with a defence. A request is something someone can actually respond to.',
      },
      {
        kind: 'sitting',
        name: 'Going to the heat',
        duration: '7 minutes, after a flare-up',
        minutes: 7,
        body:
          'Sit and look for the anger in your body instead of breathing it away: jaw, neck, chest, hands. Take your attention to the hottest place and stay there. Do not express it, do not swallow it — both make it bigger. If you simply watch it, it lets go on its own after a few minutes.',
      },
    ],
    mantra: 'My anger shows me what matters to me.',
  },
  pride: {
    name: 'Pride',
    emotion: 'Contempt',
    worldview: 'demanding',
    essence:
      'You are noticeably better off than further down: pride gives you footing, achievement and belonging. But it depends on conditions — status, role, being right — and those can break away.',
    advice: [
      'Do not read this level as a reproach. Pride has brought you here and carries further than anything below it. It only gets expensive at the moment when you would have to learn something. The simplest test is a daily one: admit out loud, once, that you do not know something. If that is hard, you have found what holds you here.',
      'What makes pride expensive is that opinion and person become one thing: if you identify with your position, every correction feels like an attack, and you defend it longer than you believe it. The price is hard to notice — you are the last to hear news about yourself, because the people around you have given up telling you. Then there is comparison: pride needs someone below you, which makes you dependent on other people.',
      'So do not count your successes, count two sentences a week: “you were right” and “I do not know”. The first time costs something, after that it gets easy — and what you get in return are people who tell you things again. Also go somewhere regularly where you are the least able person in the room: a beginners’ course, a foreign language, a sport you are bad at. That is the way up, not the stage.',
    ],
    signs: [
      'Criticism hits you hard, even when it is factually correct.',
      'Asking for help is harder for you than doing the thing alone in twice the time.',
      'You compare yourself often — and quietly note where you are better.',
    ],
    trap:
      'Pride has to be defended. Because it ties your self-image to your successes, every mistake becomes a threat — and learning becomes expensive.',
    steps: [
      'Admit once a day that you do not know something. Out loud, in front of others.',
      'Separate position and person: you can drop an opinion without losing yourself.',
      'Ask for real help this week — not as a test, but because you need it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What would be left',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Describe yourself on half a page without a single word about your job, your abilities, your possessions, your role or your achievements. What is left is what no setback can take from you. If the page stays almost empty, you have the result of the exercise in black and white.',
      },
      {
        kind: 'action',
        name: 'The expensive sentence',
        duration: 'once a day',
        body:
          'Say out loud once a day, somewhere it costs you something: “I do not know about that” or “you were right”. In the evening, note what actually happened afterwards. Almost always: nothing. That nothing is the content of the exercise.',
      },
      {
        kind: 'sitting',
        name: 'Achieving nothing',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Sit for ten minutes and become nothing in the process: not calmer, not better, not further on. Every time the thought comes that “this is pointless” or “other people are better at this”, you have caught pride at work. That noticing is the exercise, not the silence.',
      },
    ],
    mantra: 'I do not have to be right to be all right.',
  },
  courage: {
    name: 'Courage',
    emotion: 'Affirmation',
    worldview: 'workable',
    essence:
      'The threshold. From here you put more strength into the world than it costs you. The problems have not gone away, but they have become tasks, and you trust yourself to take them on.',
    advice: [
      'You are above the threshold. The danger now is not falling back but overloading: courage that takes on everything and lets nothing go burns out. So hold two things side by side — one uncomfortable thing a week, chosen deliberately, and with every annoyance the question of whether there is really something to fight here or whether it is enough to take the situation as it is.',
      'The mistake here is quantity. Courage feels like a strength that never runs out, and because things really do move above the threshold, it is easy to take on everything at once. So with each thing, work out whether it is in your hands or not. The first costs effort, the second costs strength and changes nothing. And count sleep and recovery as part of the work, not as a reward.',
      'The measure is not how much you take on, but whether you also let something go this month. And do not expect the fear to disappear: on this level it stays, it just does not decide any more. Waiting until it feels safe is waiting for nothing — the good feeling comes after the action, not before it.',
    ],
    signs: [
      'You say difficult things even though you feel uneasy doing it.',
      'Mistakes no longer cost you your sense of self-worth.',
      'You take responsibility without looking for someone to blame.',
    ],
    trap:
      'Courage can turn into constant strain: take on everything, let nothing go. Anyone who has to push through all the time burns out.',
    steps: [
      'Keep the momentum: one uncomfortable thing a week, chosen deliberately.',
      'Practise letting go in small things — not every resistance has to be overcome. Some things get easier when you stop pulling.',
      'Ask when you are annoyed: do I have to fight here, or is it enough to take the situation as it is?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Fight it or leave it',
        duration: '15 minutes, weekly',
        minutes: 15,
        body:
          'Write down the three things that are costing you the most strength right now. Ask about each one: do I have to fight here, or is it enough to take the situation as it is? Cross one out. On this level, crossing out is the harder exercise, not taking things on.',
      },
      {
        kind: 'action',
        name: 'The one thing in the morning',
        duration: 'once a week',
        body:
          'On Sunday, pick the one thing you have been dodging all week, and do it on Monday in the first hour, before anything else can get in front of it. One, not three. Courage spread across too much turns into rushing.',
      },
      {
        kind: 'sitting',
        name: 'Two minutes at the threshold',
        duration: '2 minutes, before the uncomfortable thing',
        minutes: 2,
        body:
          'Before you do the uncomfortable thing, sit down for two minutes and do nothing about it. No pep talk, no rehearsed sentences — just feel what the moment just before feels like. Then stand up and do it. Courage is not the absence of that feeling, it is standing up afterwards.',
      },
    ],
    mantra: 'I can do this — and if not, I will learn it.',
  },
  neutrality: {
    name: 'Neutrality',
    emotion: 'Trust',
    worldview: 'satisfactory',
    essence:
      'It is fine as it is — and if it is not, you can live with that too. Neutrality is the first genuinely relaxed place on the scale: no having to, no being right, very little drama.',
    advice: [
      'Do not mistake this for the destination. Neutrality is the first genuinely relaxed place on the scale, which is exactly why many people stop here. The way up only goes through commitment. Find something that matters enough to you to be uncomfortable for, and say yes to it before you know whether it is worth it.',
      'Watch the difference between calm and indifference — from the inside they feel the same. Calm means: this matters to me, and I can bear it turning out differently. Indifference means: I have stopped caring so that it cannot hurt any more. The second is comfortable and costs you exactly the involvement that the levels above are made of.',
      'The test for it is a single question: what would you embarrass yourself for? If nothing comes to mind, you are holding the real result of this level. Then take on something you could fail at, and put a date on it — not because failing is good, but because only what can go wrong still concerns you.',
    ],
    signs: [
      'A no from outside no longer knocks you over.',
      'You can change plans without feeling like a loser.',
      'People like coming to you because you do not blow things up.',
    ],
    trap:
      'Calm can tip over into indifference. People who need nothing sometimes stop committing to anything.',
    steps: [
      'Say yes deliberately to something that means effort — neutrality only becomes willingness through commitment.',
      'Find something that matters enough to you to be uncomfortable for.',
      'Bring your calm in actively: take over where others have got stuck.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Three things worth the discomfort',
        duration: '15 minutes, then a weekly check',
        minutes: 15,
        body:
          'Write down three things you would stand up for even if it cost you something. Take on the smallest of them this week. Neutrality is good ground but a poor place to live — this exercise checks whether anything still matters enough to you.',
      },
      {
        kind: 'action',
        name: 'Getting involved once',
        duration: 'once a week',
        body:
          'This week, get involved in something you would normally stay out of: a discussion, a task, an argument between other people. Not to be right, but because you can stay calmer than the people who have got stuck in it.',
      },
      {
        kind: 'sitting',
        name: 'Letting it come and go',
        duration: '12 minutes daily',
        minutes: 12,
        body:
          'Sit and let everything pass by: thoughts, sounds, an itch, plans. Hold on to nothing, push nothing away, comment on nothing. This exercise comes easily on this level — and it is also the test: wherever you do hold on or push away, something other than calm is still sitting there.',
      },
    ],
    mantra: 'I accept it — and I get on with it anyway.',
  },
  willingness: {
    name: 'Willingness',
    emotion: 'Optimism',
    worldview: 'hopeful',
    essence:
      '“It will do” has turned into “I am glad to do it”. Work no longer feels like resistance, learning is a pleasure, and other people notice that they can count on you.',
    advice: [
      'Your yes is your strength and your bill. The question here is no longer whether you take something on, but what you are saving your next yes for. Cancel one commitment this week that you made out of habit, and put that strength into something that stretches you professionally. On this level, exhaustion looks like commitment for a long time.',
      'The mistake is not the yes, it is that it has become automatic. If you are everyone’s reliable one, you are asked first and relieved last. At some point the bill arrives, not as exhaustion but as quiet resentment towards people who never found out what it cost you. So sort it out: plenty of it can be done by others too. What only you can do, nobody else will.',
      'The measure of the week is a single no that held — not explained away and not paid for with something else instead. And check whether your yes still lets you grow: willingness that only works through familiar things is diligence, not progress. The way on leads through the task where you do not know at the start how to do it.',
    ],
    signs: [
      'You volunteer before anyone has to ask.',
      'Setbacks are information to you, not verdicts.',
      'You finish things, including the unspectacular ones.',
    ],
    trap:
      'Willingness says yes easily — including to too much. Without a boundary, helpfulness turns into exhaustion.',
    steps: [
      'Set priorities instead of just agreeing: what are you saying yes to so that a more important yes stays possible?',
      'Take on something that stretches you professionally — willingness grows on demanding tasks.',
      'Practise accepting: let something stay as it is without wanting to improve it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What I said yes to',
        duration: '15 minutes, on Sundays',
        minutes: 15,
        body:
          'Write down what you said yes to this week — everything, including the small things. Mark what you took on out of conviction and what you took on out of habit. Willingness without a boundary leads to exhaustion, and the second list is where it starts.',
      },
      {
        kind: 'action',
        name: 'One yes, one no',
        duration: 'at the start of the week',
        body:
          'On Monday, decide both: one yes to something that stretches you a little, and one no to something you would otherwise have taken on out of habit. Write both down. The no is the harder half — and the one that makes the yes possible in the first place.',
      },
      {
        kind: 'sitting',
        name: 'The honest reading',
        duration: '6 minutes, in the evening',
        minutes: 6,
        body:
          'Sit and go through your body from your feet to your head. Not to relax, but to find out how much strength is still there today. People who like saying yes are the last to notice they are running empty. These six minutes are the only point in the day where the answer does not depend on your mood.',
      },
    ],
    mantra: 'I am in — with all my strength and my eyes open.',
  },
  acceptance: {
    name: 'Acceptance',
    emotion: 'Forgiveness',
    worldview: 'harmonious',
    essence:
      'How you are doing is decided inside you, not by the circumstances. That is where negotiating with reality stops and shaping it begins.',
    advice: [
      'Watch out for the sentence that comes most easily here: “that is just how I am”. Accepting something does not mean it cannot change — acceptance is the ground on which shaping starts, not permission to leave things alone. Take one thing you have been putting up with and check soberly what about it is actually fixed. And forgive one particular person, in writing, even if you never send it.',
      'The most expensive mistake here is confusing accepting with approving. Acceptance only means: I stop arguing with what is the case anyway. It says nothing about whether it is all right, and it commits you to nothing — accepting an injustice does not mean you have to tolerate it. The reverse is also true: what you do not accept, you cannot change, because you are still busy with the fact that it should not be that way.',
      'The sign of this level is strength coming back. Arguing with the facts was expensive, and you only notice how expensive when it stops. Forgiving here is not a feeling but a renunciation: you give up the demand that the past should have turned out differently. You can tell it has worked not from how you think about the person, but from the fact that you think about them less often.',
    ],
    signs: [
      'You ask first what you can contribute, not whose fault it is.',
      'People are allowed to be different without it bothering you.',
      'You can forgive without playing the matter down.',
    ],
    trap:
      'Acceptance can become an excuse: “that is just how I am”. Accepting something is not the same as considering it unchangeable.',
    steps: [
      'Check your assumptions against the facts: what of it is demonstrably true, and what is merely familiar?',
      'Bring order into your thinking — read, calculate, argue. Clarity turns acceptance into reason.',
      'Forgive one particular person, in writing if necessary, even without sending it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'That is just how I am — is it?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down three sentences that start with “I am just …”. Ask about each one: was that also true five years ago? Would someone who knows me well sign it? What would it cost to change it? Accepting something is not the same as considering it unchangeable.',
      },
      {
        kind: 'action',
        name: 'The first step back',
        duration: 'once, when it is due',
        body:
          'Get in touch with someone with whom something was left unresolved. A message is enough, three sentences, without going through the history. You do not have to settle the matter or forgive anything that is not forgiven. It is only about the door being a door again rather than a wall.',
      },
      {
        kind: 'sitting',
        name: 'This is how it is',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Take something you are not happy about right now and sit with it. With every out-breath, say inwardly: this is how it is right now. That is neither agreement nor giving up. It is the end of an argument with a reality that is not impressed by it anyway. What to do next is easier to see afterwards.',
      },
    ],
    mantra: 'I accept what is — and shape what can be shaped.',
  },
  reason: {
    name: 'Reason',
    emotion: 'Understanding',
    worldview: 'meaningful',
    essence:
      'The mind at its best: connections become visible, knowledge falls into order, decisions can be justified. The level of science, of medicine, of good craftsmanship.',
    advice: [
      'On this level your mind is an excellent tool. It just does not know when to stop. Take ten minutes a day to perceive something without interpreting it: music, a face, the weather. And in the next conflict, do not ask who is right, ask what the other person needs. The next step is not a better analysis but a different way of looking.',
      'The mistake on this level is using understanding as a way of putting things off. It feels like progress and costs nothing. You can go on analysing indefinitely while the thing itself stays untouched. The second mistake is subtler: a good mind also finds better reasons for why it is right. The cleverer someone is, the more expensive their errors get, because they can defend them longer.',
      'So make one decision a week before the situation is fully clarified — with a date and without reservations. And do not measure the week by what you understood, but by whether something moved you: a person, a piece of music, a sentence you could not immediately file away. The way on does not lead through the next thought but past it.',
    ],
    signs: [
      'You distinguish cleanly between facts, opinion and feeling.',
      'You put complicated things in order instead of being overwhelmed by them.',
      'You change your mind when the data call for it.',
    ],
    trap:
      'The mind takes itself for the whole. It can explain everything and comfort nobody — and it easily mistakes the model for reality.',
    steps: [
      'Practise perceiving without analysing: ten minutes of music, nature, a face — without interpreting it.',
      'In conflicts, do not ask “who is right?” but “what does this person need?”.',
      'Do something good that gains you nothing and appears in no balance sheet.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The strongest counter-argument',
        duration: '25 minutes, once',
        minutes: 25,
        body:
          'Take a conviction that really matters to you and write down the best version of its opposite — so good that someone who believes it would sign it. No caricature, and no half-sentence of refutation at the end. Where it gets tight while writing, thinking stops and your self-image begins.',
      },
      {
        kind: 'action',
        name: 'What does this person need?',
        duration: 'in the next conflict',
        body:
          'In your next argument, ask yourself once not who is right but what the other person needs right now — and ask the question out loud. The mind can explain everything and comfort nobody. This one sentence is where it admits that.',
      },
      {
        kind: 'sitting',
        name: 'Ten minutes without interpreting',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Ten minutes with something that wants nothing from you: music, a tree, a face. As soon as you start explaining, classifying or judging, notice it and go back to simply perceiving. The exercise is not the calm, it is noticing how quickly the mind starts up.',
      },
    ],
    mantra: 'Understanding is a lot. It is not everything.',
  },
  love: {
    name: 'Love',
    emotion: 'Reverence',
    worldview: 'benign',
    essence:
      'Not the feeling from the songs but an attitude: unconditional, lasting, with nothing expected in return. You see what is essential in people and things instead of looking past it.',
    advice: [
      'The blind spot on this level is you. Goodwill flows outward here in abundance and reaches you least of all — check that honestly before you read on. And let people go their own way, including the uncomfortable one: love that wants to rescue holds on, and holding on is wanting again.',
      'The subtle mistake here is turning helping into a currency. Someone who always gives and never takes keeps everyone else quietly in debt — and keeps themselves out of the relationship, because taking is the more vulnerable half. Check it on something small: when did you last accept something without balancing it out within a week?',
      'The sign of this level is not how much you feel, but how little you depend on other people behaving correctly. Take on something concrete: this week, let someone make a mistake without saving them from it — and stay reachable while they do. That is harder than any help.',
    ],
    signs: [
      'You want good things for others even when there is nothing in it for you.',
      'You decide more from the gut than from calculation — and those decisions hold.',
      'Your simply being there calms people down.',
    ],
    trap:
      'There is attachment here too: to the role of the loving one, to people you want to rescue. Love that holds on becomes wanting again.',
    steps: [
      'Let things happen: people are allowed to go their own way, including the uncomfortable one.',
      'Practise gratitude for concrete things, daily, without needing an occasion.',
      'Include yourself in your goodwill — that is the most common blind spot on this level.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Thanks that arrive',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Write down for one person what they have done for you — concretely, with dates, without general sentences about how good they are. Then send it. The quiet part of this level comes easily. It only gets uncomfortable when someone finds out what they mean to you.',
      },
      {
        kind: 'action',
        name: 'Not rescuing, once',
        duration: 'when the moment comes',
        body:
          'Let one person take the path you would otherwise have talked them out of — the uncomfortable one, the one you think is wrong. Being there: yes. Stepping in: no. Love that holds on is wanting again, and the difference shows exactly here.',
      },
      {
        kind: 'sitting',
        name: 'The silent good wish',
        duration: '2 minutes daily',
        minutes: 2,
        body:
          'Think of a person and wish them something concrete and good — without them finding out and without doing anything about it. On the first day someone close, on the second a stranger, on the third someone difficult. On the seventh, yourself. The seventh day is the one most often skipped.',
      },
    ],
    mantra: 'I want the best for you, with no conditions.',
  },
  joy: {
    name: 'Joy',
    emotion: 'Serenity',
    worldview: 'complete',
    essence:
      'A joy that does not depend on events. It comes from inside, it is patient and durable — and catching, without being loud.',
    advice: [
      'Do not try to hold on to this. The moment you want to restore this joy, it has turned into desire, and you are twelve levels lower. Let the good states come and go like the weather. And if you want to do something: work quietly, somewhere nobody notices.',
      'This level is usually lost through trying to repeat it: the same seminar again, the same place, the same music, the same substance. A state turns into a possession you have to defend. Telling people about it belongs here too: turning the experience into information about yourself means you have already traded it for pride, and pride is twelve levels lower.',
      'You recognise this level not by the high point but by the Tuesday: how you are when nothing special is happening, how long you can stand in a queue, how you talk to a boring person. And when the joy goes, let it go without calling after it. It comes back like the weather — to whoever is not waiting for it.',
    ],
    signs: [
      'Entirely ordinary moments move you: light, voices, everyday things.',
      'Patience comes easily because you do not have to force anything.',
      'People feel better around you without anything having to happen.',
    ],
    trap:
      'The experience itself can be held on to. Then joy becomes a state you want to restore — and it is desire again.',
    steps: [
      'Let the good states come and go without preserving them.',
      'Help quietly: do something nobody notices.',
      'Spend time in silence — with no programme and no goal.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unnoticed',
        duration: 'evenings, 5 minutes',
        minutes: 5,
        body:
          'Note one moment of the day that was good and that nobody would have noticed: light on a wall, a sentence, the sound of the door. At the end of the week you throw the notes away. What you are practising is the noticing, not the collecting — joy held on to turns back into desire.',
      },
      {
        kind: 'action',
        name: 'Letting one go',
        duration: 'when a moment is good',
        body:
          'When a moment today is good, do not take a photo, do not tell anyone and do not write it down anywhere. Let it pass like any other. Joy held on to becomes a state you want to restore — and with that it is desire again.',
      },
      {
        kind: 'sitting',
        name: 'Looking at one thing for a long time',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Take an ordinary object — a cup, your hand, a leaf — and look at it until it stops being what you take it for. Do not interpret it, do not admire it, do not photograph it. The joy on this level does not come from special things but from how long you look.',
      },
    ],
    mantra: 'Nothing has to happen for it to be good.',
  },
  peace: {
    name: 'Peace',
    emotion: 'Bliss',
    worldview: 'whole',
    essence:
      'The border between you and what you perceive becomes permeable. Everything moves, nothing presses. Very rare — Hawkins estimates one person in ten million.',
    advice: [
      'Stay in everyday life. At this height, withdrawing is tempting and usually a loss: peace that is no use to anyone loses its ground. And keep up the practice that brought you here. There is no state you own, and none that survives without practice.',
      'Withdrawal disguises itself well up here: it looks like maturity and is often just more comfortable. A second pull is the role of the teacher — people ask you when you are here, and it is tempting to answer sooner than you understand. So hold on to ordinary obligations: bills, appointments, people who know nothing about levels. A peace that cannot survive a working day is not one.',
      'And keep someone close to you who is free to contradict you at no cost — up here it is contradiction that is missing most. The measure is unspectacular: can people still reach you in an argument? Can you hear criticism without explaining it away? Do you sit down to practise in the morning even when it does not seem necessary?',
    ],
    signs: [
      'Silence feels full, not empty.',
      'Separateness feels less real than connectedness.',
      'Action happens by itself, without an inner driver.',
    ],
    trap:
      'At this height, withdrawing from the world is tempting. Peace that is no use to anyone loses its ground.',
    steps: [
      'Stay in everyday life: peace proves itself in the kitchen, not on the mountain.',
      'Pass on what you can — plainly, without taking the teacher’s pose.',
      'Keep up the practice that brought you here. There is no state you own.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Who did that help?',
        duration: '10 minutes, weekly',
        minutes: 10,
        body:
          'Write down who concretely benefited from your calm this past week: who settled down, who was helped, who stayed. If the list stays empty, that says more than any further exercise — then this peace has withdrawn from the world.',
      },
      {
        kind: 'action',
        name: 'The kitchen',
        duration: 'daily, for as long as it takes',
        body:
          'Take an ordinary chore — the washing-up, the stairs, the walk to the bin — and do it fully: no music, no phone, no planning while you do it. When your mind wanders off, come back to your hands. This is where peace proves itself, not on the mountain.',
      },
      {
        kind: 'sitting',
        name: 'The breath that breathes itself',
        duration: '20 minutes daily',
        minutes: 20,
        body:
          'Sit and do nothing with the breath: do not lengthen it, do not count it, do not deepen it. Just notice that breathing is happening without anyone doing it. This is the plainest exercise on the list and the only one that does not get better when you try harder.',
      },
    ],
    mantra: 'Everything is as it is. And that is enough.',
  },
  enlightenment: {
    name: 'Enlightenment',
    emotion: 'Ineffable',
    worldview: 'is',
    essence:
      'The end of the scale (700 to 1000). No self left that experiences anything — only being itself. Hawkins assigns this level to the great teachers in human history.',
    advice: [
      'There is nothing to advise here. If this level comes up as your result, it says something about the scale and the arithmetic behind it, not about you. Hawkins assigns it to the great teachers in human history, and a questionnaire is not a way of getting there. Take it as a direction. Everything practical is on the sixteen levels below.',
      'If this result does come up, it is worth looking soberly at how it came about: the questionnaire measures self-report and nothing else. Consistently agreeing answers produce consistently high values. That can mean you really are doing well, and it can mean you answered as the person you would like to be. Both are human, and neither is a reproach.',
      'It gets practical one level down. Go through the scale and look for the level you land on during a bad day — not the one you are on during a good one. The first says more about your everyday life. And ask someone who has known you a long time where they would place you. That answer is more uncomfortable than any result, and it is the only one you can work with.',
    ],
    signs: [
      'This level does not describe itself from the inside.',
      'People who claim it are usually speaking out of pride.',
      'What remains of it are the people who were touched by it.',
    ],
    trap:
      'The word itself. Thought of as a goal, enlightenment becomes the most ambitious desire of all.',
    steps: [
      'There is nothing to do here. The scale ends at this point — the way there is the 16 levels below, lived.',
      'What matters is the direction, not the end: one level up changes a life.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence that is left',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down in one sentence what you are looking for. Then cross out every word that names a goal, a state or a point in time. Read what is left. Usually it is nothing — and that is not a defeat, it is the most honest result at this height.',
      },
      {
        kind: 'action',
        name: 'One level down',
        duration: 'today',
        body:
          'Take on an exercise today from a level you are actually on, and see it through. This level is not a task but a direction: the way there is the sixteen levels below, lived. Starting at 700 is practising desire.',
      },
      {
        kind: 'sitting',
        name: 'Who is asking?',
        duration: 'no fixed time',
        body:
          'When a thought comes up, ask once who it is coming up for — and do not answer. Then let it go. This is the only exercise on the list that is not meant to achieve anything: using it to get somewhere is practising desire.',
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
