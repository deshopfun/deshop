export type REPORT = {
  id: number;
  title: string;
  content: string;
};

export const REPORTS: REPORT[] = [
  {
    id: 1,
    title: 'Abuse & Harassment',
    content:
      'Insults, Unwanted Sexual Content & Graphic Objectification, Unwanted NSFW & Graphic Content, Violent Event Denial, Targeted Harassment and Inciting Harassment',
  },
  {
    id: 2,
    title: 'Child Safety',
    content: 'Child sexual exploitation, grooming, physical child abuse, underage user',
  },
  {
    id: 3,
    title: 'Suicide or self-harm',
    content: 'Encouraging, promoting, providing instructions or sharing strategies for self-harm.',
  },
  {
    id: 4,
    title: 'Sensitive or disturbing media',
    content:
      'Graphic Content, Gratuitous Gore, Adult Nudity & Sexual Behavior, Violent Sexual Conduct, Bestiality & Necrophilia, Media depicting a deceased individual.',
  },
  {
    id: 5,
    title: 'Other',
    content: 'Please explain why should be removed.',
  },
];
