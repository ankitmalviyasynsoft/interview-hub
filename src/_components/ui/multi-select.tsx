
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/_components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/_components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/_components/ui/popover"
import { Badge } from "@/_components/ui/badge"

export type Option = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: Option[]
    selected: string[]
    onChange: (selected: string[]) => void
    placeholder?: string
    className?: string
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select items...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        onChange(selected.filter((i) => i !== item))
    }

    const selectedLabels = selected
        .map((value) => options.find((opt) => opt.value === value)?.label)
        .filter(Boolean) as string[]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    role="combobox"
                    aria-expanded={open}
                    tabIndex={0}
                    className={cn(
                        "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer h-auto min-h-11",
                        className
                    )}
                    onClick={() => setOpen(!open)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            setOpen(true)
                        }
                    }}
                >
                    <div className="flex flex-wrap gap-1">
                        {selected.length === 0 && (
                            <span className="text-muted-foreground font-normal">
                                {placeholder}
                            </span>
                        )}
                        {selected.map((item) => {
                            const option = options.find((opt) => opt.value === item)
                            return (
                                <Badge
                                    variant="secondary"
                                    key={item}
                                    className="mr-1 mb-1"
                                >
                                    {option?.label ?? item}
                                    <button
                                        type="button"
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-muted p-0.5"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.stopPropagation()
                                                handleUnselect(item)
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            handleUnselect(item)
                                        }}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            )
                        })}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <Command>
                    <CommandInput placeholder={`Search...`} />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label} // Filtering by label usually
                                    onSelect={() => {
                                        if (selected.includes(option.value)) {
                                            onChange(selected.filter((item) => item !== option.value))
                                        } else {
                                            onChange([...selected, option.value])
                                        }
                                        // Keep open for multiple selection
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected.includes(option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
