export const encodeForCSS = (url: string) => {
  const specialChars = {
    '(': '%28',
    ')': '%29',
    ':': '%3A',
  };

  // Use a regex to match only certain colons
  return url.replace(/(\(|\)|[a-zA-Z]+:[^/]+)/g, match => {
    // For matches, encode ( and ) directly
    if (match.includes('(') || match.includes(')')) {
      return match.replace(
        /[()]/g,
        char => specialChars[char]
      );
    }

    // For colons, encode them if they are not part of the protocol
    return match.replace(/:/g, (char, offset) => {
      // Check if the colon is not part of the protocol
      return match.slice(0, offset).includes('http')
        ? char
        : specialChars[char];
    });
  });
};
