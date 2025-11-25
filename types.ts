export interface NodeSlotColors {
  CLIP: string;
  CLIP_VISION: string;
  CLIP_VISION_OUTPUT: string;
  CONDITIONING: string;
  CONTROL_NET: string;
  IMAGE: string;
  LATENT: string;
  MASK: string;
  MODEL: string;
  STYLE_MODEL: string;
  VAE: string;
  NOISE: string;
  GUIDER: string;
  SAMPLER: string;
  SIGMAS: string;
  TAESD: string;
  [key: string]: string; // Allow flexible keys
}

export interface LiteGraphBase {
  BACKGROUND_IMAGE: string;
  CLEAR_BACKGROUND_COLOR: string;
  NODE_TITLE_COLOR: string;
  NODE_SELECTED_TITLE_COLOR: string;
  NODE_TEXT_SIZE: number;
  NODE_TEXT_COLOR: string;
  NODE_TEXT_HIGHLIGHT_COLOR: string;
  NODE_SUBTEXT_SIZE: number;
  NODE_DEFAULT_COLOR: string;
  NODE_DEFAULT_BGCOLOR: string;
  NODE_DEFAULT_BOXCOLOR: string;
  NODE_DEFAULT_SHAPE: number;
  NODE_BOX_OUTLINE_COLOR: string;
  NODE_BYPASS_BGCOLOR: string;
  NODE_ERROR_COLOUR: string;
  DEFAULT_SHADOW_COLOR: string;
  DEFAULT_GROUP_FONT: number;
  WIDGET_BGCOLOR: string;
  WIDGET_OUTLINE_COLOR: string;
  WIDGET_TEXT_COLOR: string;
  WIDGET_SECONDARY_TEXT_COLOR: string;
  WIDGET_DISABLED_TEXT_COLOR: string;
  LINK_COLOR: string;
  EVENT_LINK_COLOR: string;
  CONNECTING_LINK_COLOR: string;
  BADGE_FG_COLOR: string;
  BADGE_BG_COLOR: string;
}

export interface ComfyBase {
  "fg-color": string;
  "bg-color": string;
  "comfy-menu-bg": string;
  "comfy-menu-secondary-bg": string;
  "comfy-input-bg": string;
  "input-text": string;
  "descrip-text": string;
  "drag-text": string;
  "error-text": string;
  "border-color": string;
  "tr-even-bg-color": string;
  "tr-odd-bg-color": string;
  "content-bg": string;
  "content-fg": string;
  "content-hover-bg": string;
  "content-hover-fg": string;
  "bar-shadow": string;
}

export interface ComfyTheme {
  id: string;
  name: string;
  colors: {
    node_slot: NodeSlotColors;
    litegraph_base: LiteGraphBase;
    comfy_base: ComfyBase;
  };
}