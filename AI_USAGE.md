# AI Usage Documentation

## Project Name

**GemAura – AI-Based Gemstone Recommendation Platform**

---

# Overview

GemAura uses **Google Gemini AI** to generate personalized gemstone recommendations based on a user's birth details and life goals.

The AI component is designed to simulate a knowledgeable Vedic astrology consultation by combining user-provided information with structured prompting and traditional gemstone correspondences.

The generated recommendation is intended for informational and traditional belief purposes and should not be interpreted as professional astrological, financial, or medical advice.

---

# AI Provider

* **Model Provider:** Google
* **SDK:** `@google/genai`
* **Model Used:** `gemini-2.5-flash`

The application initializes the client using an API key stored securely in environment variables.

```javascript
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
```

---

# Purpose of AI Integration

The AI system is responsible for generating a **single personalized gemstone recommendation** based on:

* Full Name
* Date of Birth
* Birth Time
* Birth Place
* User Goal

Examples of supported goals include:

* Career Growth
* Business
* Wealth
* Education
* Marriage
* Health
* Mental Peace
* Confidence
* Relationships
* Leadership
* Foreign Opportunities
* Spiritual Growth

---

# AI Workflow

```
User Input
     │
     ▼
Frontend Form
     │
     ▼
Backend Controller
     │
     ▼
Prompt Construction
     │
     ▼
Google Gemini API
     │
     ▼
JSON Recommendation
     │
     ▼
Validation & Parsing
     │
     ▼
Recommendation Saved to Database
     │
     ▼
Displayed to User
```

---

# Prompt Engineering Strategy

A detailed system prompt instructs Gemini to:

* Behave as an experienced Vedic astrology expert.
* Use traditional planetary and gemstone correspondences.
* Consider birth details and stated goals together.
* Recommend exactly one primary gemstone.
* Generate a natural Hinglish explanation.
* Acknowledge uncertainty when precise calculations are not possible.
* Avoid exaggerated or guaranteed claims.
* Return structured JSON only.

---

# Expected AI Output

The model returns a JSON object in the following structure:

```json
{
  "gemstone": "Yellow Sapphire",
  "planet": "Jupiter",
  "description": "Personalized explanation...",
  "purchaseLinks": [
    {
      "websiteName": "Example Store",
      "url": "https://example.com",
      "price": "₹8,999"
    }
  ],
  "imageUrl": "https://example.com/image.jpg"
}
```

---

# Error Handling

The application includes retry logic for temporary AI service failures.

* Maximum retries: **3**
* Retry condition: **HTTP 503**
* Delay between retries: **2 seconds**

If the response cannot be parsed into valid JSON, the request fails gracefully and an error is returned.

---

# JSON Validation

Before using the response:

1. Markdown code fences are removed.
2. The output is parsed using `JSON.parse()`.
3. Invalid responses trigger an exception.
4. Only successfully parsed recommendations are stored.

---

# Data Used by AI

The AI receives only the information required for recommendation generation:

* Full Name
* Date of Birth
* Birth Time
* Birth Place
* Selected Goal

No passwords or authentication credentials are shared with the AI service.

---

# Data Storage

After successful generation, the following information is stored in the application's database:

* User ID
* Full Name
* Date of Birth
* Birth Time
* Birth Place
* Goal
* Recommended Gemstone
* Associated Planet
* AI-generated Description
* Purchase Links (if available)
* Gemstone Image URL

---

# Traditional Astrology Disclaimer

GemAura provides recommendations inspired by traditional Vedic astrology and AI-generated analysis.

Recommendations:

* are based on user-provided birth information,
* may include approximations where exact astronomical calculations are unavailable,
* represent traditional beliefs and informational guidance,
* should not be interpreted as guaranteed outcomes or professional advice.

Users are encouraged to consult qualified experts for detailed astrological consultation.

---

# Security

* API keys are stored in environment variables.
* Sensitive credentials are never committed to version control.
* Communication with the AI provider occurs securely through server-side requests.

---

# Future Enhancements

Potential future improvements include:

* Accurate astronomical chart computation.
* Real-time planetary calculations.
* Confidence scoring for recommendations.
* Multi-language explanations.
* Personalized gemstone care instructions.
* PDF report generation.
* Explainable AI reasoning summaries.
* Enhanced recommendation validation using structured schemas.

---

# Summary

GemAura leverages Google Gemini AI together with carefully engineered prompts to generate premium, personalized gemstone recommendations. The system combines AI-assisted reasoning with traditional astrological concepts while emphasizing transparency, responsible use, and user privacy.
