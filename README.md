# 🏠 SEO-Optimized Description Generator for Real Estate

Automatically generate high-converting, SEO-rich property descriptions using **Google Sheets + Gemini AI** – perfect for real estate platforms, property managers, or listing aggregators.

<img width="1312" height="468" alt="image" src="https://github.com/user-attachments/assets/40033b68-73ac-4cdf-a424-286d15a1167d" />

---

## 🚀 How It Works

This automation pipeline uses [Make.com](https://www.make.com/) and integrates:

| Step | Tool              | Description |
|------|-------------------|-------------|
| 1️⃣  | **Google Sheets – Watch New Rows** | Monitors your sheet for new property entries. |
| 2️⃣  | **Google Gemini AI – Create Completion** | Uses Gemini AI to generate an SEO-optimized description based on row data. |
| 3️⃣  | **Google Sheets – Update Row** | Updates the same row with the generated description and optional tags. |

---
<img width="1741" height="534" alt="image" src="https://github.com/user-attachments/assets/c02e70f7-278e-45f4-98fe-139aa90ebd72" />

## 🌐 Webhook Demo (User-Friendly)

This version also includes **Webhook Input/Output**, so users can:
- Send a POST request with property details
- Get back an instant AI-generated description in the response

```http
POST /generate-description
Content-Type: application/json

{
  "title": "3BHK Luxury Apartment in Bandra",
  "location": "Mumbai",
  "features": "Sea-facing, Modern Kitchen, Near Schools"
}
