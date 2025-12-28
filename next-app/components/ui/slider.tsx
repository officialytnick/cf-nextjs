"use client";

import React from 'react';

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1 }: any) {
  const v = Array.isArray(value) ? value[0] : value;
  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onValueChange([Number(e.target.value)])}
        className="w-full"
      />
    </div>
  );
}

export default Slider;