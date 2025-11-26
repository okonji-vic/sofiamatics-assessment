import type { Hospital } from "@/types/hospital"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HospitalTableRowAction } from "@/components/hospitalDashboard/hospitalTableRowAction"

interface HospitalTableProps {
  hospitals: Hospital[]
  onSelectHospital: (hospital: Hospital) => void
}

export function HospitalTable({ hospitals, onSelectHospital }: HospitalTableProps) {
  return (
    <div className="border rounded-lg w-full m-0 overflow-hidden p-0">
      <Table >
        <TableHeader>
          <TableRow className="border-b bg-muted/50">
            <TableHead className="font-semibold">Hospital Name</TableHead>
            <TableHead className="font-semibold">Email</TableHead>
            <TableHead className="font-semibold">Phone Number</TableHead>
            <TableHead className="font-semibold">Address</TableHead>
            <TableHead className="font-semibold">Country</TableHead>
            <TableHead className="font-semibold">State</TableHead>
            <TableHead className="font-semibold text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow key={hospital.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{hospital.hospitalName ?? "N/A"}</TableCell>
              <TableCell className="text-sm">{hospital.hospitalEmail ?? "N/A"}</TableCell>
              <TableCell className="text-sm">{hospital.phoneNumber ?? "N/A"}</TableCell>
              <TableCell className="text-sm max-w-xs truncate">{hospital.address ?? "N/A"}</TableCell>
              <TableCell className="text-sm">{hospital.country ?? "N/A"}</TableCell>
              <TableCell className="text-sm">{hospital.state ?? "N/A"}</TableCell>
              <TableCell className="text-right">
                <HospitalTableRowAction hospital={hospital} onView={() => onSelectHospital(hospital)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
