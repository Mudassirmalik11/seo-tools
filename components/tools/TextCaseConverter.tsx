/**
 * Text Case Converter Tool (Placeholder for additional tools)
 */

'use client';

import { useState } from 'react';
import { processTextCaseConverter } from '@/lib/tools/processor';
import { ToolResponse } from '@/types';

export function TextCaseConverter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<ToolResponse | null>(null);

  const handleConvert = async (caseType: 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase' | 'togglecase') => {
    const response = await processTextCaseConverter(text, caseType);
    setResult(response);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Enter text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your text here..."
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <button onClick={() => handleConvert('uppercase')} className="btn-primary text-sm py-1">
          UPPERCASE
        </button>
        <button onClick={() => handleConvert('lowercase')} className="btn-primary text-sm py-1">
          lowercase
        </button>
        <button onClick={() => handleConvert('titlecase')} className="btn-primary text-sm py-1">
          Title Case
        </button>
        <button onClick={() => handleConvert('sentencecase')} className="btn-primary text-sm py-1">
          Sentence case
        </button>
        <button onClick={() => handleConvert('togglecase')} className="btn-primary text-sm py-1">
          tOGGLE cASE
        </button>
      </div>

      {result?.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <textarea
            value={result.data.converted}
            readOnly
            rows={6}
            className="w-full px-4 py-3 border border-green-300 rounded-lg bg-white font-mono text-sm"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(result.data.converted);
              alert('Copied to clipboard!');
            }}
            className="btn-secondary mt-4 w-full"
          >
            Copy Result
          </button>
        </div>
      )}
    </div>
  );
}
