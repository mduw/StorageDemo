import React, { useState } from "react";
import { LocalStorage, QuotaStat, SessionStorage } from "../components/Storage";
import { MyCacheStorage } from "../components/Storage/MyCacheStorage";
import SStorage from "../components/Storage/StyledComp";

const StorageDemo = () => {
  const [refetch, setRefetch] = useState(true);
  return (
    <SStorage.Wrapper>
      <h2 className="center">Offline Storage Demo</h2>
      <QuotaStat refetch={refetch} setRefetch={setRefetch} />
      <LocalStorage />
      <SessionStorage />
      <MyCacheStorage />
    </SStorage.Wrapper>
  );
};

export default StorageDemo;
