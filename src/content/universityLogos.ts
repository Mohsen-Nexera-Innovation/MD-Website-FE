/** Official university logos — sourced from university / Wikipedia assets. */
export const UNIVERSITY_LOGOS: Record<string, string> = {
  'ain-shams': '/md/universities/ain-shams.png',
  'al-azhar': '/md/universities/al-azhar.png',
  alamein: '/md/universities/alamein.png',
  'al-salam': '/md/universities/al-salam.png',
  'alexandria-university': '/md/universities/alexandria-university.png',
  'assiut-university': '/md/universities/assiut-university.png',
  'badr': '/md/universities/badr.png',
  'bue': '/md/universities/bue.png',
  'cairo-university': '/md/universities/cairo-university.png',
  delta: '/md/universities/delta.png',
  future: '/md/universities/future.png',
  'mansoura-university': '/md/universities/mansoura-university.png',
  msa: '/md/universities/msa.png',
  miu: '/md/universities/miu.png',
  must: '/md/universities/must.png',
  nahda: '/md/universities/nahda.png',
  'minufiya-dental': '/md/universities/minufiya-dental.png',
  'new-giza': '/md/universities/new-giza.png',
  'tanta-university': '/md/universities/tanta-university.png',
};

export function getUniversityLogo(id: string): string | undefined {
  return UNIVERSITY_LOGOS[id];
}
