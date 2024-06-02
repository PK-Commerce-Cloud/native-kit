import type {
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

export type ApiClientConfigParams = {
  clientId: string;
  organizationId: string;
  siteId: string;
  shortCode: string;
  locale?: string;
  currency?: string;
};

export interface ApiClients {
  shopperBaskets: ShopperBaskets<ApiClientConfigParams>;
  shopperContexts: ShopperContexts<ApiClientConfigParams>;
  shopperCustomers: ShopperCustomers<ApiClientConfigParams>;
  shopperExperience: ShopperExperience<ApiClientConfigParams>;
  shopperGiftCertificates: ShopperGiftCertificates<ApiClientConfigParams>;
  shopperLogin: ShopperLogin<ApiClientConfigParams>;
  shopperOrders: ShopperOrders<ApiClientConfigParams>;
  shopperProducts: ShopperProducts<ApiClientConfigParams>;
  shopperPromotions: ShopperPromotions<ApiClientConfigParams>;
  shopperSearch: ShopperSearch<ApiClientConfigParams>;
  shopperSeo: ShopperSeo<ApiClientConfigParams>;
  shopperStores: ShopperStores<ApiClientConfigParams>;
}
