import React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { X, Search } from "lucide-react"
// import { HOSPITAL_TYPES, NIGERIAN_STATES } from "@/lib/data"



interface FiltersProps {
  onSearch: (term: string) => void
  onTypeChange: (type: string) => void
  onStateChange: (state: string) => void
  searchValue: string
  typeValue: string
  stateValue: string
}

export function HospitalFilters({
  onSearch,
  onTypeChange,
  onStateChange,
  searchValue,
  typeValue,
  stateValue,
}: FiltersProps) {
  const [searchInput, setSearchInput] = useState(searchValue)
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout>()

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setSearchInput(value)

      if (debounceTimer) clearTimeout(debounceTimer)
      const timer = setTimeout(() => onSearch(value), 500)
      setDebounceTimer(timer)
    },
    [onSearch, debounceTimer],
  )

  const handleClear = useCallback(() => {
    setSearchInput("")
    onSearch("")
    onTypeChange("")
    onStateChange("")
  }, [onSearch, onTypeChange, onStateChange])

  const hasFilters = searchValue || typeValue || stateValue

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search hospitals..."
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* <Select value={typeValue} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Hospital type" />
            </SelectTrigger>
            <SelectContent>
              {HOSPITAL_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {/* <Select value={stateValue} onValueChange={onStateChange}>
            <SelectTrigger>
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {NIGERIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

          {hasFilters && (
            <Button onClick={handleClear} variant="outline" className="gap-2 bg-transparent">
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
