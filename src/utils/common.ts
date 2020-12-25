const getCapitalizeFirstLetter = (string: string): string => {
  const firstLetter: string = string.charAt(0).toUpperCase();
  const resultString: string = firstLetter + string.slice(1);

  return resultString;
};

export {
  getCapitalizeFirstLetter
};
