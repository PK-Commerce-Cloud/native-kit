import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { create } from "twrnc";
export const tw = create(require("../tailwind.config"));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
