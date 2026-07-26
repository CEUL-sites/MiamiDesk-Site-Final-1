export type HeroSellerStep = 1 | 2;
export type HeroSellerStepOneField = "propertyAddress" | "name" | "phone";

export interface HeroSellerStepOne {
  propertyAddress: string;
  name: string;
  phone: string;
}

export type HeroSellerStepOneValidation =
  | { valid: true }
  | { valid: false; firstInvalid: HeroSellerStepOneField };

type ManualAddressInput = {
  disabled: boolean;
  placeholder: string;
  style: { backgroundImage: string };
};

export function restoreManualAddressEntry(
  input: ManualAddressInput | null,
  placeholder: string,
) {
  if (!input) return;
  input.disabled = false;
  input.placeholder = placeholder;
  input.style.backgroundImage = "";
}

export function validateHeroSellerStepOne(
  values: HeroSellerStepOne,
): HeroSellerStepOneValidation {
  const requiredFields: HeroSellerStepOneField[] = ["propertyAddress", "name", "phone"];
  const firstInvalid = requiredFields.find((field) => values[field].trim().length === 0);
  return firstInvalid ? { valid: false, firstInvalid } : { valid: true };
}

export function nextHeroSellerStep(
  current: HeroSellerStep,
  values: HeroSellerStepOne,
): HeroSellerStep {
  if (current === 2) return 2;
  return validateHeroSellerStepOne(values).valid ? 2 : 1;
}

export function previousHeroSellerStep(current: HeroSellerStep): HeroSellerStep {
  return current === 2 ? 1 : 1;
}
