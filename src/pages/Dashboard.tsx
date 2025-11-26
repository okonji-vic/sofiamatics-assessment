// import { useState, useCallback, useMemo } from "react"
// import { useQuery } from "@tanstack/react-query"
// import type { Hospital } from "@/types/hospital"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { AlertCircle, Info } from "lucide-react"
// import { fetchHospitals } from "@/services/hospitalServices"
// import { HospitalFilters } from "@/components/hospitalDashboard/hospitalFilters"
// import { HospitalCard } from "@/components/hospitalDashboard/hospitalCard"
// import { HospitalPagination } from "@/components/hospitalDashboard/hospitalPagination"
// import { HospitalDetailDialog } from "@/components/hospitalDashboard/hospitalDetailDialog"

// export default function HospitalsPage() {
//   const [page, setPage] = useState(1)
//   const [search, setSearch] = useState("")
//   const [type, setType] = useState("")
//   const [state, setState] = useState("")
//   const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
//   const [detailOpen, setDetailOpen] = useState(false)

//   const queryParams = useMemo(
//     () => ({
//       countryId: 166,
//       page,
//       perPage: 10,
//       ...(search && { searchTerm: search }),
//       ...(type && { type }),
//       ...(state && { state }),
//     }),
//     [page, search, type, state],
//   )

//   const { data, isLoading, error, isFetching } = useQuery({
//     queryKey: ["hospitals", queryParams],
//     queryFn: () => fetchHospitals(queryParams),
//     staleTime: 5 * 60 * 1000,
//     gcTime: 10 * 60 * 1000,
//   })

//   const handleSearch = useCallback((term: string) => {
//     setSearch(term)
//     setPage(1)
//   }, [])

//   const handleTypeChange = useCallback((t: string) => {
//     setType(t)
//     setPage(1)
//   }, [])

//   const handleStateChange = useCallback((s: string) => {
//     setState(s)
//     setPage(1)
//   }, [])

//   const handleSelectHospital = useCallback((hospital: Hospital) => {
//     setSelectedHospital(hospital)
//     setDetailOpen(true)
//   }, [])

//   const handlePageChange = useCallback((p: number) => {
//     setPage(p)
//     window.scrollTo({ top: 0, behavior: "smooth" })
//   }, [])

//   const hospitals = data?.data.data || []
//     //   const totalPages = data?.data.totalPages || 0
//     const totalPages = 3
//   const totalCount = data?.data.totalCount || 0

//   return (
//     <main className="flex-1 space-y-6 p-4 md:p-0">
//       <div className="space-y-2">
//         <h1 className="text-3xl font-bold">Hospital Directory</h1>
//         <p className="text-muted-foreground">
//           {totalCount > 0 ? `${totalCount} hospitals available in Nigeria` : "Browse hospitals"}
//         </p>
//       </div>

//       <HospitalFilters
//         onSearch={handleSearch}
//         onTypeChange={handleTypeChange}
//         onStateChange={handleStateChange}
//         searchValue={search}
//         typeValue={type}
//         stateValue={state}
//       />

//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>Failed to load hospitals. Please try again.</AlertDescription>
//         </Alert>
//       )}

//       {!isLoading && hospitals.length === 0 && !error && (
//         <Alert>
//           <Info className="h-4 w-4" />
//           <AlertDescription>No hospitals found. Try adjusting your filters.</AlertDescription>
//         </Alert>
//       )}

//       {isLoading && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {Array.from({ length: 6 }).map((_, i) => (
//             <Skeleton key={i} className="h-64" />
//           ))}
//         </div>
//       )}

//       {!isLoading && hospitals.length > 0 && (
//         <>
//           <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ${isFetching ? "opacity-50" : ""}`}>
//             {hospitals.map((h) => (
//               <HospitalCard key={h.id} hospital={h} onSelect={() => handleSelectHospital(h)} />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <HospitalPagination
//               currentPage={page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//               isLoading={isLoading}
//             />
//           )}
//         </>
//       )}

//       <HospitalDetailDialog hospital={selectedHospital} isOpen={detailOpen} onClose={() => setDetailOpen(false)} />
//     </main>
//   )
// }


import { useState, useCallback, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchHospitals } from "@/services/hospitalServices"
import type { Hospital } from "@/types/hospital"
import { HospitalTableFilters } from "@/components/hospitalDashboard/hospitalTableFilters"
import { HospitalTable } from "@/components/hospitalDashboard/hospitalTable"
import { HospitalDetailPanel } from "@/components/hospitalDashboard/hospitalDetailPanel"
import { HospitalPagination } from "@/components/hospitalDashboard/hospitalPagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Info } from "lucide-react"
// import Header from "@/components/layouts/Header"

export default function HospitalsPage() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)

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

      <HospitalDetailPanel hospital={selectedHospital} onClose={() => setSelectedHospital(null)} />
    </div>
    </>
  )
}
