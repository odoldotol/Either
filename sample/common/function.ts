/**
 * Asynchronous function that rejects if the number is odd.  
 */
export const rejectOdd = async (num: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, num * 100));

  if (num % 2 === 0) {
    return num;
  } else {
    throw new Error(`rejectOdd: ${num} is not an even number`);
  }
};
  
/**
 * Asynchronous function that squares the number.  
 * rejects if the number is 0.  
 */
export const square = async (num: number): Promise<number> => {
  await new Promise((resolve) => setTimeout(resolve, Math.abs(num - 10) * 100));

  if (num === 0) {
    throw new Error(`square: 0 is not allowed`);
  } else {
    return num**2;
  }
};
  
/**
 * Synchronous function that subtracts 10.  
 * throws an error if the result is 0 or below.
 */
export const minus10 = (num: number): number => {
  const result = num - 10;
  if (result <= 0) {
    throw new Error(`minus10: result(${result}) must be greater than 0`);
  } else {
    return result;
  }
};