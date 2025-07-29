"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Bed, Bath, Maximize, Eye, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export default function PropertyPreview() {
  // This would typically receive data via URL params or state
  const sampleProperty = {
    name: "Ocean Crest Towers",
    type: "Luxury Apartment",
    bedrooms: "3",
    bathrooms: "2",
    area: "1200",
    view: "Sea View",
    address: "Bandstand, Bandra West, Mumbai",
    price: "₹2.5 Cr",
    description:
      "Discover Ocean Crest Towers – a luxury 3BHK apartment with 2 bathrooms featuring stunning sea view located in the prestigious Bandstand, Bandra West, Mumbai. This exceptional property offers modern amenities and premium finishes. Spanning 1200 sq ft of thoughtfully designed space, priced at ₹2.5 Cr, this residence represents the perfect blend of comfort, style, and location.",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="mb-4 bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
          </Link>
        </div>

        <Card className="overflow-hidden">
          {/* Property Image Placeholder */}
          <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-2">🏢</div>
              <p className="text-lg">Property Images</p>
              <p className="text-sm opacity-80">Upload images to see them here</p>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{sampleProperty.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{sampleProperty.address}</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{sampleProperty.price}</div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Bed className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{sampleProperty.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bath className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{sampleProperty.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center space-x-2">
                <Maximize className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{sampleProperty.area} sq ft</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{sampleProperty.view}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">{sampleProperty.type}</Badge>
              <Badge variant="outline">Sea View</Badge>
              <Badge variant="outline">Premium Location</Badge>
              <Badge variant="outline">Ready to Move</Badge>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-3">Property Description</h2>
              <p className="text-gray-700 leading-relaxed">{sampleProperty.description}</p>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Schedule Viewing</Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Contact Agent
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Get Loan Info
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This is a preview of how your property listing will appear on your platform.</p>
        </div>
      </div>
    </div>
  )
}
