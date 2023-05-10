const helperDuplicatedInArrayObject = (item, by, array) => {
  let isDuplicate = false;
  for (let obj of array) {
    if (item[by] === obj[by]) {
      isDuplicate = true;
    }
  }

  return isDuplicate;
};

const helperReadableCurrency = (num) => {
  let n = parseInt(num).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return n;
};

export { helperReadableCurrency, helperDuplicatedInArrayObject };
