<div align="center">
<img width="1200" height="475" alt="PimpMyComfy Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# PimpMyComfy

**The Ultimate Theme Editor for ComfyUI**

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/AI-Gemini_Flash_2.5-8E75B2?logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[View Live Demo](https://ai.studio/apps/drive/1QUgu8NYgsWpIq7VdMUUR7X3lEPs3tc06)

</div>

---

## 🎨 What is PimpMyComfy?

**PimpMyComfy** is a powerful visual editor designed to revolutionize how you customize your [ComfyUI](https://github.com/comfyanonymous/ComfyUI) interface. 

Forget about manually editing cryptic JSON files or guessing hex codes. PimpMyComfy provides a **WYSIWYG (What You See Is What You Get)** interface where you can style nodes, wires, menus, and backgrounds in real-time. It even leverages **Google Gemini AI** to generate stunning themes based on simple text prompts or existing styles.

## ✨ Key Features

*   **Interactive Preview:** A fully rendered mock ComfyUI environment. Click on any element (nodes, wires, background, menu) to instantly edit its color.
*   **Deep Customization:** Control every detail, from individual Node Slot colors (CLIP, VAE, LATENT, etc.) to the LiteGraph connecting wires and UI shadows.
*   **AI Remix (Powered by Gemini):** Stuck for ideas? Click the "AI Remix" button to let artificial intelligence generate a cohesive theme for you.
*   **Cult Classic Presets:** Comes with built-in templates like *The Matrix*, *Star Wars (Galactic Empire)*, *Dune (Arrakis)*, *Back to the Future*, and *Vaporwave*.
*   **One-Click Export:** Download a valid `.json` theme file ready to be dropped into your ComfyUI user folder.

## 📸 Screenshots

| **The Editor Interface** | **Dark Mode & Nodes** |
|:---:|:---:|
| <img src="https://placehold.co/600x400/1a1a1a/FFF?text=Editor+Interface+Screenshot" alt="Main Interface" width="100%"> | <img src="https://placehold.co/600x400/000000/00FF41?text=Matrix+Theme+Screenshot" alt="Matrix Theme" width="100%"> |
| *Split-screen editing with live preview* | *Matrix preset applied via AI Remix* |

| **AI Remix Feature** | **Slot Customization** |
|:---:|:---:|
| <img src="https://placehold.co/600x400/222/FFF?text=AI+Generation+Screenshot" alt="AI Generation" width="100%"> | <img src="https://placehold.co/600x400/333/FFF?text=Color+Picker+Screenshot" alt="Color Picker" width="100%"> |
| *Generate themes instantly with Gemini* | *Fine-tune every node socket color* |

*(Note: Replace the placeholders above with actual screenshots of your application)*

## 🚀 How It Works

1.  **Select a Base:** Start with a preset (like "Dark" or "Matrix") or start from scratch.
2.  **Edit visually:**
    *   **Click-to-Edit:** Click directly on the preview elements (e.g., a "LATENT" node slot or the background grid) to jump to that setting.
    *   **Manual Control:** Use the sidebar tabs (Nodes, Graph, Menu) to fine-tune specific values.
3.  **Use AI (Optional):** Click "AI Remix" to let the Gemini model analyze your current palette and suggest a professional, cohesive color scheme.
4.  **Export:** Click "Download JSON".
5.  **Install:** Place the `.json` file into your `ComfyUI/user/default/comfy.settings.json` (or load it via a theme manager extension).

## 🛠️ Installation & Local Development

This project contains everything you need to run the app locally.

**Prerequisites:**  Node.js (v16+)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/PimpMyComfy.git
    cd PimpMyComfy
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup API Key (Optional for AI features):**
    To use the "AI Remix" feature, you need a Google Gemini API Key.
    Create a `.env.local` file in the root directory:
    ```env
    API_KEY=your_gemini_api_key_here
    ```
    *Note: The app works perfectly as a manual editor without an API key.*

4.  **Run the app:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
