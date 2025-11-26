import type { Hospital } from "@/types/hospital"
import { motion, AnimatePresence } from "framer-motion"
import { X, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface DetailPanelProps {
  hospital: Hospital | null
  onClose: () => void
}

export function HospitalDetailPanel({ hospital, onClose }: DetailPanelProps) {
  return (
    <AnimatePresence>
      {hospital && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="absolute inset-y-0 right-0 w-full md:w-96 lg:w-[32rem] bg-background border-l border-border overflow-y-auto"
        >
          {/* Header with Close Button */}
          <div className="sticky top-0 z-10 border-b bg-background p-6 flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold">{hospital.hospitalName ?? "N/A"}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Contact Section */}
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

            <Separator />

            {/* Overview Section */}
            <div>
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
                  <p className="font-medium">{hospital.address}</p>
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
