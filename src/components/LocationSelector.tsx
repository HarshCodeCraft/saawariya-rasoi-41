
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";

const locations = [
  "Andheri East",
  "Andheri West",
  "Bandra East",
  "Bandra West",
  "Juhu",
  "Powai",
  "Santacruz",
  "Vile Parle"
];

const LocationSelector = () => {
  return (
    <div className="flex items-center">
      <div className="w-full max-w-[200px]">
        <Select defaultValue={locations[0]}>
          <SelectTrigger className="bg-background/60 backdrop-blur-sm border-muted text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-restaurant-500" />
              <SelectValue placeholder="Select location" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationSelector;
