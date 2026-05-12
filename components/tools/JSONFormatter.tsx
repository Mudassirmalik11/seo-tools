/**
 * JSON Formatter Tool (Placeholder for additional tools)
 */

'use client';

import { useState } from 'react';
import { processJSONFormatter } from '@/lib/tools/processor';
import { ToolResponse } from '@/types';

export function JSONFormatter() {
  const [json, setJson] = useState('');
  const [result, setResult] = useState<ToolResponse | null>(null);

  const handleFormat = async (format: 'format' | 'minify' | 'validate') => {
    const response = await processJSONFormatter(json, format);
    setResult(response);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">JSON Input</label>
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder='Paste your JSON here, e.g., {"name": "John"}'
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono text-sm"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={() => handleFormat('format')} className="btn-primary flex-1">
          Format
        </button>
        <button onClick={() => handleFormat('minify')} className="btn-primary flex-1">
          Minify
        </button>
        <button onClick={() => handleFormat('validate')} className="btn-primary flex-1">
          Validate
        </button>
      </div>

      {result && (
        <div className={`rounded-lg p-4 ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <textarea
            value={result.success ? result.data.formatted : result.error || ''}
            readOnly
            rows={8}
            className={`w-full px-4 py-3 rounded-lg font-mono text-sm border ${
              result.success ? 'border-green-300' : 'border-red-300'
            }`}
          />
          {result.success && (
            <button
              onClick={() => {
                navigator.clipboard.writeText(result.data.formatted);
                alert('Copied to clipboard!');
              }}
              className="btn-secondary mt-4 w-full"
            >
              Copy
            </button>
          )}
        </div>
      )}
    </div>
  );
}
