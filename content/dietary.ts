/** Dietary mark printed on menus, comparison tables and dish labels. */
export type DietaryId = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'nut-free';

export interface DietaryMark {
  /** Stable URL-safe identifier referenced by menu dishes. */
  id: DietaryId;
  /** Short letterpress code printed in roundels. */
  code: string;
  /** Human-readable name. */
  label: string;
  /** Clarifying note shown in the dietary legend. */
  note: string;
}

export const dietaryMarks: readonly DietaryMark[] = [
  {
    id: 'vegetarian',
    code: 'V',
    label: 'Vegetarian',
    note: 'No meat or fish',
  },
  {
    id: 'vegan',
    code: 'VE',
    label: 'Vegan',
    note: 'No animal products',
  },
  {
    id: 'gluten-free',
    code: 'GF',
    label: 'Gluten-free',
    note: 'Made without gluten-containing ingredients',
  },
  {
    id: 'dairy-free',
    code: 'DF',
    label: 'Dairy-free',
    note: 'Made without milk products',
  },
  {
    id: 'nut-free',
    code: 'NM',
    label: 'Made without nuts',
    note: 'Prepared without nuts in a kitchen that handles them',
  },
];

export const dietaryById: ReadonlyMap<DietaryId, DietaryMark> = new Map(
  dietaryMarks.map(mark => [mark.id, mark]),
);

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateDietary(marks: readonly DietaryMark[] = dietaryMarks): void {
  const seen = new Set<string>();
  for (const mark of marks) {
    if (!mark.id || !slugPattern.test(mark.id)) {
      throw new Error(`dietary.${mark.id || '(missing)'}: id must be a URL-safe slug`);
    }
    if (seen.has(mark.id)) {
      throw new Error(`dietary.${mark.id}: duplicate id`);
    }
    seen.add(mark.id);
    if (!mark.code.trim()) throw new Error(`dietary.${mark.id}.code: required`);
    if (!mark.label.trim()) throw new Error(`dietary.${mark.id}.label: required`);
    if (!mark.note.trim()) throw new Error(`dietary.${mark.id}.note: required`);
  }
}
