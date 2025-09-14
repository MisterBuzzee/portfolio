
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { HistoryItem } from './types';
import { getCommandOutput, initialHistory } from './utils/commandProcessor';

// Component: Header for the terminal window
const TerminalHeader: React.FC = () => (
  <div className="bg-gray-700 p-2 rounded-t-lg flex items-center">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
    </div>
    <div className="flex-grow text-center text-gray-300 text-sm">
      MRBZ -- portfolio
    </div>
  </div>
);

// Component: The prompt that appears before each command line
const Prompt: React.FC = () => (
    <span className="flex-shrink-0">
        <span className="text-cyan-400 hidden sm:inline">guest@mrbz.dev</span>
        <span className="text-gray-400 hidden sm:inline">:</span>
        <span className="text-yellow-400">~</span>
        <span className="text-gray-400">$</span>
    </span>
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
            <div className="flex items-start flex-wrap">
                <Prompt />
                <span className="ml-2 text-gray-200 break-all">{item.command}</span>
            </div>
            <div className="text-gray-300">{item.output}</div>
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
        <Prompt />
        <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={onCommandChange}
            className="bg-transparent border-none text-gray-200 flex-1 ml-2 focus:outline-none"
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
            className="min-h-screen text-white p-4 sm:p-8 flex items-center justify-center font-mono"
            onClick={focusInput}
        >
            <div className="w-full max-w-4xl h-[80vh] bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-lg flex flex-col">
                <TerminalHeader />
                <div className="flex-1 p-4 overflow-y-auto">
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
        </div>
    );
};

export default App;
