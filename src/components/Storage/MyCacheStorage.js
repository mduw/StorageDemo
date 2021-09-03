import React, { useEffect } from "react";
import { getStr } from "../../lib/HelperFuncs";
import SStorage from "./StyledComp";

const CACHE_NAME = "demo-cache";
let cacheObj;

export function addToCaches() {
  const path = `/cache_${Date.now().toString()}`;
  const stringResponse = new Response(getStr());
  return cacheObj
    .put(path, stringResponse)
    .then(() => {
      console.log(`CACHE STORAGE: SUCCESSFULLY ADDED "${path}"`);
    })
    .catch((err) => {
      alert("CACHE STORAGE: ERROR! FAILED TO WRITE CACHE");
    });
}

export async function emptyCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  keys.forEach((key) => {
    cache.delete(key);
  });
  caches
    .delete(CACHE_NAME)
    .then(() => {
      console.log("CACHE STORAGE:", CACHE_NAME, "IS DELETED");
    })
    .catch((error) => console.log("CACHE STORAGE: FAILED TO DELETE", CACHE_NAME, error));
}

export const MyCacheStorage = () => {
  const handleAddCache = () => addToCaches();
  const handleEmptyCache = () => emptyCache();

  useEffect(() => {
    caches.open(CACHE_NAME).then((cache) => {
      cacheObj = cache;
    });
  }, []);

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>Cache Storage</SStorage.InfoWrapper>
      <SStorage.Btn onClick={handleEmptyCache}>Empty</SStorage.Btn>
      <SStorage.Btn onClick={handleAddCache}>Add</SStorage.Btn>
    </SStorage.Section>
  );
};
