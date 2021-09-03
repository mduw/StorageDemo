import React, { useState, useEffect } from "react";
import { ByteToMB } from "../../lib/HelperFuncs";
import useMyStorageManager from "../../stores/MyStorageManager";
import SStorage from "./StyledComp";

function fetchQuota(updateQuota) {
  if (!updateQuota) return;
  navigator.storage
    .estimate()
    .then(({ quota, usage }) => {
      updateQuota({ total: quota, usage: usage });
    })
    .catch((error) => console.log("ERROR ", error));
}

const QuotaStat = ({ refetch, setRefetch }) => {
  const quota = useMyStorageManager((state) => state.quota);
  const updateQuota = useMyStorageManager((state) => state.updateQuota);

  useEffect(() => {
    // passive update
    let checkInterval = setInterval(() => {
      fetchQuota(updateQuota);
    }, 1000);
    return () => {
      clearInterval(checkInterval);
    };
  }, []);
  return (
    <SStorage.SectionOuter>
      <div>
        Used ={" "}
        <SStorage.Value>
          {ByteToMB(quota.usage)} / {ByteToMB(quota.total)}
        </SStorage.Value>
      </div>
      <div>
        Available ={" "}
        <SStorage.Value>{ByteToMB(quota.total - quota.usage)}</SStorage.Value>
      </div>
    </SStorage.SectionOuter>
  );
};

export { QuotaStat };
