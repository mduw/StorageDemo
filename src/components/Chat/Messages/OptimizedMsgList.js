import React, { Fragment, useEffect, useRef, memo } from "react";
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
    console.log(rowHeights.current[index])
    return rowHeights.current[index] + 8 || 82;
  }

  const RowRenderer = memo(({index, style}) => {
    //console.log(data);
    const rowRef = useRef({});

    useEffect(() => {
      if (rowRef.current) {
        setRowHeight(index, rowRef.current.clientHeight);
      }
    }, [rowRef]);
    console.log("rendering", messages[index].message)
    return (
      <div style={style}>
        <Message message={messages[index]} ref={rowRef} />
      </div>
    );
  });

  function setRowHeight(index, size) {
    listRef.current.resetAfterIndex(0);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  }

  function scrollToBottom() {
    // listRef.current.scrollToItem(messages.length - 1, "end");
    listRef.current.scrollTo(0, listRef.current.scrollHeight);
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
          overscanCount={10}
          itemData={messages}
        >
          {RowRenderer}
        </List>
      )}
    </AutoSizer>
  );
};

export default OptimizedMsgList;
