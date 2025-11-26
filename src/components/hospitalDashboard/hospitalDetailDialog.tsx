import type { Hospital } from "@/types/hospital"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Globe } from "lucide-react"

interface HospitalDetailDialogProps {
  hospital: Hospital | null
  isOpen: boolean
  onClose: () => void
}

export function HospitalDetailDialog({ hospital, isOpen, onClose }: HospitalDetailDialogProps) {
  if (!hospital) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex gap-4 items-start">
            {hospital.logoUrl && (
              <img
                src={hospital.logoUrl || "/placeholder.svg"}
                alt={hospital.hospitalName}
                className="h-16 w-16 rounded-lg object-cover"
              />
            )}
            <div>
              <DialogTitle>{hospital.hospitalName}</DialogTitle>
              <DialogDescription>{hospital.address}</DialogDescription>
              <div className="flex gap-2 mt-3">
                <Badge>{hospital.type}</Badge>
                <Badge variant="outline">{hospital.state}</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>
        <Separator />
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </h3>
            <div className="space-y-1 text-sm">
              <p>
                Phone:{" "}
                <a href={`tel:${hospital.phoneNumber}`} className="hover:underline">
                  {hospital.phoneNumber}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={`mailto:${hospital.hospitalEmail}`} className="hover:underline">
                  {hospital.hospitalEmail}
                </a>
              </p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </h3>
            <div className="space-y-1 text-sm">
              <p>Address: {hospital.address}</p>
              <p>State: {hospital.state}</p>
              <p>Country: {hospital.country}</p>
              {hospital.formattedDistance && <p>Distance: {hospital.formattedDistance}</p>}
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Coordinates
            </h3>
            <div className="space-y-1 text-sm font-mono text-xs bg-muted p-2 rounded">
              <p>Lat: {hospital.latitude.toFixed(6)}</p>
              <p>Long: {hospital.longitude.toFixed(6)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
