import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from './store';
import LoadingScreen from './components/LoadingScreen';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';

function App() {
  const isLoading = useStore((state) => state.isLoading);
  const setIsLoading = useStore((state) => state.setIsLoading);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div className="h-full flex">
            <Sidebar />
            <Chat />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;