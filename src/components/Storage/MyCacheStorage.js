import React from "react";
import { getStr } from "../../lib/HelperFuncs";
import SStorage from "./StyledComp";

const CACHE_NAME = "demo-cache";
let cacheObj;
caches.open(CACHE_NAME).then((cache) => {
  cacheObj = cache;
});
function addToCaches() {
  const fname = `/cache_${Date.now().toString()}.txt`;
  const stringResponse = new Response(getStr());
  return cacheObj
    .put(fname, stringResponse)
    .then(() => {
      console.log(`Added to Cache Storage: '${fname}'`);
    })
    .catch((err) => {
      console.error(`*** Cache API: '${err.name}' ***`, err);
      if (fillDiskCachesInterval) {
        toggleFillCaches();
      }
      alert("Oops: Error writing to Cache API, check console.");
    });
}

async function emptyCache() {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();
  keys.forEach((key) => {
    cache.delete(key);
  });
  caches.delete(CACHE_NAME).then(function(boolean) {
    console.log(CACHE_NAME, "IS DELETED");
  }).catch(error => console.log("EROR: CANNOT DELETE", CACHE_NAME, error));
}

export const MyCacheStorage = () => {
  const handleAddCache = () => addToCaches();
  const handleEmptyCache = () => emptyCache();
  
  return (
    <SStorage.Section>
      <span>Cache Storage</span>
      <SStorage.Btn onClick={handleAddCache}>Add</SStorage.Btn>
      <SStorage.Btn onClick={handleEmptyCache}>Empty</SStorage.Btn>
    </SStorage.Section>
  );
};
