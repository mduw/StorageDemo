import React, { memo, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { CellMeasurer, CellMeasurerCache } from "react-virtualized";
import SChatbox from "../StyledComp";
import { Message } from "./Message";

const VirtualizedMessageList = ({ data, dimension }) => {
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
          <div style={{ padding: "0.8em 0" }}>
            <Message message={data[index]} />
          </div>
        </div>
      </CellMeasurer>
    );
  };
  return (
    <SChatbox.VirtualizedList
      height={dimension.height || 300}
      width={dimension.width}
      rowCount={data.length}
      rowHeight={cellMeasurerCache.rowHeight}
      rowRenderer={rowRenderer}
      deferredMeasurementCache={cellMeasurerCache}
    />
  );
};

export default memo(VirtualizedMessageList);
