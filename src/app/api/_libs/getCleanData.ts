interface GetCleanDataProps {
  //eslint-disable-next-line
  data: any;
}

export const getCleanData = ({ data }: GetCleanDataProps) => {
  const cleanData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      // 1. Convert string 'undefined' or 'null' to actual undefined
      if (value === "undefined" || value === "null" || value === "") {
        return [key, undefined];
      }

      // 2. Convert string booleans to actual booleans
      if (value === "true") return [key, true];
      if (value === "false") return [key, false];

      // 3. Convert numeric strings to actual numbers (for price, stock, etc.)
      const numericFields = ["price", "stock", "lowStockThreshold"];
      if (numericFields.includes(key) && !isNaN(Number(value))) {
        return [key, Number(value)];
      }

      return [key, value];
    }),
  );
  return cleanData;
};
