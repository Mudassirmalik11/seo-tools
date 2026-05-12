/**
 * Word Counter Tool Component
 */

'use client';

import { useState, useCallback } from 'react';
import { processWordCounter } from '@/lib/tools/processor';
import { ToolResponse } from '@/types';

export function WordCounter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ToolResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = useCallback(async () => {
    setLoading(true);
    try {
      const response = await processWordCounter(text);
      setResult(response);
    } finally {
      setLoading(false);
    }
  }, [text]);

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Enter your text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
        />
        <p className="text-xs text-gray-500 mt-2">
          {text.length} characters | {text.trim().split(/\s+/).filter(w => w).length} words
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>
        <button
          onClick={handleClear}
          className="btn-secondary"
        >
          Clear
        </button>
      </div>

      {/* Results */}
      {result?.success && result.data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4 text-green-900">Results</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.words}
              </div>
              <div className="text-sm text-gray-600">Words</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.characters}
              </div>
              <div className="text-sm text-gray-600">Characters</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.charactersNoSpaces}
              </div>
              <div className="text-sm text-gray-600">No Spaces</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.sentences}
              </div>
              <div className="text-sm text-gray-600">Sentences</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.paragraphs}
              </div>
              <div className="text-sm text-gray-600">Paragraphs</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">
                {result.data.readingTime} min
              </div>
              <div className="text-sm text-gray-600">Read Time</div>
            </div>
          </div>
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
