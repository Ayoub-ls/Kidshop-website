import React from 'react';

const Loading = ({
  size = 'medium',
  className = '',
  text = 'Loading...',
  showText = false,
  fullScreen = false,
}) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  const spinnerSize = typeof size === 'number' ? size : sizeMap[size];

  const spinner = (
    <div className={`relative ${className}`} style={{ width: spinnerSize, height: spinnerSize }}>
      {/* Outer ring - gradient background */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-300 to-red-400 opacity-20"
        style={{ width: spinnerSize, height: spinnerSize }}
      ></div>
      
      {/* Spinner ring - animated gradient */}
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `${Math.max(3, spinnerSize * 0.1)}px solid transparent`,
          borderTopColor: '#FDA4AF',
          borderRightColor: '#FB7185',
          borderBottomColor: '#F43F5E',
          borderLeftColor: '#E11D48',
          background: 'linear-gradient(to bottom right, rgba(253, 164, 175, 0.1), rgba(248, 113, 133, 0.1))',
        }}
      ></div>
      
      {/* Inner circle - subtle gradient */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-rose-100/30 to-red-200/30"
        style={{
          width: spinnerSize * 0.6,
          height: spinnerSize * 0.6,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      ></div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
        {spinner}
        {showText && (
          <p className="mt-4 text-lg font-medium bg-gradient-to-br from-rose-300 to-red-400 bg-clip-text text-transparent">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {spinner}
      {showText && (
        <p className="mt-3 text-sm font-medium bg-gradient-to-br from-rose-300 to-red-400 bg-clip-text text-transparent">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;