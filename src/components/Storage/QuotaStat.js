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
      console.log(quota, usage);
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
      console.log("here");
    }, 1000);
    return () => {
      clearInterval(checkInterval);
    };
  }, []);
  return (
    <>
      <div>Quota = <SStorage.Value>{ByteToMB(quota.total)}</SStorage.Value></div>
      <div>Used = <SStorage.Value>{ByteToMB(quota.usage)}</SStorage.Value></div>
      <div>Available = <SStorage.Value>{ByteToMB(quota.total - quota.usage)}</SStorage.Value></div>
    </>
  );
};

export { QuotaStat };
