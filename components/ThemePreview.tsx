import React from 'react';
import { ComfyTheme } from '../types';
import { Settings, Play, Save, FolderOpen, X, Plus, Trash2, AlertCircle, EyeOff } from 'lucide-react';

interface ThemePreviewProps {
  theme: ComfyTheme;
  onSelectColor?: (category: 'node_slot' | 'litegraph_base' | 'comfy_base', key: string) => void;
}

interface SlotProps {
  color: string;
  name: string;
  type?: 'input' | 'output';
  textColor: string;
  onSelect?: () => void;
  onTextSelect?: () => void;
}

const Slot: React.FC<SlotProps> = ({ color, name, type = 'input', textColor, onSelect, onTextSelect }) => (
  <div className="flex items-center gap-2 h-5 group/slot cursor-pointer">
    {/* Left Dot (Input) */}
    {type === 'input' && (
        <div 
            onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); }}
            className="w-2.5 h-2.5 rounded-full border border-black/20 hover:scale-125 transition-transform hover:ring-2 ring-white/50" 
            style={{ backgroundColor: color }}
            title={`Slot Color: ${name}`}
        />
    )}
    
    {/* Text */}
    <span 
        className={`text-[10px] font-mono uppercase tracking-tight flex-1 ${type === 'output' ? 'text-right' : 'text-left'} hover:brightness-125`} 
        style={{ color: textColor }}
        onClick={(e) => { e.stopPropagation(); onTextSelect && onTextSelect(); }}
        title="Node Text Color"
    >
        {name}
    </span>
    
    {/* Right Dot (Output) */}
    {type === 'output' && (
        <div 
            onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); }}
            className="w-2.5 h-2.5 rounded-full border border-black/20 hover:scale-125 transition-transform hover:ring-2 ring-white/50" 
            style={{ backgroundColor: color }}
            title={`Slot Color: ${name}`}
        />
    )}
  </div>
);

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, onSelectColor }) => {
  const { colors } = theme;
  const lb = colors.litegraph_base;
  const cb = colors.comfy_base;
  const slots = colors.node_slot;

  // Helper to determine border radius based on shape config (simplified)
  const nodeRadius = lb.NODE_DEFAULT_SHAPE === 1 ? '0px' : '8px';

  const handleSelect = (category: 'node_slot' | 'litegraph_base' | 'comfy_base', key: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelectColor) {
        onSelectColor(category, key);
    }
  };

  return (
    <div 
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans cursor-crosshair"
      style={{ 
        backgroundColor: lb.CLEAR_BACKGROUND_COLOR,
        color: cb["fg-color"]
      }}
      onClick={handleSelect('litegraph_base', 'CLEAR_BACKGROUND_COLOR')}
      title="Background Color"
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${lb.NODE_DEFAULT_BOXCOLOR} 1px, transparent 1px), linear-gradient(90deg, ${lb.NODE_DEFAULT_BOXCOLOR} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* --- ComfyUI Main Menu --- */}
      <div 
        className="relative z-30 w-full p-2 flex items-center justify-between shadow-xl shrink-0 cursor-pointer hover:brightness-110 transition-all"
        style={{ 
          backgroundColor: cb["comfy-menu-bg"],
          borderBottom: `1px solid ${cb["border-color"]}`,
          boxShadow: cb["bar-shadow"]
        }}
        onClick={handleSelect('comfy_base', 'comfy-menu-bg')}
        title="Menu Background"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm px-2">ComfyUI</span>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          {['Queue Prompt', 'Extra Options', 'View History'].map((label, i) => (
             <div 
             key={i}
             className="px-3 py-1 rounded-sm text-[10px] font-medium cursor-pointer transition-opacity border border-transparent hover:border-white/10 hover:brightness-110"
             style={{ 
               backgroundColor: cb["content-bg"], 
               color: cb["content-fg"] 
             }}
             onClick={handleSelect('comfy_base', 'content-bg')}
             title="Content Button"
           >
             {label}
           </div>
          ))}
        </div>
        <div className="flex gap-3 px-2">
           <div 
             className="flex items-center gap-1 text-[10px] hover:text-white" 
             style={{ color: cb["descrip-text"] }}
             onClick={handleSelect('comfy_base', 'descrip-text')}
            >
              <Settings size={14} />
              <span>Settings</span>
           </div>
        </div>
      </div>

      {/* --- Main Canvas Area --- */}
      <div className="flex-1 relative overflow-hidden">
        
        {/* Right Sidebar (Queue/History) */}
        <div 
            className="absolute right-0 top-0 bottom-0 w-64 z-20 flex flex-col border-l shadow-2xl cursor-pointer hover:brightness-105"
            style={{ 
                backgroundColor: cb["comfy-menu-secondary-bg"],
                borderColor: cb["border-color"]
            }}
            onClick={handleSelect('comfy_base', 'comfy-menu-secondary-bg')}
            title="Secondary Menu Background"
        >
            <div className="p-2 border-b flex justify-between items-center" style={{ borderColor: cb["border-color"] }}>
                <span className="text-xs font-bold" style={{ color: cb["input-text"] }}>Queue</span>
                <div className="flex gap-1">
                   <button className="p-1 rounded hover:bg-white/10" style={{ color: cb["descrip-text"] }}><Trash2 size={12}/></button>
                   <button className="p-1 rounded hover:bg-white/10" style={{ color: cb["descrip-text"] }}><Plus size={12}/></button>
                </div>
            </div>
            
            {/* List Items (Table rows simulation) */}
            <div className="flex-1 overflow-y-auto">
                {[1, 2, 3, 4].map((item, index) => (
                    <div 
                        key={index} 
                        className="p-2 text-xs flex justify-between items-center border-b border-white/5 hover:brightness-110"
                        style={{ 
                            backgroundColor: index % 2 === 0 ? cb["tr-even-bg-color"] : cb["tr-odd-bg-color"],
                            color: cb["input-text"]
                        }}
                        onClick={handleSelect('comfy_base', index % 2 === 0 ? 'tr-even-bg-color' : 'tr-odd-bg-color')}
                        title="Row Background"
                    >
                        <span className="opacity-80">Prompt #{2400 + index}</span>
                        <span 
                            className="px-1.5 py-0.5 rounded text-[9px] uppercase" 
                            style={{ 
                                backgroundColor: index === 0 ? slots.IMAGE : 'transparent',
                                color: index === 0 ? '#000' : cb["descrip-text"],
                                border: index === 0 ? 'none' : `1px solid ${cb["border-color"]}`
                            }}
                        >
                            {index === 0 ? 'Running' : 'Pending'}
                        </span>
                    </div>
                ))}
            </div>

            {/* Bottom Controls */}
            <div 
                className="p-3 border-t space-y-2 hover:brightness-110" 
                style={{ borderColor: cb["border-color"], backgroundColor: cb["comfy-input-bg"] }}
                onClick={handleSelect('comfy_base', 'comfy-input-bg')}
            >
                <div className="text-[10px] uppercase font-bold opacity-50 mb-1" style={{ color: cb["descrip-text"] }}>Batch Options</div>
                <div className="flex gap-2 text-xs">
                     <label className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" className="accent-indigo-500" defaultChecked />
                        <span style={{ color: cb["input-text"] }} onClick={handleSelect('comfy_base', 'input-text')}>Extra</span>
                     </label>
                     <label className="flex items-center gap-1 cursor-pointer">
                        <input type="checkbox" className="accent-indigo-500" />
                        <span style={{ color: cb["input-text"] }} onClick={handleSelect('comfy_base', 'input-text')}>Auto</span>
                     </label>
                </div>
            </div>
        </div>


        {/* --- NODE GRAPH --- */}
        <div className="absolute inset-0 transform scale-[0.85] origin-top-left p-10">
          
          {/* GROUP BOX */}
          <div 
            className="absolute left-20 top-10 w-[600px] h-[350px] border rounded z-0 cursor-pointer hover:ring-1 ring-white/20"
            style={{ 
                borderColor: lb.NODE_DEFAULT_BOXCOLOR,
                backgroundColor: 'rgba(0,0,0,0.1)'
            }}
            onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_BOXCOLOR')}
            title="Group / Box Color"
          >
              <div 
                className="absolute -top-7 left-0 px-2 py-1 text-lg font-bold hover:scale-105 transition-transform"
                style={{ 
                    color: lb.NODE_TITLE_COLOR,
                    fontSize: lb.DEFAULT_GROUP_FONT
                }}
                onClick={handleSelect('litegraph_base', 'NODE_TITLE_COLOR')}
              >
                  Workflow Group
              </div>
          </div>

          {/* LINK: Standard */}
          <svg className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-visible">
            <g className="cursor-pointer pointer-events-auto" onClick={handleSelect('litegraph_base', 'LINK_COLOR')}>
                <path d="M 330 200 C 400 200, 380 200, 450 200" fill="none" stroke={lb.LINK_COLOR} strokeWidth="4" className="hover:stroke-[6px] transition-all" />
                <path d="M 330 230 C 400 230, 380 250, 450 250" fill="none" stroke={lb.LINK_COLOR} strokeWidth="4" className="hover:stroke-[6px] transition-all" />
            </g>
            <path 
                d="M 700 220 C 750 220, 750 350, 800 350" 
                fill="none" 
                stroke={lb.CONNECTING_LINK_COLOR} 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                className="cursor-pointer pointer-events-auto hover:stroke-[4px]"
                onClick={handleSelect('litegraph_base', 'CONNECTING_LINK_COLOR')}
            />
            {/* Event Link */}
            <path 
                d="M 700 300 C 750 300, 750 300, 800 300" 
                fill="none" 
                stroke={lb.EVENT_LINK_COLOR} 
                strokeWidth="3" 
                className="cursor-pointer pointer-events-auto hover:stroke-[5px]"
                onClick={handleSelect('litegraph_base', 'EVENT_LINK_COLOR')}
            />
          </svg>


          {/* NODE 1: Checkpoint Loader (Simple) */}
          <div 
            className="absolute left-40 top-40 w-60 shadow-xl border overflow-hidden flex flex-col cursor-pointer transition-shadow hover:shadow-2xl hover:ring-1 ring-white/30"
            style={{ 
              backgroundColor: lb.NODE_DEFAULT_BGCOLOR,
              borderColor: lb.NODE_BOX_OUTLINE_COLOR,
              borderRadius: nodeRadius,
              boxShadow: `0 4px 15px ${lb.DEFAULT_SHADOW_COLOR}`
            }}
            onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_BGCOLOR')}
          >
            <div 
              className="px-3 py-1 flex items-center gap-2 border-b"
              style={{ backgroundColor: lb.NODE_DEFAULT_COLOR, borderColor: 'rgba(255,255,255,0.05)' }}
              onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_COLOR')}
              title="Node Header Color"
            >
              <div 
                className="w-2.5 h-2.5 rounded-full hover:scale-125" 
                style={{ backgroundColor: lb.NODE_DEFAULT_BOXCOLOR }}
                onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_BOXCOLOR')}
                title="Status/Box Color"
              ></div>
              <span 
                className="font-bold text-xs" 
                style={{ color: lb.NODE_TITLE_COLOR }}
                onClick={handleSelect('litegraph_base', 'NODE_TITLE_COLOR')}
              >
                Load Checkpoint
              </span>
            </div>
            <div className="p-2 space-y-3">
               <div 
                className="w-full py-1 px-2 text-[10px] border rounded truncate hover:brightness-110"
                style={{ backgroundColor: lb.WIDGET_BGCOLOR, color: lb.WIDGET_TEXT_COLOR, borderColor: lb.WIDGET_OUTLINE_COLOR }}
                onClick={handleSelect('litegraph_base', 'WIDGET_BGCOLOR')}
               >
                 v1-5-pruned-emaonly.ckpt
               </div>
               <div className="flex flex-col gap-1 mt-2">
                 <Slot 
                    color={slots.MODEL} name="MODEL" type="output" textColor={lb.NODE_TEXT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'MODEL')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_COLOR')}
                 />
                 <Slot 
                    color={slots.CLIP} name="CLIP" type="output" textColor={lb.NODE_TEXT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'CLIP')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_COLOR')}
                 />
                 <Slot 
                    color={slots.VAE} name="VAE" type="output" textColor={lb.NODE_TEXT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'VAE')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_COLOR')}
                 />
               </div>
            </div>
          </div>

          {/* NODE 2: Selected Node (KSampler) */}
          <div 
            className="absolute left-[450px] top-[150px] w-64 shadow-2xl border-2 flex flex-col z-10 cursor-pointer"
            style={{ 
              backgroundColor: lb.NODE_DEFAULT_BGCOLOR,
              borderColor: lb.NODE_SELECTED_TITLE_COLOR, // Selected Border
              borderRadius: nodeRadius,
              boxShadow: `0 0 20px ${lb.NODE_SELECTED_TITLE_COLOR}20`
            }}
            onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_BGCOLOR')}
          >
             <div 
              className="px-3 py-1 flex items-center gap-2 border-b"
              style={{ backgroundColor: lb.NODE_DEFAULT_COLOR, borderColor: 'rgba(255,255,255,0.05)' }}
              onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_COLOR')}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span 
                className="font-bold text-xs" 
                style={{ color: lb.NODE_SELECTED_TITLE_COLOR }}
                onClick={handleSelect('litegraph_base', 'NODE_SELECTED_TITLE_COLOR')}
              >
                KSampler (Advanced)
              </span>
              {/* Badge */}
              <div 
                className="ml-auto px-1.5 py-0.5 rounded text-[8px] font-bold hover:scale-110" 
                style={{ backgroundColor: lb.BADGE_BG_COLOR, color: lb.BADGE_FG_COLOR }}
                onClick={handleSelect('litegraph_base', 'BADGE_BG_COLOR')}
              >
                12ms
              </div>
            </div>

            <div className="p-2 grid grid-cols-2 gap-4 relative">
               <div className="space-y-1">
                 <Slot 
                    color={slots.MODEL} name="model" textColor={lb.NODE_TEXT_HIGHLIGHT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'MODEL')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_HIGHLIGHT_COLOR')}
                 />
                 <Slot 
                    color={slots.CONDITIONING} name="positive" textColor={lb.NODE_TEXT_HIGHLIGHT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'CONDITIONING')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_HIGHLIGHT_COLOR')}
                 />
                 <Slot 
                    color={slots.CONDITIONING} name="negative" textColor={lb.NODE_TEXT_HIGHLIGHT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'CONDITIONING')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_HIGHLIGHT_COLOR')}
                 />
                 <Slot 
                    color={slots.LATENT} name="latent" textColor={lb.NODE_TEXT_HIGHLIGHT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'LATENT')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_HIGHLIGHT_COLOR')}
                 />
               </div>
               <div className="space-y-1 flex flex-col items-end">
                 <Slot 
                    color={slots.LATENT} name="LATENT" type="output" textColor={lb.NODE_TEXT_HIGHLIGHT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', 'LATENT')}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_HIGHLIGHT_COLOR')}
                 />
               </div>
            </div>

            {/* Widgets Area */}
            <div className="px-3 pb-3 space-y-2 pt-2 border-t border-white/5">
              {[
                  { l: 'seed', v: '482910482', t: 'num' }, 
                  { l: 'steps', v: '25', t: 'num' }, 
                  { l: 'cfg', v: '8.0', t: 'float' },
                  { l: 'sampler', v: 'euler_a', t: 'text' },
              ].map((w, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px]" style={{ color: lb.NODE_TEXT_COLOR }}>
                    <span style={{ color: lb.WIDGET_SECONDARY_TEXT_COLOR }} onClick={handleSelect('litegraph_base', 'WIDGET_SECONDARY_TEXT_COLOR')}>{w.l}</span>
                    <span 
                        className="px-2 py-0.5 rounded border min-w-[60px] text-right hover:brightness-110" 
                        style={{ backgroundColor: lb.WIDGET_BGCOLOR, borderColor: lb.WIDGET_OUTLINE_COLOR, color: lb.WIDGET_TEXT_COLOR }}
                        onClick={handleSelect('litegraph_base', 'WIDGET_BGCOLOR')}
                    >
                        {w.v}
                    </span>
                  </div>
              ))}
            </div>
          </div>

          {/* NODE 3: Universal Slot Display (Shows all colors) */}
          <div 
            className="absolute left-40 top-[400px] w-48 shadow-xl border overflow-hidden flex flex-col cursor-pointer hover:ring-1 ring-white/30"
            style={{ 
              backgroundColor: lb.NODE_DEFAULT_BGCOLOR,
              borderColor: lb.NODE_BOX_OUTLINE_COLOR,
              borderRadius: nodeRadius,
            }}
            onClick={handleSelect('litegraph_base', 'NODE_DEFAULT_BGCOLOR')}
          >
            <div 
              className="px-3 py-1 border-b"
              style={{ backgroundColor: lb.NODE_DEFAULT_COLOR, borderColor: 'rgba(255,255,255,0.05)' }}
            >
              <span className="font-bold text-xs" style={{ color: lb.NODE_TITLE_COLOR }}>Universal Input Bus</span>
            </div>
            <div className="p-2 grid grid-cols-1 gap-1">
              {Object.keys(slots).slice(0, 12).map((key) => (
                <Slot 
                    key={key} 
                    color={slots[key]} 
                    name={key} 
                    textColor={lb.NODE_TEXT_COLOR} 
                    onSelect={() => onSelectColor && onSelectColor('node_slot', key)}
                    onTextSelect={() => onSelectColor && onSelectColor('litegraph_base', 'NODE_TEXT_COLOR')}
                />
              ))}
            </div>
          </div>

          {/* NODE 4: Bypassed Node */}
          <div 
            className="absolute left-[800px] top-[250px] w-48 shadow-lg border border-dashed opacity-80 cursor-pointer"
            style={{ 
              backgroundColor: lb.NODE_BYPASS_BGCOLOR, // Uses bypass color directly or as overlay
              borderColor: lb.NODE_BOX_OUTLINE_COLOR,
              borderRadius: nodeRadius,
            }}
            onClick={handleSelect('litegraph_base', 'NODE_BYPASS_BGCOLOR')}
            title="Bypass Color"
          >
             <div 
              className="px-3 py-1 border-b flex justify-between items-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <span className="font-bold text-xs" style={{ color: 'rgba(255,255,255,0.9)' }}>ControlNet (Bypassed)</span>
              <EyeOff size={10} className="opacity-70" />
            </div>
            <div className="p-2 space-y-2 opacity-50">
               <Slot 
                color={slots.CONTROL_NET} name="CNET" type="input" textColor="#fff" 
                onSelect={() => onSelectColor && onSelectColor('node_slot', 'CONTROL_NET')}
               />
               <Slot 
                color={slots.IMAGE} name="IMAGE" type="input" textColor="#fff" 
                onSelect={() => onSelectColor && onSelectColor('node_slot', 'IMAGE')}
               />
            </div>
          </div>

          {/* NODE 5: Error Node */}
          <div 
            className="absolute left-[800px] top-[100px] w-48 shadow-lg border-2 cursor-pointer hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: lb.NODE_DEFAULT_BGCOLOR,
              borderColor: lb.NODE_ERROR_COLOUR,
              borderRadius: nodeRadius,
            }}
            onClick={handleSelect('litegraph_base', 'NODE_ERROR_COLOUR')}
            title="Error Color"
          >
             <div 
              className="px-3 py-1 border-b flex justify-between items-center"
              style={{ backgroundColor: lb.NODE_ERROR_COLOUR, borderColor: lb.NODE_ERROR_COLOUR }}
            >
              <span className="font-bold text-xs text-white">VAE Decode</span>
              <AlertCircle size={12} className="text-white" />
            </div>
            <div className="p-2 flex flex-col items-center justify-center min-h-[60px] text-center">
               <span className="text-[10px]" style={{ color: lb.NODE_ERROR_COLOUR }}>Error: VAE not found</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};