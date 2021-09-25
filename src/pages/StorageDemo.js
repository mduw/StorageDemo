import React, { useEffect, useState } from "react";
import {
  emptyStorage,
  LocalStorage,
  QuotaStat,
  SessionStorage,
  emptyCache,
  MyCacheStorage,
  Database,
  emptyIndexedDB,
} from "../components/Storage";

import SStorage from "../components/Storage/StyledComp";

const StorageDemo = () => {
  const [refetch, setRefetch] = useState(true);
  const handleClearAll = () => {
    emptyStorage(window.localStorage);
    emptyStorage(window.sessionStorage);
    emptyCache();
    emptyIndexedDB();
    setRefetch(!refetch);
  };
  const onRequestPersistStorage = async () => {
    // Request persistent storage for site
    if (navigator.storage && navigator.storage.persist)
      navigator.storage.persist().then(function (persistent) {
        if (persistent)
          console.log(
            "Storage will not be cleared except by explicit user action"
          );
        else
          console.log(
            "Storage may be cleared by the UA under storage pressure."
          );
      });
  };
  return (
    <SStorage.Wrapper>
      <h2 className="center">Offline Storage Demo</h2>

      <QuotaStat refetch={refetch} setRefetch={setRefetch} />
      <LocalStorage refetch={refetch} />
      <SessionStorage refetch={refetch} />
      <MyCacheStorage />
      <Database />
      <SStorage.SectionOuter>
        <SStorage.Btn.ClearAll
          id="clearAll-Btn"
          onClick={handleClearAll}
          width="100%"
        >
          CLEAR ALL
        </SStorage.Btn.ClearAll>
      </SStorage.SectionOuter>
      <SStorage.Section>
        <SStorage.Btn
          onClick={onRequestPersistStorage}
          style={{ width: "200px" }}
        >
          Persist storage
        </SStorage.Btn>
      </SStorage.Section>
    </SStorage.Wrapper>
  );
};

export default StorageDemo;
