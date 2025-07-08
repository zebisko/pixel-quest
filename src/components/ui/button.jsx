import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-black hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        outline:
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        secondary:
          "bg-gray-400 text-black hover:bg-gray-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]",
        ghost: "bg-transparent border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline bg-transparent border-transparent shadow-none",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
