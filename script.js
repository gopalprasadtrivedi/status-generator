/**
 * WhatsApp Status Image Generator
 * ================================
 * A simple, client-side image generator using HTML5 Canvas.
 * Creates 1080×1920 images perfect for WhatsApp Status.
 * 
 * Features:
 * - Multiple themes (Patriotic, Religious, Astrological, Motivational, General)
 * - Multiple typography templates
 * - Support for English and Hindi text
 * - Automatic image download
 */

// ============================================
// CONFIGURATION
// ============================================

/**
 * Canvas dimensions (WhatsApp Status optimal size)
 */
const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

/**
 * Image paths for each theme
 * Each theme folder should contain numbered images (1.jpg, 2.jpg, etc.)
 * Update IMAGE_COUNT for each theme based on how many images you have
 */
/**
 * Theme Configuration
 * 
 * To add more images to a theme:
 * 1. Add images to the theme folder (e.g., 4.jpg, 5.jpg, etc.)
 * 2. Update the imageCount below to match the total number of images
 * 
 * Example: If you have 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg → set imageCount: 5
 */
const THEME_CONFIG = {
    patriotic: {
        folder: 'assets/patriotic',
        imageCount: 7,  // Update this if you add more images (4.jpg, 5.jpg, etc.)
        extension: 'jpg'
    },
    religious: {
        folder: 'assets/religious',
        imageCount: 7,  // Update this if you add more images
        extension: 'jpg'
    },
    astrological: {
        folder: 'assets/astrological',
        imageCount: 7,  // Update this if you add more images
        extension: 'jpg'
    },
    motivational: {
        folder: 'assets/motivational',
        imageCount: 7,  // Update this if you add more images
        extension: 'jpg'
    },
    general: {
        folder: 'assets/general',
        imageCount: 7,  // Update this if you add more images
        extension: 'jpg'
    }
};

/**
 * Typography Templates
 * Each template defines font families, sizes, weights, and spacing
 * Fonts used support both English and Hindi (Devanagari)
 */
const TEMPLATES = {
    classic: {
        name: 'Classic',
        fonts: {
            title: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 64,
                weight: '600',
                lineHeight: 1.3
            },
            subtitle: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 48,
                weight: '400',
                lineHeight: 1.4
            },
            body: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 80,
                weight: '700',
                lineHeight: 1.4
            },
            footer: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 40,
                weight: '500',
                lineHeight: 1.3
            }
        },
        spacing: {
            titleTop: 180,
            subtitleGap: 30,
            bodyGap: 80,
            footerBottom: 150
        }
    },
    modern: {
        name: 'Modern',
        fonts: {
            title: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 60,
                weight: '600',
                lineHeight: 1.2
            },
            subtitle: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 44,
                weight: '400',
                lineHeight: 1.3
            },
            body: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 76,
                weight: '700',
                lineHeight: 1.3
            },
            footer: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 36,
                weight: '500',
                lineHeight: 1.2
            }
        },
        spacing: {
            titleTop: 200,
            subtitleGap: 25,
            bodyGap: 70,
            footerBottom: 140
        }
    },
    elegant: {
        name: 'Elegant',
        fonts: {
            title: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 58,
                weight: '400',
                lineHeight: 1.4
            },
            subtitle: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 42,
                weight: '400',
                lineHeight: 1.4
            },
            body: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 72,
                weight: '600',
                lineHeight: 1.5
            },
            footer: {
                family: '"Noto Serif", "Noto Serif Devanagari", Georgia, serif',
                size: 38,
                weight: '400',
                lineHeight: 1.4
            }
        },
        spacing: {
            titleTop: 220,
            subtitleGap: 35,
            bodyGap: 90,
            footerBottom: 160
        }
    },
    bold: {
        name: 'Bold',
        fonts: {
            title: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 68,
                weight: '700',
                lineHeight: 1.2
            },
            subtitle: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 50,
                weight: '600',
                lineHeight: 1.3
            },
            body: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 88,
                weight: '700',
                lineHeight: 1.3
            },
            footer: {
                family: '"Noto Sans", "Noto Sans Devanagari", sans-serif',
                size: 42,
                weight: '700',
                lineHeight: 1.2
            }
        },
        spacing: {
            titleTop: 170,
            subtitleGap: 20,
            bodyGap: 60,
            footerBottom: 130
        }
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================

/**
 * Current application state
 */
const state = {
    selectedTheme: 'patriotic',
    selectedTemplate: 'classic',
    footerAlignment: 'center',
    texts: {
        title: '',
        subtitle: '',
        body1: '',
        body2: '',
        footer: ''
    }
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    canvas: null,
    ctx: null,
    themeButtons: null,
    templateButtons: null,
    alignButtons: null,
    generateBtn: null,
    loadingOverlay: null,
    inputs: {
        title: null,
        subtitle: null,
        body1: null,
        body2: null,
        footer: null
    }
};

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if running on file:// protocol (not supported)
    if (window.location.protocol === 'file:') {
        const errorMsg = `
⚠️ CORS Error Detected!

You're opening this file directly (file:// protocol).
This app requires a web server to work properly.

To fix this:
1. Make sure the HTTP server is running:
   python3 -m http.server 8080

2. Open in browser:
   http://localhost:8080

Or use any other local web server.
        `;
        alert(errorMsg);
        console.error('File:// protocol detected. Please use HTTP server.');
        
        // Disable generate button
        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.textContent = '⚠️ Please use HTTP server (see alert)';
        }
        return;
    }
    
    initializeElements();
    attachEventListeners();
    console.log('WhatsApp Status Image Generator initialized!');
    console.log('Running on:', window.location.protocol + '//' + window.location.host);
});

/**
 * Cache DOM element references
 */
function initializeElements() {
    elements.canvas = document.getElementById('imageCanvas');
    if (!elements.canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    elements.ctx = elements.canvas.getContext('2d');
    if (!elements.ctx) {
        console.error('Could not get 2D canvas context!');
        return;
    }
    
    // Set canvas dimensions explicitly
    elements.canvas.width = CANVAS_WIDTH;
    elements.canvas.height = CANVAS_HEIGHT;
    
    console.log('Canvas initialized:', {
        width: elements.canvas.width,
        height: elements.canvas.height,
        context: elements.ctx ? 'OK' : 'FAILED'
    });
    
    elements.themeButtons = document.querySelectorAll('.theme-btn');
    elements.templateButtons = document.querySelectorAll('.template-btn');
    elements.alignButtons = document.querySelectorAll('.align-btn');
    elements.generateBtn = document.getElementById('generateBtn');
    elements.loadingOverlay = document.getElementById('loadingOverlay');
    
    elements.inputs.title = document.getElementById('titleText');
    elements.inputs.subtitle = document.getElementById('subtitleText');
    elements.inputs.body1 = document.getElementById('bodyText1');
    elements.inputs.body2 = document.getElementById('bodyText2');
    elements.inputs.footer = document.getElementById('footerText');
}

/**
 * Attach event listeners to interactive elements
 */
function attachEventListeners() {
    // Theme selection
    elements.themeButtons.forEach(btn => {
        btn.addEventListener('click', () => handleThemeSelect(btn));
    });
    
    // Template selection
    elements.templateButtons.forEach(btn => {
        btn.addEventListener('click', () => handleTemplateSelect(btn));
    });
    
    // Alignment selection
    elements.alignButtons.forEach(btn => {
        btn.addEventListener('click', () => handleAlignmentSelect(btn));
    });
    
    // Generate button
    elements.generateBtn.addEventListener('click', handleGenerate);
    
    // Text input changes
    Object.keys(elements.inputs).forEach(key => {
        elements.inputs[key].addEventListener('input', (e) => {
            state.texts[key === 'body1' ? 'body1' : key === 'body2' ? 'body2' : key] = e.target.value;
        });
    });
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle theme button selection
 */
function handleThemeSelect(selectedBtn) {
    elements.themeButtons.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    state.selectedTheme = selectedBtn.dataset.theme;
}

/**
 * Handle template button selection
 */
function handleTemplateSelect(selectedBtn) {
    elements.templateButtons.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    state.selectedTemplate = selectedBtn.dataset.template;
}

/**
 * Handle alignment button selection
 */
function handleAlignmentSelect(selectedBtn) {
    elements.alignButtons.forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
    state.footerAlignment = selectedBtn.dataset.align;
}

/**
 * Handle generate button click
 */
async function handleGenerate() {
    // Update state with current input values
    state.texts.title = elements.inputs.title.value.trim();
    state.texts.subtitle = elements.inputs.subtitle.value.trim();
    state.texts.body1 = elements.inputs.body1.value.trim();
    state.texts.body2 = elements.inputs.body2.value.trim();
    state.texts.footer = elements.inputs.footer.value.trim();
    
    // Validate canvas is initialized
    if (!elements.canvas || !elements.ctx) {
        alert('Error: Canvas not initialized. Please refresh the page.');
        console.error('Canvas elements not found:', { canvas: elements.canvas, ctx: elements.ctx });
        return;
    }
    
    showLoading();
    
    try {
        // Wait for fonts to be ready
        console.log('Waiting for fonts to load...');
        await document.fonts.ready;
        console.log('Fonts loaded successfully');
        
        // Generate the image
        console.log('Starting image generation...');
        await generateImage();
        console.log('Image generation completed');
        
        // Download the image
        console.log('Downloading image...');
        downloadImage();
        console.log('Image download initiated');
    } catch (error) {
        console.error('Error generating image:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            theme: state.selectedTheme,
            template: state.selectedTemplate
        });
        alert(`Error creating image: ${error.message}\n\nPlease check the browser console for details.`);
    } finally {
        hideLoading();
    }
}

// ============================================
// IMAGE GENERATION
// ============================================

/**
 * Main function to generate the canvas image
 */
async function generateImage() {
    const ctx = elements.ctx;
    const template = TEMPLATES[state.selectedTemplate];
    
    // Step 1: Load and draw background image
    await drawBackground(ctx);
    
    // Step 2: Apply dark overlay (70% opacity black)
    drawOverlay(ctx);
    
    // Step 3: Draw all text elements
    drawTextElements(ctx, template);
}

/**
 * Load and draw the background image
 */
function drawBackground(ctx) {
    return new Promise((resolve, reject) => {
        if (!ctx) {
            console.error('Canvas context is null in drawBackground');
            reject(new Error('Canvas context not available'));
            return;
        }
        
        const themeConfig = THEME_CONFIG[state.selectedTheme];
        
        if (!themeConfig) {
            console.error(`Theme config not found for: ${state.selectedTheme}`);
            reject(new Error(`Invalid theme: ${state.selectedTheme}`));
            return;
        }
        
        // Select a random image from the theme folder
        const randomIndex = Math.floor(Math.random() * themeConfig.imageCount) + 1;
        // Construct image path relative to HTML file location (ensure it's relative)
        // Remove any leading slashes to ensure relative path
        const folderPath = themeConfig.folder.replace(/^\//, '');
        const imagePath = `${folderPath}/${randomIndex}.${themeConfig.extension}`;
        
        console.log(`Loading image from: ${imagePath} (Theme: ${state.selectedTheme})`);
        console.log(`Full URL will be: ${window.location.origin}/${imagePath}`);
        
        // Use fetch to load image as blob - this prevents canvas tainting issues
        // By loading as blob and creating object URL, we avoid CORS restrictions
        // Note: This only works with http/https, not file:// protocol
        fetch(imagePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                const img = new Image();
                
                // Set timeout for image loading (10 seconds)
                const timeout = setTimeout(() => {
                    console.warn(`Image loading timeout for: ${imagePath}`);
                    URL.revokeObjectURL(objectURL); // Clean up
                    drawFallbackBackground(ctx);
                    resolve();
                }, 10000);
                
                img.onload = () => {
                    clearTimeout(timeout);
                    URL.revokeObjectURL(objectURL); // Clean up object URL
                    console.log(`Successfully loaded image: ${imagePath}`);
                    try {
                        // Draw image to cover entire canvas (cover mode)
                        drawImageCover(ctx, img);
                        resolve();
                    } catch (error) {
                        console.error('Error drawing image:', error);
                        drawFallbackBackground(ctx);
                        resolve();
                    }
                };
                
                img.onerror = (error) => {
                    clearTimeout(timeout);
                    URL.revokeObjectURL(objectURL); // Clean up
                    console.error(`Failed to load image: ${imagePath}`, error);
                    console.warn(`Using fallback gradient background for theme: ${state.selectedTheme}`);
                    try {
                        drawFallbackBackground(ctx);
                        resolve();
                    } catch (fallbackError) {
                        console.error('Error drawing fallback background:', fallbackError);
                        reject(fallbackError);
                    }
                };
                
                img.src = objectURL;
            })
            .catch(error => {
                console.error(`Failed to fetch image: ${imagePath}`, error);
                console.warn(`Using fallback gradient background for theme: ${state.selectedTheme}`);
                try {
                    drawFallbackBackground(ctx);
                    resolve();
                } catch (fallbackError) {
                    console.error('Error drawing fallback background:', fallbackError);
                    reject(fallbackError);
                }
            });
    });
}

/**
 * Draw image in "cover" mode (fills canvas, may crop)
 */
function drawImageCover(ctx, img) {
    const canvasRatio = CANVAS_WIDTH / CANVAS_HEIGHT;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
        // Image is wider - fit height, crop width
        drawHeight = CANVAS_HEIGHT;
        drawWidth = img.width * (CANVAS_HEIGHT / img.height);
        offsetX = (CANVAS_WIDTH - drawWidth) / 2;
        offsetY = 0;
    } else {
        // Image is taller - fit width, crop height
        drawWidth = CANVAS_WIDTH;
        drawHeight = img.height * (CANVAS_WIDTH / img.width);
        offsetX = 0;
        offsetY = (CANVAS_HEIGHT - drawHeight) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

/**
 * Draw a fallback gradient background when image fails to load
 */
function drawFallbackBackground(ctx) {
    const gradients = {
        patriotic: ['#FF9933', '#FFFFFF', '#138808'],
        religious: ['#8B4513', '#FFD700', '#8B4513'],
        astrological: ['#1a1a2e', '#16213e', '#0f3460'],
        motivational: ['#2C3E50', '#34495E', '#1A252F'],
        general: ['#667eea', '#764ba2', '#6B73FF']
    };
    
    const colors = gradients[state.selectedTheme] || gradients.general;
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    
    colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color);
    });
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * Draw semi-transparent black overlay
 */
function drawOverlay(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

/**
 * Draw all text elements on the canvas
 */
function drawTextElements(ctx, template) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    
    const centerX = CANVAS_WIDTH / 2;
    let currentY;
    
    // Draw Title
    if (state.texts.title) {
        const titleFont = template.fonts.title;
        ctx.font = `${titleFont.weight} ${titleFont.size}px ${titleFont.family}`;
        currentY = template.spacing.titleTop;
        drawWrappedText(ctx, state.texts.title, centerX, currentY, CANVAS_WIDTH - 100, titleFont.size * titleFont.lineHeight);
    }
    
    // Draw Subtitle
    if (state.texts.subtitle) {
        const subtitleFont = template.fonts.subtitle;
        ctx.font = `${subtitleFont.weight} ${subtitleFont.size}px ${subtitleFont.family}`;
        
        // Calculate position based on title
        let subtitleY = template.spacing.titleTop;
        if (state.texts.title) {
            const titleFont = template.fonts.title;
            const titleLines = getWrappedLines(ctx, state.texts.title, CANVAS_WIDTH - 100, `${titleFont.weight} ${titleFont.size}px ${titleFont.family}`);
            subtitleY = template.spacing.titleTop + (titleLines.length * titleFont.size * titleFont.lineHeight) + template.spacing.subtitleGap;
        }
        
        ctx.font = `${subtitleFont.weight} ${subtitleFont.size}px ${subtitleFont.family}`;
        drawWrappedText(ctx, state.texts.subtitle, centerX, subtitleY, CANVAS_WIDTH - 100, subtitleFont.size * subtitleFont.lineHeight);
    }
    
    // Draw Body Text (centered vertically)
    if (state.texts.body1 || state.texts.body2) {
        const bodyFont = template.fonts.body;
        ctx.font = `${bodyFont.weight} ${bodyFont.size}px ${bodyFont.family}`;
        
        // Calculate total body text height
        let body1Lines = state.texts.body1 ? getWrappedLines(ctx, state.texts.body1, CANVAS_WIDTH - 120, `${bodyFont.weight} ${bodyFont.size}px ${bodyFont.family}`) : [];
        let body2Lines = state.texts.body2 ? getWrappedLines(ctx, state.texts.body2, CANVAS_WIDTH - 120, `${bodyFont.weight} ${bodyFont.size}px ${bodyFont.family}`) : [];
        
        const lineHeight = bodyFont.size * bodyFont.lineHeight;
        const totalHeight = (body1Lines.length + body2Lines.length) * lineHeight + 
                           (body1Lines.length && body2Lines.length ? template.spacing.bodyGap : 0);
        
        let bodyY = (CANVAS_HEIGHT - totalHeight) / 2;
        
        // Draw Body Text 1
        if (state.texts.body1) {
            ctx.font = `${bodyFont.weight} ${bodyFont.size}px ${bodyFont.family}`;
            body1Lines.forEach((line, index) => {
                ctx.fillText(line, centerX, bodyY + (index * lineHeight));
            });
            bodyY += body1Lines.length * lineHeight;
        }
        
        // Add gap between body texts
        if (state.texts.body1 && state.texts.body2) {
            bodyY += template.spacing.bodyGap;
        }
        
        // Draw Body Text 2
        if (state.texts.body2) {
            ctx.font = `${bodyFont.weight} ${bodyFont.size}px ${bodyFont.family}`;
            body2Lines.forEach((line, index) => {
                ctx.fillText(line, centerX, bodyY + (index * lineHeight));
            });
        }
    }
    
    // Draw Footer
    if (state.texts.footer) {
        const footerFont = template.fonts.footer;
        ctx.font = `${footerFont.weight} ${footerFont.size}px ${footerFont.family}`;
        
        // Set alignment based on user selection
        const padding = 60;
        let footerX;
        
        switch (state.footerAlignment) {
            case 'left':
                ctx.textAlign = 'left';
                footerX = padding;
                break;
            case 'right':
                ctx.textAlign = 'right';
                footerX = CANVAS_WIDTH - padding;
                break;
            default:
                ctx.textAlign = 'center';
                footerX = centerX;
        }
        
        const footerY = CANVAS_HEIGHT - template.spacing.footerBottom;
        ctx.fillText(state.texts.footer, footerX, footerY);
        
        // Reset alignment
        ctx.textAlign = 'center';
    }
}

/**
 * Get wrapped text lines for a given max width
 */
function getWrappedLines(ctx, text, maxWidth, font) {
    if (!text || typeof text !== 'string') {
        return [];
    }
    
    if (!ctx) {
        console.error('Canvas context is null in getWrappedLines');
        return [];
    }
    
    ctx.save();
    try {
        ctx.font = font;
        
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        });
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        return lines;
    } catch (error) {
        console.error('Error in getWrappedLines:', error);
        return [text]; // Fallback to single line
    } finally {
        ctx.restore();
    }
}

/**
 * Draw text with automatic line wrapping
 */
function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {
    const lines = getWrappedLines(ctx, text, maxWidth, ctx.font);
    
    lines.forEach((line, index) => {
        ctx.fillText(line, x, y + (index * lineHeight));
    });
    
    return lines.length;
}

// ============================================
// DOWNLOAD FUNCTIONALITY
// ============================================

/**
 * Download the generated image as PNG
 */
function downloadImage() {
    try {
        if (!elements.canvas) {
            throw new Error('Canvas element not available');
        }
        
        const dataURL = elements.canvas.toDataURL('image/png', 1.0);
        
        if (!dataURL || dataURL === 'data:,') {
            throw new Error('Failed to generate image data');
        }
        
        const link = document.createElement('a');
        link.download = 'whatsapp-status.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Image download initiated successfully');
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error; // Re-throw to be caught by handleGenerate
    }
}

// ============================================
// UI HELPERS
// ============================================

/**
 * Show loading overlay
 */
function showLoading() {
    elements.loadingOverlay.classList.remove('hidden');
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    elements.loadingOverlay.classList.add('hidden');
}

