export function shouldRenderMobileSticky(input: {
  formVisible: boolean;
  consentPending: boolean;
}): boolean {
  return !input.formVisible && !input.consentPending;
}
