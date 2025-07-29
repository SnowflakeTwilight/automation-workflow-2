"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Home, Sparkles, Globe, Upload, Eye, Download, Send, Loader2 } from "lucide-react"
// import { toast } from "@/hooks/use-toast"
import { toast } from "sonner"

interface PropertyData {
  propertyName: string
  bedrooms: string
  bathrooms: string
  view: string
  address: string
  baseDescription: string
  price: string
  area: string
  propertyType: string
}

export default function PropertyListingUploader() {
  const [propertyData, setPropertyData] = useState<PropertyData>({
    propertyName: "",
    bedrooms: "",
    bathrooms: "",
    view: "",
    address: "",
    baseDescription: "",
    price: "",
    area: "",
    propertyType: "",
  })

  const [seoDescription, setSeoDescription] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleInputChange = (field: keyof PropertyData, value: string) => {
    setPropertyData((prev) => ({ ...prev, [field]: value }))
  }

// toast("New Property Listed", {
//   description: "2BHK Sea View in Bandra added successfully.",
// });

  const generateSEODescription = async () => {
    if (!propertyData.propertyName || !propertyData.address) {
      toast("Missing Information",{
        description: "Please fill in at least the property name and address.",
        // variant: "destructive",
      });
      return
    }

    setIsGenerating(true)

    try {
      // Simulate API call to Gemini or your Make.com webhook
      const response = await fetch("/api/generate-description", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...propertyData,
          language: selectedLanguage,
        }),
      })

      if (!response.ok) throw new Error("Failed to generate description")

      const data = await response.json()
      setSeoDescription(data.seoDescription)

      toast("Description Generated!",{
        description: "AI-powered SEO description has been created.",
      });
    } catch (error) {
      // Fallback demo description for the preview
      const demoDescription = `Discover ${propertyData.propertyName} – a ${propertyData.propertyType || "luxury"} ${propertyData.bedrooms}BHK apartment with ${propertyData.bathrooms} bathrooms${propertyData.view ? ` featuring ${propertyData.view.toLowerCase()}` : ""} located in the prime area of ${propertyData.address}. ${propertyData.baseDescription || "This exceptional property offers modern amenities and premium finishes."} ${propertyData.area ? `Spanning ${propertyData.area} sq ft` : ""} ${propertyData.price ? `priced at ₹${propertyData.price}` : ""}, this is an ideal investment opportunity for discerning buyers seeking quality and location.`

      setSeoDescription(demoDescription)

      toast("Demo Description Generated",{
        description: "Using sample AI description (connect your API for live generation).",
      });
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const exportData = () => {
    const exportData = {
      property: propertyData,
      seoDescription,
      language: selectedLanguage,
      images: uploadedImages.length,
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${propertyData.propertyName || "property"}-listing.json`
    a.click()

    toast("Data Exported",{
      description: "Property listing data has been downloaded as JSON.",
    });
  }

  const submitToSite = async () => {
    if (!seoDescription) {
      toast("Generate Description First",{
        description: "Please generate an SEO description before submitting.",
        // variant: "destructive",
      });
      return
    }

    toast("Listing Submitted!",{
      description: "Property has been submitted to your platform.",
    });
  }

  const previewListing = () => {
    if (!seoDescription) {
      toast("Generate Description First",{
        description: "Please generate an SEO description to preview.",
        // variant: "destructive",
      });
      return
    }

    // Open preview in new window/modal
    toast("Preview Ready",{
      description: "Property listing preview is now available.",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Real Estate AI Listing Panel</h1>
              <p className="text-sm text-gray-600">Generate professional property descriptions with AI</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Property Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Property Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyName">Property Name *</Label>
                  <Input
                    id="propertyName"
                    placeholder="Ocean Crest Towers"
                    value={propertyData.propertyName}
                    onChange={(e) => handleInputChange("propertyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={propertyData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="duplex">Duplex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    placeholder="3"
                    value={propertyData.bedrooms}
                    onChange={(e) => handleInputChange("bedrooms", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    placeholder="2"
                    value={propertyData.bathrooms}
                    onChange={(e) => handleInputChange("bathrooms", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area (sq ft)</Label>
                  <Input
                    id="area"
                    placeholder="1200"
                    value={propertyData.area}
                    onChange={(e) => handleInputChange("area", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="view">View</Label>
                  <Input
                    id="view"
                    placeholder="Sea View"
                    value={propertyData.view}
                    onChange={(e) => handleInputChange("view", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    placeholder="2.5 Cr"
                    value={propertyData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  placeholder="Bandstand, Bandra West, Mumbai"
                  value={propertyData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseDescription">Base Description</Label>
                <Textarea
                  id="baseDescription"
                  placeholder="Spacious 3BHK with ocean views, modern amenities, and premium finishes..."
                  rows={4}
                  value={propertyData.baseDescription}
                  onChange={(e) => handleInputChange("baseDescription", e.target.value)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Language</span>
                  </Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="mr">Marathi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Images</span>
                  </Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {uploadedImages.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {uploadedImages.map((img, index) => (
                        <Badge key={index} variant="secondary">
                          Image {index + 1}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column - AI Output */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span>AI-Generated SEO Description</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={generateSEODescription}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate SEO Description
                  </>
                )}
              </Button>

              {seoDescription && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
                      Generated Description:
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{seoDescription}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">SEO Optimized</Badge>
                    <Badge variant="outline">AI Generated</Badge>
                    <Badge variant="outline">{selectedLanguage.toUpperCase()}</Badge>
                    {uploadedImages.length > 0 && <Badge variant="outline">{uploadedImages.length} Images</Badge>}
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  onClick={previewListing}
                  className="flex items-center justify-center bg-transparent"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  onClick={exportData}
                  className="flex items-center justify-center bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button
                  onClick={submitToSite}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit
                </Button>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                <p className="font-medium mb-1">Integration Ready:</p>
                <p>• Connect to Make.com webhook</p>
                <p>• Direct Gemini API integration</p>
                <p>• Export to Google Sheets</p>
                <p>• Push to your property platform</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
