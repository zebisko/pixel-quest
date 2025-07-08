import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-6 w-full overflow-hidden rounded-full border-2 border-black bg-white", className)}
    {...props}>
    <ProgressPrimitive.Indicator
      className="h-full bg-black rounded-full transition-all"
      style={{ width: `${value || 0}%` }} />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
