import React, { useEffect, useState } from "react";
import { getStr, ONE_MB } from "../../lib/HelperFuncs";
import { InputField } from "./InputField";
import SStorage from "./StyledComp";

export const DB_NAME = "demo_db";
export const STORES = {
  users: "users",
  messages: "messages",
};

export function print(msg) { console.log(msg); }

export function connect2DB(postTask = null) {
	const request = indexedDB.open(DB_NAME);
	request.onerror = (error) => { print("IndexedDB ERR: FAILED TO CONNECT", error); }
	request.onsuccess = function(){
    print("IndexedDB: CONNECTED TO DB");
    if (postTask) postTask(request.result);
	}
	request.onupgradeneeded = function(e){
		const DBInstance = e.currentTarget.result;
		for (let store in STORES) {
      if (DBInstance.objectStoreNames.contains(store)) DBInstance.deleteObjectStore(store);
      DBInstance.createObjectStore(store); 
    }

		connect2DB(postTask);
	}
}

export function closeDBConnection(DBInstance) {
  if (DBInstance) {
    DBInstance.close();
    print("IndexedDB: CONNECTION CLOSED");
  } else print("IndexedDB: DB NOT FOUND");
}

export function addData2IDB_Safe(itemSize, postTask = null) {
  const storeName = STORES.messages;
  const data = getStr(itemSize * ONE_MB);
  const key = `msg_${Date.now().toString()}`;
  try {
    connect2DB((DBInstance) => {
      const transaction = DBInstance.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const objectStoreRequest = objectStore.add(data, key);
      objectStoreRequest.onerror = () => { print("IndexedDB ERR: FAILED TO ADD DATA"); };
      objectStoreRequest.onsuccess = function(){
        print("IndexedDB: DATA ROW ADDED");
        closeDBConnection(DBInstance);
        if (postTask) postTask();
      }
    });

  } catch (error) {
    print("IndexedDB ERR:", error);
  }
}

export function deleteItemByKey_Safe(key, storeName = STORES.messages, postTask=null) {
  try {
    connect2DB((DBInstance) => {
      const transaction = DBInstance.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const objectStoreRequest = objectStore.delete(key);
      objectStoreRequest.onerror = () => { print("IndexedDB ERR: FAILED TO DELETE", key); };
      objectStoreRequest.onsuccess = function(){
        print("IndexedDB: DATA ROW DELETED", key);
        closeDBConnection(DBInstance);
        if (postTask) postTask();
      }
    });

  } catch (error) {
    console.log("IndexedDB ERR:", error);
  }
}

export const emptyIndexedDB = (cleanupTask = null) => {
  const delRequest = window.indexedDB.deleteDatabase(DB_NAME);
  delRequest.oncomplete = function () {
    console.log("IndexedDB: ", DB_NAME, "IS DELETED");
    if (cleanupTask) cleanupTask();
  };
  delRequest.onerror = function () {
    console.log("IndexedDB: FAILED TO DELETE", DB_NAME);
  };
  delRequest.onblocked = function () {
    console.log("IndexedDB: OPERATION BEING BLOCKED");
  };
};

const Database = () => {
  const [loading, setLoading] = useState(true);
  const [inpSize, setInpSize] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [key2Del, setKey2Del] = useState();

  const handleAddDB = () =>
    addData2IDB_Safe(inpSize, () => setTotalSize(totalSize + inpSize));
  const handleEmptyDB = () => emptyIndexedDB(() => setTotalSize(0));
  const handleDelByKey = () => deleteItemByKey_Safe(key2Del, STORES.messages);

  const handleNewInpSize = (kMB) => setInpSize(kMB);
  const onItemKeyChange = (key) => setKey2Del(key);

  useEffect(() => {
    connect2DB((DBInstance) => {
      closeDBConnection(DBInstance);
      setLoading(false);
    });  
  }, []);

  return (
    <>
      <SStorage.Section>
        <SStorage.InfoWrapper>
          IndexedDB = <SStorage.Value>{totalSize}MB</SStorage.Value>
        </SStorage.InfoWrapper>
        <SStorage.Btn.Clear disabled={loading} onClick={handleEmptyDB}>
          Reset
        </SStorage.Btn.Clear>
        <SStorage.Btn disabled={loading} onClick={handleAddDB}>
          Add
        </SStorage.Btn>
        <InputField type="number" postTask={handleNewInpSize} />
      </SStorage.Section>
      <SStorage.Section>
        <SStorage.Btn.Clear disabled={loading} onClick={handleDelByKey}>
          Delete
        </SStorage.Btn.Clear>
        <InputField
          defaultVal=""
          placeholder="Object key"
          width="80px"
          postTask={onItemKeyChange}
        />
      </SStorage.Section>
    </>
  );
};

export { Database };
