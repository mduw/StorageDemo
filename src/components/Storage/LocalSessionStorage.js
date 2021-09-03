import { useEffect, useState } from "react";
import { getStr } from "../../lib/HelperFuncs";
import SStorage from "./StyledComp";

const { localStorage, sessionStorage } = window;

export function addData2Storage(storageType) {
  const key = `key_${Date.now().toString()}`;
  try {
    storageType.setItem(key, getStr());
  } catch (error) {
    alert(`*** LocalStorage: '${error.name}'`);
  }
}

export function emptyStorage(storageType) {
  storageType.clear();
}

export const Storage = ({ storageType, name }) => {
  const [size, setSize] = useState(storageType.length);
  const handleAdd2Storage = () => {
    addData2Storage(storageType);
    setSize(storageType.length);
  };
  const handleEmptyStorage = () => {
    emptyStorage(storageType); // sync
    setSize(storageType.length);
  };

  useEffect(() => {
    const handleStorageChange = () => setSize(0);
    const clearAllBtn = document.getElementById("clearAll-Btn");
    clearAllBtn.addEventListener("click", handleStorageChange);
    return () => {
      clearAllBtn.removeEventListener("click", handleStorageChange);
    };
  }, []);

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>
        {name} = <SStorage.Value>{size}MB</SStorage.Value>
      </SStorage.InfoWrapper>
      <SStorage.Btn onClick={handleEmptyStorage}>Empty</SStorage.Btn>
      <SStorage.Btn onClick={handleAdd2Storage}>Add</SStorage.Btn>
    </SStorage.Section>
  );
};

export const LocalStorage = () => (
  <Storage storageType={localStorage} name={"Local Storage"} />
);
export const SessionStorage = () => (
  <Storage storageType={sessionStorage} name={"Session Storage"} />
);
