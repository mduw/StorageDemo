import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStr } from "../../lib/HelperFuncs";
import SStorage from "./StyledComp";

const DB_NAME = "demo_db";
const STORE_NAME = "messages";
let db;

function connect2DB(postTask = null) {
  const request = window.indexedDB.open(DB_NAME);
  request.onupgradeneeded = function (event) {
    db = request.result;
    db.onerror = function (errorEvent) {
      alert("IndexedDB: FAILED TO LOAD DB");
    };
    db.createObjectStore(STORE_NAME);
    event.target.oncomplete = () => {
      if (postTask) postTask();
    };
  };

  request.onsuccess = function (event) {
    db = request.result;
    console.log("IndexedDB: CONNECTED");
    if (postTask) postTask();
  };
  closeDBConnection();
}

function closeDBConnection() {
  if (db) db.close();
  console.log("IndexedDB: CONNECTION CLOSED");
}

function addData2IDB() {
  const data = getStr();
  const key = `msg_${Date.now().toString()}`;
  const tx = db.transaction([STORE_NAME], "readwrite");
  const objectStore = tx.objectStore(STORE_NAME);
  const objectStoreRequest = objectStore.add(data, key);
  objectStoreRequest.onsuccess = () => {
    console.log("Successfully added to IndexedDB", data);
  };
  objectStoreRequest.onerror = () => {
    console.log("error");
  };
}

function addData2IDB_Safe() {
  connect2DB(addData2IDB);
}

export const emptyIndexedDB = () => {
  closeDBConnection();
  const delRequest = indexedDB.deleteDatabase(DB_NAME);
  delRequest.onsuccess = function () {
    console.log("IndexedDB: ", DB_NAME, "IS DELETED");
  };
  delRequest.onerror = function () {
    console.log("IndexedDB: FAILED TO DELETE", DB_NAME);
  };
  delRequest.onblocked = function () {
    console.log("IndexedDB: Operation being blocked. Failed to delete DB");
  };
};

export const Database = () => {
  const [loading, setLoading] = useState(true);
  const handleAddDB = () => addData2IDB_Safe();
  const handleEmptyDB = () => emptyIndexedDB();

  useEffect(() => {
    connect2DB(() => setLoading(false));
    return () => {
      closeDBConnection();
    };
  }, []);

  return (
    <SStorage.Section>
      <SStorage.InfoWrapper>IndexedDB</SStorage.InfoWrapper>
      <SStorage.Btn disabled={loading} onClick={handleEmptyDB}>
        Empty
      </SStorage.Btn>
      <SStorage.Btn disabled={loading} onClick={handleAddDB}>
        Add
      </SStorage.Btn>
    </SStorage.Section>
  );
};
