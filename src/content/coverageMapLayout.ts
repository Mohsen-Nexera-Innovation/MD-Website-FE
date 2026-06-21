/**
 * Hand-tuned label positions (0–100) to prevent overlap in dense clusters.
 * Leader lines connect each label pill to its geographic node.
 */
export type CityLabelLayout = {
  labelX: number;
  labelY: number;
  anchor: 'start' | 'middle' | 'end';
};

export const CITY_LABEL_LAYOUT: Record<string, CityLabelLayout> = {
  cairo: { labelX: 46, labelY: 22, anchor: 'end' },
  giza: { labelX: 46, labelY: 27, anchor: 'end' },
  alexandria: { labelX: 32, labelY: 4, anchor: 'end' },
  tanta: { labelX: 44, labelY: 4, anchor: 'end' },
  mansoura: { labelX: 62, labelY: 7, anchor: 'start' },
  damietta: { labelX: 66, labelY: 2, anchor: 'start' },
  'port-said': { labelX: 70, labelY: 5, anchor: 'start' },
  ismailia: { labelX: 70, labelY: 13, anchor: 'start' },
  suez: { labelX: 72, labelY: 20, anchor: 'start' },
  'sharm-el-sheikh': { labelX: 84, labelY: 40, anchor: 'start' },
  hurghada: { labelX: 82, labelY: 48, anchor: 'start' },
  minya: { labelX: 40, labelY: 37, anchor: 'end' },
  asyut: { labelX: 42, labelY: 48, anchor: 'end' },
  sohag: { labelX: 64, labelY: 54, anchor: 'start' },
  luxor: { labelX: 74, labelY: 64, anchor: 'start' },
  aswan: { labelX: 76, labelY: 82, anchor: 'start' },
};

export function labelLayoutFor(id: string): CityLabelLayout | undefined {
  return CITY_LABEL_LAYOUT[id];
}
