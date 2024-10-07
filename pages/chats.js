import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (!username || !secret) {
      router.push("/");
    }
  }, [username, secret, router]);

  const handleMessageUpload = (event, chatId) => {
    const file = event.target.files[0];
    if (file) {
      chatEngine.sendMessage(chatId, {
        text: "Here's a media file!",
        file: file,
      });
    }
  };

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID="349af92b-fa9c-42d6-8bec-109c21183cab"
          userName={username}
          userSecret={secret}
          renderNewMessageForm={({ chatId }) => (
            <MessageFormSocial 
              className="message-form-social"
              onUpload={(event) => handleMessageUpload(event, chatId)}
            />
          )}
        />
      </div>
    </div>
  );
}
