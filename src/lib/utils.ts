import LZString from 'lz-string';

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

export function encodeData(data: string) {
  const compressed = LZString.compressToEncodedURIComponent(data);
  return compressed;
}

export function decodeData(encodedData: string) {
  const decompressed = LZString.decompressFromEncodedURIComponent(encodedData);
  return decompressed || '';
}
