export const imageFormat = (src?: string) =>
  src && /\.(gif|svg)$/i.test(src) ? undefined : "webp";
