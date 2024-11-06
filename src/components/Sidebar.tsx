import React from 'react';
import { motion } from 'framer-motion';
import { Users, Settings, Moon, Sun } from 'lucide-react';
import { useStore } from '../store';

function Sidebar() {
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-800 border-r border-gray-700 p-4"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">Chats</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Users className="w-5 h-5" />
          <span>All Chats</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </motion.div>
  );
}

export default Sidebar;