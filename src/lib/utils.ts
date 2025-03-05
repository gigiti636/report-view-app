import dayjs from 'dayjs';

export function isValidTimestamp(timestamp: string) {
  const regex =
    /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(20\d{2})\s([01]?[0-9]|2[0-3]):([0-5]?[0-9]):([0-5]?[0-9])$/;

  return !regex.test(timestamp) ? false : dayjs(timestamp, 'M/D/YYYY HH:mm:ss').isValid();
}

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

export const hasDraftStorage = (key: string): boolean => {
  return !!localStorage.getItem(key);
};

export const getDraftStorage = (key: string): unknown | null => {
  // @ts-ignore
  return !localStorage.getItem(key) ? null : JSON.parse(localStorage.getItem(key));
};

export const setDraftStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const deleteDraftStorage = (key: string) => {
  localStorage.removeItem(key);
};
