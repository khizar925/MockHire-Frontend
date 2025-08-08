import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function Combobox({ label, options = [], value, onChange }) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">{label}</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value || `Select ${label}`}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-full p-0"
                    side="bottom"
                    align="start"
                    // Important for mouse scrolling
                    onWheel={(e) => e.stopPropagation()}
                >
                    <Command>
                        <CommandInput
                            placeholder={`Search ${label.toLowerCase()}...`}
                            className="h-9"
                        />
                        <CommandEmpty>No option found.</CommandEmpty>

                        {/* Scrollable area */}
                        <CommandGroup
                            className="max-h-48 overflow-y-auto overscroll-contain"
                        >
                            {options.map((option, index) => (
                                <CommandItem
                                    key={index}
                                    value={option}
                                    onSelect={() => {
                                        onChange(option === value ? "" : option);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === option ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>

            </Popover>
        </div>
    );
}
