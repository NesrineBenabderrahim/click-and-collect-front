"use client";

import { proxy } from "valtio";

type StoreType = {
  isValidation: boolean;
};

export const store = proxy<StoreType>({
  isValidation: false,
});

export function setIsValidation(isValidation: boolean): void {
  store.isValidation = isValidation;
}

export default store;
