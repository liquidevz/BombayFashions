"use client"

import { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 11.0168,  // Nanjundapuram Road, Coimbatore coordinates
  lng: 76.9558
}

const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca3af" }]  // Lighter gray for better readability
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#111827" }, { weight: 2 }]  // Matching footer background
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [{ color: "#111827" }]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2937" }, { weight: 1.4 }]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [{ color: "#1f2937" }]  // Slightly lighter than background
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1f2937" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#374151" }]  // Lighter for contrast
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b5563" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [{ color: "#374151" }]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [{ color: "#4b5563" }]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#374151" }]
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ color: "#1f2937" }]
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [{ color: "#111827" }]
  }
]

export default function GoogleMapComponent() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          zoomControl: true,
          scrollwheel: false,
        }}
      >
        <Marker 
          position={center}
          icon={{
            path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
            fillColor: "#EAB308",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#000",
            scale: 1.5,
          }}
        />
      </GoogleMap>
    </LoadScript>
  )
} 