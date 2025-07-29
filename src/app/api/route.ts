// import { type NextRequest, NextResponse } from "next/server"

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { propertyName, bedrooms, bathrooms, view, address, baseDescription, price, area, propertyType, language } =
//       body

//     // This is where you would integrate with:
//     // 1. Google Gemini API directly
//     // 2. Your Make.com webhook
//     // 3. Any other AI service

//     // For demo purposes, we'll create a structured response
//     // Replace this with your actual AI integration

//     const prompt = `Generate a professional, SEO-optimized property description for:
//     Property: ${propertyName}
//     Type: ${propertyType}
//     Bedrooms: ${bedrooms}
//     Bathrooms: ${bathrooms}
//     View: ${view}
//     Address: ${address}
//     Area: ${area} sq ft
//     Price: ₹${price}
//     Base Description: ${baseDescription}
//     Language: ${language}
    
//     Make it engaging, highlight key features, and optimize for search engines.`

//     // Simulate AI response (replace with actual API call)
//     const seoDescription = `Discover ${propertyName} – a ${propertyType || "luxury"} ${bedrooms}BHK apartment with ${bathrooms} bathrooms${view ? ` featuring stunning ${view.toLowerCase()}` : ""} located in the prestigious ${address}. ${baseDescription || "This exceptional property offers modern amenities and premium finishes."} ${area ? `Spanning ${area} sq ft of thoughtfully designed space, ` : ""}${price ? `priced at ₹${price}, ` : ""}this residence represents the perfect blend of comfort, style, and location. Ideal for discerning buyers seeking quality living in a prime neighborhood. Contact us today to schedule a viewing of this remarkable property.`

//     return NextResponse.json({
//       seoDescription,
//       success: true,
//       metadata: {
//         language,
//         wordCount: seoDescription.split(" ").length,
//         generatedAt: new Date().toISOString(),
//       },
//     })
//   } catch (error) {
//     console.error("Error generating description:", error)
//     return NextResponse.json({ error: "Failed to generate description" }, { status: 500 })
//   }
// }

import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      propertyName,
      bedrooms,
      bathrooms,
      view,
      address,
      baseDescription,
      price,
      area,
      propertyType,
      language,
    } = body

    const prompt = `
Generate a professional, SEO-optimized property listing in ${language}.
---
Property: ${propertyName}
Type: ${propertyType}
Bedrooms: ${bedrooms}
Bathrooms: ${bathrooms}
View: ${view}
Address: ${address}
Area: ${area} sq ft
Price: ₹${price}
Base Description: ${baseDescription}

Write engaging content highlighting premium features for real estate buyers. Do not repeat labels; use a flowing narrative.
    `

    // 2️⃣ Gemini AI API Call (replace with actual key and endpoint)
    const geminiRes = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_GEMINI_API_KEY", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const geminiData = await geminiRes.json()
    const seoDescription = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "AI failed to generate content."

    // 3️⃣ Optional: Send to Make.com webhook
    await fetch("https://hook.eu2.make.com/cdoi9jt9wjoj1l97aaettffqjjc5koch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-make-apikey": "YOUR_MAKE_API_KEY", // Optional if secured
      },
      body: JSON.stringify({
        propertyName,
        bedrooms,
        bathrooms,
        view,
        address,
        price,
        area,
        propertyType,
        seoDescription,
        generatedAt: new Date().toISOString()
      })
    })

    return NextResponse.json({
      seoDescription,
      success: true,
      metadata: {
        wordCount: seoDescription.split(" ").length,
        generatedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

