export function deepMerge<T extends object>(defaults: T, overrides: any): T {
  if (!overrides || typeof overrides !== 'object') return { ...defaults };
  const result: any = Array.isArray(defaults) ? [...(defaults as any)] : { ...defaults };
  for (const key of Object.keys(overrides)) {
    const val = overrides[key];
    const def = (defaults as any)[key];
    if (val !== null && typeof val === 'object' && !Array.isArray(val) && typeof def === 'object' && !Array.isArray(def)) {
      result[key] = deepMerge(def, val);
    } else if (val !== undefined) {
      result[key] = val;
    }
  }
  return result;
}
