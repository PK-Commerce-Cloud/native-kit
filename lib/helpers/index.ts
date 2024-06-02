import axios from "axios";
import * as Crypto from "expo-crypto";
import { ShopperLogin, helpers } from "commerce-sdk-isomorphic";
import { ApiClientConfigParams } from "../types";
import {
  TokenRequest,
  TokenResponse,
} from "commerce-sdk/dist/helpers/slasClient";
import { config } from "@/constants/Commerce";

export const urlSafe = (input: string) =>
  input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

export async function loginAsGuest(
  shopperLogin: ShopperLogin<ApiClientConfigParams>,
  redirect_uri: string
): Promise<TokenResponse> {  
  const codeVerifier = helpers.createCodeVerifier();
  let challenge = "";

  const base64Digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    codeVerifier,
    {
      encoding: Crypto.CryptoEncoding.BASE64,
    }
  );

  challenge = base64Digest ? urlSafe(base64Digest) : "";
  shopperLogin.clientConfig.fetchOptions = {
    ...shopperLogin.clientConfig.fetchOptions,
    redirect: "manual",
  };

  const response = await shopperLogin.authorizeCustomer(
    {
      parameters: {
        client_id: shopperLogin.clientConfig.parameters.clientId,
        channel_id: shopperLogin.clientConfig.parameters.siteId,
        code_challenge: challenge,
        organizationId: shopperLogin.clientConfig.parameters.organizationId,
        redirect_uri: redirect_uri,
        response_type: "code",
        hint: "guest",
      },
    },
    true
  );

  const params = new URL(response.url);

  const body: TokenRequest = {
    client_id: shopperLogin.clientConfig.parameters.clientId,
    channel_id: shopperLogin.clientConfig.parameters.siteId,
    code: params.searchParams.get("code")!,
    code_verifier: codeVerifier,
    grant_type: "authorization_code_pkce",
    redirect_uri: redirect_uri,
    usid: params.searchParams.get("usid")!,
  };

  const { data } = await axios.post(
    `https://${config.parameters.shortCode}.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/${config.parameters.organizationId}/oauth2/token`,
    body,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
}
