import React from "react"
import { useState, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface TableFiltersProps {
  onSearch: (term: string) => void
  searchValue: string
}

export function HospitalTableFilters({ onSearch, searchValue }: TableFiltersProps) {
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

  return (
    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center md:justify-between">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by hospital name"
          value={searchInput}
          onChange={handleSearchChange}
          className="pl-10 bg-muted border-0"
        />
      </div>

      <Select defaultValue="nigeria">
        <SelectTrigger className="w-full md:w-48 bg-background border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nigeria">Nigeria</SelectItem>
          <SelectItem value="ghana">Ghana</SelectItem>
          <SelectItem value="kenya">Kenya</SelectItem>
          <SelectItem value="south-africa">South Africa</SelectItem>
          <SelectItem value="egypt">Egypt</SelectItem>
          <SelectItem value="morocco">Morocco</SelectItem>
          <SelectItem value="ethiopia">Ethiopia</SelectItem>
          <SelectItem value="belgium">Belgium</SelectItem>
          <SelectItem value="germany">Germany</SelectItem>
          <SelectItem value="united-kingdom">United Kingdom</SelectItem>
          <SelectItem value="canada">Canada</SelectItem>
          <SelectItem value="brazil">Brazil</SelectItem>
          <SelectItem value="united-states">United States</SelectItem>
          
          
        </SelectContent>
      </Select>
    </div>
  )
}
