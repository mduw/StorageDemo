import React, { Fragment, useEffect, useState, memo } from "react";
import useUserStore from "../../stores/UserStore";
import VirtualizedChatList from "./VirtualizedChatList";
import { isEmpty } from "../../lib/HelperFuncs";
import SChatbox from "./StyledComp";

const ChatList = () => {
  const { getCurrentUser } = useUserStore();
  const [currentChatList, setCurrentChatList] = useState([]);
  const [observed, setObserved] = useState();
  const [dimension, setDimension] = useState({});

  useEffect(() => {
    if (!observed) return;
    setDimension({
      height: observed.clientHeight,
      width: observed.clientWidth,
    });
    function resizeHandler() {
      setDimension({
        height: observed.clientHeight,
        width: observed.clientWidth,
      });
    }
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [observed]);

  useEffect(() => {
    // retrieve current chatList
    const initialChatList = getCurrentUser()?.chatList || [];
    setCurrentChatList(initialChatList);

    // listen to changes in chatlist (user create a new group chat)
    const unsub_CurrentChatList = useUserStore.subscribe(
      (chatList) => {
        setCurrentChatList(chatList);
      },
      (state) => state.currentUser.chatList
    );
    return () => unsub_CurrentChatList();
  }, []);
  return (
    <SChatbox.ChatListWrapper ref={(el) => setObserved(el)}>
      {!isEmpty(dimension) && !isEmpty(currentChatList) && (
        <VirtualizedChatList data={currentChatList} dimension={dimension} />
      )}
    </SChatbox.ChatListWrapper>
  );
};

export default memo(ChatList);
