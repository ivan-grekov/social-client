import React, { useEffect } from 'react';
import Conversation from '../../components/conversation/Conversation';
import Header from '../../components/header/Header';
import './messenger.scss';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../static/types';
import axios from 'axios';
import { IConversation } from '../../static/types';
import { IMessage } from '../../static/types';
import { BASE_URL } from '../../apiCalls';

const Messenger = () => {
  const [conversations, setConversations] = React.useState([]);
  const [currentChat, setCurrentChat] = React.useState<IConversation | null>(
    null
  );
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const { user } = React.useContext(AuthContext) as UserContext;
  const scrollRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/conversations/` + user?._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/messages/` + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmitSend = async (e: React.MouseEvent) => {
    e.preventDefault();
    const message = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <>
              {conversations.map((c: IConversation) => (
                <div onClick={() => setCurrentChat(c)} key={c._id}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </>
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages?.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user?._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmitSend}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
