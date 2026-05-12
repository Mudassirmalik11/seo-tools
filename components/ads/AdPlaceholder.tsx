'use client';

interface AdPlaceholderProps {
  className?: string;
}

export function AdPlaceholder({ className = '' }: AdPlaceholderProps) {
  const placeholderStyle = {
    width: '100%',
    minHeight: 250,
    borderRadius: '1rem',
    backgroundColor: '#f8fafc',
  } as const;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-slate-50 ${className}`} style={placeholderStyle}>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 opacity-80 animate-pulse" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-2 px-4 py-8 text-center text-sm text-slate-500">
        <span className="font-semibold text-slate-600">Loading ad slot</span>
        <span className="text-xs">Keeping the layout stable for better Core Web Vitals</span>
      </div>
    </div>
  );
}
