# UTM Tracking Guide - Traffic Source Tracking

## What Are UTM Parameters?

UTM parameters are tags added to your portfolio URL to track exactly where visitors came from. This lets you know if they clicked from LinkedIn, your resume, GitHub, email, etc.

---

## 🔗 YOUR CUSTOM TRACKED URLS

Replace `https://yourportfolio.com` with your actual portfolio URL.

### LinkedIn Profile
**Use this URL in your LinkedIn "Website" field:**
```
https://yourportfolio.com/?utm_source=linkedin&utm_medium=profile&utm_campaign=portfolio
```

**What you'll see in GA4:**
- Source: linkedin
- Medium: profile
- Campaign: portfolio

---

### LinkedIn Posts
**When sharing your portfolio in a LinkedIn post:**
```
https://yourportfolio.com/?utm_source=linkedin&utm_medium=post&utm_campaign=portfolio
```

---

### LinkedIn Messages
**When sending your portfolio in LinkedIn DMs:**
```
https://yourportfolio.com/?utm_source=linkedin&utm_medium=message&utm_campaign=outreach
```

---

### GitHub Profile
**Use this in your GitHub bio/README:**
```
https://yourportfolio.com/?utm_source=github&utm_medium=profile&utm_campaign=portfolio
```

---

### GitHub Repository READMEs
**Link from project repositories:**
```
https://yourportfolio.com/?utm_source=github&utm_medium=repo&utm_campaign=projects
```

---

### Resume PDF
**Add this as a clickable link in your resume:**
```
https://yourportfolio.com/?utm_source=resume&utm_medium=pdf&utm_campaign=job-application
```

**Pro Tip:** Make your name or "View Portfolio" text a hyperlink in your PDF resume

---

### Email Signature
**Add to your email signature:**
```
https://yourportfolio.com/?utm_source=email&utm_medium=signature&utm_campaign=networking
```

---

### Job Applications (Cover Letters)
**When applying to jobs:**
```
https://yourportfolio.com/?utm_source=application&utm_medium=cover-letter&utm_campaign=job-search-2025
```

---

### DevPost Profile
```
https://yourportfolio.com/?utm_source=devpost&utm_medium=profile&utm_campaign=hackathons
```

---

### Business Cards (QR Code)
```
https://yourportfolio.com/?utm_source=qr-code&utm_medium=business-card&utm_campaign=networking
```

---

### Twitter/X Bio
```
https://yourportfolio.com/?utm_source=twitter&utm_medium=bio&utm_campaign=portfolio
```

---

### Instagram Bio
```
https://yourportfolio.com/?utm_source=instagram&utm_medium=bio&utm_campaign=portfolio
```

---

## 🛠️ UTM BUILDER TOOL

**Don't want to write UTMs manually?**

Use Google's Campaign URL Builder:
👉 https://ga-dev-tools.google/campaign-url-builder/

### Steps:
1. Enter your portfolio URL
2. Fill in:
   - **Campaign Source**: linkedin, github, resume, etc.
   - **Campaign Medium**: profile, post, message, etc.
   - **Campaign Name**: portfolio, job-search, etc.
3. Copy the generated URL
4. Use it wherever you share your portfolio

---

## 📊 HOW TO VIEW SOURCE DATA IN GA4

### Method 1: Traffic Acquisition Report
1. Go to GA4
2. Click **Reports** → **Acquisition** → **Traffic Acquisition**
3. You'll see a table with:
   - Session source
   - Session medium
   - Session campaign
   - Users
   - Sessions
   - Engagement rate

### Method 2: Exploration Report (More Detailed)
1. Go to **Explore** → **Free Form**
2. Add dimensions:
   - Session source
   - Session medium
   - Session campaign
3. Add metrics:
   - Users
   - Sessions
   - Engagement rate
   - Average engagement time
   - Conversions (form submissions)

### Example View:
| Source | Medium | Campaign | Users | Sessions | Engagement |
|--------|--------|----------|-------|----------|------------|
| linkedin | profile | portfolio | 45 | 52 | 78% |
| github | profile | portfolio | 32 | 38 | 82% |
| resume | pdf | job-application | 28 | 31 | 91% |
| linkedin | post | portfolio | 15 | 18 | 65% |
| direct | (none) | (none) | 12 | 15 | 55% |

---

## 🎯 RECOMMENDED SETUP CHECKLIST

Update these locations with UTM-tracked URLs:

### High Priority (Do These First):
- [ ] LinkedIn profile "Website" field
- [ ] GitHub profile bio
- [ ] Resume PDF (make your name/portfolio text clickable)
- [ ] Email signature

### Medium Priority:
- [ ] LinkedIn posts when sharing portfolio
- [ ] Cover letters for job applications
- [ ] DevPost profile
- [ ] Other social media bios

### Low Priority (Nice to Have):
- [ ] Business cards (QR code)
- [ ] Personal branding materials
- [ ] Forum signatures (Reddit, Stack Overflow)

---

## 🔍 ADVANCED: AUTO-TAGGING

GA4 also automatically detects some sources without UTM parameters:

**Automatically Detected:**
- Google Search (organic)
- Google Ads (if you run them)
- Major social platforms (Facebook, Twitter, LinkedIn)
- Referral sites

**Won't Be Detected Without UTM:**
- PDF links (resume)
- Email links
- QR codes
- Direct messages
- Specific LinkedIn locations (profile vs post)

---

## 💡 BEST PRACTICES

### 1. Be Consistent
Use the same naming convention:
- **Source:** Always lowercase (linkedin, not LinkedIn)
- **Medium:** profile, post, message, email, pdf
- **Campaign:** Keep it simple (portfolio, job-search)

### 2. Don't Overuse
You don't need UTM for:
- Internal links (links within your portfolio)
- Links you don't care about tracking

### 3. Track What Matters
Focus on:
- ✅ LinkedIn (biggest professional network)
- ✅ Resume (job applications)
- ✅ GitHub (technical audience)
- ✅ Email outreach

### 4. Test Before Using
After creating UTM URL:
1. Click it yourself
2. Go to GA4 DebugView
3. Check if source/medium/campaign appear correctly

---

## 📈 WHAT YOU'LL LEARN

### Questions UTM Tracking Answers:

1. **"Do people click my portfolio link from LinkedIn?"**
   - Check: Source = linkedin, Medium = profile

2. **"Does my resume drive traffic?"**
   - Check: Source = resume, Medium = pdf

3. **"Which LinkedIn approach works better: profile link or posts?"**
   - Compare: Medium = profile vs Medium = post

4. **"Are GitHub visitors more engaged than LinkedIn visitors?"**
   - Compare: Source = github vs Source = linkedin
   - Look at engagement rate, time on site

5. **"Is my email signature effective?"**
   - Check: Source = email, Medium = signature

6. **"Which job applications led to portfolio visits?"**
   - Check: Source = application, Campaign = job-search-2025

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ Don't Do This:
```
utm_source=LinkedIn Profile in Bio Section
utm_medium=Professional Network
```
**Why:** Too long, spaces, inconsistent

### ✅ Do This:
```
utm_source=linkedin
utm_medium=profile
```
**Why:** Clean, simple, consistent

---

### ❌ Don't Do This:
Use different names for the same source:
- linkedin
- LinkedIn
- linked-in
- li

### ✅ Do This:
Always use: `linkedin`

---

## 🔗 QUICK COPY-PASTE URLS

**Replace `YOURURL.com` with your actual portfolio URL:**

### LinkedIn Profile:
```
YOURURL.com/?utm_source=linkedin&utm_medium=profile&utm_campaign=portfolio
```

### GitHub Profile:
```
YOURURL.com/?utm_source=github&utm_medium=profile&utm_campaign=portfolio
```

### Resume:
```
YOURURL.com/?utm_source=resume&utm_medium=pdf&utm_campaign=job-application
```

### Email Signature:
```
YOURURL.com/?utm_source=email&utm_medium=signature&utm_campaign=networking
```

---

## 📱 QR CODE GENERATION

Want a QR code for your business card?

**Free QR Code Generators:**
- https://www.qr-code-generator.com/
- https://www.qrcode-monkey.com/

**Steps:**
1. Use UTM URL: `yoururl.com/?utm_source=qr-code&utm_medium=business-card&utm_campaign=networking`
2. Generate QR code
3. Download and add to business card

---

## ✅ SETUP COMPLETE CHECKLIST

After setting up UTM tracking:

- [ ] Created UTM URLs for LinkedIn, GitHub, Resume, Email
- [ ] Updated LinkedIn profile with UTM link
- [ ] Updated GitHub bio with UTM link
- [ ] Made portfolio link clickable in resume PDF
- [ ] Added UTM link to email signature
- [ ] Tested one URL to verify it shows in GA4 DebugView
- [ ] Bookmarked Campaign URL Builder for future use
- [ ] Created custom GA4 report for traffic sources

---

**Now you'll know exactly where every visitor came from! 🎯**
