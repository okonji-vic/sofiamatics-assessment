import type { Hospital } from "@/types/hospital"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

interface HospitalCardProps {
  hospital: Hospital
  onSelect: () => void
}

export function HospitalCard({ hospital, onSelect }: HospitalCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
      <Card className="flex h-full cursor-pointer transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="truncate">{hospital.hospitalName}</CardTitle>
              <CardDescription className="truncate">{hospital.address}</CardDescription>
            </div>
            {hospital.logoUrl && (
              <img
                src={hospital.logoUrl || "/placeholder.svg"}
                alt={hospital.hospitalName}
                className="h-12 w-12 rounded-md object-cover"
              />
            )}
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge variant="secondary">{hospital.type}</Badge>
            <Badge variant="outline">{hospital.state}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <a href={`tel:${hospital.phoneNumber}`} className="hover:text-foreground">
                {hospital.phoneNumber}
              </a>
            </div>
            <div className="flex items-center flex-wrap  gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${hospital.hospitalEmail}`} className="hover:text-foreground">
                {hospital.hospitalEmail}
              </a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{hospital.formattedDistance}</span>
            </div>
          </div>
          <Button onClick={onSelect} className="w-full bg-teal-500 hover:bg-teal-600">
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
