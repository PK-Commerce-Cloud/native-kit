import { observable } from "@legendapp/state";
import { synced } from "@legendapp/state/sync";
import { TokenResponse } from "commerce-sdk/dist/helpers/slasClient";

export const auth$ = observable<TokenResponse | undefined>(
  synced({
    persist: {
      name: "auth",
    },
  })
);
