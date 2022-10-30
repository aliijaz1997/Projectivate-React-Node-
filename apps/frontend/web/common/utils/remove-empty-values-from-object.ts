export const removeEmptyValuesFromObject = (object: Record<any, any>) =>
  Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== null && v !== undefined)
  );
