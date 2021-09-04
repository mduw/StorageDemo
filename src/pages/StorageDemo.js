import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SDefault from "../components/DefaultStyledComp";
import {
  emptyStorage,
  LocalStorage,
  QuotaStat,
  SessionStorage,
} from "../components/Storage";
import { Database, emptyIndexedDB } from "../components/Storage/IndexedDB";
import {
  emptyCache,
  MyCacheStorage,
} from "../components/Storage/MyCacheStorage";
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
        <SStorage.ClearAllBtn
          id="clearAll-Btn"
          onClick={handleClearAll}
          width="100%"
        >
          CLEAR ALL
        </SStorage.ClearAllBtn>
      </SStorage.SectionOuter>
    </SStorage.Wrapper>
  );
};

export default StorageDemo;
