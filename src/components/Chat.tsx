import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Image, Paperclip } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { useStore } from '../store';

function Chat() {
  const [message, setMessage] = useState('');
  const addMessage = useStore((state) => state.addMessage);
  const currentUser = useStore((state) => state.currentUser);
  const messages = useStore((state) => state.messages);

  const handleSend = () => {
    if (!message.trim() || !currentUser) return;

    addMessage({
      id: Date.now().toString(),
      content: message,
      sender: currentUser,
      timestamp: new Date(),
      reactions: [],
    });

    setMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${
                msg.sender.id === currentUser?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender.id === currentUser?.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p>{msg.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-gray-700 p-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1 bg-gray-700 rounded-lg p-2">
            <TextareaAutosize
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent outline-none resize-none text-white"
              maxRows={5}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
          </div>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Smile className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Image className="w-6 h-6 text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
            <Paperclip className="w-6 h-6 text-gray-400" />
          </button>
          <button
            onClick={handleSend}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;