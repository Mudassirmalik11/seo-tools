/**
 * Keyword Density Checker Tool Component
 */

'use client';

import { useState, useCallback } from 'react';
import { processKeywordDensity } from '@/lib/tools/processor';
import { ToolResponse } from '@/types';

export function KeywordDensityChecker() {
  const [text, setText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState<ToolResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = useCallback(async () => {
    setLoading(true);
    try {
      const response = await processKeywordDensity(text, keyword);
      setResult(response);
    } finally {
      setLoading(false);
    }
  }, [text, keyword]);

  const handleClear = () => {
    setText('');
    setKeyword('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Keyword Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Keyword to Analyze</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter the keyword you want to check..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Text Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Enter your text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your content here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAnalyze}
          disabled={!text.trim() || !keyword.trim() || loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : 'Check Density'}
        </button>
        <button onClick={handleClear} className="btn-secondary">
          Clear
        </button>
      </div>

      {/* Results */}
      {result?.success && result.data && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-lg text-green-900">Analysis Results</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">{result.data.count}</div>
              <div className="text-sm text-gray-600">Count</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-2xl font-bold text-blue-600">{result.data.density}</div>
              <div className="text-sm text-gray-600">Density</div>
            </div>

            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-xl font-bold text-green-600">{result.data.recommendation}</div>
              <div className="text-sm text-gray-600">Recommendation</div>
            </div>
          </div>

          {result.data.context && result.data.context.length > 0 && (
            <div>
              <h4 className="font-bold mb-3">Sentences with keyword:</h4>
              <div className="space-y-2">
                {result.data.context.map((sentence: string, idx: number) => (
                  <p key={idx} className="bg-white p-3 rounded border border-green-200 text-sm">
                    {sentence}
                  </p>
                ))}
              </div>
            </div>
          )}
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
