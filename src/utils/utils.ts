export function delay(fn: (b: boolean) => void, b: boolean) {
  setTimeout(() => {
    fn(b);
  }, 5000);
}