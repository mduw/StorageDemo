import React, { memo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { Message } from "./Message";
import SChatbox from "./StyledComp";
import { ChatListDetails } from "./ChatList";
import "./styles.css";

const VirtualizedChatList = ({ data, dimension }) => {
  //console.log(dimension);
  const cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
  });
  const rowRenderer = ({ key, index, style, parent }) => {
    return (
      <CellMeasurer
        cache={cellMeasurerCache}
        rowIndex={index}
        key={key}
        parent={parent}
      >
        <div style={style}>
          <SChatbox.ChatListDetailsWrapper>
            <ChatListDetails key={key} chatID={data[index]} />
          </SChatbox.ChatListDetailsWrapper>
        </div>
      </CellMeasurer>
    );
  };
  return (
    <SChatbox.VirtualizedChatList
      height={dimension.height}
      width={dimension.width}
      rowCount={data.length}
      rowHeight={cellMeasurerCache.rowHeight}
      rowRenderer={rowRenderer}
      deferredMeasurementCache={cellMeasurerCache}
    />
  );
};

export default memo(VirtualizedChatList);
