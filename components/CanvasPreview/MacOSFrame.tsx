'use client';

interface MacOSFrameProps {
  theme: 'dark' | 'light';
  title?: string;
}

export default function MacOSFrame({ theme, title = '' }: MacOSFrameProps) {
  const bgColor = theme === 'dark' ? '#1e1e1e' : '#f5f5f5';
  const textColor = theme === 'dark' ? '#ffffff' : '#000000';

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: bgColor,
        borderRadius: '8px 8px 0 0',
        paddingTop: '28px',
      }}
    >
      {/* Traffic lights */}
      <div className="absolute left-3 top-3 flex gap-2">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      {/* Title */}
      {title && (
        <div
          className="absolute left-1/2 top-3 -translate-x-1/2 text-xs font-medium"
          style={{ color: textColor }}
        >
          {title}
        </div>
      )}
    </div>
  );
}

