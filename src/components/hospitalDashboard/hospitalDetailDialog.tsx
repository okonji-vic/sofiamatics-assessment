import type { Hospital } from "@/types/hospital"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail } from "lucide-react"

interface HospitalDetailDialogProps {
  hospital: Hospital | null
  isOpen: boolean
  onClose: () => void
}

export function HospitalDetailDialog({ hospital, isOpen, onClose }: HospitalDetailDialogProps) {
  if (!hospital) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[100vh] overflow-y-auto">
        <DialogHeader
          // className="sticky top-0 z-10 bg-background"
        >
          <div className="gap-4 flex flex-col items-start justify-between">
            {hospital.logoUrl && (
              <img
                src={hospital.logoUrl || "/placeholder.svg"}
                alt={hospital.hospitalName}
                className="h-16 w-16 rounded-lg object-cover"
              />
            )}
    
            {/* Header with Close Button */}
          
            <div>
                {/* <h2 className="text-xl font-bold">{hospital.hospitalName ?? "N/A"}</h2> */}
                <DialogTitle className="text-xl font-bold">{hospital.hospitalName ?? "N/A"}</DialogTitle>
            </div>
            <div>
              <div className="flex gap-4 mb-4">
                <a href={`tel:${hospital.phoneNumber}`} className="flex items-center gap-2 text-sm hover:text-primary">
                  <Phone className="h-4 w-4" />
                  <span>{hospital.phoneNumber ?? "No phone number"}</span>
                </a>
                <a
                  href={`mailto:${hospital.hospitalEmail}`}
                  className="flex items-center gap-2 text-sm hover:text-primary text-blue-500"
                >
                  <Mail className="h-4 w-4" />
                  <span>{hospital.hospitalEmail ?? "No email"}</span>
                </a>
              </div>
            </div>
            
          </div>
        </DialogHeader>
        <Separator />
        <div className="space-y-6">
        {/* Overview Section */}
            <div className="mt-4">
              <h3 className="font-semibold mb-4">Overview</h3>
              <div className="bg-muted p-4 rounded-lg space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Longitude</p>
                  <p className="font-mono">{hospital.longitude.toFixed(4)}° N</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs uppercase">Latitude</p>
                  <p className="font-mono">{hospital.latitude.toFixed(4)}° E</p>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Country</p>
                  <p className="font-medium">{hospital.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">State</p>
                  <p className="font-medium">{hospital.state}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium">{hospital.address ?? "No address available"}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Info */}
            <div>
              <h3 className="font-semibold mb-2">Hospital Type</h3>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{hospital.type}</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
