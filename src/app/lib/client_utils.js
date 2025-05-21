export function Version() {
  return "1.2.3";
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
