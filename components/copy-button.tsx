"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className={cn(
        "inline-flex items-center justify-center rounded-md p-1.5 transition-all duration-200",
        "text-muted-foreground hover:text-foreground hover:bg-muted/80",
        copied && "text-green-500 hover:text-green-500",
        className
      )}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      <span className="relative size-3.5">
        <Copy
          className={cn(
            "absolute inset-0 size-3.5 transition-all duration-200",
            copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
          )}
        />
        <Check
          className={cn(
            "absolute inset-0 size-3.5 transition-all duration-200",
            copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}
        />
      </span>
    </button>
  )
}
