/**
 * Get entries
 *
 * @param {(string|Object<string, "asc"|"desc">)[]} keys
 *
 * @returns {[ string, "asc"|"desc" ][]}
 */
const getEntries = (keys) => {
  const [ key ] = keys;

  if (typeof key === 'object' && key !== null) {
    return Object.entries(key);
  }

  return keys.map((key) => ([
    key,
    'asc'
  ]));
};

/**
 * Sort by
 *
 * @param {...string|Object<string, "asc"|"desc">} [keys]
 *
 * @returns {function(any, any): number}
 */
export const sortBy = (...keys) => {
  const collator = new Intl.Collator('en', {
    sensitivity: 'base',
    numeric: true
  });

  if (keys.length === 0) {
    return collator.compare;
  }

  const entries = getEntries(keys);

  return (a, b) => {
    for (const [
      key,
      sort
    ] of entries) {
      const desc = sort === 'desc';
      const valueA = (desc ? b[key] : a[key]) ?? Number.MIN_SAFE_INTEGER;
      const valueB = (desc ? a[key] : b[key]) ?? Number.MIN_SAFE_INTEGER;

      if (valueA === valueB) {
        continue;
      }

      return collator.compare(valueA, valueB);
    }

    return 0;
  };
};
