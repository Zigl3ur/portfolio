import {
  NavigationMenu,
  type NavigationMenuContentProps,
  type NavigationMenuListProps,
  type NavigationMenuRootProps,
  type NavigationMenuTriggerProps,
  type NavigationMenuPositionerProps,
  type NavigationMenuItemProps,
  type NavigationMenuIconProps,
  type NavigationMenuLinkProps
} from "@base-ui/react";
import PlusIcon from "../../icons/plus.svg?react";
import { cn } from "../../lib/cn";
import ChevronDownIcon from "../../icons/chevron-down.svg?react";

export function NavigationMenuRoot({
  className,
  children,
  ...props
}: NavigationMenuRootProps) {
  return (
    <NavigationMenu.Root className={className} {...props}>
      {children}
    </NavigationMenu.Root>
  );
}

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuTriggerProps) {
  return (
    <NavigationMenu.Trigger
      className={cn(
        "hover:bg-gray/40 data-popup-open:bg-gray/80 data-active:bg-gray/60 group/trigger active:bg-gray/60 flex h-full items-center px-2 py-1 transition-colors duration-200 hover:cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Trigger>
  );
}

export function NavigationMenuList({
  className,
  children,
  ...props
}: NavigationMenuListProps) {
  return (
    <NavigationMenu.List
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {children}
    </NavigationMenu.List>
  );
}

export function NavigationMenuItem({
  children,
  ...props
}: NavigationMenuItemProps) {
  return <NavigationMenu.Item {...props}>{children}</NavigationMenu.Item>;
}

export function NavigationMenuContent({
  className,
  children,
  ...props
}: NavigationMenuContentProps) {
  return (
    <NavigationMenu.Content className={className} {...props}>
      {children}
    </NavigationMenu.Content>
  );
}

export default function NavigationMenuPositioner({
  className,
  children,
  ...props
}: NavigationMenuPositionerProps) {
  return (
    <NavigationMenu.Positioner className={cn(className)} {...props}>
      {children}
    </NavigationMenu.Positioner>
  );
}

export function NavigationMenuPortal({
  className,
  ...props
}: NavigationMenuPositionerProps) {
  return (
    <NavigationMenu.Portal>
      <NavigationMenu.Positioner
        sideOffset={props.sideOffset ?? 10}
        className={cn(
          "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] data-instant:transition-none",
          className
        )}
        positionMethod="fixed"
        {...props}
      >
        {/* Popover content */}
        <NavigationMenu.Popup
          className={cn(
            "bg-background border-gray pointer-events-auto relative h-(--popup-height) min-w-(--anchor-width) origin-[--transform-origin] border border-dashed px-5.5 py-4 shadow-lg transition-[opacity,transform] duration-150 data-ending-style:scale-98 data-ending-style:opacity-0 data-starting-style:scale-98 data-starting-style:opacity-0",
            className
          )}
        >
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute top-0 left-0 mt-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute bottom-0 left-0 mb-1 ml-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute top-0 right-0 mt-1 mr-1"
          />
          <PlusIcon
            width={15}
            height={15}
            className="text-gray absolute right-0 bottom-0 mr-1 mb-1"
          />
          <NavigationMenu.Viewport className="relative h-full w-full overflow-hidden" />
        </NavigationMenu.Popup>
      </NavigationMenu.Positioner>
    </NavigationMenu.Portal>
  );
}

export function NavigationMenuIcon({
  children,
  ...props
}: NavigationMenuIconProps) {
  return <NavigationMenu.Icon {...props}>{children}</NavigationMenu.Icon>;
}

export function NavigationMenuIndicator({
  className,
  ...props
}: NavigationMenuIconProps) {
  return (
    <NavigationMenu.Icon {...props} className={cn("ml-1", className)}>
      <ChevronDownIcon className="size-3 shrink-0 text-white/50 transition-transform duration-200 group-data-popup-open/trigger:-rotate-180" />
    </NavigationMenu.Icon>
  );
}

export function NavigationMenuLink({
  children,
  ...props
}: NavigationMenuLinkProps) {
  return (
    <NavigationMenu.Link
      className="hover:bg-gray/40 data-popup-open:bg-gray/80 active:bg-gray/60 flex h-full items-center px-2 py-1 transition-colors duration-200 hover:cursor-pointer"

      {...props}
    >
      {children}
    </NavigationMenu.Link>
  );
}
