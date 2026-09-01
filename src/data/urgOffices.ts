import officeData from "./urgOffices.json";

export const URG_OFFICE_DATA = officeData;
export const URG_OFFICIAL_BRANCHES = officeData.officialBranches;
export const URG_FLORIDA_BRANCHES = officeData.officialBranches.filter(
  (branch) => branch.state === "FL",
);
export const URG_FLORIDA_OFFICE_COUNT = URG_FLORIDA_BRANCHES.length;
export const URG_FLORIDA_OFFICE_NAMES = URG_FLORIDA_BRANCHES.map((branch) => branch.name);
export const URG_PUBLIC_OFFICE_NETWORK_LABEL = officeData.publicNetworkLabel;
export const CARLOS_SOUTH_FLORIDA_SERVICE_AREAS = officeData.carlosSouthFloridaServiceAreas;
export const CROSS_BORDER_REFERRAL_MARKETS = officeData.crossBorderReferralMarkets;
