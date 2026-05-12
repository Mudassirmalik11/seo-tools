/**
 * Tool Processing Engine
 * Handles API calls and business logic for all tools
 */

import { ToolResponse } from '@/types';

// Word Counter
export async function processWordCounter(text: string): Promise<ToolResponse> {
  try {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        success: true,
        data: {
          words: 0,
          characters: 0,
          charactersNoSpaces: 0,
          sentences: 0,
          paragraphs: 0,
          readingTime: 0,
          speakingTime: 0,
        },
      };
    }

    const words = trimmed.split(/\s+/).filter(w => w.length > 0).length;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed
    const speakingTime = Math.ceil(words / 130); // Average speaking speed

    return {
      success: true,
      data: {
        words,
        characters,
        charactersNoSpaces,
        sentences,
        paragraphs,
        readingTime,
        speakingTime,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process word counter',
    };
  }
}

// Keyword Density Checker
export async function processKeywordDensity(
  text: string,
  keyword: string
): Promise<ToolResponse> {
  try {
    if (!text || !keyword) {
      return {
        success: false,
        error: 'Text and keyword are required',
      };
    }

    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    const keywordLower = keyword.toLowerCase();
    const keywordCount = words.filter(w => w === keywordLower).length;
    const totalWords = words.length;
    const density = totalWords > 0 ? ((keywordCount / totalWords) * 100).toFixed(2) : '0';

    // Get context (sentences containing keyword)
    const sentences = text.split(/[.!?]+/);
    const context = sentences
      .filter(s => s.toLowerCase().includes(keywordLower))
      .map(s => s.trim())
      .slice(0, 5);

    return {
      success: true,
      data: {
        keyword,
        count: keywordCount,
        totalWords,
        density: `${density}%`,
        recommendation: parseFloat(density) < 1 ? 'Increase keyword usage' : parseFloat(density) > 3 ? 'Reduce keyword usage' : 'Optimal',
        context,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process keyword density',
    };
  }
}

// Text Case Converter
export async function processTextCaseConverter(
  text: string,
  caseType: 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase' | 'togglecase'
): Promise<ToolResponse> {
  try {
    let result = text;

    switch (caseType) {
      case 'uppercase':
        result = text.toUpperCase();
        break;
      case 'lowercase':
        result = text.toLowerCase();
        break;
      case 'titlecase':
        result = text
          .split(/\s+/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'sentencecase':
        result = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
      case 'togglecase':
        result = text
          .split('')
          .map(char => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
          .join('');
        break;
      default:
        return {
          success: false,
          error: 'Invalid case type',
        };
    }

    return {
      success: true,
      data: {
        original: text,
        converted: result,
        caseType,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process text case conversion',
    };
  }
}

// JSON Formatter
export async function processJSONFormatter(
  json: string,
  format: 'format' | 'minify' | 'validate'
): Promise<ToolResponse> {
  try {
    const parsed = JSON.parse(json);

    let result = json;
    switch (format) {
      case 'format':
        result = JSON.stringify(parsed, null, 2);
        break;
      case 'minify':
        result = JSON.stringify(parsed);
        break;
      case 'validate':
        // If we got here without error, it's valid
        result = JSON.stringify(parsed, null, 2);
        break;
    }

    return {
      success: true,
      data: {
        original: json,
        formatted: result,
        format,
        isValid: true,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Invalid JSON format',
      data: {
        isValid: false,
      },
    };
  }
}

// Image Resizer (mock)
export async function processImageResizer(
  imageBase64: string,
  width: number,
  height: number,
  format: 'jpeg' | 'png' | 'webp' = 'jpeg'
): Promise<ToolResponse> {
  try {
    // In a real implementation, use a library like sharp
    // This is a mock that returns success

    return {
      success: true,
      data: {
        width,
        height,
        format,
        message: 'Image resized successfully',
        // In production, return base64 encoded image
        resizedImage: null,
        sizeBefore: imageBase64.length,
        sizeAfter: Math.floor(imageBase64.length * 0.7), // Mock compression
      },
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to resize image',
    };
  }
}

/**
 * Generic tool processor dispatcher
 */
export async function processTool(
  toolSlug: string,
  data: Record<string, any>
): Promise<ToolResponse> {
  try {
    switch (toolSlug) {
      case 'word-counter':
        return await processWordCounter(data.text);

      case 'keyword-density-checker':
        return await processKeywordDensity(data.text, data.keyword);

      case 'text-case-converter':
        return await processTextCaseConverter(data.text, data.caseType);

      case 'json-formatter':
        return await processJSONFormatter(data.json, data.format);

      case 'image-resizer':
        return await processImageResizer(data.imageBase64, data.width, data.height, data.format);

      default:
        return {
          success: false,
          error: 'Tool not found',
        };
    }
  } catch (error) {
    return {
      success: false,
      error: 'Tool processing failed',
    };
  }
}
