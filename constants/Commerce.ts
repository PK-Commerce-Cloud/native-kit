const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
const ORG_ID = process.env.EXPO_PUBLIC_ORG_ID;
const SHORT_CODE = process.env.EXPO_PUBLIC_SHORT_CODE;
const SITE_ID = process.env.EXPO_PUBLIC_SITE_ID;
const DEFAULT_SITE = process.env.EXPO_PUBLIC_SITE_ID;

export const redirect_uri = process.env.EXPO_PUBLIC_REDIRECT_URI;

export const config = {
  parameters: {
    clientId: CLIENT_ID,
    organizationId: ORG_ID,
    shortCode: SHORT_CODE,
    siteId: SITE_ID,
  },
};
