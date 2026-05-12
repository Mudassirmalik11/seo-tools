/**
 * Image Resizer Tool Component
 */

'use client';

import { useState, useCallback } from 'react';
import { processImageResizer } from '@/lib/tools/processor';
import { ToolResponse } from '@/types';

export function ImageResizer() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [result, setResult] = useState<ToolResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageBase64 = event.target?.result as string;
        setLoading(true);
        try {
          const response = await processImageResizer(imageBase64, width, height, format);
          setResult(response);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [width, height, format]);

  const handleReset = () => {
    setFileName('');
    setResult(null);
    setWidth(800);
    setHeight(600);
  };

  return (
    <div className="space-y-6">
      {/* Preset Sizes */}
      <div>
        <label className="block text-sm font-medium mb-3">Quick Presets</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { w: 1920, h: 1080, label: '1080p' },
            { w: 1280, h: 720, label: '720p' },
            { w: 640, h: 480, label: 'VGA' },
            { w: 800, h: 600, label: 'SVGA' },
            { w: 1024, h: 768, label: '4:3' },
            { w: 1200, h: 630, label: 'OG Image' },
            { w: 1200, h: 1200, label: 'Instagram' },
            { w: 1000, h: 1500, label: 'Pinterest' },
          ].map(preset => (
            <button
              key={preset.label}
              onClick={() => { setWidth(preset.w); setHeight(preset.h); }}
              className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded text-sm font-medium transition"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium mb-2">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
        />
        {fileName && <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>}
        {loading && <p className="text-sm text-blue-600 mt-2">Processing image...</p>}
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Width (px)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseInt(e.target.value) || 800)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value) || 600)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="block text-sm font-medium mb-2">Output Format</label>
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button onClick={handleReset} className="btn-secondary flex-1">
          Reset
        </button>
      </div>

      {/* Results */}
      {result?.success && result.data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg text-green-900">Resize Complete!</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-sm text-gray-600">Output Size</div>
              <div className="font-bold">
                {result.data.width} × {result.data.height}
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-sm text-gray-600">Format</div>
              <div className="font-bold uppercase">{result.data.format}</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-sm text-gray-600">Size Before</div>
              <div className="font-bold">
                {(result.data.sizeBefore / 1024).toFixed(2)} KB
              </div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-sm text-gray-600">Size After</div>
              <div className="font-bold">
                {(result.data.sizeAfter / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>

          <p className="text-sm text-green-700 bg-white p-3 rounded border border-green-200">
            ✓ Image resized successfully! Download your optimized image below.
          </p>

          <button className="btn-primary w-full">
            Download Resized Image
          </button>
        </div>
      )}

      {result?.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-900">
          Error: {result.error}
        </div>
      )}
    </div>
  );
}
