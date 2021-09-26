import React, { useState, useEffect } from "react";
import { ByteToMB } from "../../lib/HelperFuncs";
import useMyStorageManager from "../../stores/MyStorageManager";
import SStorage from "./StyledComp";

function enableNotification() {
  if (Notification.permission === "granted") return;
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        alert("Notification enabled!");
        return true;
      }
    });
  }
  return false;
}
const requestPersistStorage = async () => {
  if (Notification.permission !== "granted") {
    let enabled = enableNotification();
    if (!enabled) {
      alert("Allow notification before persisting storage");
      return;
    }
  }
  if (navigator.storage && navigator.storage.persist)
    navigator.storage.persist().then(function (persistent) {
      if (persistent)
        console.log(
          "Storage is persisted"
        );
      else
        console.log("Storage is NOT persisted");
    });
};

export const checkPersistentStorage = async (postTask) => {
  let isPersistedStorage = false;
  if (navigator.storage && navigator.storage.persist) {
    isPersistedStorage = await navigator.storage.persisted();
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
    enableNotification();
    let checkInterval = setInterval(() => {
      checkPersistentStorage((status) => setIsPersisted(status));
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
        <SStorage.Btn
          onClick={requestPersistStorage}
          style={{
            display: "inline-block",
            width: "auto",
            margin: "-8px 0 0 0",
          }}
        >
          Persist storage
        </SStorage.Btn>
      </p>
      <div>Quota = Cache + IndexedDB. DOMStorage (local + session) is not included in Quota</div>
      <div>
        Used ={" "}
        <SStorage.Value>
          {ByteToMB(quota.usage)} / {ByteToMB(quota.total)}<small> </small>
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
