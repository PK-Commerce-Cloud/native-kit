import {
  ShopperBaskets,
  ShopperContexts,
  ShopperCustomers,
  ShopperExperience,
  ShopperGiftCertificates,
  ShopperLogin,
  ShopperOrders,
  ShopperProducts,
  ShopperPromotions,
  ShopperSearch,
  ShopperSeo,
  ShopperStores,
} from "commerce-sdk-isomorphic";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiClients } from "../types";
import { loginAsGuest } from "../helpers";
import { useQuery } from "@tanstack/react-query";
import { auth$ } from "../store/auth";
import { useWhenReady } from "@legendapp/state/react";
import { redirect_uri } from "@/constants/Commerce";
import { config } from "@/constants/Commerce";
import { syncObservable, configureObservableSync } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";

const CommerceCtx = createContext({} as ApiClients);

export function useCommerceKit() {
  return useContext(CommerceCtx);
}

enableReactComponents();

// Setup global persist configuration
configureObservableSync({
  persist: {
    plugin: ObservablePersistMMKV,
  },
});

export default function CommerceProvider({
  children,
}: {
  children: ReactNode;
}) {
  syncObservable(auth$, {
    persist: {
      name: "auth",
    },
  });

  const [apiClients, setApiClient] = useState<ApiClients>({} as ApiClients);

  const { data, isSuccess } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      console.log("auth", new Date());

      const data = await loginAsGuest(new ShopperLogin(config), redirect_uri);
      return data;
    },
    refetchInterval: 1800 * 1000,
  });

  if (isSuccess) {
    auth$.set(data);
  }

  useWhenReady(auth$, (value) => {
    const authConfig = {
      ...config,
      headers: {
        Authorization: `Bearer ${value?.access_token}`,
      },
    };
    setApiClient({
      shopperBaskets: new ShopperBaskets(authConfig),
      shopperContexts: new ShopperContexts(authConfig),
      shopperCustomers: new ShopperCustomers(authConfig),
      shopperExperience: new ShopperExperience(authConfig),
      shopperGiftCertificates: new ShopperGiftCertificates(authConfig),
      shopperLogin: new ShopperLogin(authConfig),
      shopperOrders: new ShopperOrders(authConfig),
      shopperProducts: new ShopperProducts(authConfig),
      shopperPromotions: new ShopperPromotions(authConfig),
      shopperSearch: new ShopperSearch(authConfig),
      shopperSeo: new ShopperSeo(authConfig),
      shopperStores: new ShopperStores(authConfig),
    });
  });

  return (
    <CommerceCtx.Provider value={apiClients}>{children}</CommerceCtx.Provider>
  );
}
