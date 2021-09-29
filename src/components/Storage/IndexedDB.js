import React, { useEffect, useState, useRef, createRef } from "react";
import { getStr, ONE_MB, ByteToMB } from "../../lib/HelperFuncs";
import useMyStorageManager from "../../stores/MyStorageManager";
import { InputField } from "./InputField";
import SStorage from "./StyledComp";

export const DB_NAME = "demo_db";
export const STORES = {
  users: "users",
  messages: "messages",
};

const channel = new BroadcastChannel("idb_changes");
const SAMPLE_KEY = "myid";

export function getTableSize(DBInstance, DBName) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let transaction = DBInstance.transaction([DBName])
      .objectStore(DBName)
      .openCursor();

    transaction.onsuccess = function (event) {
      let cursor = event.target.result;
      if (cursor) {
        let storedObject = cursor.value;
        let json = JSON.stringify(storedObject);
        size += json.length;
        cursor.continue();
      } else {
        resolve(size);
      }
    }.bind(this);
    transaction.onerror = function (err) {
      reject("error in " + DBName + ": " + err);
    };
  });
}

export function getDBSize(postTask = null) {
  connect2DB((DBInstance) => {
    let tableNames = [...DBInstance.objectStoreNames];
    let val = (function (tableNames, DBInstance) {
      let tableSizeGetters = tableNames.reduce((acc, tableName) => {
        acc.push(getTableSize(DBInstance, tableName));
        return acc;
      }, []);

      return Promise.all(tableSizeGetters)
        .then((sizes) => {
          console.log("--------- " + DBInstance.name + " ---------");
          tableNames.forEach((tableName, i) => {
            console.log(tableName + "\t: " + ByteToMB(sizes[i]));
          });
          let totalDBSize = sizes.reduce(function (acc, val) {
            return acc + val;
          }, 0);
          return totalDBSize;
        })
        .then((result) => {
          closeDBConnection(DBInstance);
          if (postTask) postTask(result);
        });
    })(tableNames, DBInstance);
  });
}

export function print(msg) {
  console.log(msg);
}

export function connect2DB(postTask = null) {
  const request = indexedDB.open(DB_NAME);
  request.onerror = (error) => {
    print("IndexedDB ERR: FAILED TO CONNECT", error);
  };
  request.onsuccess = function () {
    // print("IndexedDB: CONNECTED TO DB");
    if (postTask) postTask(request.result);
  };
  request.onupgradeneeded = function (e) {
    const DBInstance = e.currentTarget.result;
    for (let store in STORES) {
      if (DBInstance.objectStoreNames.contains(store))
        DBInstance.deleteObjectStore(store);
      let objectStore = DBInstance.createObjectStore(store);
      if (store === STORES.messages) {
        objectStore.put("1234", SAMPLE_KEY);
      }
    }

    connect2DB(postTask);
  };
  request.onblocked = () => {
    print("IndexedDB: CONNECTION WAS BLOCKED", error);
  };
}

export function closeDBConnection(DBInstance) {
  if (DBInstance) {
    DBInstance.close();
    // print("IndexedDB: CONNECTION CLOSED");
  } else print("IndexedDB: DB NOT FOUND");
}

export function addData2IDB_Safe(
  itemSize,
  key = null,
  data = null,
  postTask = null
) {
  const storeName = STORES.messages;
  if (itemSize || !data) data = getStr(itemSize * ONE_MB);
  if (!key) key = `${new Date().toLocaleTimeString()}_msg_${itemSize}MB`;
  try {
    connect2DB((DBInstance) => {
      const transaction = DBInstance.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const objectStoreRequest = objectStore.put(data, key);

      transaction.onerror = (event) => {
        let error = event.target.error;
        print(`IndexedDB: transaction error`, error);
        if (error.name === "ConstraintError") {
          alert("Key existed !");
          event.preventDefault();
          event.stopPropagation();
        }
      };

      objectStoreRequest.onerror = (event) => {
        print("IndexedDB ERR: FAILED TO ADD DATA");
      };
      objectStoreRequest.onsuccess = function () {
        print(
          `[${new Date().toLocaleTimeString()}] IndexedDB: ADDED ${itemSize}MB`
        );
        closeDBConnection(DBInstance);
        if (postTask) postTask();
      };
      objectStoreRequest.onblocked = () => {
        print(`IndexedDB: BLOCKED ADDING ${itemSize}MB`);
      };
    });
  } catch (error) {
    print("IndexedDB ERR:", error);
  }
}

export function deleteItemByKey_Safe(
  key,
  storeName = STORES.messages,
  postTask = null
) {
  try {
    connect2DB((DBInstance) => {
      const transaction = DBInstance.transaction([storeName], "readwrite");
      const objectStore = transaction.objectStore(storeName);
      const objectStoreRequest = objectStore.delete(key);
      objectStoreRequest.onerror = () => {
        print("IndexedDB ERR: FAILED TO DELETE", key);
      };
      objectStoreRequest.onsuccess = function () {
        print("IndexedDB: DATA ROW DELETED", key);
        closeDBConnection(DBInstance);
        if (postTask) postTask();
      };
      transaction.oncomplete = () => {
        console.log("delete completed");
        closeDBConnection(DBInstance);
      };
      transaction.commit();
    });
  } catch (error) {
    console.log("IndexedDB ERR:", error);
  }
}

export const emptyIndexedDB = (cleanupTask = null) => {
  const delRequest = window.indexedDB.deleteDatabase(DB_NAME);
  delRequest.onsuccess = function () {
    console.log("IndexedDB: ", DB_NAME, "IS DELETED");
    connect2DB((DBInstance) => {
      closeDBConnection(DBInstance);
    });

    if (cleanupTask) cleanupTask();
  };
  delRequest.onerror = function () {
    alert("IndexedDB: FAILED TO DELETE", DB_NAME);
  };
  delRequest.onblocked = function () {
    alert("IndexedDB: OPERATION BEING BLOCKED");
  };
};

export const retrieveItemByKey = (storeName, key, postTask = null) => {
  try {
    connect2DB((DBInstance) => {
      const transaction = DBInstance.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);
      const objectStoreRequest = objectStore.get(key);

      objectStoreRequest.onerror = (event) => {
        print("IndexedDB ERR: FAILED TO GET", key);
      };
      objectStoreRequest.onsuccess = function () {
        closeDBConnection(DBInstance);
        if (postTask) postTask(objectStoreRequest.result);
      };
    });
  } catch (error) {
    print("IndexedDB ERR:", error);
  }
};

const Database = () => {
  const [loading, setLoading] = useState(true);
  const [inpSize, setInpSize] = useState(1);
  const [totalSize, setTotalSize] = useState(0);
  const [key2Del, setKey2Del] = useState();
  const [auto, setAuto] = useState(false);
  const [staleData, setStaleData] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [singleItemSize, setSingleItemSize] = useState(1);
  const [withUpdate, setWithUpdate] = useState(false);
  const updateQuota = useMyStorageManager((state) => state.updateQuota);

  channel.onmessage = (e) => {
    const { action, store, key } = e.data;
    switch (action) {
      case "UPDATE":
        getItemDataByKey(store, key);
        break;

      default:
    }
  };

  const handleDBSize = () => {
    getDBSize();
  };

  const handleSingleItemSize = (kMB) => setSingleItemSize(kMB);
  const handleAutoAddDB = () => {
    setAuto(!auto);
  };
  const handleAddDB = () => {
    if (!key2Del) {
      alert("Key must NOT be empty");
    } else
      addData2IDB_Safe(singleItemSize, key2Del, itemValue, () => {
        getDBSize((total) => setTotalSize(total));

        if (key2Del === "myid") {
          getItemDataByKey(STORES.messages, key2Del); // update current
          if (withUpdate) {
            channel.postMessage({
              // update others
              action: "UPDATE",
              store: "messages",
              key: key2Del,
            });
          }
        }
      });
  };
  const handleEmptyDB = () => emptyIndexedDB(getDBSize(total=>setTotalSize(total)));
  const handleDelByKey = () => {
    if (!key2Del) {
      alert("Key must NOT be empty");
    } else deleteItemByKey_Safe(key2Del, STORES.messages);
  };

  const handleItemValue = (value) => setItemValue(value);
  const handleNewInpSize = (kMB) => setInpSize(kMB);
  const onItemKeyChange = (key) => setKey2Del(key);

  const getItemDataByKey = (store = STORES.messages, key = SAMPLE_KEY) =>
    retrieveItemByKey(store, key, (data) => {
      setStaleData(data);
    });

  useEffect(() => {
    connect2DB((DBInstance) => {
      getItemDataByKey();
      getDBSize((total) => setTotalSize(total));
      closeDBConnection(DBInstance);
      setLoading(false);
    });
    return () => {
      channel.close();
    };
  }, []);

  useEffect(() => {
    let autoAddTimer;
    if (auto) {
      autoAddTimer = setInterval(() => {
        addData2IDB_Safe(inpSize, null, null, () =>
          getDBSize((total) => setTotalSize(total))
        );
      }, 1000);
    } else {
      clearInterval(autoAddTimer);
    }
    return () => {
      clearInterval(autoAddTimer);
    };
  }, [auto, totalSize, inpSize]);

  return (
    <>
      <SStorage.Section style={{ height: "90px" }}>
        <SStorage.InfoWrapper>
          IndexedDB = <SStorage.Value>{ByteToMB(totalSize)}</SStorage.Value>
        </SStorage.InfoWrapper>
        <SStorage.Btn.Clear disabled={loading} onClick={handleEmptyDB}>
          Reset
        </SStorage.Btn.Clear>
        <SStorage.Btn onClick={handleAutoAddDB} style={{ width: "auto" }}>
          {auto ? "Auto OFF" : "Auto ON"}
        </SStorage.Btn>

        <InputField
          type="number"
          placeholder="1MB"
          defaultVal="10"
          postTask={handleNewInpSize}
        />
      </SStorage.Section>
      <SStorage.PlainSectionOuter style={{ height: "90px" }}>
        <SStorage.InfoWrapper>Single Item</SStorage.InfoWrapper>
        <SStorage.Btn.Clear disabled={loading} onClick={handleDelByKey}>
          Delete
        </SStorage.Btn.Clear>
        <SStorage.Btn disabled={loading} onClick={handleAddDB}>
          Add
        </SStorage.Btn>
        <SStorage.Btn disabled={loading} onClick={handleDBSize}>
          Size
        </SStorage.Btn>
        <InputField
          type="number"
          defaultVal=""
          placeholder="size"
          width="50px"
          postTask={handleSingleItemSize}
        />
        <InputField
          type="text"
          placeholder="Value"
          defaultVal=""
          width="110px"
          postTask={handleItemValue}
        />

        <InputField
          defaultVal=""
          placeholder="Object key"
          width="110px"
          postTask={onItemKeyChange}
        />
      </SStorage.PlainSectionOuter>
      <SStorage.PlainSectionOuter style={{ height: "150px" }}>
        <h4>Stale database due to multiple update</h4>
        <input
          type="checkbox"
          id="updateDummy"
          name="updateDummy"
          checked={withUpdate}
          onChange={(e) => setWithUpdate(!withUpdate)}
        />
        <label htmlFor="updateDummy">Trigger update on other tabs</label>
        <SStorage.StaleData>
          {SAMPLE_KEY} | {staleData}
        </SStorage.StaleData>
      </SStorage.PlainSectionOuter>
    </>
  );
};

export { Database };
