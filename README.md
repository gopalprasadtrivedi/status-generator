# WhatsApp Status Image Generator

A simple, static web app to create beautiful WhatsApp Status images (1080×1920).

## Features

- 🎨 **5 Themes**: Patriotic, Religious, Astrological, Motivational, General
- 📝 **4 Typography Styles**: Classic, Modern, Elegant, Bold
- 🇮🇳 **Hindi + English Support**: Full Unicode support with Noto fonts
- 📱 **Mobile Friendly**: Works on any device
- 🚀 **No Backend Required**: Pure HTML, CSS, JavaScript
- ⬇️ **Auto Download**: One-click image generation and download

## Quick Start

1. Add your images to the theme folders (see below)
2. Open `index.html` in a web browser
3. Select a theme and style
4. Enter your text (optional)
5. Click "Generate Image"
6. Image downloads automatically!

## Adding Images

Add images to each theme folder with the following naming convention:

```
/assets/
  /patriotic/
    1.jpg
    2.jpg
    3.jpg
  /religious/
    1.jpg
    2.jpg
    3.jpg
  /astrological/
    1.jpg
    2.jpg
    3.jpg
  /motivational/
    1.jpg
    2.jpg
    3.jpg
  /general/
    1.jpg
    2.jpg
    3.jpg
```

### Image Requirements

- **Format**: JPG (recommended) or PNG
- **Size**: Any size (will be scaled to fit)
- **Orientation**: Portrait (vertical) recommended
- **Aspect Ratio**: 9:16 ideal, but any ratio works

### Updating Image Count

**Important:** If you add more images (4.jpg, 5.jpg, etc.), you **must** update `imageCount` in `script.js`:

```javascript
const THEME_CONFIG = {
    patriotic: {
        folder: 'assets/patriotic',
        imageCount: 5,  // Change this to match your total image count
        extension: 'jpg'
    },
    // ... other themes
};
```

**Example:**
- If you have images: `1.jpg`, `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`
- Set `imageCount: 5`
- The app will randomly select from images 1-5

**Note:** The code uses `Math.floor(Math.random() * imageCount) + 1`, so:
- `imageCount: 3` → selects from 1, 2, 3
- `imageCount: 5` → selects from 1, 2, 3, 4, 5
- `imageCount: 10` → selects from 1, 2, 3, ..., 10

## Hosting on GitHub Pages

Yes! This app works perfectly on GitHub Pages. Here's how to deploy:

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: WhatsApp Status Image Generator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **"Deploy from a branch"**
   - Choose **"main"** branch and **"/ (root)"** folder
   - Click **Save**

3. **Your app is live!**
   - GitHub will provide a URL like: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - The app will work exactly as it does on `localhost:8080`
   - All images will load correctly via HTTPS

### Why It Works on GitHub Pages

✅ **HTTPS Protocol** - GitHub Pages serves over HTTPS, so `fetch()` works perfectly  
✅ **Relative Paths** - All image paths are relative, so they work on any domain  
✅ **No Backend Needed** - Pure client-side JavaScript, perfect for static hosting  
✅ **CORS Safe** - Same-origin requests work seamlessly on GitHub Pages

### Important Notes

- Make sure all your images are committed to the repository
- The `/assets/` folder structure must be preserved
- If you have a custom domain, it will work the same way

## File Structure

```
image-generator/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # Canvas generation logic
├── README.md           # This file
└── assets/
    ├── patriotic/      # Patriotic theme images
    ├── religious/      # Religious theme images
    ├── astrological/   # Astrological theme images
    ├── motivational/   # Motivational theme images
    └── general/        # General theme images
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (Chrome, Safari)

## Customization

### Adding New Templates

Edit `script.js` and add a new template object:

```javascript
const TEMPLATES = {
    // ... existing templates
    myTemplate: {
        name: 'My Template',
        fonts: {
            title: {
                family: '"Noto Sans", sans-serif',
                size: 64,
                weight: '600',
                lineHeight: 1.3
            },
            // ... other font settings
        },
        spacing: {
            titleTop: 180,
            subtitleGap: 30,
            bodyGap: 80,
            footerBottom: 150
        }
    }
};
```

### Changing Overlay Opacity

Edit the `drawOverlay` function in `script.js`:

```javascript
function drawOverlay(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Change 0.7 to adjust opacity
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
```

## License

MIT License - Free to use and modify

