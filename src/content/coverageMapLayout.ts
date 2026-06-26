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
  cairo: { labelX: 40, labelY: 16, anchor: 'end' },
  giza: { labelX: 48, labelY: 26, anchor: 'end' },
  qalyubia: { labelX: 60, labelY: 12, anchor: 'start' },
  alexandria: { labelX: 32, labelY: 4, anchor: 'end' },
  tanta: { labelX: 44, labelY: 4, anchor: 'end' },
  mansoura: { labelX: 62, labelY: 7, anchor: 'start' },
  damietta: { labelX: 64, labelY: 4, anchor: 'start' },
  'port-said': { labelX: 66, labelY: 7, anchor: 'start' },
  ismailia: { labelX: 68, labelY: 13, anchor: 'start' },
  suez: { labelX: 70, labelY: 20, anchor: 'start' },
  'sharm-el-sheikh': { labelX: 78, labelY: 28, anchor: 'start' },
  hurghada: { labelX: 74, labelY: 38, anchor: 'start' },
  minya: { labelX: 40, labelY: 37, anchor: 'end' },
  asyut: { labelX: 42, labelY: 48, anchor: 'end' },
  sohag: { labelX: 62, labelY: 54, anchor: 'start' },
  luxor: { labelX: 72, labelY: 64, anchor: 'start' },
  aswan: { labelX: 74, labelY: 78, anchor: 'start' },
};

export function labelLayoutFor(id: string): CityLabelLayout | undefined {
  return CITY_LABEL_LAYOUT[id];
}

/** Visual-only node offsets (map %) — separates dense clusters without changing data. */
export const CITY_NODE_OFFSET: Record<string, { dx: number; dy: number }> = {
  cairo: { dx: -1.0, dy: -1.2 },
  giza: { dx: 1.0, dy: 1.4 },
  qalyubia: { dx: 1.6, dy: -0.8 },
};

export function nodePositionFor(city: { id: string; mapX: number; mapY: number }) {
  const off = CITY_NODE_OFFSET[city.id];
  return {
    mapX: city.mapX + (off?.dx ?? 0),
    mapY: city.mapY + (off?.dy ?? 0),
  };
}
