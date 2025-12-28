import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={`flex cursor-default select-none items-center rounded-md px-2 py-1 text-sm ${className || ''}`}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.SubContent ref={ref} className={`bg-white border rounded p-2 shadow ${className || ''}`} {...props} />
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }: any, ref: any) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitive.Content ref={ref} sideOffset={sideOffset} className={`bg-white border rounded shadow p-2 ${className || ''}`} {...props} />
  </DropdownMenuPortal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.Item ref={ref} className={`px-2 py-1 rounded text-sm hover:bg-gray-50 ${className || ''}`} {...props} />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.CheckboxItem ref={ref} className={`flex items-center gap-2 px-2 py-1 rounded text-sm ${className || ''}`} checked={checked} {...props}>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.RadioItem ref={ref} className={`px-2 py-1 rounded text-sm ${className || ''}`} {...props}>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.Label ref={ref} className={`px-2 py-1 text-xs font-semibold ${className || ''}`} {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }: any, ref: any) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={`my-2 h-px bg-gray-100 ${className || ''}`} {...props} />
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({ className, children }: any) => (
  <span className={`ml-auto text-xs text-gray-500 ${className || ''}`}>{children}</span>
);
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};