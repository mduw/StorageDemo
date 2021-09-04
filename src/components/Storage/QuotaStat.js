import React, { useState, useEffect } from "react";
import { ByteToMB } from "../../lib/HelperFuncs";
import useMyStorageManager from "../../stores/MyStorageManager";
import SStorage from "./StyledComp";

export const checkPersistentStorage = async (postTask) => {
  let isPersistedStorage = false;
  if (navigator.storage && navigator.storage.persist) {
    isPersistedStorage = await navigator.storage.persisted();
    console.log(`Persisted storage status: ${isPersistedStorage}`);
    postTask(isPersistedStorage);
  }
};

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
  const [isPersisted, setIsPersisted] = useState(true);
  const quota = useMyStorageManager((state) => state.quota);
  const updateQuota = useMyStorageManager((state) => state.updateQuota);

  useEffect(() => {
    checkPersistentStorage((status) => setIsPersisted(status));
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
      <p>
        isPersisted ={" "}
        <SStorage.Value>{isPersisted.toString().toUpperCase()}</SStorage.Value>
      </p>
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
