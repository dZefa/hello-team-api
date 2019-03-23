export const logger = (...args: string[] | any[]) => {
  if (process.env.NODE_ENV === 'dev') {
    console.log(...args);
  }
}

export const dbLogger = (...args: string[] | any[]) => {
  console.log(...args);
}
