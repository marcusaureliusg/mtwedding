export const getSortedImageArray = (imageObject) => {
    return Object.values(imageObject)
      .filter(Boolean) // Remove null/undefined values
      .sort((a, b) => {
        // Extract all numbers from filenames (not just the first one)
        const numberA = parseInt(a.match(/\d+/g)?.join("") || "0", 10);
        const numberB = parseInt(b.match(/\d+/g)?.join("") || "0", 10);

        return numberA - numberB; // Correct numerical sorting
      });
  };
