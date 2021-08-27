import React, { Fragment, useEffect, useRef } from "react";
import { VariableSizeList as List } from "react-window";
import { AutoSizer } from "react-virtualized";
import { Message } from "./Message";

const OptimizedMsgList = ({ messages }) => {
  const listRef = useRef({});
  const rowHeights = useRef({});

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  function getRowHeight(index) {
    return rowHeights.current[index] + 8 || 82;
  }

  function RowRenderer({ index, style }) {
    const rowRef = useRef({});

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);

    return (
      <div style={style}>
        <Message message={messages[index]} ref={rowRef} />
      </div>
    );
  }

  function setRowHeight(index, size) {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  function scrollToBottom() {
    listRef.current.scrollToItem(messages.length - 1, "end");
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          ref={listRef}
          height={height}
          itemCount={messages.length}
          itemSize={getRowHeight}
          width={width}
        >
          {RowRenderer}
        </List>
      )}
    </AutoSizer>
  );
};

export default OptimizedMsgList;
