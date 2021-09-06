import React, { useEffect } from "react";
import { getStr } from "../../lib/HelperFuncs";
import SStorage from "./StyledComp";

const CACHE_NAME = "demo-cache";
//let cacheObj;

export const addToCaches = async () => {
  const path = `/cache_${Date.now().toString()}`;
  const content = new Response(getStr());

  const cacheObj = await caches.open(CACHE_NAME);
  return cacheObj
    .put(path, content)
    .then(() => {
      console.log(`CACHE STORAGE: SUCCESSFULLY ADDED "${path}"`);
    })
    .catch((err) => {
      alert("CACHE STORAGE: ERROR! FAILED TO WRITE CACHE");
    });
};

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
    .then(() => {
      window.location.reload(true);
    })
    .catch((error) =>
      console.error("CACHE STORAGE: FAILED TO DELETE", CACHE_NAME, error)
    );
}

export const MyCacheStorage = () => {
  const handleAddCache = () => addToCaches();
  const handleEmptyCache = () => emptyCache();

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>Cache Storage</SStorage.InfoWrapper>
      <SStorage.Btn onClick={handleEmptyCache}>Empty</SStorage.Btn>
      <SStorage.Btn onClick={handleAddCache}>Add</SStorage.Btn>
    </SStorage.Section>
  );
};
