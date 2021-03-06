import React, { useEffect, useState } from "react";
import { getStr, ONE_MB } from "../../lib/HelperFuncs";
import { InputField } from "./InputField";
import SStorage from "./StyledComp";

const CACHE_NAME = "demo-cache";

export const addToCaches = async (cacheSize, postTask = null) => {
  const path = `/cache_${Date.now().toString()}_${cacheSize}MB`;
  const content = new Response(getStr(cacheSize * ONE_MB));

  const cacheObj = await caches.open(CACHE_NAME);
  return cacheObj
    .put(path, content)
    .then(() => {
      console.log(`CACHE STORAGE: SUCCESSFULLY ADDED "${path}"`);
      if (postTask) postTask();
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
  const [totalSize, setTotalSize] = useState(0);
  const [inpSize, setInpSize] = useState(0);
  const [auto, setAuto] = useState(false);

  const handleAutoAddCache = () => setAuto(!auto);

  const handleAddCache = () =>
    addToCaches(inpSize, () => setTotalSize(totalSize + inpSize));
  const handleEmptyCache = () => emptyCache();
  const handleNewInpSize = (kMB) => setInpSize(kMB);

  useEffect(() => {
    let autoAddTimer;
    if (auto) {
      autoAddTimer = setInterval(() => {
        addToCaches(inpSize, () => setTotalSize(totalSize + inpSize));
      }, 1000);
    } else {
      clearInterval(autoAddTimer);
    }
    return () => {
      clearInterval(autoAddTimer);
    };
  }, [auto, totalSize, inpSize]);

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>
        Cache Storage = <SStorage.Value>{totalSize}MB</SStorage.Value>
      </SStorage.InfoWrapper>
      <SStorage.Btn.Clear onClick={handleEmptyCache}>Empty</SStorage.Btn.Clear>
      <SStorage.Btn onClick={handleAutoAddCache} style={{ width: "120px" }}>
        {auto ? "Auto OFF" : "Auto ON"}
      </SStorage.Btn>
      <SStorage.Btn onClick={handleAddCache}>Add</SStorage.Btn>
      <InputField type="number" defaultVal="10" postTask={handleNewInpSize} />
    </SStorage.Section>
  );
};
