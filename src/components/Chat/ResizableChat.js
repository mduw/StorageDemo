import { useEffect, useState } from "react";
import "./styles.css";

const CHATBOX_DIM = {
  RESIZABLE_MINWIDTH: 800,
  SIDEBAR: {
    MINWIDTH: 200,
    MAXWIDTH: 300,
  }
}

export default function ResizableChatWindow({ ChatList, ChatDetails }) {
  const [dragging, setDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState();

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  useEffect(() => {
    let myEl = document.getElementById("chatboxWrapper");
    function resize(e) {
      if (e.pageX > CHATBOX_DIM.SIDEBAR.MAXWIDTH || e.pageX < CHATBOX_DIM.SIDEBAR.MINWIDTH) {  
        return;
      }
      if (window.innerWidth <=CHATBOX_DIM.RESIZABLE_MINWIDTH) {
        myEl.style.setProperty("--left-width", CHATBOX_DIM.SIDEBAR.MINWIDTH + "px");
        return;
      }
      myEl.style.setProperty("--left-width", e.pageX + "px");
    }
    function clearJSEvents() {
      setDragging(false);
      myEl.removeEventListener("mousemove", resize);
    }

    function windowSizeHandler (event) {
      setWindowWidth(window.innerWidth);
    }

    if (dragging) {
      myEl.addEventListener("mousemove", resize);
      myEl.addEventListener("mouseup", clearJSEvents);
    }
    
    window.addEventListener('resize', windowSizeHandler);

    return () => {
      myEl.removeEventListener("mouseup", clearJSEvents);
      myEl.removeEventListener("mousemove", resize);
      window.removeEventListener('resize', windowSizeHandler);
    };
    
  }, [dragging]);

  useEffect(()=>{
    let myEl = document.getElementById("chatboxWrapper");
    if (windowWidth <=CHATBOX_DIM.RESIZABLE_MINWIDTH) {
      myEl.style.setProperty("--left-width", CHATBOX_DIM.SIDEBAR.MINWIDTH + "px");
    }

  },[windowWidth]);

  return (
    <div id="chatboxWrapper">
      <section id="sidebar">
        <div id="dragbar" onMouseDown={handleMouseDown} />
        {ChatList}
      </section>
      <div id="main">{ChatDetails}</div>
    </div>
  );
}
