# Figma MCP Setup

This repo includes [Framelink Figma MCP](https://github.com/GLips/Figma-Context-MCP) configuration for AI-assisted design-to-code workflows.

## What It Does

- Paste a Figma frame/component link into Cursor's chat
- The AI reads layout, colors, spacing, and styling directly from Figma
- Generates accurate code matching your designs

## Setup

### 1. Get a Figma API Key

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Scroll to **Personal access tokens**
3. Click **Generate new token**
4. Give it a name (e.g., "Cursor MCP")
5. Copy the token

### 2. Set the Environment Variable

Add to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export FIGMA_API_KEY="your-token-here"
```

Then reload:
```bash
source ~/.zshrc  # or ~/.bashrc
```

### 3. Open in Cursor

Open the `vera-app` folder in Cursor. The MCP should auto-load from `.cursor/mcp.json`.

## Usage

In Cursor's chat (Agent mode):
1. Paste a Figma link to a frame
2. Ask: "Implement this design"
3. The AI fetches the design context and generates code

## Alternative: Official Figma MCP

Figma also has an [official MCP server](https://developers.figma.com/docs/figma-mcp-server/) that works with the desktop app or as a remote server. The Framelink version is simpler for Cursor workflows.
