import { whenReady } from "@legendapp/state";
import { auth$ } from "../store/auth";

export async function isCommerceReady() {
  return await whenReady(auth$);
}

