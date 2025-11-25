import React, { useState, useEffect } from 'react';
import { DEFAULT_THEME, PRESETS } from './constants';
import { ComfyTheme } from './types';
import { ThemePreview } from './components/ThemePreview';
import { generateMatrixTheme } from './services/gemini';
import { ColorInput } from './components/ColorInput';
import { 
  ArrowRight, Code, Terminal, Zap, Copy, Check, 
  Palette, Layout, Box, Monitor, Wand2, RefreshCcw, Download, MousePointerClick
} from 'lucide-react';

type Tab = 'slots' | 'graph' | 'ui' | 'json';

function App() {
  const [currentTheme, setCurrentTheme] = useState<ComfyTheme>(DEFAULT_THEME);
  const [activeTab, setActiveTab] = useState<Tab>('slots');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('dark');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  // Load preset when selector changes
  const handlePresetChange = (id: string) => {
    setSelectedPresetId(id);
    const preset = PRESETS.find(p => p.id === id);
    if (preset) {
      setCurrentTheme(JSON.parse(JSON.stringify(preset))); // Deep copy to avoid mutation
    }
  };

  const handleColorChange = (
    category: 'node_slot' | 'litegraph_base' | 'comfy_base',
    key: string,
    value: string
  ) => {
    setCurrentTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [category]: {
          ...prev.colors[category],
          [key]: value
        }
      }
    }));
    // If we edit manually, we are technically "Custom" now
    if (selectedPresetId !== 'custom') {
      setSelectedPresetId('custom');
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      // We pass the current theme as a base so Gemini sees our current state
      const newTheme = await generateMatrixTheme(currentTheme);
      setCurrentTheme(newTheme);
      setSelectedPresetId('custom'); // AI generated is custom
    } catch (e: any) {
      // Nicer error message handling
      let msg = "Failed to generate theme.";
      if (e.message && e.message.includes("API Key is missing")) {
        msg = "Missing API Key. AI features are disabled, but the editor still works.";
      }
      setError(msg);
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentTheme, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const jsonString = JSON.stringify(currentTheme, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Sanitize filename
    const filename = (currentTheme.name || 'comfyui-theme')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '.json';

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Logic to handle clicking on the Preview
  const handlePreviewSelect = (category: 'node_slot' | 'litegraph_base' | 'comfy_base', key: string) => {
    // 1. Determine which tab controls this category
    let targetTab: Tab = 'slots';
    if (category === 'litegraph_base') targetTab = 'graph';
    if (category === 'comfy_base') targetTab = 'ui';
    if (category === 'node_slot') targetTab = 'slots';

    // 2. Switch Tab
    setActiveTab(targetTab);

    // 3. Highlight and Scroll
    setHighlightedKey(key);
    
    // Small delay to allow tab switch rendering
    setTimeout(() => {
        const element = document.getElementById(`input-${key}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);

    // Remove highlight after a few seconds
    setTimeout(() => setHighlightedKey(null), 2000);
  };

  return (
    <div className="h-screen bg-neutral-950 text-neutral-200 flex flex-col font-sans overflow-hidden">
      
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900 h-16 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black tracking-tighter select-none cursor-default hover:scale-105 transition-transform">
            <span className="text-purple-500">Pimp</span>
            <span className="text-orange-500">My</span>
            <span className="text-white">ComfyUI</span>
          </h1>
          
          <div className="h-8 w-px bg-neutral-700 mx-2 hidden sm:block"></div>
          
          {/* Preset Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium uppercase tracking-wide hidden md:block">Template:</span>
            <select 
              value={selectedPresetId}
              onChange={(e) => handlePresetChange(e.target.value)}
              className="bg-neutral-800 text-sm text-neutral-200 border-neutral-700 rounded px-3 py-1.5 focus:ring-1 focus:ring-purple-500 outline-none cursor-pointer"
            >
              {PRESETS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
              <option value="custom">Custom Configuration</option>
            </select>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all border
              ${isGenerating 
                ? 'bg-neutral-800 border-neutral-700 text-neutral-500 cursor-not-allowed' 
                : 'bg-indigo-900/30 border-indigo-700 text-indigo-300 hover:bg-indigo-800/50 hover:text-indigo-100 hover:shadow-lg hover:shadow-indigo-900/20'
              }
            `}
          >
            {isGenerating ? (
               <RefreshCcw size={14} className="animate-spin" />
            ) : (
               <Wand2 size={14} />
            )}
            {isGenerating ? 'Dreaming...' : 'AI Remix'}
          </button>

          <div className="h-6 w-px bg-neutral-800 mx-1"></div>

          <button 
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 rounded-md text-xs font-bold transition-colors"
            title="Copy JSON to clipboard"
          >
             {copied ? <Check size={14} /> : <Copy size={14} />}
             {copied ? 'Copied' : 'Copy'}
          </button>

          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-md text-xs font-bold transition-colors shadow-lg shadow-green-900/20"
            title="Download JSON file"
          >
             <Download size={14} />
             Download
          </button>
        </div>
      </header>

      {/* Main Layout: Split View */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Editor */}
        <aside className="w-96 flex flex-col border-r border-neutral-800 bg-neutral-900/50 shrink-0 z-20">
          
          {/* Tabs */}
          <div className="flex border-b border-neutral-800">
            {[
              { id: 'slots', label: 'Nodes', icon: Box },
              { id: 'graph', label: 'Graph', icon: Layout },
              { id: 'ui', label: 'Menu', icon: Monitor },
              { id: 'json', label: 'Code', icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`
                  flex-1 flex flex-col items-center justify-center py-3 gap-1 text-[10px] font-medium uppercase tracking-wider transition-colors border-b-2
                  ${activeTab === tab.id 
                    ? 'border-purple-500 text-white bg-neutral-800' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
                  }
                `}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Editor Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
            
            {activeTab === 'slots' && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-neutral-800 mb-2">
                  <h3 className="text-sm font-semibold text-white">Node Socket Colors</h3>
                  <p className="text-xs text-neutral-500">Colors for input/output connection dots.</p>
                </div>
                <div className="space-y-1">
                  {Object.entries(currentTheme.colors.node_slot).map(([key, value]) => (
                    <ColorInput 
                      key={key} 
                      id={`input-${key}`}
                      label={key} 
                      value={value} 
                      onChange={(val) => handleColorChange('node_slot', key, val)} 
                      isHighlighted={highlightedKey === key}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'graph' && (
              <div className="space-y-4">
                 <div className="pb-2 border-b border-neutral-800 mb-2">
                  <h3 className="text-sm font-semibold text-white">Canvas & LiteGraph</h3>
                  <p className="text-xs text-neutral-500">Background, links, and node body styles.</p>
                </div>
                <div className="space-y-1">
                  {Object.entries(currentTheme.colors.litegraph_base).map(([key, value]) => (
                    // Hide base64 image field or handle differently if needed, keeping simple for now
                    key !== 'BACKGROUND_IMAGE' && (
                      <ColorInput 
                        key={key} 
                        id={`input-${key}`}
                        label={key.replace(/_/g, ' ')} 
                        value={value as string} 
                        onChange={(val) => handleColorChange('litegraph_base', key, val)}
                        isHighlighted={highlightedKey === key}
                      />
                    )
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'ui' && (
              <div className="space-y-4">
                 <div className="pb-2 border-b border-neutral-800 mb-2">
                  <h3 className="text-sm font-semibold text-white">ComfyUI Interface</h3>
                  <p className="text-xs text-neutral-500">Menu bar, sidebars, and dialogs.</p>
                </div>
                <div className="space-y-1">
                  {Object.entries(currentTheme.colors.comfy_base).map(([key, value]) => (
                    <ColorInput 
                      key={key} 
                      id={`input-${key}`}
                      label={key} 
                      value={value} 
                      onChange={(val) => handleColorChange('comfy_base', key, val)} 
                      isHighlighted={highlightedKey === key}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'json' && (
              <div className="h-full flex flex-col">
                <div className="text-xs text-neutral-500 mb-2 font-mono">
                  Current JSON Configuration:
                </div>
                <textarea
                  readOnly
                  value={JSON.stringify(currentTheme, null, 2)}
                  className="flex-1 w-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 resize-none focus:outline-none"
                />
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Preview */}
        <main className="flex-1 bg-[#121212] relative overflow-hidden flex flex-col">
          
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
             <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-xs text-neutral-400 border border-white/10 flex items-center gap-2">
                <MousePointerClick size={12} className="text-indigo-400" /> 
                <span>Click elements to edit</span>
             </div>
          </div>

          <div className="w-full h-full p-8 flex items-center justify-center bg-checkered">
             <div className="w-full h-full shadow-2xl rounded-lg overflow-hidden border border-neutral-800/50">
               <ThemePreview theme={currentTheme} onSelectColor={handlePreviewSelect} />
             </div>
          </div>
          
          {error && (
            <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-md p-4 rounded-lg bg-red-900/90 border border-red-500 text-white text-sm shadow-xl backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2">
              <strong>Info:</strong> {error}
            </div>
          )}

        </main>
      </div>

      <style>{`
        .bg-checkered {
          background-image: linear-gradient(45deg, #1a1a1a 25%, transparent 25%), linear-gradient(-45deg, #1a1a1a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1a1a1a 75%), linear-gradient(-45deg, transparent 75%, #1a1a1a 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}

export default App;