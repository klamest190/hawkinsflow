/**
 * The forms of meditation on the meditation page, in the order they are
 * usually learnt: attention on one anchor first, then the body, then open
 * awareness, then the forms that work with words or with the breath itself.
 */
export const MEDITATIONS = ['breath', 'bodyScan', 'openAwareness', 'lovingKindness', 'mantra', 'slowBreathing'] as const

export type MeditationId = (typeof MEDITATIONS)[number]

/**
 * How well a form is studied — a judgement on the reviews in `SOURCES`, not
 * on the form. Three steps and not five: the studies don't allow finer.
 *
 * - `solid` — a pooled analysis of several randomised trials with a clear result.
 * - `moderate` — reviews find an effect, small to medium, with caveats on quality.
 * - `thin` — hardly studied on its own.
 */
export type Evidence = 'solid' | 'moderate' | 'thin'

export const EVIDENCE: Record<MeditationId, Evidence> = {
  breath: 'moderate',
  // For MBCT, of which the body scan is the core: relapse in recurrent depression.
  bodyScan: 'solid',
  openAwareness: 'thin',
  lovingKindness: 'moderate',
  mantra: 'moderate',
  slowBreathing: 'moderate',
}

/**
 * The studies the page rests on. In the language they were published in, so
 * not translated, and shortened to what finds them: authors, year, title,
 * journal and volume.
 */
export const SOURCES: readonly string[] = [
  'Goyal, M. et al. (2014). Meditation programs for psychological stress and well-being: a systematic review and meta-analysis. JAMA Internal Medicine, 174(3).',
  'Kuyken, W. et al. (2016). Efficacy of mindfulness-based cognitive therapy in prevention of depressive relapse: an individual patient data meta-analysis. JAMA Psychiatry, 73(6).',
  'Galante, J., Galante, I., Bekkers, M.-J. & Gallacher, J. (2014). Effect of kindness-based meditation on health and well-being: a systematic review and meta-analysis. Journal of Consulting and Clinical Psychology, 82(6).',
  'Ooi, S. L., Giovino, M. & Pak, S. C. (2017). Transcendental meditation for lowering blood pressure: an overview of systematic reviews and meta-analyses. Complementary Therapies in Medicine, 34.',
  'Balban, M. Y. et al. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 4(1).',
  'Lehrer, P. M. & Gevirtz, R. (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology, 5.',
  'Zaccaro, A. et al. (2018). How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. Frontiers in Human Neuroscience, 12.',
  'Lieberman, M. D. et al. (2007). Putting feelings into words: affect labeling disrupts amygdala activity in response to affective stimuli. Psychological Science, 18(5).',
  'Kral, T. R. A. et al. (2022). Absence of structural brain changes from mindfulness-based stress reduction: two combined randomized controlled trials. Science Advances, 8(20).',
  'Van Dam, N. T. et al. (2018). Mind the hype: a critical evaluation and prescriptive agenda for research on mindfulness and meditation. Perspectives on Psychological Science, 13(1).',
  'Farias, M., Maraldi, E., Wallenkampf, K. C. & Lucchetti, G. (2020). Adverse events in meditation practices and meditation-based therapies: a systematic review. Acta Psychiatrica Scandinavica, 142(5).',
]
