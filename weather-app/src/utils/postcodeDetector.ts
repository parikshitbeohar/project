export const isPostcode = (input: string): boolean => {
  if (!input) return false;
  const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s*[0-9][A-Z]{2}$/i;
  return postcodePattern.test(input.trim());
};
