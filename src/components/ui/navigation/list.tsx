import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import * as React from 'react'

import { cn } from '@/lib/shadcn'

const List = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'group flex flex-1 list-none items-center justify-center space-x-1',
      className,
    )}
    {...props}
  />
))
List.displayName = NavigationMenuPrimitive.List.displayName

export { List }
