import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "./utils"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

interface SelectTriggerProps {
  className?: string
  children: React.ReactNode
}

interface SelectContentProps {
  children: React.ReactNode
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
}

interface SelectValueProps {
  placeholder?: string
  value?: string
}

// Componente Select simplificado que usa un select nativo
const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return <div className="relative">{children}</div>
}

const SelectTrigger: React.FC<SelectTriggerProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  )
}

const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
      <div className="p-1">
        {children}
      </div>
    </div>
  )
}

const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <div className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground">
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <div className="w-2 h-2 bg-current rounded-full opacity-0" />
      </span>
      {children}
    </div>
  )
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder, value }) => {
  if (value) {
    return <span className="text-foreground">{value}</span>
  }
  return <span className="text-muted-foreground">{placeholder}</span>
}

// Componentes adicionales para compatibilidad
const SelectGroup = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
const SelectLabel = ({ children }: { children: React.ReactNode }) => <div className="py-1.5 pl-8 pr-2 text-sm font-semibold">{children}</div>
const SelectSeparator = ({ className }: { className?: string }) => <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />
const SelectScrollUpButton = () => null
const SelectScrollDownButton = () => null

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
