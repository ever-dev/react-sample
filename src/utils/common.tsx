export const removeNullableValues = (
  obj: { [i: string]: any },
  nullableValues = ['', null, undefined],
) => {
  return Object.keys(obj)
    .filter(key => !nullableValues.includes(obj[key]))
    .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};

export const getBaseUrl = (route: string) => {
  return route.split('/')[1];
};
