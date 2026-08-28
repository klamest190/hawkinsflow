import { LEVELS } from '../data/levels.ts'
import type { Language, Level, LevelId, LevelText } from '../types.ts'

/**
 * Die Texte der 17 Ebenen. Das deutsche Objekt ist die Vorlage: `LevelCopy` wird
 * daraus abgeleitet, und jede weitere Sprache muss deshalb genau dieselben
 * Schlüssel tragen — fehlt eine Ebene, meldet das der Compiler, statt dass im
 * Ergebnis eine leere Karte steht.
 *
 * Die Übersetzung ist keine Wort-für-Wort-Fassung. „Der innere Ankläger" wird im
 * Englischen zum „prosecutor who never rests" — was zählt, ist derselbe Griff,
 * nicht dieselbe Metapher.
 *
 * Jede Ebene trägt drei Übungen, immer in derselben Reihenfolge: eine zum
 * Schreiben, eine zum Tun, eine zum Sitzen (siehe `PracticeKind` in
 * `types.ts`). Die Sorte ist kein Etikett, sondern eine Auflage an den Inhalt —
 * ohne sie wären es überall drei Schreibübungen, weil sich die am leichtesten
 * formulieren lassen. Und wer bei Zorn oder Angst herauskommt, ist mit einem
 * Stift am schlechtesten bedient.
 */
const de = {
  shame: {
    name: 'Scham',
    emotion: 'Demütigung',
    worldview: 'erbärmlich',
    essence:
      'Der Blick geht nach unten. Nicht „ich habe etwas Falsches getan", sondern „ich bin falsch" — der Fehler ist zur Person geworden. Das kostet so viel Kraft, dass für alles andere kaum etwas bleibt.',
    advice:
      'Fang nicht beim Verstehen an. Scham hält sich nicht durch falsche Gedanken, sondern dadurch, dass niemand davon weiß — und sie überlebt selten, dass ein Mensch sie hört und bleibt. Wenn du diese Woche eine einzige Sache tust, dann diese. Alles andere ordnet sich danach leichter.',
    signs: [
      'Du willst nicht gesehen werden und ziehst dich aus Räumen zurück, in denen du auffallen könntest.',
      'Erinnerungen an alte Peinlichkeiten kommen ungefragt und treffen sofort.',
      'Lob fühlt sich unangenehm an, als hätte jemand sich in dir getäuscht.',
    ],
    trap:
      'Die Scham verspricht Schutz: Wer sich klein macht, kann nicht fallen. Der Preis ist, dass niemand dich kennenlernt — auch du selbst nicht.',
    steps: [
      'Trenne Tat und Person. Schreibe auf, was passiert ist, in Sätzen, die ein Beobachter unterschreiben würde. Ohne Urteil über dich.',
      'Erzähle einem einzigen Menschen, dem du traust, etwas, das du bisher verborgen hast. Scham überlebt Zeugen selten.',
      'Sorge für deinen Körper wie für einen Gast: essen, schlafen, duschen, rausgehen. Würde beginnt oft ganz praktisch.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die Beobachterfassung',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreibe den Vorfall, für den du dich schämst, zweimal auf: einmal so, wie du ihn dir selbst erzählst, und einmal so, wie ihn jemand protokollieren würde, der nur gesehen hat, was geschah. Lies beide Fassungen laut. Der Unterschied zwischen ihnen ist die Scham — und der steht jetzt auf Papier statt unsichtbar in dir.',
      },
      {
        kind: 'action',
        name: 'Einmal gesehen werden',
        duration: '5 Minuten, einmal täglich',
        minutes: 5,
        body:
          'Geh an einen Ort, an dem Menschen sind — Bäckerei, Bahnsteig, Park — und bleib fünf Minuten dort, ohne dich hinter dem Handy zu verstecken. Sag einem Menschen einen belanglosen Satz: einen Gruß, einen Dank, eine Frage nach der Uhrzeit. Scham behauptet, man werde durchschaut; fünf Minuten zeigen jedes Mal, dass niemand hinsieht.',
      },
      {
        kind: 'sitting',
        name: 'Die Hand auf dem Brustbein',
        duration: '6 Minuten täglich',
        minutes: 6,
        body:
          'Sitz, leg eine Hand flach auf dein Brustbein und lass sie liegen. Sag innerlich drei Sätze: Das ist gerade schwer. So etwas kennt jeder. Möge ich freundlich mit mir sein. Wenn Widerstand kommt — „das ist albern" —, ist das nicht das Ende der Übung, sondern ihr Gegenstand.',
      },
    ],
    mantra: 'Ich habe Fehler gemacht. Ich bin kein Fehler.',
  },
  guilt: {
    name: 'Schuld',
    emotion: 'Vorwurf',
    worldview: 'strafend',
    essence:
      'Ein innerer Ankläger hat das Wort und spricht nie frei. Vergangenes wird immer wieder verhandelt, und jedes Urteil fällt gegen dich aus.',
    advice:
      'Prüfe zuerst, ob überhaupt jemand etwas von dir zu bekommen hat. Die Antwort ist meist kürzer als der Vorwurf — und was übrig bleibt, ist keine Reue mehr, sondern eine Gewohnheit, die sich moralisch anfühlt. Setz ein Datum, bis zu dem du das Deine tust, und behandle den Fall danach als geschlossen, auch wenn das Gefühl noch hinterherläuft.',
    signs: [
      'Du entschuldigst dich für Dinge, für die du nicht verantwortlich bist.',
      'Geht es anderen schlecht, suchst du zuerst deinen Anteil daran.',
      'Gutes anzunehmen fällt schwer — es fühlt sich unverdient an.',
    ],
    trap:
      'Schuld fühlt sich moralisch an und ist doch bequem: Solange du dich anklagst, musst du nichts wiedergutmachen. Selbstbestrafung ersetzt die Handlung.',
    steps: [
      'Mach aus Schuld eine Rechnung: Wem schuldest du was — konkret? Bezahle, entschuldige dich, repariere. Danach ist es abgeschlossen.',
      'Setze ein Ende. Ein Datum, ab dem der Fall verhandelt ist. Alte Vorwürfe danach zu wiederholen ist keine Reue mehr, sondern Gewohnheit.',
      'Frage bei jedem Vorwurf: Wäre ein Gericht dieser Meinung? Meist bleibt ein Bruchteil übrig — der ist bearbeitbar.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Die Rechnung',
        duration: '15 Minuten, einmal pro Fall',
        minutes: 15,
        body:
          'Drei Spalten auf ein Blatt: Was ist passiert. Was war tatsächlich mein Anteil. Was würde es wiedergutmachen. In die dritte Spalte gehört eine Handlung mit Datum — oder das Wort „nichts". Dann führe die Handlung aus oder wirf das Blatt weg. Offen bleiben darf keiner der beiden Fälle.',
      },
      {
        kind: 'action',
        name: 'Danke, ohne Zusatz',
        duration: 'einmal täglich',
        body:
          'Nimm heute etwas an — ein Lob, eine Hilfe, ein Geschenk — und sag nur „Danke". Kein „Das wäre doch nicht nötig gewesen", kein Gegenangebot, keine Erklärung, warum du es eigentlich nicht verdienst. Der Satz ist in zwei Sekunden gesagt; was er kostet, merkst du erst dabei.',
      },
      {
        kind: 'sitting',
        name: 'Gehört, vertagt',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Sitz und warte, bis der erste Vorwurf kommt — er kommt. Hör ihn einmal ganz an, ohne ihn zu widerlegen, und sag dann innerlich drei Worte: gehört, verhandelt, vertagt. Dann zurück zum Atem, beim nächsten Mal dieselben drei Worte. Der Ankläger verliert seine Kraft nicht durch Gegenrede, sondern dadurch, dass er vor leerem Saal spricht.',
      },
    ],
    mantra: 'Ich mache es wieder gut — und dann lasse ich es hinter mir.',
  },
  apathy: {
    name: 'Apathie',
    emotion: 'Verzweiflung',
    worldview: 'hoffnungslos',
    essence:
      'Nichts lohnt sich, alles ist zu schwer. Die Welt ist nicht feindlich, sie ist gleichgültig — und du bist es auch geworden. Hilfe kommt an, aber sie erreicht nichts.',
    advice:
      'Warte nicht, bis du Lust hast — hier kommt sie nicht zuerst. Mach den ersten Schritt so klein, dass er sich zu klein anfühlt, und verabrede ihn mit jemandem: Fremde Energie trägt, wo eigene fehlt. Und wenn das seit Wochen so geht, ist es kein Charakterthema, sondern eines für eine Ärztin oder einen Arzt.',
    signs: [
      'Aufgaben stapeln sich, weil selbst kleine Schritte unmöglich groß wirken.',
      'Du sagst häufig „egal" und meinst es.',
      'Andere sorgen sich um dich, du selbst empfindest kaum etwas dabei.',
    ],
    trap:
      'Apathie ist ein Energiesparmodus, der sich selbst erhält: Wer nichts versucht, erlebt kein Scheitern — und auch kein Gelingen, das ihn widerlegt.',
    steps: [
      'Verkleinere den ersten Schritt, bis er lächerlich wirkt: ein Glas Wasser, eine Zeile, zwei Minuten vor die Tür. Bewegung geht der Motivation voraus, nicht umgekehrt.',
      'Nutze fremde Energie — verabrede dich. Was allein unmöglich ist, geht zu zweit oft doch.',
      'Anhaltende Apathie ist auch ein medizinisches Thema. Sie ist ein guter Grund, Hilfe zu holen, kein Zeichen von Schwäche.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was mir früher etwas bedeutet hat',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib zehn Dinge auf, die dir früher etwas bedeutet haben: Musik, ein Mensch, ein Ort, eine Arbeit. Nicht, um sie wieder aufzunehmen — nur, um sie zu benennen. Apathie behauptet, es habe nie etwas gegeben; die Liste widerspricht ihr, ohne dass du dafür irgendetwas anfangen musst.',
      },
      {
        kind: 'action',
        name: 'Zwei Minuten, dann Schluss',
        duration: '2 Minuten, zweimal täglich',
        minutes: 2,
        body:
          'Such dir die kleinste sichtbare Sache im Raum — ein Teller, drei Schritte vor die Tür, eine Zeile. Stell zwei Minuten, fang an, und hör auf, wenn es klingelt, auch wenn du weitermachen könntest. Das Aufhören gehört dazu: Es hält die Übung billig genug, um sie morgen zu wiederholen.',
      },
      {
        kind: 'sitting',
        name: 'Fünf Dinge im Raum',
        duration: '3 Minuten, zweimal täglich',
        minutes: 3,
        body:
          'Nicht meditieren, nur zählen: fünf Dinge, die du siehst, vier, die du hörst, drei, die du spürst, zwei, die du riechst, eins, das du schmeckst. Kommst du nicht weiter, fang von vorn an. Für einen Zustand, den nichts erreicht, ist das die kleinstmögliche Berührung mit der Welt — und sie verlangt keine Motivation.',
      },
    ],
    mantra: 'Ich muss es nicht fühlen. Ich fange trotzdem an.',
  },
  grief: {
    name: 'Trauer',
    emotion: 'Bedauern',
    worldview: 'tragisch',
    essence:
      'Der Verlust hat einen Namen, und das ist bereits Bewegung: Trauer hat Energie, wo Apathie keine hatte. Der Blick hängt an dem, was fehlt, statt an dem, was da ist.',
    advice:
      'Beeil dich nicht. Trauer ist auf dieser Skala ein Aufstieg — sie hat Kraft, wo vorher keine war —, und sie abzukürzen bringt niemanden weiter. Gib ihr täglich einen festen Platz, damit sie nicht den ganzen Tag braucht. Und tu einmal am Tag etwas für einen anderen Menschen: nicht als Trost, sondern weil das der schnellste Weg ist, den Blick wieder nach außen zu bekommen.',
    signs: [
      'Vieles erinnert dich an früher — und früher war besser.',
      'Tränen kommen leicht, manchmal ohne klaren Anlass.',
      'Neues zu beginnen fühlt sich wie Verrat am Verlorenen an.',
    ],
    trap:
      'Trauer kann zum Band werden, das die Verbindung aufrechterhält. Dann wird das Loslassen zur Angst, den anderen ein zweites Mal zu verlieren.',
    steps: [
      'Gib der Trauer Zeit und Ort — täglich zwanzig Minuten, in denen sie da sein darf. Was einen Raum hat, überschwemmt seltener alles.',
      'Zähle, was geblieben ist: Menschen, Fähigkeiten, Erinnerungen. Nicht als Trost, sondern als Bestandsaufnahme.',
      'Tu etwas für jemand anderen. Trauer schaut nach innen; eine Hand, die hilft, dreht den Blick nach außen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der ungesendete Brief',
        duration: '30 Minuten, einmal',
        minutes: 30,
        body:
          'Schreib einen Brief an das, was fehlt — an einen Menschen oder an ein Leben, das nicht stattgefunden hat. Alles darf hinein: der Dank, der Vorwurf, das Unerledigte. Zum Schluss ein Satz darüber, was du behalten wirst. Der Brief wird nicht abgeschickt und nicht weggeworfen; er wird weggelegt.',
      },
      {
        kind: 'action',
        name: 'Eine Hand für jemanden',
        duration: 'einmal pro Woche',
        body:
          'Such dir eine kleine Sache für einen anderen Menschen: etwas tragen, etwas kochen, einmal anrufen. Sie muss nichts bedeuten und niemanden ersetzen. Trauer schaut nach innen, und dagegen hilft kein Gedanke — nur eine Hand, die eine halbe Stunde lang etwas anderes tut.',
      },
      {
        kind: 'sitting',
        name: 'Die verabredete Stunde',
        duration: '20 Minuten täglich, feste Zeit',
        minutes: 20,
        body:
          'Gib der Trauer einen Termin: jeden Tag zur selben Zeit, auf demselben Stuhl. Dort ist alles erlaubt — Fotos, Tränen, Briefe. Kommt sie außerhalb, schreib den Gedanken auf einen Zettel und leg ihn auf den Stuhl für morgen. Nicht um sie kleiner zu machen, sondern damit sie ein Zimmer hat statt der ganzen Wohnung.',
      },
    ],
    mantra: 'Ich habe verloren. Ich bin nicht verloren.',
  },
  fear: {
    name: 'Angst',
    emotion: 'Sorge',
    worldview: 'bedrohlich',
    essence:
      'Die Welt ist voller Möglichkeiten, schiefzugehen, und dein Kopf hat sie alle durchgespielt. Angst schützt tatsächlich — bis sie beginnt, das Leben zu verwalten.',
    advice:
      'Diskutiere nicht mit der Angst — sie gewinnt jedes Argument, weil sie nie eines gebraucht hat. Nimm zuerst den Körper: langsam ausatmen, länger als ein. Dann schreib den schlimmsten Fall zu Ende, samt der Frage, was du dann tust. Und geh einmal in dieser Woche freiwillig in etwas Unbequemes hinein — Angst schrumpft nur an Dingen, die man tatsächlich getan hat.',
    signs: [
      'Du planst Katastrophen durch, die zu 95 % nicht eintreten.',
      'Entscheidungen werden aufgeschoben, weil jede Option ein Risiko trägt.',
      'Du sagst Ja, um Konflikte zu vermeiden, nicht weil du willst.',
    ],
    trap:
      'Vermeidung wirkt sofort und macht die Angst langfristig größer: Jedes Ausweichen bestätigt dem Nervensystem, dass die Gefahr echt war.',
    steps: [
      'Schreibe die Angst zu Ende: Was genau passiert im schlimmsten Fall — und was tust du dann? Ein Plan macht aus Panik ein Problem.',
      'Suche dir wöchentlich eine kleine, freiwillige Unbequemlichkeit. Mut wächst nur an Dingen, die man tatsächlich getan hat.',
      'Beruhige zuerst den Körper: langsam ausatmen, länger als einatmen. Der Kopf folgt dem Atem, nicht dem Argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Und dann?',
        duration: '10 Minuten, wenn eine Angst kreist',
        minutes: 10,
        body:
          'Schreib die Angst als einen Satz auf. Dann frag „und dann?" und beantworte es. Wieder „und dann?". Mach weiter, bis du an einem Punkt ankommst, an dem du wieder handelst. Die Angst hört meist beim Bild auf; der Stift geht darüber hinaus.',
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
          'Vier Zählzeiten einatmen, sechs ausatmen, ohne Pause dazwischen. Nichts weiter — kein Beruhigen, kein Zureden. Das lange Ausatmen ist der einzige Schalter an der Angst, den man von außen bedienen kann: Der Kopf folgt dem Atem, und das Argument folgt zuletzt.',
      },
    ],
    mantra: 'Ich gehe hin, auch mit weichen Knien.',
  },
  desire: {
    name: 'Verlangen',
    emotion: 'Gier',
    worldview: 'enttäuschend',
    essence:
      'Etwas fehlt immer, und das Nächste soll es richten. Verlangen bewegt viel — es ist der Motor der meisten Karrieren — und kommt nie an.',
    advice:
      'Du musst nicht aufhören zu wollen; Verlangen ist der Motor unter den meisten guten Dingen deines Lebens. Was fehlt, ist die Pause dazwischen. Leg zwischen Impuls und Kauf, zwischen Idee und Zusage vierundzwanzig Stunden — und schau, was das übersteht. Was danach noch zieht, war echt; der Rest war die Unruhe und nicht der Wunsch.',
    signs: [
      'Erreichte Ziele fühlen sich kurz gut an, dann steht das nächste im Raum.',
      'Du greifst zu Ablenkung, sobald es still wird: Handy, Kaufen, Essen, Serien.',
      'Was andere haben, misst du an dem, was dir fehlt.',
    ],
    trap:
      'Das Verlangen verwechselt Wollen mit Brauchen. Erfüllung ist immer eine Anschaffung entfernt — deshalb nie hier.',
    steps: [
      'Lege zwischen Impuls und Handlung eine Frist: 24 Stunden. Was danach noch zieht, war echt.',
      'Frage bei jedem „Ich will": Welches Gefühl erwarte ich davon? Meist ist das Gefühl auch anders zu haben.',
      'Übe Genug: eine Woche ohne Neuanschaffung, und notiere, was du in der Zeit schon besessen hast, ohne es zu bemerken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Welches Gefühl kaufe ich?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib die letzten fünf Dinge auf, die du gekauft, gegessen oder angefangen hast, als es dir nicht gut ging. Daneben zwei Spalten: welches Gefühl du dir davon versprochen hast und welches tatsächlich kam. Die zweite Spalte bleibt meistens leer — und genau diese Leere ist der Befund.',
      },
      {
        kind: 'action',
        name: 'Die Zehn-Minuten-Kurve',
        duration: '10 Minuten, bei jedem Impuls',
        minutes: 10,
        body:
          'Wenn der Griff kommt — Handy, Kaufen, Essen —, stell zehn Minuten und tu nichts dagegen. Nicht „nie", nur „nicht jetzt". Notiere von 0 bis 10, wie stark es am Anfang war und wie stark am Ende. Nach einer Woche hast du deine eigene Kurve und weißt, was das Verlangen von allein tut.',
      },
      {
        kind: 'sitting',
        name: 'Die Welle',
        duration: '8 Minuten, wenn es zieht',
        minutes: 8,
        body:
          'Setz dich hin, wenn der Griff kommt, und tu nichts. Such das Verlangen im Körper: Brust, Magen, Hände. Benenne, was du findest — Enge, Kribbeln, Druck — und bleib dabei. Es steigt, es hält, es fällt. Du musst nichts dagegen tun, nur lange genug zusehen, um zu merken, dass es von allein geht.',
      },
    ],
    mantra: 'Ich darf wollen, ohne getrieben zu sein.',
  },
  anger: {
    name: 'Zorn',
    emotion: 'Hass',
    worldview: 'feindselig',
    essence:
      'Endlich Kraft — und sie brennt. Zorn entsteht, wo Verlangen auf Widerstand trifft. Er kann Missstände beenden oder Brücken; das entscheidet sich daran, ob er gerichtet ist.',
    advice:
      'Sprich nicht, solange es brennt. Zorn ist ein Zeiger und keine Aussage: Er zeigt, dass eine Grenze oder ein Wert getroffen wurde, und sagt nichts darüber, was jetzt zu tun ist. Bring ihn zuerst körperlich aus dem System — Treppen, Laufen, Gewichte —, und formuliere danach eine Bitte statt eines Vorwurfs. Was zu keiner Handlung findet, wird Groll, und der hält Jahre.',
    signs: [
      'Du reagierst schneller gereizt, als dir lieb ist, besonders auf Kleinigkeiten.',
      'Gedanklich führst du Streitgespräche, die noch gar nicht stattgefunden haben.',
      'Du hast recht — und es hilft niemandem.',
    ],
    trap:
      'Zorn fühlt sich stark an und ist doch reaktiv: Solange er brennt, bestimmt der andere, was du fühlst.',
    steps: [
      'Suche unter dem Zorn nach dem, was verletzt wurde: Grenze, Wert, Bedürfnis. Zorn ist ein Zeiger, keine Antwort.',
      'Verbrenne ihn körperlich, bevor du sprichst — laufen, Gewichte, Treppen. Dann formuliere eine Bitte statt eines Vorwurfs.',
      'Ziehe eine klare Grenze, statt weiter zu grollen. Groll ist Zorn, der zu keiner Handlung finden durfte.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz ohne Du',
        duration: 'nach jedem Aufflammen',
        body:
          'Zuerst der Körper: zwanzig Kniebeugen, die Treppe, einmal um den Block. Dann schreib einen einzigen Satz darüber, was du wolltest und nicht bekommen hast — einen, in dem das Wort „du" nicht vorkommt. Nur dieser Satz wird ausgesprochen; der Vorwurf bleibt auf dem Papier.',
      },
      {
        kind: 'action',
        name: 'Die Bitte',
        duration: 'einmal, sobald es geht',
        body:
          'Sag dem Menschen, um den es geht, in einem Satz, was du brauchst — nicht, was er falsch gemacht hat. Ohne „immer", ohne „nie", ohne Vorgeschichte. Ein Vorwurf verlangt eine Verteidigung und bekommt sie auch; eine Bitte ist das Einzige, worauf jemand überhaupt eingehen kann.',
      },
      {
        kind: 'sitting',
        name: 'Die Hitze aufsuchen',
        duration: '7 Minuten, nach dem Aufflammen',
        minutes: 7,
        body:
          'Sitz und such die Wut im Körper, statt sie wegzuatmen: Kiefer, Nacken, Brust, Hände. Geh mit der Aufmerksamkeit dorthin, wo es am heißesten ist, und bleib da. Nicht ausdrücken, nicht hinunterschlucken — beides macht sie größer. Beobachtet gibt sie die Regie nach wenigen Minuten von selbst ab.',
      },
    ],
    mantra: 'Meine Wut zeigt mir, was mir wichtig ist.',
  },
  pride: {
    name: 'Stolz',
    emotion: 'Verachtung',
    worldview: 'fordernd',
    essence:
      'Es geht dir spürbar besser als weiter unten: Stolz gibt Halt, Leistung, Zugehörigkeit. Nur hängt er an Bedingungen — an Status, Rolle, Recht haben —, und die können wegbrechen.',
    advice:
      'Lies diese Ebene nicht als Vorwurf. Stolz hat dich hierher gebracht und trägt weiter als alles darunter — teuer wird er erst in dem Moment, in dem du etwas lernen müsstest. Der billigste Test ist ein täglicher: einmal laut zugeben, dass du etwas nicht weißt. Fällt das schwer, hast du gefunden, wo die Ebene dich festhält.',
    signs: [
      'Kritik trifft dich hart, auch wenn sie sachlich stimmt.',
      'Um Hilfe zu bitten fällt dir schwerer, als die Sache doppelt so lange allein zu machen.',
      'Du vergleichst dich häufig — und stellst leise fest, wo du besser bist.',
    ],
    trap:
      'Stolz muss verteidigt werden. Weil er das Selbstbild an Erfolge bindet, macht ihn jeder Irrtum zur Bedrohung — und Lernen wird teuer.',
    steps: [
      'Gib einmal am Tag zu, etwas nicht zu wissen. Laut, vor anderen.',
      'Trenne Position und Person: Du kannst eine Meinung fallen lassen, ohne dich zu verlieren.',
      'Bitte diese Woche um echte Hilfe — nicht als Test, sondern weil du sie brauchst.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Was bliebe',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Beschreib dich auf einer halben Seite, ohne ein Wort über Beruf, Können, Besitz, Rolle oder Erfolge zu verlieren. Was übrig bleibt, ist das, was kein Rückschlag dir nehmen kann. Bleibt die Seite fast leer, hast du das Ergebnis der Übung schwarz auf weiß.',
      },
      {
        kind: 'action',
        name: 'Der teure Satz',
        duration: 'einmal täglich',
        body:
          'Sag einmal am Tag laut, dort wo es etwas kostet: „Da kenne ich mich nicht aus" oder „Du hattest recht". Notiere abends, was daraufhin tatsächlich passiert ist. Fast immer: nichts. Genau dieses Nichts ist der Inhalt der Übung.',
      },
      {
        kind: 'sitting',
        name: 'Nichts erreichen',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Sitz zehn Minuten und werde dabei nichts: nicht ruhiger, nicht besser, nicht weiter. Jedes Mal, wenn der Gedanke kommt „das bringt nichts" oder „andere können das besser", hast du den Stolz bei der Arbeit erwischt. Dieses Bemerken ist die Übung, nicht die Stille.',
      },
    ],
    mantra: 'Ich muss nicht recht haben, um in Ordnung zu sein.',
  },
  courage: {
    name: 'Mut',
    emotion: 'Bejahung',
    worldview: 'machbar',
    essence:
      'Die Schwelle. Ab hier gibst du der Welt mehr Kraft, als du ihr entziehst. Probleme sind nicht verschwunden, aber sie sind Aufgaben geworden, und du traust dir zu, sie anzupacken.',
    advice:
      'Du bist über der Schwelle, und die Gefahr ist jetzt nicht der Rückfall, sondern die Anstrengung. Mut, der alles anpackt und nichts loslässt, verbrennt. Halte deshalb zwei Dinge nebeneinander: eine unbequeme Sache pro Woche, bewusst gewählt — und bei jedem Ärger die Frage, ob hier wirklich zu kämpfen ist oder ob es reicht, die Lage zu nehmen, wie sie ist.',
    signs: [
      'Du sagst schwierige Dinge, obwohl dir dabei mulmig ist.',
      'Fehler kosten dich nicht mehr das Selbstwertgefühl.',
      'Du übernimmst Verantwortung, ohne nach Schuldigen zu suchen.',
    ],
    trap:
      'Mut kann sich in Anstrengung verwandeln: alles anpacken, nichts loslassen. Wer sich ständig überwinden muss, verbrennt.',
    steps: [
      'Halte den Schwung: eine unbequeme Sache pro Woche, bewusst gewählt.',
      'Übe Loslassen im Kleinen — nicht jeder Widerstand muss überwunden werden. Manches wird leichter, wenn du aufhörst zu ziehen.',
      'Frage bei Ärger: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Kämpfen oder lassen',
        duration: '15 Minuten, wöchentlich',
        minutes: 15,
        body:
          'Schreib die drei Dinge auf, die dich gerade am meisten Kraft kosten. Frag bei jedem: Muss ich hier kämpfen, oder reicht es, die Lage zu nehmen, wie sie ist? Streich eines. Mut, der alles anpackt, wird Getriebenheit — die Kunst auf dieser Ebene ist das Streichen, nicht das Anpacken.',
      },
      {
        kind: 'action',
        name: 'Die eine Sache am Morgen',
        duration: 'einmal pro Woche',
        body:
          'Wähl am Sonntag die eine Sache aus, um die du dich die Woche über gedrückt hast, und erledige sie am Montag in der ersten Stunde — bevor sich etwas anderes davorschieben kann. Eine, nicht drei. Mut, der sich verteilt, wird Getriebenheit.',
      },
      {
        kind: 'sitting',
        name: 'Zwei Minuten vor der Schwelle',
        duration: '2 Minuten, vor der unangenehmen Sache',
        minutes: 2,
        body:
          'Bevor du das Unangenehme tust, setz dich zwei Minuten hin und tu nichts dagegen. Kein Mutmachen, kein Zurechtlegen von Sätzen — nur spüren, wie sich das Kurz-davor anfühlt. Dann steh auf und tu es. Mut ist nicht die Abwesenheit dieses Gefühls, er ist das Aufstehen danach.',
      },
    ],
    mantra: 'Ich kann das — und wenn nicht, lerne ich es.',
  },
  neutrality: {
    name: 'Neutralität',
    emotion: 'Vertrauen',
    worldview: 'zufriedenstellend',
    essence:
      'Es ist gut so, wie es ist — und wenn nicht, ist das auch auszuhalten. Neutralität ist der erste wirklich entspannte Ort der Skala: kein Müssen, keine Rechthaberei, wenig Drama.',
    advice:
      'Halte das hier nicht für das Ziel. Neutralität ist der erste wirklich entspannte Ort auf der Skala, und genau deshalb bleiben viele darauf stehen — nach oben geht es nur über Einsatz. Such dir eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden, und sag zu ihr Ja, bevor du weißt, ob sie sich lohnt.',
    signs: [
      'Ein Nein von außen wirft dich nicht mehr um.',
      'Du kannst Pläne ändern, ohne dich als Verlierer zu fühlen.',
      'Andere kommen gern zu dir, weil du nichts hochkochst.',
    ],
    trap:
      'Gelassenheit kann in Gleichgültigkeit kippen. Wer nichts mehr braucht, engagiert sich manchmal auch für nichts mehr.',
    steps: [
      'Sage bewusst Ja zu etwas, das Aufwand bedeutet — Neutralität wird erst durch Einsatz zu Bereitschaft.',
      'Suche eine Sache, die dir wichtig genug ist, um dafür unbequem zu werden.',
      'Biete deine Ruhe aktiv an: übernimm dort, wo andere sich verhaken.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Drei Dinge, für die ich unbequem werde',
        duration: '15 Minuten, dann wöchentlich prüfen',
        minutes: 15,
        body:
          'Schreib drei Dinge auf, für die du dich einsetzen würdest, auch wenn es dich etwas kostet. Nimm dir diese Woche das kleinste davon vor. Neutralität ist ein guter Boden und eine schlechte Wohnung — die Übung prüft, ob dir noch etwas wichtig genug ist.',
      },
      {
        kind: 'action',
        name: 'Einmal einmischen',
        duration: 'einmal pro Woche',
        body:
          'Geh diese Woche in eine Sache hinein, aus der du dich sonst heraushalten würdest: eine Diskussion, eine Aufgabe, ein Streit unter anderen. Nicht, um recht zu haben, sondern weil du es ruhiger kannst als die, die sich verhakt haben. Neutralität wird erst durch Einsatz zu Bereitschaft.',
      },
      {
        kind: 'sitting',
        name: 'Kommen und gehen lassen',
        duration: '12 Minuten täglich',
        minutes: 12,
        body:
          'Sitz und lass alles vorbeiziehen: Gedanken, Geräusche, ein Jucken, Pläne. Nichts festhalten, nichts wegschieben, nichts kommentieren. Das ist die eine Übung, die auf dieser Ebene leichtfällt — und zugleich die Probe. Wo du doch greifst oder schiebst, sitzt noch etwas anderes als Gleichmut.',
      },
    ],
    mantra: 'Ich bin einverstanden — und ich packe trotzdem an.',
  },
  willingness: {
    name: 'Bereitschaft',
    emotion: 'Optimismus',
    worldview: 'hoffnungsvoll',
    essence:
      'Aus „es geht auch so" wird „ich mach das gern". Arbeit fühlt sich nicht mehr nach Widerstand an, Lernen macht Freude, und andere spüren, dass mit dir zu rechnen ist.',
    advice:
      'Dein Ja ist deine Stärke und deine Rechnung. Die Frage ist hier nicht mehr, ob du etwas übernimmst, sondern wofür du das nächste Ja aufsparst. Streich diese Woche eine Zusage, die du aus Gewohnheit gegeben hast, und leg die Kraft auf das, was dich fachlich überfordert. Erschöpfung sieht auf dieser Ebene lange aus wie Engagement.',
    signs: [
      'Du meldest dich freiwillig, bevor jemand fragen muss.',
      'Rückschläge sind Informationen, keine Urteile.',
      'Du bringst Dinge zu Ende, auch die unspektakulären.',
    ],
    trap:
      'Bereitschaft sagt leicht Ja — auch zu viel. Ohne Grenze wird aus Hilfsbereitschaft Erschöpfung.',
    steps: [
      'Setze Prioritäten statt nur Zusagen: Wozu sagst du Ja, damit ein wichtigeres Ja möglich bleibt?',
      'Nimm dir etwas vor, das dich fachlich überfordert — Bereitschaft wächst am Anspruch.',
      'Übe Annehmen: Lass zu, dass etwas so bleibt, wie es ist, ohne es verbessern zu wollen.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wozu ich Ja gesagt habe',
        duration: '15 Minuten, sonntags',
        minutes: 15,
        body:
          'Schreib auf, wozu du in dieser Woche Ja gesagt hast — alles, auch die Kleinigkeiten. Markiere, was du aus Überzeugung übernommen hast und was aus Gewohnheit. Bereitschaft ohne Grenze wird Erschöpfung, und die zweite Liste ist der Ort, an dem sie entsteht.',
      },
      {
        kind: 'action',
        name: 'Ein Ja, ein Nein',
        duration: 'zu Wochenbeginn',
        body:
          'Leg am Montag beides fest: ein Ja zu etwas, das dich ein Stück überfordert, und ein Nein zu etwas, das du sonst aus Gewohnheit übernommen hättest. Schreib beide auf. Das Nein ist die schwerere Hälfte — und die, die das Ja überhaupt möglich macht.',
      },
      {
        kind: 'sitting',
        name: 'Der ehrliche Zustand',
        duration: '6 Minuten, abends',
        minutes: 6,
        body:
          'Sitz und geh den Körper durch, von den Füßen bis zum Kopf. Nicht um zu entspannen, sondern um festzustellen, wie viel heute noch da ist. Wer gern Ja sagt, merkt das Leerwerden zuletzt — diese sechs Minuten sind die einzige Stelle im Tag, an der die Antwort nicht von der Stimmung abhängt.',
      },
    ],
    mantra: 'Ich mache mit — mit ganzer Kraft und offenen Augen.',
  },
  acceptance: {
    name: 'Akzeptanz',
    emotion: 'Vergebung',
    worldview: 'harmonisch',
    essence:
      'Die Quelle deines Erlebens liegt in dir, nicht in den Umständen. Damit endet das Verhandeln mit der Wirklichkeit — und es beginnt echte Gestaltung.',
    advice:
      'Pass auf den Satz auf, der hier am leichtesten fällt: „So bin ich eben." Angenommen heißt nicht unveränderlich — Akzeptanz ist der Boden, auf dem Gestalten anfängt, und nicht die Erlaubnis, es zu lassen. Nimm dir eine Sache, die du bisher hingenommen hast, und prüf nüchtern, was daran wirklich feststeht. Und vergib einer konkreten Person, schriftlich, notfalls ungesendet.',
    signs: [
      'Du fragst zuerst, was du beitragen kannst, nicht wer schuld ist.',
      'Menschen dürfen anders sein, ohne dass es dich stört.',
      'Du kannst vergeben, ohne die Sache zu verharmlosen.',
    ],
    trap:
      'Akzeptanz kann zum Deckmantel werden: „So bin ich eben." Angenommen ist nicht dasselbe wie unveränderlich.',
    steps: [
      'Prüfe deine Annahmen an der Sache: Was davon ist überprüfbar wahr, was nur vertraut?',
      'Bring Ordnung ins Denken — lies, rechne, argumentiere. Akzeptanz wird durch Klarheit zu Vernunft.',
      'Vergib einer Person konkret, notfalls schriftlich und ungesendet.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'So bin ich eben — stimmt das?',
        duration: '15 Minuten, einmal',
        minutes: 15,
        body:
          'Schreib drei Sätze auf, die mit „Ich bin nun mal …" anfangen. Frag bei jedem: War das vor fünf Jahren auch schon so? Würde jemand, der mich gut kennt, das unterschreiben? Was würde es kosten, es zu ändern? Angenommen ist nicht dasselbe wie unveränderlich.',
      },
      {
        kind: 'action',
        name: 'Der erste Schritt zurück',
        duration: 'einmal, wenn es ansteht',
        body:
          'Nimm zu einem Menschen Kontakt auf, mit dem etwas offen geblieben ist. Eine Nachricht reicht, drei Sätze, ohne Aufarbeitung. Du musst die Sache nicht klären und nichts verzeihen, was nicht verziehen ist. Es geht nur darum, dass die Tür wieder eine Tür ist und keine Wand.',
      },
      {
        kind: 'sitting',
        name: 'Das ist gerade so',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Nimm eine Sache, die dir gerade nicht passt, und sitz damit. Bei jedem Ausatmen innerlich: das ist gerade so. Das ist weder Einverständnis noch Aufgeben — es ist das Ende des Verhandelns mit einer Wirklichkeit, die ohnehin nicht mit sich reden lässt. Was danach zu tun ist, sieht man klarer.',
      },
    ],
    mantra: 'Ich nehme an, was ist — und gestalte, was geht.',
  },
  reason: {
    name: 'Vernunft',
    emotion: 'Verstehen',
    worldview: 'sinnvoll',
    essence:
      'Der Verstand auf seiner Höhe: Zusammenhänge werden sichtbar, Wissen ordnet sich, Entscheidungen werden begründbar. Die Ebene der Wissenschaft, der Medizin, der guten Handwerkskunst.',
    advice:
      'Dein Verstand ist auf dieser Ebene ein ausgezeichnetes Werkzeug und ein schlechter Ratgeber in der Frage, wann er aufhören soll. Nimm dir täglich zehn Minuten, in denen du etwas wahrnimmst, ohne es zu deuten — Musik, ein Gesicht, das Wetter. Und frag im nächsten Konflikt nicht, wer recht hat, sondern was der andere braucht. Der Schritt nach oben ist keine bessere Analyse, sondern eine andere Art zu schauen.',
    signs: [
      'Du unterscheidest sauber zwischen Fakten, Meinung und Gefühl.',
      'Komplexes ordnest du, statt dich davon erschlagen zu lassen.',
      'Du änderst deine Meinung, wenn die Daten es verlangen.',
    ],
    trap:
      'Der Verstand hält sich für das Ganze. Er kann alles erklären und niemanden trösten — Symbol und Wirklichkeit verwechselt er dabei leicht.',
    steps: [
      'Übe Wahrnehmen ohne Analysieren: zehn Minuten Musik, Natur, ein Gesicht — ohne es zu deuten.',
      'Frage bei Konflikten nicht „Wer hat recht?", sondern „Was braucht dieser Mensch?".',
      'Tu etwas Gutes, das dir nichts einbringt und in keiner Bilanz auftaucht.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das stärkste Gegenargument',
        duration: '25 Minuten, einmal',
        minutes: 25,
        body:
          'Nimm eine Überzeugung, die dir wirklich wichtig ist, und schreib die beste Fassung des Gegenteils auf — so gut, dass jemand, der sie glaubt, sie unterschreiben würde. Keine Karikatur, kein Halbsatz zur Widerlegung am Ende. Wo es beim Schreiben eng wird, hört das Denken auf und fängt die Identität an.',
      },
      {
        kind: 'action',
        name: 'Was braucht dieser Mensch?',
        duration: 'im nächsten Konflikt',
        body:
          'Frag dich im nächsten Streit einmal nicht, wer recht hat, sondern was der andere gerade braucht — und stell die Frage laut. Der Verstand kann alles erklären und niemanden trösten; dieser eine Satz ist die Stelle, an der er das zugibt, ohne dabei dumm zu werden.',
      },
      {
        kind: 'sitting',
        name: 'Zehn Minuten ohne Deutung',
        duration: '10 Minuten täglich',
        minutes: 10,
        body:
          'Zehn Minuten mit etwas, das nichts von dir will: Musik, ein Baum, ein Gesicht. Sobald du anfängst zu erklären, einzuordnen oder zu bewerten, merk es und geh zurück zum bloßen Wahrnehmen. Die Übung ist nicht die Ruhe — die Übung ist das Bemerken, wie schnell der Kopf anspringt.',
      },
    ],
    mantra: 'Verstehen ist viel. Es ist nicht alles.',
  },
  love: {
    name: 'Liebe',
    emotion: 'Ehrfurcht',
    worldview: 'wohlwollend',
    essence:
      'Nicht das Gefühl aus den Liedern, sondern eine Haltung: bedingungslos, dauerhaft, ohne Gegenleistung. Der Blick geht auf das Wesentliche in Menschen und Dingen — nicht an ihnen vorbei.',
    advice:
      'Der blinde Fleck auf dieser Ebene bist du selbst. Wohlwollen fließt hier reichlich nach außen und kommt bei dir am seltensten an — prüf das ehrlich, bevor du weiterliest. Und lass Menschen ihren eigenen Weg gehen, auch den unbequemen: Liebe, die retten will, hält fest, und Festhalten ist wieder Wollen.',
    signs: [
      'Du willst das Gute für andere, auch wenn du nichts davon hast.',
      'Entscheidungen fallen mehr aus dem Herzen als aus der Kalkulation — und tragen.',
      'Deine bloße Anwesenheit beruhigt.',
    ],
    trap:
      'Selbst hier gibt es Anhaftung: an die Rolle des Liebenden, an Menschen, die man retten will. Liebe, die festhält, wird wieder zum Wollen.',
    steps: [
      'Lass geschehen: Menschen dürfen ihren eigenen Weg gehen, auch den unbequemen.',
      'Übe Dankbarkeit für Konkretes, täglich, ohne Anlass.',
      'Nimm dich selbst in dein Wohlwollen mit hinein — der häufigste blinde Fleck auf dieser Ebene.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Dank, der ankommt',
        duration: '20 Minuten, einmal',
        minutes: 20,
        body:
          'Schreib einem Menschen auf, was er für dich getan hat — konkret, mit Datum, ohne allgemeine Sätze über seine Güte. Dann schick es ab. Der stille Teil dieser Ebene fällt leicht; der Teil, bei dem jemand erfährt, was er bedeutet, ist der unbequeme.',
      },
      {
        kind: 'action',
        name: 'Einmal nicht retten',
        duration: 'wenn es so weit ist',
        body:
          'Lass einen Menschen den Weg gehen, von dem du ihn sonst abgehalten hättest — den unbequemen, den du für falsch hältst. Da sein: ja. Eingreifen: nein. Liebe, die festhält, ist wieder Wollen, und der Unterschied zeigt sich nur an dieser einen Stelle.',
      },
      {
        kind: 'sitting',
        name: 'Die stille Fürsprache',
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
    advice:
      'Versuch nicht, das hier festzuhalten. In dem Moment, in dem du die Freude wiederherstellen willst, ist sie Verlangen geworden, und du stehst zwölf Ebenen tiefer. Lass die schönen Zustände kommen und gehen wie Wetter. Und wenn du etwas tun willst: Wirke still, an einer Stelle, an der es niemand mitbekommt.',
    signs: [
      'Gewöhnliche Momente berühren dich: Licht, Stimmen, Alltägliches.',
      'Geduld fällt dir leicht, weil du nichts erzwingen musst.',
      'Menschen fühlen sich in deiner Nähe wohler, ohne dass etwas geschieht.',
    ],
    trap:
      'Die Erfahrung selbst kann festgehalten werden — dann wird Freude zum Zustand, den man wiederherstellen will, und ist wieder Verlangen.',
    steps: [
      'Lass die schönen Zustände kommen und gehen, ohne sie zu konservieren.',
      'Diene still: Wirken, das niemand mitbekommt.',
      'Verbringe Zeit in Stille — ohne Programm und ohne Ziel.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Das Unbemerkte',
        duration: 'abends, 5 Minuten',
        minutes: 5,
        body:
          'Notiere einen Moment des Tages, der gut war und den niemand bemerkt hätte: Licht an einer Wand, ein Satz, das Geräusch der Tür. Am Ende der Woche wirfst du die Zettel weg. Geübt wird das Bemerken, nicht das Sammeln — festgehaltene Freude wird wieder Verlangen.',
      },
      {
        kind: 'action',
        name: 'Etwas ziehen lassen',
        duration: 'wenn ein Moment gut ist',
        body:
          'Wenn heute ein Moment gut ist, mach kein Foto, erzähl niemandem davon und schreib ihn nirgends auf. Lass ihn vorbeigehen wie jeden anderen. Festgehaltene Freude wird zu einem Zustand, den man wiederherstellen will — und ist damit wieder Verlangen.',
      },
      {
        kind: 'sitting',
        name: 'Eine Sache lange ansehen',
        duration: '8 Minuten täglich',
        minutes: 8,
        body:
          'Nimm einen gewöhnlichen Gegenstand — eine Tasse, deine Hand, ein Blatt — und sieh ihn an, bis er aufhört, das zu sein, wofür du ihn hältst. Nicht deuten, nicht bewundern, nicht fotografieren. Freude auf dieser Ebene kommt nicht von besonderen Dingen, sondern von der Länge des Hinsehens.',
      },
    ],
    mantra: 'Nichts muss geschehen, damit es gut ist.',
  },
  peace: {
    name: 'Frieden',
    emotion: 'Glückseligkeit',
    worldview: 'vollständig',
    essence:
      'Die Trennung zwischen Beobachter und Beobachtetem wird durchlässig. Alles bewegt sich, nichts drängt. Sehr selten — Hawkins schätzt: ein Mensch unter zehn Millionen.',
    advice:
      'Bleib in der Küche. Auf dieser Höhe ist der Rückzug verlockend und meistens ein Verlust — Frieden, der niemandem mehr dient, verliert seinen Boden. Und halte die Praxis, die dich hierhergebracht hat: Es gibt keinen Zustand, den man besitzt, und keinen, der ohne Übung bleibt.',
    signs: [
      'Stille ist voll, nicht leer.',
      'Getrenntheit fühlt sich weniger real an als Verbundenheit.',
      'Handeln geschieht wie von selbst, ohne inneren Antreiber.',
    ],
    trap:
      'Auf dieser Höhe ist der Weltrückzug verlockend. Frieden, der niemandem mehr dient, verliert seine Erdung.',
    steps: [
      'Bleib im Alltag: Frieden bewährt sich in der Küche, nicht auf dem Berg.',
      'Gib weiter, was du kannst — schlicht, ohne Lehrhaltung.',
      'Halte die Praxis, die dich hierher gebracht hat. Es gibt keinen Zustand, den man besitzt.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Wem hat das genützt?',
        duration: '10 Minuten, wöchentlich',
        minutes: 10,
        body:
          'Schreib auf, wem deine Ruhe in der vergangenen Woche konkret zugutegekommen ist: wer sich beruhigt hat, wem geholfen war, wer geblieben ist. Bleibt die Liste leer, sagt das mehr als jede weitere Übung — Frieden, der niemandem mehr dient, hat sich aus der Welt zurückgezogen.',
      },
      {
        kind: 'action',
        name: 'Die Küche',
        duration: 'täglich, so lange es dauert',
        body:
          'Nimm eine gewöhnliche Verrichtung — Abwasch, Treppe, der Weg zur Mülltonne — und mach sie ganz: ohne Musik, ohne Handy, ohne dabei etwas zu planen. Wandert der Kopf weg, komm zurück zu den Händen. Frieden bewährt sich hier und nicht auf dem Berg.',
      },
      {
        kind: 'sitting',
        name: 'Der Atem, der sich selbst atmet',
        duration: '20 Minuten täglich',
        minutes: 20,
        body:
          'Sitz und tu nichts mit dem Atem: nicht verlängern, nicht zählen, nicht vertiefen. Nur bemerken, dass geatmet wird, ohne dass jemand es tut. Das ist die schlichteste Übung dieser Liste und die einzige, die nicht besser wird, wenn man sich mehr Mühe gibt.',
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
    advice:
      'Hier ist nichts zu raten. Steht diese Ebene als Ergebnis vor dir, sagt sie etwas über die Skala und die Rechnung dahinter, nicht über dich — Hawkins ordnet ihr die großen Lehrer der Menschheitsgeschichte zu, und eine Selbstauskunft ist kein Weg dorthin. Nimm sie als Richtung. Alles Praktische steht auf den sechzehn Ebenen darunter, und die eine, auf der du tatsächlich stehst, ist die einzige, auf der sich etwas ändern lässt.',
    signs: [
      'Diese Ebene beschreibt sich nicht von innen.',
      'Wer sie beansprucht, spricht meist von Stolz.',
      'Was von ihr bleibt, sind die Menschen, die davon berührt wurden.',
    ],
    trap:
      'Der Begriff selbst. Als Ziel gedacht wird Erleuchtung zum ehrgeizigsten Verlangen von allen.',
    steps: [
      'Nichts zu tun. Die Skala endet hier — der Weg dahin sind die 16 Ebenen darunter, gelebt.',
      'Praktisch bedeutsam ist die Richtung, nicht das Ende: eine Ebene nach oben verändert ein Leben.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Der Satz, der übrig bleibt',
        duration: '10 Minuten, einmal',
        minutes: 10,
        body:
          'Schreib in einem Satz auf, was du suchst. Dann streich jedes Wort, das ein Ziel benennt, einen Zustand oder einen Zeitpunkt. Lies, was übrig ist. Meistens ist es nichts — und das ist keine Niederlage, sondern der einzige ehrliche Befund auf dieser Höhe.',
      },
      {
        kind: 'action',
        name: 'Eine Ebene tiefer',
        duration: 'heute',
        body:
          'Nimm dir heute die Übung einer Ebene vor, auf der du tatsächlich stehst, und mach sie zu Ende. Diese Ebene hier ist keine Aufgabe, sondern eine Richtung: Der Weg dahin sind die sechzehn Ebenen darunter, gelebt. Wer bei 700 anfängt, übt Verlangen.',
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
      'The eyes go down. Not "I did something wrong" but "I am wrong" — the mistake has become the person. It costs so much to carry that almost nothing is left over for anything else.',
    advice:
      'Do not start with understanding. Shame is not held in place by wrong thoughts but by the fact that nobody knows — and it rarely survives one person hearing it and staying. If you do a single thing this week, do that one. Everything else falls into place more easily afterwards.',
    signs: [
      'You would rather not be seen, and you leave rooms where you might stand out.',
      'Old embarrassments surface unasked and land instantly.',
      'Praise is uncomfortable, as though someone had misjudged you.',
    ],
    trap:
      'Shame promises protection: make yourself small enough and you cannot fall. The price is that nobody gets to know you — including you.',
    steps: [
      'Separate the deed from the person. Write down what happened in sentences an observer would sign. No verdict on yourself.',
      'Tell one person you trust something you have kept hidden. Shame rarely survives a witness.',
      'Look after your body the way you would look after a guest: eat, sleep, shower, go outside. Dignity often starts somewhere very practical.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The witness version',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write the incident you are ashamed of down twice: once the way you tell it to yourself, and once the way someone would record it who saw only what happened. Read both out loud. The difference between them is the shame — and it is on paper now instead of invisible inside you.',
      },
      {
        kind: 'action',
        name: 'Seen once',
        duration: '5 minutes, once a day',
        minutes: 5,
        body:
          'Go somewhere there are people — a bakery, a platform, a park — and stay five minutes without hiding behind your phone. Say one unremarkable thing to one person: a greeting, a thank you, a question about the time. Shame insists you are being seen through; five minutes show every time that nobody is looking.',
      },
      {
        kind: 'sitting',
        name: 'A hand on the breastbone',
        duration: '6 minutes daily',
        minutes: 6,
        body:
          'Sit, lay one hand flat on your breastbone and leave it there. Say three sentences inwardly: this is hard right now. Everyone knows something like it. May I be kind with myself. When the resistance arrives — “this is ridiculous” — that is not the end of the exercise, it is the subject of it.',
      },
    ],
    mantra: 'I have made mistakes. I am not one.',
  },
  guilt: {
    name: 'Guilt',
    emotion: 'Blame',
    worldview: 'punishing',
    essence:
      'A prosecutor has the floor inside you and never acquits. The past is tried again and again, and every verdict comes back against you.',
    advice:
      'First check whether anyone is actually owed anything. The answer is usually shorter than the accusation — and what is left over is no longer remorse but a habit that feels moral. Set a date by which you will do your part, and treat the case as closed after it, even while the feeling is still catching up.',
    signs: [
      'You apologise for things you are not responsible for.',
      'When others are struggling, you look first for your own part in it.',
      'Taking something good is hard — it feels unearned.',
    ],
    trap:
      'Guilt feels moral and is in fact convenient: as long as you are accusing yourself, you do not have to make anything right. Self-punishment stands in for the deed.',
    steps: [
      'Turn the guilt into a bill: who are you owing what, precisely? Pay it, apologise, repair it. After that the matter is closed.',
      'Set an end. A date after which the case has been heard. Repeating the charge past it is no longer remorse, only habit.',
      'Ask of every accusation: would a court agree? Usually a fraction is left standing — and that fraction can be worked on.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The bill',
        duration: '15 minutes, once per case',
        minutes: 15,
        body:
          'Three columns on one sheet: what happened, what my part in it actually was, what would repair it. The third column takes an action with a date — or the word “nothing”. Then carry the action out or throw the sheet away. Neither case is allowed to stay open.',
      },
      {
        kind: 'action',
        name: 'Thank you, nothing after it',
        duration: 'once a day',
        body:
          'Take something today — a compliment, a hand, a gift — and say only “thank you”. No “you really shouldn’t have”, no offer in return, no explanation of why you do not deserve it. The sentence takes two seconds; what it costs you only shows while you are saying it.',
      },
      {
        kind: 'sitting',
        name: 'Heard, adjourned',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Sit and wait for the first accusation — it comes. Hear it out once without arguing back, then say three words inwardly: heard, tried, adjourned. Then back to the breath, and the same three words next time. The prosecutor does not lose his force to a rebuttal, but to speaking in an empty room.',
      },
    ],
    mantra: 'I will make it right — and then I will leave it behind.',
  },
  apathy: {
    name: 'Apathy',
    emotion: 'Despair',
    worldview: 'hopeless',
    essence:
      'Nothing is worth it, everything is too heavy. The world is not hostile, it is indifferent — and so are you now. Help arrives, but it does not reach anything.',
    advice:
      'Do not wait until you feel like it; here the feeling does not come first. Make the first step so small that it feels too small, and arrange it with someone: borrowed energy carries where your own is missing. And if it has been like this for weeks, it is not a question of character but one for a doctor.',
    signs: [
      'Tasks pile up because even small steps look impossibly large.',
      'You say “whatever” a lot, and you mean it.',
      'Others worry about you; you feel very little about it yourself.',
    ],
    trap:
      'Apathy is a power-saving mode that keeps itself running: try nothing and you never fail — and never succeed at anything that would prove it wrong.',
    steps: [
      'Shrink the first step until it looks ridiculous: a glass of water, one line, two minutes outside the door. Motion comes before motivation, not the other way round.',
      'Borrow somebody else’s energy — make a plan with a person. What is impossible alone often works in twos.',
      'Lasting apathy is also a medical matter. It is a good reason to get help, not a sign of weakness.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What used to matter to me',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write down ten things that used to matter to you: music, a person, a place, a piece of work. Not in order to take them up again — only to name them. Apathy claims there was never anything there; the list contradicts it without your having to start a single thing.',
      },
      {
        kind: 'action',
        name: 'Two minutes, then stop',
        duration: '2 minutes, twice a day',
        minutes: 2,
        body:
          'Pick the smallest visible thing in the room — one plate, three steps outside, one line. Set two minutes, begin, and stop when it rings even if you could carry on. The stopping is part of it: it keeps the exercise cheap enough to repeat tomorrow.',
      },
      {
        kind: 'sitting',
        name: 'Five things in the room',
        duration: '3 minutes, twice a day',
        minutes: 3,
        body:
          'Not meditating, only counting: five things you can see, four you can hear, three you can feel, two you can smell, one you can taste. If you get stuck, start again. For a state that nothing reaches, this is the smallest possible contact with the world — and it asks for no motivation.',
      },
    ],
    mantra: 'I do not have to feel it. I am starting anyway.',
  },
  grief: {
    name: 'Grief',
    emotion: 'Regret',
    worldview: 'tragic',
    essence:
      'The loss has a name, and that alone is movement: grief has energy where apathy had none. The gaze holds on to what is missing rather than what is here.',
    advice:
      'Do not hurry. On this scale grief is a step up — it has force where there was none — and cutting it short gets nobody anywhere. Give it a fixed place every day so it does not need the whole day. And do something for another person once a day: not as consolation, but because it is the fastest way to turn your eyes outward again.',
    signs: [
      'A great deal reminds you of before — and before was better.',
      'Tears come easily, sometimes for no clear reason.',
      'Starting something new feels like a betrayal of what was lost.',
    ],
    trap:
      'Grief can become the thread that keeps the connection alive. Then letting go turns into the fear of losing the other a second time.',
    steps: [
      'Give the grief a time and a place — twenty minutes a day in which it is allowed to be here. What has a room of its own floods everything less often.',
      'Count what remains: people, skills, memories. Not as consolation, as an inventory.',
      'Do something for someone else. Grief looks inward; a hand that helps turns the view outward.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unsent letter',
        duration: '30 minutes, once',
        minutes: 30,
        body:
          'Write a letter to what is missing — to a person, or to a life that never happened. Everything may go in: the thanks, the reproach, the unfinished business. At the end, one sentence about what you will keep. The letter is not sent and not thrown away; it is put away.',
      },
      {
        kind: 'action',
        name: 'A hand for someone',
        duration: 'once a week',
        body:
          'Find one small thing to do for another person: carry something, cook something, make one call. It does not have to mean anything or replace anyone. Grief looks inward, and no thought argues it out of that — only a hand doing something else for half an hour.',
      },
      {
        kind: 'sitting',
        name: 'The appointment',
        duration: '20 minutes daily, at a fixed time',
        minutes: 20,
        body:
          'Give the grief an appointment: the same time every day, the same chair. Everything is allowed there — photographs, tears, letters. If it comes outside that hour, write the thought on a slip and leave it on the chair for tomorrow. Not to make it smaller, but to give it a room instead of the whole flat.',
      },
    ],
    mantra: 'I have lost something. I am not lost.',
  },
  fear: {
    name: 'Fear',
    emotion: 'Anxiety',
    worldview: 'threatening',
    essence:
      'The world is full of ways for things to go wrong, and your head has played through all of them. Fear genuinely protects — until it starts running the place.',
    advice:
      'Do not argue with fear — it wins every argument because it never needed one. Take the body first: breathe out slowly, longer than you breathe in. Then write the worst case through to the end, including what you would do then. And walk into something uncomfortable on purpose once this week — fear only shrinks against things actually done.',
    signs: [
      'You rehearse catastrophes that 95 % of the time never arrive.',
      'Decisions get postponed because every option carries a risk.',
      'You say yes to avoid conflict, not because you want to.',
    ],
    trap:
      'Avoidance works immediately and makes the fear larger in the long run: every detour confirms to the nervous system that the danger was real.',
    steps: [
      'Write the fear all the way to its end: what exactly happens in the worst case — and what do you do then? A plan turns panic into a problem.',
      'Pick one small, voluntary discomfort a week. Courage only grows on things actually done.',
      'Settle the body first: breathe out slowly, longer than you breathe in. The head follows the breath, not the argument.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'And then?',
        duration: '10 minutes, whenever a fear circles',
        minutes: 10,
        body:
          'Write the fear down as one sentence. Then ask “and then?” and answer it. Then “and then?” again. Keep going until you arrive at a point where you are acting again. Fear usually stops at the picture; the pen carries on past it.',
      },
      {
        kind: 'action',
        name: 'The chosen discomfort',
        duration: 'once a week',
        body:
          'At the start of the week pick one small thing you have been ducking — a call, a question, a contradiction — and do it before the week is out. Small enough that it will certainly work, large enough that you feel it just beforehand. Courage only grows on things actually done.',
      },
      {
        kind: 'sitting',
        name: 'Out longer than in',
        duration: '6 minutes, when it closes in',
        minutes: 6,
        body:
          'Breathe in for four counts, out for six, with no pause between. Nothing else — no calming down, no talking yourself round. The long out-breath is the one switch on fear that can be worked from the outside: the head follows the breath, and the argument follows last.',
      },
    ],
    mantra: 'I am going anyway, weak knees and all.',
  },
  desire: {
    name: 'Desire',
    emotion: 'Craving',
    worldview: 'disappointing',
    essence:
      'Something is always missing, and the next thing is meant to fix it. Desire moves a great deal — it is the engine under most careers — and never arrives.',
    advice:
      'You do not have to stop wanting; desire is the engine under most of the good things in your life. What is missing is the pause. Put twenty-four hours between impulse and purchase, between idea and promise — then see what survives it. What still pulls afterwards was real; the rest was the restlessness, not the wish.',
    signs: [
      'Reaching a goal feels good briefly, then the next one is already in the room.',
      'The moment things go quiet you reach for a distraction: phone, shopping, food, another episode.',
      'You measure what others have against what you lack.',
    ],
    trap:
      'Desire mistakes wanting for needing. Fulfilment is always one purchase away — which is why it is never here.',
    steps: [
      'Put a delay between impulse and action: 24 hours. Whatever still pulls afterwards was real.',
      'Ask of every "I want": which feeling am I expecting from it? Usually that feeling is available by another route.',
      'Practise enough: a week without buying anything, and note what you already owned without noticing.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Which feeling am I buying?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down the last five things you bought, ate or started when you were not doing well. Beside them two columns: which feeling you expected from it, and which one actually came. The second column usually stays empty — and that emptiness is the finding.',
      },
      {
        kind: 'action',
        name: 'The ten-minute curve',
        duration: '10 minutes, at every impulse',
        minutes: 10,
        body:
          'When the reach comes — phone, buying, food — set ten minutes and do nothing about it. Not “never”, only “not now”. Note from 0 to 10 how strong it was at the start and how strong at the end. After a week you have your own curve, and you know what the wanting does by itself.',
      },
      {
        kind: 'sitting',
        name: 'The wave',
        duration: '8 minutes, when it pulls',
        minutes: 8,
        body:
          'Sit down when the reach comes, and do nothing. Look for the wanting in the body: chest, stomach, hands. Name what you find — tightness, prickling, pressure — and stay with it. It rises, it holds, it falls. Nothing has to be done about it; you only have to watch long enough to see that it goes by itself.',
      },
    ],
    mantra: 'I can want something without being driven by it.',
  },
  anger: {
    name: 'Anger',
    emotion: 'Hate',
    worldview: 'hostile',
    essence:
      'Force at last — and it burns. Anger appears where desire meets resistance. It can end an injustice or a friendship; what decides is whether it is aimed.',
    advice:
      'Do not speak while it burns. Anger is a pointer, not a statement: it shows that a boundary or a value was hit, and says nothing about what to do now. Get it out of the body first — stairs, running, weights — and then put it as a request instead of an accusation. What finds no action turns into resentment, and that lasts years.',
    signs: [
      'You snap sooner than you would like, especially at small things.',
      'You hold arguments in your head that have not happened yet.',
      'You are right — and it helps nobody.',
    ],
    trap:
      'Anger feels strong and is in fact reactive: as long as it burns, somebody else decides what you feel.',
    steps: [
      'Look underneath it for what was hurt: a boundary, a value, a need. Anger is a pointer, not an answer.',
      'Burn it off physically before you speak — running, weights, stairs. Then make a request instead of an accusation.',
      'Draw a clear line rather than carry on resenting. Resentment is anger that was never allowed to become an action.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence without you',
        duration: 'after every flare-up',
        body:
          'The body first: twenty squats, the stairs, once round the block. Then write a single sentence about what you wanted and did not get — one in which the word “you” does not appear. Only that sentence is said out loud; the accusation stays on the paper.',
      },
      {
        kind: 'action',
        name: 'The request',
        duration: 'once, as soon as you can',
        body:
          'Tell the person concerned, in one sentence, what you need — not what they did wrong. No “always”, no “never”, no back story. An accusation calls for a defence and duly gets one; a request is the only thing anybody can actually meet.',
      },
      {
        kind: 'sitting',
        name: 'Going to the heat',
        duration: '7 minutes, after a flare-up',
        minutes: 7,
        body:
          'Sit and look for the anger in the body instead of breathing it away: jaw, neck, chest, hands. Take your attention to the hottest place and stay there. Do not express it, do not swallow it — both make it bigger. Watched, it hands back the direction of things within a few minutes.',
      },
    ],
    mantra: 'My anger shows me what matters to me.',
  },
  pride: {
    name: 'Pride',
    emotion: 'Scorn',
    worldview: 'demanding',
    essence:
      'Life is noticeably better than it was further down: pride gives footing, achievement, belonging. But it hangs on conditions — status, role, being right — and those can fall away.',
    advice:
      'Do not read this level as an accusation. Pride got you here and carries further than anything below it — it only turns expensive the moment you would have to learn something. The cheapest test is a daily one: admit out loud, once, that you do not know something. If that is hard, you have found where this level holds you.',
    signs: [
      'Criticism hits hard, even when it is factually correct.',
      'Asking for help is harder than doing the thing alone in twice the time.',
      'You compare yourself often — and quietly note where you come out ahead.',
    ],
    trap:
      'Pride has to be defended. Because it ties your self-image to your successes, every error becomes a threat — and learning gets expensive.',
    steps: [
      'Admit once a day that you do not know something. Out loud, in front of others.',
      'Separate the position from the person: you can drop an opinion without losing yourself.',
      'Ask for real help this week — not as a test, but because you need it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What would be left',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Describe yourself on half a page without one word about your job, your skills, what you own, your role or your successes. What is left is what no setback can take from you. If the page stays almost empty, you have the result of the exercise in black and white.',
      },
      {
        kind: 'action',
        name: 'The expensive sentence',
        duration: 'once a day',
        body:
          'Once a day, out loud, somewhere it costs you something: “I do not know about that” or “you were right”. In the evening, note what actually followed. Almost always: nothing. That nothing is the content of the exercise.',
      },
      {
        kind: 'sitting',
        name: 'Achieving nothing',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Sit for ten minutes and become nothing while you do: not calmer, not better, not further on. Every time the thought arrives that “this is pointless” or “other people are better at this”, you have caught pride at work. That noticing is the exercise, not the quiet.',
      },
    ],
    mantra: 'I do not have to be right to be all right.',
  },
  courage: {
    name: 'Courage',
    emotion: 'Affirmation',
    worldview: 'feasible',
    essence:
      'The threshold. From here you put more strength into the world than you take out of it. The problems have not gone, but they have become tasks, and you trust yourself to take them on.',
    advice:
      'You are above the threshold, and the danger now is not falling back but strain. Courage that takes on everything and lets go of nothing burns out. So hold two things side by side: one uncomfortable thing a week, deliberately chosen — and, at every irritation, the question of whether there is really something to fight here, or whether it is enough to take the situation as it is.',
    signs: [
      'You say the difficult thing even though it makes you uneasy.',
      'Mistakes no longer cost you your sense of worth.',
      'You take responsibility without first looking for someone to blame.',
    ],
    trap:
      'Courage can turn into sheer effort: take on everything, let go of nothing. Anyone who has to override themselves constantly burns out.',
    steps: [
      'Keep the momentum: one uncomfortable thing a week, deliberately chosen.',
      'Practise letting go in small ways — not every resistance has to be overcome. Some things get easier the moment you stop pulling.',
      'Ask when annoyed: do I have to fight here, or is it enough to take the situation as it is?',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Fight it or leave it',
        duration: '15 minutes, weekly',
        minutes: 15,
        body:
          'Write down the three things costing you the most strength right now. Ask of each: do I have to fight here, or is it enough to take the situation as it is? Cross one out. Courage that takes on everything turns into drivenness — the skill at this level is the crossing out, not the taking on.',
      },
      {
        kind: 'action',
        name: 'The one thing in the morning',
        duration: 'once a week',
        body:
          'On Sunday pick the one thing you avoided all week and do it in Monday’s first hour — before anything else can push in front of it. One, not three. Courage that spreads itself out turns into drivenness.',
      },
      {
        kind: 'sitting',
        name: 'Two minutes at the threshold',
        duration: '2 minutes, before the uncomfortable thing',
        minutes: 2,
        body:
          'Before you do the uncomfortable thing, sit for two minutes and do nothing about it. No pep talk, no rehearsing sentences — only feeling what the just-before feels like. Then stand up and do it. Courage is not the absence of that feeling, it is the standing up afterwards.',
      },
    ],
    mantra: 'I can do this — and if I cannot, I will learn it.',
  },
  neutrality: {
    name: 'Neutrality',
    emotion: 'Trust',
    worldview: 'satisfactory',
    essence:
      'It is fine as it is — and if it is not, that can be borne too. Neutrality is the first genuinely relaxed place on the scale: no compulsion, no need to be right, very little drama.',
    advice:
      'Do not mistake this for the destination. Neutrality is the first genuinely relaxed place on the scale, which is exactly why so many stop here — the way up runs through commitment. Find one thing that matters enough to become uncomfortable for, and say yes to it before you know whether it pays off.',
    signs: [
      'A no from outside no longer knocks you over.',
      'You can change a plan without feeling like you lost.',
      'People come to you willingly, because you do not escalate anything.',
    ],
    trap:
      'Composure can tip into indifference. Someone who needs nothing sometimes stops committing to anything either.',
    steps: [
      'Say a deliberate yes to something that costs effort — neutrality only becomes willingness through commitment.',
      'Find one thing important enough to you that you will be uncomfortable for it.',
      'Offer your calm actively: step in where others are getting stuck.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Three things worth the discomfort',
        duration: '15 minutes, then a weekly check',
        minutes: 15,
        body:
          'Write down three things you would stand up for even if it cost you something. Take on the smallest of them this week. Neutrality is good ground and a poor home — this exercise checks whether anything still matters to you enough.',
      },
      {
        kind: 'action',
        name: 'Getting involved once',
        duration: 'once a week',
        body:
          'This week step into something you would normally stay out of: a discussion, a task, an argument between other people. Not to be right, but because you can do it more calmly than the ones who are stuck. Neutrality only becomes willingness through commitment.',
      },
      {
        kind: 'sitting',
        name: 'Letting it come and go',
        duration: '12 minutes daily',
        minutes: 12,
        body:
          'Sit and let everything pass: thoughts, sounds, an itch, plans. Hold nothing, push nothing away, comment on nothing. This is the one exercise that comes easily at this level — and it is also the test. Wherever you do grab or push, something other than equanimity is still sitting there.',
      },
    ],
    mantra: 'I am at peace with it — and I am getting to work anyway.',
  },
  willingness: {
    name: 'Willingness',
    emotion: 'Optimism',
    worldview: 'hopeful',
    essence:
      '"It will do" becomes "I am glad to". Work stops feeling like resistance, learning becomes a pleasure, and other people can tell that you can be counted on.',
    advice:
      'Your yes is your strength and your bill. The question here is no longer whether you take something on, but what you are saving the next yes for. Cancel one commitment this week that you gave out of habit, and put the strength into whatever is over your head professionally. On this level exhaustion looks like dedication for a long time.',
    signs: [
      'You volunteer before anyone has to ask.',
      'Setbacks are information, not verdicts.',
      'You finish things, including the unglamorous ones.',
    ],
    trap:
      'Willingness says yes easily — including to too much. Without a boundary, helpfulness turns into exhaustion.',
    steps: [
      'Set priorities rather than just commitments: what are you saying yes to so that a more important yes stays possible?',
      'Take on something that is beyond you professionally — willingness grows against a demand.',
      'Practise accepting: let something stay as it is without wanting to improve it.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'What I said yes to',
        duration: '15 minutes, on Sundays',
        minutes: 15,
        body:
          'Write down everything you said yes to this week, the small things included. Mark which you took on out of conviction and which out of habit. Willingness without a boundary turns into exhaustion, and the second list is where that begins.',
      },
      {
        kind: 'action',
        name: 'One yes, one no',
        duration: 'at the start of the week',
        body:
          'On Monday settle both: one yes to something slightly beyond you, and one no to something you would otherwise have taken on out of habit. Write both down. The no is the harder half — and the one that makes the yes possible at all.',
      },
      {
        kind: 'sitting',
        name: 'The honest reading',
        duration: '6 minutes, in the evening',
        minutes: 6,
        body:
          'Sit and go through the body, feet to head. Not to relax, but to find out how much is actually left today. People who like saying yes are the last to notice themselves running out — these six minutes are the one point in the day where the answer does not depend on the mood.',
      },
    ],
    mantra: 'I am in — with full force and open eyes.',
  },
  acceptance: {
    name: 'Acceptance',
    emotion: 'Forgiveness',
    worldview: 'harmonious',
    essence:
      'The source of your experience is in you, not in the circumstances. That ends the negotiation with reality — and real shaping begins.',
    advice:
      'Watch out for the sentence that comes easiest here: “that is just how I am”. Accepted is not the same as unchangeable — acceptance is the ground shaping begins on, not permission to leave things alone. Take one thing you have been putting up with and check soberly what about it is actually fixed. And forgive one specific person, in writing, unsent if need be.',
    signs: [
      'You ask first what you can contribute, not who is at fault.',
      'People are allowed to be different without it bothering you.',
      'You can forgive without making light of what happened.',
    ],
    trap:
      'Acceptance can become a cover story: "that is just how I am". Accepted is not the same as unchangeable.',
    steps: [
      'Test your assumptions against the matter itself: which of them are verifiably true, and which are merely familiar?',
      'Bring order into your thinking — read, calculate, argue. Clarity is what turns acceptance into reason.',
      'Forgive one specific person, in writing and unsent if that is what it takes.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'That is just how I am — is it?',
        duration: '15 minutes, once',
        minutes: 15,
        body:
          'Write down three sentences that begin with “I am just …”. Ask of each one: was that true five years ago as well? Would someone who knows me well sign it? What would it cost to change it? Accepted is not the same as unchangeable.',
      },
      {
        kind: 'action',
        name: 'The first step back',
        duration: 'once, when it is due',
        body:
          'Get in touch with someone something was left open with. A message will do, three sentences, no reckoning. You do not have to settle the matter or forgive what is not forgiven. It is only about the door being a door again instead of a wall.',
      },
      {
        kind: 'sitting',
        name: 'This is how it is',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Take one thing that does not suit you right now and sit with it. On every out-breath, inwardly: this is how it is. That is neither agreement nor giving up — it is the end of negotiating with a reality that was never going to negotiate. What is to be done afterwards is easier to see.',
      },
    ],
    mantra: 'I accept what is — and shape what can be shaped.',
  },
  reason: {
    name: 'Reason',
    emotion: 'Understanding',
    worldview: 'meaningful',
    essence:
      'The mind at its height: connections become visible, knowledge arranges itself, decisions can be justified. The level of science, of medicine, of good craft.',
    advice:
      'At this level your mind is an excellent instrument and a poor adviser on the question of when to stop. Take ten minutes a day to perceive something without interpreting it — music, a face, the weather. And in the next conflict, do not ask who is right but what the other person needs. The step up is not a better analysis; it is a different way of looking.',
    signs: [
      'You cleanly separate fact, opinion and feeling.',
      'You organise complexity instead of being flattened by it.',
      'You change your mind when the data demands it.',
    ],
    trap:
      'The intellect takes itself for the whole. It can explain everything and comfort nobody — and it readily mistakes the symbol for the thing.',
    steps: [
      'Practise perceiving without analysing: ten minutes of music, nature, a face — without interpreting it.',
      'In a conflict, ask not "who is right?" but "what does this person need?".',
      'Do a good thing that earns you nothing and appears on no balance sheet.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The strongest counter-argument',
        duration: '25 minutes, once',
        minutes: 25,
        body:
          'Take a conviction that genuinely matters to you and write out the best version of its opposite — good enough that someone who believes it would sign it. No caricature, no half-sentence of rebuttal at the end. Wherever the writing gets tight, thinking has stopped and identity has started.',
      },
      {
        kind: 'action',
        name: 'What does this person need?',
        duration: 'in the next conflict',
        body:
          'In the next argument, ask yourself once not who is right but what the other person needs — and put the question out loud. The intellect can explain everything and comfort nobody; this one sentence is where it admits as much without becoming stupid.',
      },
      {
        kind: 'sitting',
        name: 'Ten minutes without interpreting',
        duration: '10 minutes daily',
        minutes: 10,
        body:
          'Ten minutes with something that wants nothing from you: music, a tree, a face. The moment you start explaining, filing or judging, notice it and go back to plain perceiving. The exercise is not the quiet — the exercise is noticing how fast the head starts up.',
      },
    ],
    mantra: 'Understanding is a great deal. It is not everything.',
  },
  love: {
    name: 'Love',
    emotion: 'Reverence',
    worldview: 'benign',
    essence:
      'Not the feeling from the songs, but a stance: unconditional, lasting, expecting nothing back. The gaze goes to what is essential in people and things — not past them.',
    advice:
      'The blind spot on this level is you. Goodwill flows outward here in quantity and reaches you least of all — check that honestly before reading on. And let people walk their own road, the uncomfortable one included: love that wants to rescue holds on, and holding on is wanting again.',
    signs: [
      'You want good things for others even when there is nothing in it for you.',
      'Decisions come more from the heart than from the calculation — and they hold.',
      'Your mere presence settles a room.',
    ],
    trap:
      'Even here there is attachment: to the role of the loving one, to people you want to save. Love that holds on has become wanting again.',
    steps: [
      'Let things happen: people are allowed their own path, including the uncomfortable one.',
      'Practise gratitude for specific things, daily, without an occasion.',
      'Include yourself in that goodwill — the most common blind spot on this level.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Thanks that arrive',
        duration: '20 minutes, once',
        minutes: 20,
        body:
          'Write down for one person what they did for you — specifically, with a date, no general remarks about their goodness. Then send it. The silent half of this level comes easily; the half where somebody finds out what they mean is the uncomfortable one.',
      },
      {
        kind: 'action',
        name: 'Not rescuing, once',
        duration: 'when the moment comes',
        body:
          'Let one person take the road you would otherwise have talked them out of — the uncomfortable one, the one you think is wrong. Being there: yes. Stepping in: no. Love that holds on has become wanting again, and the difference shows only at this one point.',
      },
      {
        kind: 'sitting',
        name: 'The silent good wish',
        duration: '2 minutes daily',
        minutes: 2,
        body:
          'Think of one person and wish them something concrete and good — without their knowing and without doing anything about it. Day one someone close, day two a stranger, day three someone difficult. Day seven yourself. Day seven is the one most often skipped.',
      },
    ],
    mantra: 'I want what is best for you, unconditionally.',
  },
  joy: {
    name: 'Joy',
    emotion: 'Serenity',
    worldview: 'complete',
    essence:
      'A joy that does not depend on events. It comes from inside, it is patient and durable — and catching, without ever being loud.',
    advice:
      'Do not try to hold on to this. The moment you want to restore the joy it has become desire, and you are standing twelve levels lower. Let the good states come and go like weather. And if you want to do something: work quietly, somewhere nobody notices.',
    signs: [
      'Ordinary moments move you: light, voices, the everyday.',
      'Patience is easy, because nothing has to be forced.',
      'People feel better near you without anything happening.',
    ],
    trap:
      'The experience itself can be held on to — then joy becomes a state you want to restore, and it is desire again.',
    steps: [
      'Let the good states come and go without preserving them.',
      'Serve quietly: act where no one notices.',
      'Spend time in silence — with no programme and no goal.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The unnoticed',
        duration: 'evenings, 5 minutes',
        minutes: 5,
        body:
          'Note one moment of the day that was good and that nobody would have noticed: light on a wall, a sentence, the sound of the door. At the end of the week you throw the slips away. What is practised is the noticing, not the collecting — joy held on to becomes wanting again.',
      },
      {
        kind: 'action',
        name: 'Letting one go',
        duration: 'when a moment is good',
        body:
          'When a moment today is good, take no photograph, tell nobody and write it down nowhere. Let it pass like any other. Joy held on to becomes a state you want to restore — and is wanting all over again.',
      },
      {
        kind: 'sitting',
        name: 'Looking at one thing for a long time',
        duration: '8 minutes daily',
        minutes: 8,
        body:
          'Take an ordinary object — a cup, your own hand, a leaf — and look at it until it stops being the thing you take it for. Do not interpret it, admire it or photograph it. Joy at this level does not come from special things, it comes from the length of the looking.',
      },
    ],
    mantra: 'Nothing has to happen for this to be good.',
  },
  peace: {
    name: 'Peace',
    emotion: 'Bliss',
    worldview: 'whole',
    essence:
      'The separation between the observer and the observed becomes permeable. Everything moves, nothing presses. Very rare — Hawkins estimates one person in ten million.',
    advice:
      'Stay in the kitchen. At this height withdrawal is tempting and usually a loss — peace that serves nobody loses its ground. And keep the practice that brought you here: there is no state anyone owns, and none that lasts without practice.',
    signs: [
      'Silence is full, not empty.',
      'Separateness feels less real than connectedness.',
      'Action happens by itself, with no inner driver behind it.',
    ],
    trap:
      'At this height, withdrawal from the world is tempting. A peace that serves nobody loses its ground.',
    steps: [
      'Stay in the everyday: peace proves itself in the kitchen, not on the mountain.',
      'Pass on what you can — plainly, without taking the teacher’s posture.',
      'Keep the practice that brought you here. There is no state anyone owns.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'Who did that serve?',
        duration: '10 minutes, weekly',
        minutes: 10,
        body:
          'Write down who your calm actually benefited this past week: who settled, who was helped, who stayed. If the list comes out empty, that says more than any further exercise — a peace that serves nobody has withdrawn from the world.',
      },
      {
        kind: 'action',
        name: 'The kitchen',
        duration: 'daily, for as long as it takes',
        body:
          'Take one ordinary task — the washing-up, the stairs, the walk to the bin — and do it whole: no music, no phone, nothing planned along the way. When the mind wanders off, come back to the hands. Peace proves itself here and not on a mountain.',
      },
      {
        kind: 'sitting',
        name: 'The breath that breathes itself',
        duration: '20 minutes daily',
        minutes: 20,
        body:
          'Sit and do nothing with the breath: do not lengthen it, count it or deepen it. Only notice that breathing is happening without anyone doing it. This is the plainest exercise on the list and the only one that does not get better when you try harder.',
      },
    ],
    mantra: 'Everything is as it is. And that is enough.',
  },
  enlightenment: {
    name: 'Enlightenment',
    emotion: 'Ineffable',
    worldview: 'is',
    essence:
      'The end of the scale (700 to 1000). No self left that experiences anything — only being itself. Hawkins assigns this level to the great teachers of human history.',
    advice:
      'There is nothing to advise here. If this level comes up as your result, it says something about the scale and the arithmetic behind it, not about you — Hawkins assigns it to the great teachers of human history, and a self-report is no route there. Take it as a direction. Everything practical is on the sixteen levels below, and the one you actually stand on is the only one where anything can change.',
    signs: [
      'This level does not describe itself from the inside.',
      'Anyone claiming it is usually speaking from pride.',
      'What remains of it are the people it touched.',
    ],
    trap:
      'The word itself. Held as a goal, enlightenment becomes the most ambitious craving of them all.',
    steps: [
      'Nothing to do. The scale ends here — the way to it is the 16 levels below, lived.',
      'What matters in practice is the direction, not the end: one level up changes a life.',
    ],
    practices: [
      {
        kind: 'writing',
        name: 'The sentence that is left',
        duration: '10 minutes, once',
        minutes: 10,
        body:
          'Write in one sentence what you are looking for. Then cross out every word that names a goal, a state or a point in time. Read what is left. Usually it is nothing — and that is not a defeat, it is the only honest finding at this height.',
      },
      {
        kind: 'action',
        name: 'One level down',
        duration: 'today',
        body:
          'Today take on the exercise of a level you actually stand on, and finish it. This level is not a task but a direction: the way to it is the sixteen levels below, lived. Anyone starting at 700 is practising desire.',
      },
      {
        kind: 'sitting',
        name: 'To whom?',
        duration: 'no time frame',
        body:
          'When a thought appears, ask once whom it appears to — and do not answer. Then let it go. This is the only exercise on the list that is not meant to achieve anything: whoever uses it to get somewhere is practising desire.',
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
