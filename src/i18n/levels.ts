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
 */
const de = {
  shame: {
    name: 'Scham',
    emotion: 'Demütigung',
    worldview: 'erbärmlich',
    essence:
      'Der Blick geht nach unten. Nicht „ich habe etwas Falsches getan", sondern „ich bin falsch" — der Fehler ist zur Person geworden. Das kostet so viel Kraft, dass für alles andere kaum etwas bleibt.',
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
    mantra: 'Ich habe Fehler gemacht. Ich bin kein Fehler.',
  },
  guilt: {
    name: 'Schuld',
    emotion: 'Vorwurf',
    worldview: 'strafend',
    essence:
      'Ein innerer Ankläger hat das Wort und spricht nie frei. Vergangenes wird immer wieder verhandelt, und jedes Urteil fällt gegen dich aus.',
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
    mantra: 'Ich mache es wieder gut — und dann lasse ich es hinter mir.',
  },
  apathy: {
    name: 'Apathie',
    emotion: 'Verzweiflung',
    worldview: 'hoffnungslos',
    essence:
      'Nichts lohnt sich, alles ist zu schwer. Die Welt ist nicht feindlich, sie ist gleichgültig — und du bist es auch geworden. Hilfe kommt an, aber sie erreicht nichts.',
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
    mantra: 'Ich muss es nicht fühlen. Ich fange trotzdem an.',
  },
  grief: {
    name: 'Trauer',
    emotion: 'Bedauern',
    worldview: 'tragisch',
    essence:
      'Der Verlust hat einen Namen, und das ist bereits Bewegung: Trauer hat Energie, wo Apathie keine hatte. Der Blick hängt an dem, was fehlt, statt an dem, was da ist.',
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
    mantra: 'Ich habe verloren. Ich bin nicht verloren.',
  },
  fear: {
    name: 'Angst',
    emotion: 'Sorge',
    worldview: 'bedrohlich',
    essence:
      'Die Welt ist voller Möglichkeiten, schiefzugehen, und dein Kopf hat sie alle durchgespielt. Angst schützt tatsächlich — bis sie beginnt, das Leben zu verwalten.',
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
    mantra: 'Ich gehe hin, auch mit weichen Knien.',
  },
  desire: {
    name: 'Verlangen',
    emotion: 'Gier',
    worldview: 'enttäuschend',
    essence:
      'Etwas fehlt immer, und das Nächste soll es richten. Verlangen bewegt viel — es ist der Motor der meisten Karrieren — und kommt nie an.',
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
    mantra: 'Ich darf wollen, ohne getrieben zu sein.',
  },
  anger: {
    name: 'Zorn',
    emotion: 'Hass',
    worldview: 'feindselig',
    essence:
      'Endlich Kraft — und sie brennt. Zorn entsteht, wo Verlangen auf Widerstand trifft. Er kann Missstände beenden oder Brücken; das entscheidet sich daran, ob er gerichtet ist.',
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
    mantra: 'Meine Wut zeigt mir, was mir wichtig ist.',
  },
  pride: {
    name: 'Stolz',
    emotion: 'Verachtung',
    worldview: 'fordernd',
    essence:
      'Es geht dir spürbar besser als weiter unten: Stolz gibt Halt, Leistung, Zugehörigkeit. Nur hängt er an Bedingungen — an Status, Rolle, Recht haben —, und die können wegbrechen.',
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
    mantra: 'Ich muss nicht recht haben, um in Ordnung zu sein.',
  },
  courage: {
    name: 'Mut',
    emotion: 'Bejahung',
    worldview: 'machbar',
    essence:
      'Die Schwelle. Ab hier gibst du der Welt mehr Kraft, als du ihr entziehst. Probleme sind nicht verschwunden, aber sie sind Aufgaben geworden, und du traust dir zu, sie anzupacken.',
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
    mantra: 'Ich kann das — und wenn nicht, lerne ich es.',
  },
  neutrality: {
    name: 'Neutralität',
    emotion: 'Vertrauen',
    worldview: 'zufriedenstellend',
    essence:
      'Es ist gut so, wie es ist — und wenn nicht, ist das auch auszuhalten. Neutralität ist der erste wirklich entspannte Ort der Skala: kein Müssen, keine Rechthaberei, wenig Drama.',
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
    mantra: 'Ich bin einverstanden — und ich packe trotzdem an.',
  },
  willingness: {
    name: 'Bereitschaft',
    emotion: 'Optimismus',
    worldview: 'hoffnungsvoll',
    essence:
      'Aus „es geht auch so" wird „ich mach das gern". Arbeit fühlt sich nicht mehr nach Widerstand an, Lernen macht Freude, und andere spüren, dass mit dir zu rechnen ist.',
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
    mantra: 'Ich mache mit — mit ganzer Kraft und offenen Augen.',
  },
  acceptance: {
    name: 'Akzeptanz',
    emotion: 'Vergebung',
    worldview: 'harmonisch',
    essence:
      'Die Quelle deines Erlebens liegt in dir, nicht in den Umständen. Damit endet das Verhandeln mit der Wirklichkeit — und es beginnt echte Gestaltung.',
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
    mantra: 'Ich nehme an, was ist — und gestalte, was geht.',
  },
  reason: {
    name: 'Vernunft',
    emotion: 'Verstehen',
    worldview: 'sinnvoll',
    essence:
      'Der Verstand auf seiner Höhe: Zusammenhänge werden sichtbar, Wissen ordnet sich, Entscheidungen werden begründbar. Die Ebene der Wissenschaft, der Medizin, der guten Handwerkskunst.',
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
    mantra: 'Verstehen ist viel. Es ist nicht alles.',
  },
  love: {
    name: 'Liebe',
    emotion: 'Ehrfurcht',
    worldview: 'wohlwollend',
    essence:
      'Nicht das Gefühl aus den Liedern, sondern eine Haltung: bedingungslos, dauerhaft, ohne Gegenleistung. Der Blick geht auf das Wesentliche in Menschen und Dingen — nicht an ihnen vorbei.',
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
    mantra: 'Ich will dein Bestes, ohne Bedingung.',
  },
  joy: {
    name: 'Freude',
    emotion: 'Heiterkeit',
    worldview: 'vollkommen',
    essence:
      'Eine Freude, die nicht von Ereignissen abhängt. Sie kommt von innen, ist geduldig und ausdauernd — und ansteckend, ohne laut zu sein.',
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
    mantra: 'Nichts muss geschehen, damit es gut ist.',
  },
  peace: {
    name: 'Frieden',
    emotion: 'Glückseligkeit',
    worldview: 'vollständig',
    essence:
      'Die Trennung zwischen Beobachter und Beobachtetem wird durchlässig. Alles bewegt sich, nichts drängt. Sehr selten — Hawkins schätzt: ein Mensch unter zehn Millionen.',
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
    mantra: 'Alles ist, wie es ist. Und das genügt.',
  },
  enlightenment: {
    name: 'Erleuchtung',
    emotion: 'Unaussprechlich',
    worldview: 'ist',
    essence:
      'Das Ende der Skala (700 bis 1000). Kein Ich mehr, das etwas erlebt — nur noch das Sein selbst. Hawkins ordnet dieser Ebene die großen Lehrer der Menschheitsgeschichte zu.',
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
    mantra: 'I have made mistakes. I am not one.',
  },
  guilt: {
    name: 'Guilt',
    emotion: 'Blame',
    worldview: 'punishing',
    essence:
      'A prosecutor has the floor inside you and never acquits. The past is tried again and again, and every verdict comes back against you.',
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
    mantra: 'I will make it right — and then I will leave it behind.',
  },
  apathy: {
    name: 'Apathy',
    emotion: 'Despair',
    worldview: 'hopeless',
    essence:
      'Nothing is worth it, everything is too heavy. The world is not hostile, it is indifferent — and so are you now. Help arrives, but it does not reach anything.',
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
    mantra: 'I do not have to feel it. I am starting anyway.',
  },
  grief: {
    name: 'Grief',
    emotion: 'Regret',
    worldview: 'tragic',
    essence:
      'The loss has a name, and that alone is movement: grief has energy where apathy had none. The gaze holds on to what is missing rather than what is here.',
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
    mantra: 'I have lost something. I am not lost.',
  },
  fear: {
    name: 'Fear',
    emotion: 'Anxiety',
    worldview: 'threatening',
    essence:
      'The world is full of ways for things to go wrong, and your head has played through all of them. Fear genuinely protects — until it starts running the place.',
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
    mantra: 'I am going anyway, weak knees and all.',
  },
  desire: {
    name: 'Desire',
    emotion: 'Craving',
    worldview: 'disappointing',
    essence:
      'Something is always missing, and the next thing is meant to fix it. Desire moves a great deal — it is the engine under most careers — and never arrives.',
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
    mantra: 'I can want something without being driven by it.',
  },
  anger: {
    name: 'Anger',
    emotion: 'Hate',
    worldview: 'hostile',
    essence:
      'Force at last — and it burns. Anger appears where desire meets resistance. It can end an injustice or a friendship; what decides is whether it is aimed.',
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
    mantra: 'My anger shows me what matters to me.',
  },
  pride: {
    name: 'Pride',
    emotion: 'Scorn',
    worldview: 'demanding',
    essence:
      'Life is noticeably better than it was further down: pride gives footing, achievement, belonging. But it hangs on conditions — status, role, being right — and those can fall away.',
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
    mantra: 'I do not have to be right to be all right.',
  },
  courage: {
    name: 'Courage',
    emotion: 'Affirmation',
    worldview: 'feasible',
    essence:
      'The threshold. From here you put more strength into the world than you take out of it. The problems have not gone, but they have become tasks, and you trust yourself to take them on.',
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
    mantra: 'I can do this — and if I cannot, I will learn it.',
  },
  neutrality: {
    name: 'Neutrality',
    emotion: 'Trust',
    worldview: 'satisfactory',
    essence:
      'It is fine as it is — and if it is not, that can be borne too. Neutrality is the first genuinely relaxed place on the scale: no compulsion, no need to be right, very little drama.',
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
    mantra: 'I am at peace with it — and I am getting to work anyway.',
  },
  willingness: {
    name: 'Willingness',
    emotion: 'Optimism',
    worldview: 'hopeful',
    essence:
      '"It will do" becomes "I am glad to". Work stops feeling like resistance, learning becomes a pleasure, and other people can tell that you can be counted on.',
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
    mantra: 'I am in — with full force and open eyes.',
  },
  acceptance: {
    name: 'Acceptance',
    emotion: 'Forgiveness',
    worldview: 'harmonious',
    essence:
      'The source of your experience is in you, not in the circumstances. That ends the negotiation with reality — and real shaping begins.',
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
    mantra: 'I accept what is — and shape what can be shaped.',
  },
  reason: {
    name: 'Reason',
    emotion: 'Understanding',
    worldview: 'meaningful',
    essence:
      'The mind at its height: connections become visible, knowledge arranges itself, decisions can be justified. The level of science, of medicine, of good craft.',
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
    mantra: 'Understanding is a great deal. It is not everything.',
  },
  love: {
    name: 'Love',
    emotion: 'Reverence',
    worldview: 'benign',
    essence:
      'Not the feeling from the songs, but a stance: unconditional, lasting, expecting nothing back. The gaze goes to what is essential in people and things — not past them.',
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
    mantra: 'I want what is best for you, unconditionally.',
  },
  joy: {
    name: 'Joy',
    emotion: 'Serenity',
    worldview: 'complete',
    essence:
      'A joy that does not depend on events. It comes from inside, it is patient and durable — and catching, without ever being loud.',
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
    mantra: 'Nothing has to happen for this to be good.',
  },
  peace: {
    name: 'Peace',
    emotion: 'Bliss',
    worldview: 'whole',
    essence:
      'The separation between the observer and the observed becomes permeable. Everything moves, nothing presses. Very rare — Hawkins estimates one person in ten million.',
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
    mantra: 'Everything is as it is. And that is enough.',
  },
  enlightenment: {
    name: 'Enlightenment',
    emotion: 'Ineffable',
    worldview: 'is',
    essence:
      'The end of the scale (700 to 1000). No self left that experiences anything — only being itself. Hawkins assigns this level to the great teachers of human history.',
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
