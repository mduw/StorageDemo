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
    </SStorage.Wrapper>
  );
};

export default StorageDemo;
