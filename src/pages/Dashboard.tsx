import { useState, useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchHospitals } from "@/services/hospitalServices"
import type { Hospital } from "@/types/hospital"
import { HospitalTableFilters } from "@/components/hospitalDashboard/hospitalTableFilters"
import { HospitalTable } from "@/components/hospitalDashboard/hospitalTable"
// import { HospitalDetailPanel } from "@/components/hospitalDashboard/hospitalDetailPanel"
import { HospitalPagination } from "@/components/hospitalDashboard/hospitalPagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
import { HospitalDetailDialog } from "@/components/hospitalDashboard/hospitalDetailDialog"


export default function HospitalsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const queryParams = useMemo(
    () => ({
      countryId: 166,
      page,
      perPage: 10,
      ...(search && { searchTerm: search }),
    }),
    [page, search],
  )

  const { data, isLoading, error } = useQuery({
    queryKey: ["hospitals", queryParams],
    queryFn: () => fetchHospitals(queryParams),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })

  const handleSearch = useCallback((term: string) => {
    setSearch(term)
    setPage(1)
  }, [])

  const handleSelectHospital = useCallback((hospital: Hospital) => {
    setSelectedHospital(hospital)
    setDetailOpen(true)
  }, [])

  const handlePageChange = useCallback((p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const hospitals = data?.data.data ?? []
    //   const totalPages = data?.data.totalPages ?? 0
    const totalPages = 3
  const totalCount = data?.data.totalCount ?? 0

  return (
      <>
          {/* Header */}
          <div className="border-b bg-background pb-2">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Hospital</h1>
            <p className="text-sm text-muted-foreground">
              {totalCount > 0 ? `${totalCount} hospitals available in Nigeria` : "Browse hospitals"}
            </p>
          </div>
          <HospitalTableFilters onSearch={handleSearch} searchValue={search} />
        </div>
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Failed to load hospitals. Please try again.</AlertDescription>
              </Alert>
            )}

            {!isLoading && hospitals.length === 0 && !error && (
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertDescription>No hospitals found. Try adjusting your search.</AlertDescription>
              </Alert>
            )}

            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : hospitals.length > 0 ? (
              <>
                <HospitalTable hospitals={hospitals} onSelectHospital={handleSelectHospital} />

                {totalPages > 1 && (
                  <div className="mt-6">
                    <HospitalPagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      </main>

        {/* <HospitalDetailPanel hospital={selectedHospital} onClose={() => setSelectedHospital(null)} /> */}
        <HospitalDetailDialog hospital={selectedHospital} isOpen={detailOpen} onClose={() => setDetailOpen(false)} />
    </div>
    </>
  )
}
