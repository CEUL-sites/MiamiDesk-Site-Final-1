export function shouldRenderMobileSticky(input: {
  formVisible: boolean;
  consentPending: boolean;
  guardVisible: boolean;
}): boolean {
  return !input.formVisible && !input.consentPending && !input.guardVisible;
}
