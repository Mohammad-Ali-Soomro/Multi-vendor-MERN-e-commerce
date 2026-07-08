import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { format } from "timeago.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlineSend, AiOutlineArrowLeft } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { toast } from "react-toastify";

import Header from "../components/Layout/Header";
import { server } from "../server";
import styles from "../styles/styles";

const pusherClient = new Pusher("10786f69d8cc214426b4", {
  cluster: "ap2",
});

const UserInbox = () => {
  const { user, loading } = useSelector((state) => state.user);

  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [images, setImages] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat?._id) {
      const channel = pusherClient.subscribe(`chat-${currentChat._id}`);
      channel.bind("new-message", (data) => {
        setMessages((prev) => {
          const alreadyExists = prev.some(
            (m) => m._id && data._id && m._id === data._id
          );
          if (alreadyExists) return prev;
          return [...prev, data];
        });
      });
      return () => {
        channel.unbind("new-message");
        pusherClient.unsubscribe(`chat-${currentChat._id}`);
      };
    }
  }, [currentChat]);

  // Fetch user conversations
  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
          { withCredentials: true }
        );
        setConversations(response.data.conversations || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (user?._id) {
      getConversations();
    }
  }, [user?._id, messages]);

  // Fetch messages of current chat
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`,
          { withCredentials: true }
        );
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error(error);
      }
    };
    if (currentChat?._id) {
      getMessages();
    }
  }, [currentChat]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msgObj = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const response = await axios.post(
        `${server}/message/create-new-message`,
        msgObj,
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, response.data.message]);
      updateLastMessage();
    } catch (err) {
      console.error(err);
    }
  };

  const updateLastMessage = async () => {
    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user._id,
        },
        { withCredentials: true }
      );
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          imageSendingHandler(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const imageSendingHandler = async (imageString) => {
    const msgObj = {
      sender: user._id,
      text: "",
      images: imageString,
      conversationId: currentChat._id,
    };

    try {
      const response = await axios.post(
        `${server}/message/create-new-message`,
        msgObj,
        { withCredentials: true }
      );
      setMessages((prev) => [...prev, response.data.message]);
      updateLastMessageForImage();
    } catch (err) {
      console.error(err);
    }
  };

  const updateLastMessageForImage = async () => {
    try {
      await axios.put(
        `${server}/conversation/update-last-message/${currentChat._id}`,
        {
          lastMessage: "Photo",
          lastMessageId: user._id,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {!open && <Header />}
      
      <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 flex">
        {!open ? (
          <div className="w-full bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4 font-Poppins">
              All Messages
            </h3>
            <div className="space-y-2">
              {conversations && conversations.length !== 0 ? (
                conversations.map((item, index) => (
                  <MessageList
                    key={index}
                    data={item}
                    index={index}
                    setOpen={setOpen}
                    setCurrentChat={setCurrentChat}
                    setUserData={setUserData}
                    setActiveStatus={setActiveStatus}
                    online={false}
                    me={user?._id}
                  />
                ))
              ) : (
                <h5 className="text-center text-gray-500 py-10 font-[500]">
                  No conversations yet!
                </h5>
              )}
            </div>
          </div>
        ) : (
          <SellerInbox
            setOpen={setOpen}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessageHandler={sendMessageHandler}
            messages={messages}
            sellerId={user?._id} // user is the sender
            userData={userData}
            activeStatus={activeStatus}
            scrollRef={scrollRef}
            handleImageUpload={handleImageUpload}
          />
        )}
      </div>
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  setUserData,
  setActiveStatus,
  online,
  me,
}) => {
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const userId = data.members.find((m) => m !== me);
    axios
      .get(`${server}/shop/get-shop-info/${userId}`)
      .then((res) => {
        setShop(res.data.shop);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data, me]);

  const isMe = data.lastMessageId === me;
  const lastMsgDisplay = isMe ? `You: ${data.lastMessage}` : data.lastMessage;

  const handleClick = () => {
    setOpen(true);
    setCurrentChat(data);
    setUserData(shop);
    setActiveStatus(online);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition border border-transparent hover:border-gray-200"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={shop?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover border"
          />
          <div
            className={`w-[12px] h-[12px] rounded-full border-2 border-white absolute bottom-[2px] right-[2px] ${
              online ? "bg-green-500" : "bg-gray-400"
            }`}
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 text-sm md:text-base">
            {shop?.name}
          </h4>
          <p className="text-gray-500 text-xs md:text-sm truncate max-w-[200px] sm:max-w-[400px]">
            {lastMsgDisplay}
          </p>
        </div>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border flex flex-col h-[75vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-3">
          <AiOutlineArrowLeft
            size={24}
            className="cursor-pointer text-gray-600 hover:text-black mr-2"
            onClick={() => setOpen(false)}
          />
          <img
            src={userData?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
            alt=""
            className="w-[45px] h-[45px] rounded-full object-cover border"
          />
          <div>
            <h4 className="font-bold text-gray-800 text-sm md:text-base">
              {userData?.name}
            </h4>
            <p className="text-xs text-gray-400">
              {activeStatus ? "Active Now" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-6 overflow-y-scroll space-y-4 bg-gray-50">
        {messages &&
          messages.map((item, index) => {
            const isMe = item.sender === sellerId;
            return (
              <div
                key={index}
                className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}
              >
                {!isMe && (
                  <img
                    src={userData?.avatar?.url || "https://shopo.quomodothemes.website/assets/images/user.png"}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full object-cover border mr-2 self-end mb-1"
                  />
                )}
                <div className="max-w-[70%] space-y-1">
                  {item.images && (
                    <img
                      src={item.images}
                      alt="image_msg"
                      className="max-w-full max-h-[220px] object-cover rounded border"
                    />
                  )}
                  {item.text && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        isMe
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border text-gray-800 rounded-bl-none shadow-sm"
                      }`}
                    >
                      <p>{item.text}</p>
                    </div>
                  )}
                  <p className="text-[10px] text-gray-400 px-1 text-right">
                    {format(item.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        <div ref={scrollRef} />
      </div>

      {/* Send Message Form */}
      <form onSubmit={sendMessageHandler} className="px-6 py-4 border-t flex items-center space-x-3 bg-white">
        <input
          type="file"
          id="imgUpload"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="imgUpload">
          <TfiGallery size={20} className="cursor-pointer text-gray-500 hover:text-blue-500 transition" />
        </label>
        <input
          type="text"
          placeholder="Write a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-[36px] h-[36px] rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition"
        >
          <AiOutlineSend size={18} />
        </button>
      </form>
    </div>
  );
};

export default UserInbox;
