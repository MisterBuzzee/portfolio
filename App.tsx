
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { HistoryItem } from './types';
import { getCommandOutput, initialHistory } from './utils/commandProcessor';

// Component: Header for the terminal window
const TerminalHeader: React.FC = () => (
  <div className="bg-blue-900 p-2 flex items-center" style={{ 
    borderBottom: '2px solid #ffffff',
    backgroundColor: '#000080' // Classic Windows blue
  }}>
    <div className="flex space-x-2 ml-1">
      <div 
        className="w-6 h-6 flex items-center justify-center text-black font-bold text-xs"
        style={{ 
          backgroundColor: '#c0c0c0', 
          borderLeft: '1px solid #ffffff', 
          borderTop: '1px solid #ffffff', 
          borderRight: '1px solid #808080', 
          borderBottom: '1px solid #808080' 
        }}
      >
        ×
      </div>
    </div>
    <div className="flex-grow text-center text-white text-sm font-bold">
      MRBZ TERMINAL - <span className="text-yellow-300">[Version 1.0.0]</span>
    </div>
  </div>
);

// Component: Windows Taskbar
const WindowsTaskbar: React.FC = () => (
  <div 
    className="fixed bottom-0 left-0 right-0 h-8 flex items-center px-2 text-black text-sm font-bold"
    style={{
      backgroundColor: '#c0c0c0', // Classic Windows grey
      borderTop: '2px solid #ffffff',
      borderLeft: '2px solid #ffffff',
      borderRight: '2px solid #808080',
      borderBottom: '2px solid #808080'
    }}
  >
    <div className="flex items-center space-x-1">
      <div 
        className="px-2 py-1 flex items-center"
        style={{
          backgroundColor: '#c0c0c0', // Grey background
          borderLeft: '1px solid #ffffff',
          borderTop: '1px solid #ffffff',
          borderRight: '1px solid #808080',
          borderBottom: '1px solid #808080',
          color: 'black'
        }}
      >
        <span className="mr-1">⊞</span>
        Start
      </div>
      <div 
        className="px-2 py-1 flex items-center"
        style={{
          backgroundColor: '#c0c0c0', // Grey background
          borderLeft: '1px solid #808080',
          borderTop: '1px solid #808080',
          borderRight: '1px solid #ffffff',
          borderBottom: '1px solid #ffffff',
          color: 'black'
        }}
      >
        MRBZ Terminal
      </div>
    </div>
    <div className="flex-grow"></div>
    <div 
      className="px-2 py-1"
      style={{
        backgroundColor: '#c0c0c0', // Grey background
        borderLeft: '1px solid #808080',
        borderTop: '1px solid #808080',
        borderRight: '1px solid #ffffff',
        borderBottom: '1px solid #ffffff',
        color: 'black'
      }}
    >
      10:15 AM
    </div>
  </div>
);

// Component: Renders a single history item (command + output)
interface HistoryItemProps {
    item: HistoryItem;
}
const HistoryDisplay: React.FC<HistoryItemProps> = ({ item }) => {
    if (item.command === 'welcome') {
        return <div className="mb-4">{item.output}</div>;
    }
    return (
        <div className="mb-4">
            <div className="flex items-center">
                <span className="text-green-400 font-bold">C:\&gt;</span>
                <span className="ml-2 text-white">{item.command}</span>
            </div>
            <div className="text-cyan-100 mt-1">{item.output}</div>
        </div>
    );
};


// Component: The input line for the user
interface InputProps {
    command: string;
    onCommandChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCommandSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
}
const CommandInput: React.FC<InputProps> = ({ command, onCommandChange, onCommandSubmit, inputRef }) => (
    <form onSubmit={onCommandSubmit} className="flex items-center">
        <span className="text-green-400 font-bold">C:\&gt;</span>
        <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={onCommandChange}
            className="bg-transparent border-none text-white flex-1 ml-2 focus:outline-none font-mono"
            autoFocus
            spellCheck="false"
            autoComplete="off"
        />
    </form>
);


// Main App Component
const App: React.FC = () => {
    const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
    const [command, setCommand] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    },[]);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedCommand = command.trim();

        if (trimmedCommand.toLowerCase() === 'clear') {
            setHistory([]);
            setCommand('');
            return;
        }

        const output = getCommandOutput(trimmedCommand);
        const newHistoryItem: HistoryItem = { command: trimmedCommand, output };

        setHistory(prev => [...prev, newHistoryItem]);
        setCommand('');
        scrollToBottom();
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div 
            className="min-h-screen text-white p-4 sm:p-8 flex items-center justify-center font-mono bg-gray-500"
            onClick={focusInput}
            style={{
                // Classic Windows 95/98 retro background pattern
                backgroundImage: `
                    linear-gradient(45deg, #c0c0c0 25%, transparent 25%, transparent 75%, #c0c0c0 75%),
                    linear-gradient(45deg, #c0c0c0 25%, transparent 25%, transparent 75%, #c0c0c0 75%),
                    linear-gradient(to bottom, #008080, #008080)
                `,
                backgroundSize: '4px 4px, 4px 4px, 100% 100%',
                backgroundPosition: '0 0, 2px 2px, 0 0',
                backgroundColor: '#008080' // Classic Windows teal
            }}
        >
            <div 
                className="w-full max-w-4xl h-[70vh] flex flex-col shadow-2xl"
                style={{
                    borderLeft: '2px solid #ffffff',
                    borderTop: '2px solid #ffffff',
                    borderRight: '2px solid #808080',
                    borderBottom: '2px solid #808080',
                    backgroundColor: '#000000'
                }}
            >
                <TerminalHeader />
                <div 
                    className="flex-1 p-4 overflow-y-auto"
                    style={{
                        borderLeft: '1px solid #c0c0c0',
                        borderTop: '1px solid #c0c0c0',
                        borderRight: '1px solid #808080',
                        borderBottom: '1px solid #808080',
                        margin: '2px'
                    }}
                >
                    {history.map((item, index) => (
                        <HistoryDisplay key={index} item={item} />
                    ))}
                    <CommandInput 
                        command={command}
                        onCommandChange={(e) => setCommand(e.target.value)}
                        onCommandSubmit={handleCommandSubmit}
                        inputRef={inputRef}
                    />
                    <div ref={terminalEndRef} />
                </div>
            </div>
            <WindowsTaskbar />
        </div>
    );
};

export default App;
