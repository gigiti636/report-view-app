export function transformAndSplitDict(originalDict: Record<string, number>): Record<string, number> {
  const transformedDict: Record<string, number> = {};

  // Iterate over each key-value pair in the original dictionary
  Object.entries(originalDict).forEach(([key, value]) => {
    // Check if the key contains ", "
    if (key.includes(', ')) {
      // Split the key on ", ", trim each part
      key.split(', ').forEach((part) => {
        const trimmedPart = part.trim();
        // Add the value to the existing value if the key already exists, otherwise set it as the new value
        if (transformedDict.hasOwnProperty(trimmedPart)) {
          transformedDict[trimmedPart] += value;
        } else {
          transformedDict[trimmedPart] = value;
        }
      });
    } else {
      // If the key doesn't contain ", ", add its value to the existing value if the key already exists, otherwise set it
      if (transformedDict.hasOwnProperty(key)) {
        transformedDict[key] += value;
      } else {
        transformedDict[key] = value;
      }
    }
  });

  return transformedDict;
}

export const hasStorage = (key: string): boolean => {
  return !!localStorage.getItem(key);
};

export const getStorage = (key: string): unknown | null => {
  // @ts-ignore
  return !localStorage.getItem(key) ? null : JSON.parse(localStorage.getItem(key));
};

export const setStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteStorage = (key: string) => {
  localStorage.removeItem(key);
};
