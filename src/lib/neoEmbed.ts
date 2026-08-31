export const shouldLoadNeoEmbed = (userAgent: string): boolean =>
  !/ReactSnap/i.test(userAgent);

export const removeExistingNeoLoader = (key: string): void => {
  document
    .querySelectorAll<HTMLScriptElement>(`script[data-neokey="${key}"]`)
    .forEach((script) => script.remove());
};
