export const removeEmptyValuesFromObject = <T extends Record<any, any>>(
  object: T,
) =>
  Object.fromEntries(
    Object.entries(object).filter(([_, v]) => v !== null && v !== undefined),
  );
