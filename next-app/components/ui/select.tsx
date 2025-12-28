import React from 'react';

export function Select({ value, onValueChange, className, children, id }: any) {
  return (
    <select id={id} value={value} onChange={(e) => onValueChange(e.target.value)} className={"w-full border rounded px-3 py-2 text-sm " + (className || '')}>
      {children}
    </select>
  );
}

export function SelectItem({ value, children }: any) {
  return <option value={value}>{children}</option>;
}

export const SelectTrigger = ({ children }: any) => <div>{children}</div>;
export const SelectValue = ({ children }: any) => <div>{children}</div>;
export const SelectContent = ({ children }: any) => <div>{children}</div>;
export const SelectGroup = ({ children }: any) => <div>{children}</div>;
export const SelectLabel = ({ children }: any) => <div>{children}</div>;
export const SelectSeparator = ({ children }: any) => <div>{children}</div>;
