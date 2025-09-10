# @repo/tailwind

Shared Tailwind CSS styles and theme configuration for the Simeon Griggs monorepo.

## Installation

This package is already configured as a workspace dependency. To use it in your app, add it to your `package.json`:

```json
{
  "dependencies": {
    "@repo/tailwind": "workspace:*"
  }
}
```

## Usage

### Import the CSS file

```tsx
// For React Router apps
import '@repo/tailwind/app.css'

// For apps that need the CSS URL
import styles from '@repo/tailwind/app.css?url'
```

### Vite Configuration

Make sure your Vite config includes the Tailwind CSS plugin:

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
})
```

## Features

- Custom color palette based on Carbon Design System
- Custom fonts (JetBrains Mono, Inter, Archivo)
- Pre-configured Tailwind theme
- Custom utility classes and components
- Responsive design utilities

## Color Palette

The package includes a comprehensive color system with:

- Blue (custom Simeon's Blue palette)
- Cool Gray
- Cyan
- Gray
- Green
- Magenta
- Orange
- Purple
- Red
- Teal
- Warm Gray
- Yellow

## Fonts

- **JetBrains Mono**: Monospace font for code
- **Inter**: Sans-serif font for UI text
- **Archivo**: Display font for headings

## Custom Components

- `.button`: Pre-styled button component
- `.wave`: Animated wave effect
- `.text-vertical`: Vertical text utility

## Development

To modify the styles, edit the `app.css` file in this package. Changes will be automatically available to all apps that depend on this package.
