
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface PickupLocationMapProps {
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const PickupLocationMap: React.FC<PickupLocationMapProps> = ({ 
  address, 
  coordinates = { lat: 26.449923, lng: 80.331874 } // Default coordinates for Kanpur
}) => {
  // Create Google Maps static image URL
  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${coordinates.lat},${coordinates.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${coordinates.lat},${coordinates.lng}&key=YOUR_API_KEY`;
  
  // Create Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className="p-3 bg-muted flex items-center justify-between">
        <h3 className="font-medium">Pickup Location</h3>
        <a 
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs flex items-center gap-1 text-primary hover:underline"
        >
          Get Directions <ExternalLink size={12} />
        </a>
      </div>
      
      <div className="aspect-[16/9] relative bg-muted/50">
        {/* For now, display a placeholder instead of using the API key */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <span className="text-primary text-xl">📍</span>
          </div>
          <p className="font-medium">Saawariya Rasoi</p>
          <p className="text-sm text-muted-foreground">{address}</p>
          <a 
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 flex items-center gap-2"
          >
            Get Directions <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PickupLocationMap;
