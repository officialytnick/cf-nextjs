import React from 'react';

export function Label({ className, ...props }: any) {
  return <label className={"text-sm font-medium leading-none text-gray-700 dark:text-gray-300 " + (className || '')} {...props} />;
}
