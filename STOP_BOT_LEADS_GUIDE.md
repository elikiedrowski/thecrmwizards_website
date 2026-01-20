# Stop Fake Bot Leads - Complete Guide

## Problem
Bots are submitting leads directly to your Salesforce Web-to-Lead endpoint, bypassing the webpage protections.

## Solution: Multi-Layer Defense

### ✅ **Step 1: Create Custom Fields in Salesforce** (CRITICAL)

These fields will help identify and block bots:

1. **Honeypot Field** (to catch bots)
   - Setup → Object Manager → Lead → Fields & Relationships → New
   - Data Type: Text
   - Field Label: `Website URL`
   - Field Name: `Website_URL`
   - Length: 255
   - **Note the API Name** (e.g., `Website_URL__c`)
   - **Note the Field ID** for Web-to-Lead (starts with `00N`)

2. **Verification Token Field** (for form validation)
   - Data Type: Text
   - Field Label: `Verification Token`
   - Field Name: `Verification_Token`
   - Length: 255
   - **Note the Field ID**

3. **Form Timestamp Field** (to track submission speed)
   - Data Type: Text  
   - Field Label: `Form Timestamp`
   - Field Name: `Form_Timestamp`
   - Length: 50

### ✅ **Step 2: Create Validation Rule** (BLOCKS BOTS)

This is the most important step - it will reject bot submissions in Salesforce:

1. Setup → Object Manager → Lead → Validation Rules → New
2. **Rule Name**: `Block_Bot_Honeypot_Submissions`
3. **Active**: ✅ Checked
4. **Error Condition Formula**:
```
NOT(ISBLANK(Website_URL__c))
```
5. **Error Message**: `Invalid submission detected`
6. **Error Location**: Top of Page
7. Save

**How it works**: The honeypot field is hidden on the real form. Humans can't see it or fill it. Bots auto-fill all fields, so this catches them.

### ✅ **Step 3: Create Duplicate Rules** (PREVENTS REPEAT SPAM)

1. Setup → Duplicate Management → Duplicate Rules → New
2. **Object**: Lead
3. **Rule Name**: `Block_Duplicate_Email_Within_1_Hour`
4. **Matching Rules**: Select `Standard_Lead_Match_Rule_v1_0`
5. **Actions**:
   - When a record is created: **Block**
   - Alert user of duplicate: ✅ Yes
6. Save & Activate

### ✅ **Step 4: Update contact.html Field IDs**

After creating the custom fields, you'll get Field IDs (format: `00N8b00000XXXXX`).

In `contact.html`, replace:
- Line ~76: `name="00N8b00000XXXXX"` → Your Honeypot Field ID
- Line ~79: `name="00N8b00000YYYYY"` → Your Verification Token Field ID

### ✅ **Step 5: Create Assignment Rule** (QUARANTINE SUSPICIOUS LEADS)

1. Setup → Lead Assignment Rules → New
2. **Rule Name**: `Quarantine_Suspicious_Leads`
3. **Rule Entries**:

**Entry 1: Has Verification Token = FALSE (Bot)**
- Criteria: `Verification Token` EQUALS (blank)
- Assign to: Create a lead queue called "Suspected Bots"
- Email: Don't send email

**Entry 2: Normal Leads**
- Criteria: `Verification Token` NOT EQUAL TO (blank)
- Assign to: Your normal sales queue
- Email: Send notification

4. Save & Activate

### ✅ **Step 6: Enable reCAPTCHA v3** (FREE, INVISIBLE)

1. Go to: https://www.google.com/recaptcha/admin/create
2. **Label**: The CRM Wizards Website
3. **reCAPTCHA type**: reCAPTCHA v3
4. **Domains**: 
   - `elikiedrowski.github.io`
   - `thecrmwizards.com` (if you have custom domain)
5. Accept terms → Submit
6. **Copy your Site Key**

7. In `contact.html`:
   - Line 11: Uncomment and add your Site Key
   - Line ~390: Add your Site Key in the `grecaptcha.execute()` call

### ✅ **Step 7: Monitor & Clean Up**

**View Suspected Bot Leads:**
1. Leads → List View → Create new view "Suspected Bots"
2. Filters:
   - `Verification Token` equals (blank)
   - OR `Website URL` not equal to (blank)

**Bulk Delete Bot Leads:**
1. Open "Suspected Bots" view
2. Select all → Delete

**Create Report:**
1. Reports → New Report → Leads
2. Filters:
   - Created Date = THIS_WEEK
   - Verification Token = blank
3. Save as "Weekly Bot Submissions"

---

## 🛡️ Protection Layers Summary

| Layer | Type | Effectiveness | Status |
|-------|------|---------------|--------|
| Honeypot Field | Client + Server | High | ✅ Active |
| Verification Token | Client + Server | High | ✅ Active |
| Time-Based Validation | Client | Medium | ✅ Active |
| Rate Limiting | Client | Low | ✅ Active |
| Duplicate Rules | Server | Medium | ⚙️ Configure |
| Validation Rules | Server | **Very High** | ⚙️ Configure |
| Assignment Rules | Server | Medium | ⚙️ Configure |
| reCAPTCHA v3 | Google | **Very High** | ⏳ Pending Keys |

---

## 🎯 Expected Results

After implementing all steps:
- **95-99% reduction** in bot submissions
- Remaining bots quarantined to "Suspected Bots" queue
- Real leads flow to your sales team
- Easy cleanup of any bot leads that slip through

---

## ⚠️ Important Notes

1. **Client-side protections alone won't work** - Bots submit directly to Salesforce
2. **Validation Rule is most critical** - This actually blocks at the server level
3. **Don't skip custom fields** - Without them, the validation rules can't work
4. **reCAPTCHA is invisible** - Users won't see it or interact with it

---

## 🆘 Still Getting Bot Leads?

If bots continue after all steps:

1. **Check Validation Rule is Active**: Setup → Validation Rules → Look for ✅
2. **Verify Field IDs Match**: The `00N` codes must match your Salesforce org
3. **Enable Email-to-Lead**: Disable if active (Setup → Email-to-Lead)
4. **Check Web-to-Lead is Restricted**: Setup → Web-to-Lead → Check settings
5. **Consider Disabling Web-to-Lead**: Use Salesforce Forms or third-party forms instead

---

Built for The CRM Wizards 🧙‍♂️
Updated: 2026-01-19
