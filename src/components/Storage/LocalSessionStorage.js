import { useEffect, useState } from "react";
import { getStr, ONE_MB } from "../../lib/HelperFuncs";
import { InputField } from "./InputField";
import SStorage from "./StyledComp";

const { localStorage, sessionStorage } = window;

export function getStorageSize(storageType) {
  let total = 0;
  for (let key in storageType) {
    if (storageType.hasOwnProperty(key)) {
      total += key.length + storageType.getItem(key).length;
    }
  }
  return (total / ONE_MB).toFixed(0); // MB
}

export function addData2Storage(storageType, size, postTask = null) {
  const key = `key${storageType.length + 1}_${size}MB`;
  try {
    storageType.setItem(key, getStr(size * ONE_MB));
    if (postTask) postTask();
  } catch (error) {
    console.log(`ERROR: '${error.name}'`);
  }
}

export function emptyStorage(storageType) {
  storageType.clear();
}

export const Storage = ({ storageType, name }) => {
  const [totalSize, setTotalSize] = useState(storageType.length);
  const [inpSize, setInpSize] = useState(0);
  const handleAdd2Storage = () => {
    addData2Storage(storageType, inpSize, () => {
      console.log(`${name}: ADDED ${inpSize}MB`);
      setTotalSize(getStorageSize(storageType));
    });
  };
  const handleEmptyStorage = () => {
    emptyStorage(storageType); // sync
    setTotalSize(storageType.length);
  };

  const handleNewInpSize = (kMB) => setInpSize(kMB);

  useEffect(() => {
    const handleStorageChange = () => setTotalSize(getStorageSize(storageType));
    const clearAllBtn = document.getElementById("clearAll-Btn");
    clearAllBtn.addEventListener("click", handleStorageChange);
    return () => {
      clearAllBtn.removeEventListener("click", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const sizeCheckTimer = setInterval(() => {
      const NewStorageSize = getStorageSize(storageType);
      if (NewStorageSize !== inpSize) setTotalSize(NewStorageSize);
    }, 1500);
    return () => {
      clearInterval(sizeCheckTimer);
    };
  }, []);

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>
        {name} = <SStorage.Value>{totalSize}MB</SStorage.Value>
      </SStorage.InfoWrapper>
      <SStorage.Btn.Clear onClick={handleEmptyStorage}>Empty</SStorage.Btn.Clear>
      <SStorage.Btn onClick={handleAdd2Storage}>Add</SStorage.Btn>
      <InputField postTask={handleNewInpSize} />
    </SStorage.Section>
  );
};

export const LocalStorage = () => (
  <Storage storageType={localStorage} name={"Local Storage"} />
);
export const SessionStorage = () => (
  <Storage storageType={sessionStorage} name={"Session Storage"} />
);
