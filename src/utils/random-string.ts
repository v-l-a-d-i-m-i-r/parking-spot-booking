export function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  // let counter = 0;

  while (result.length < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // counter += 1;
  }

  return result;
}
