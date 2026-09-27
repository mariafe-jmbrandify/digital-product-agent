# Google Form Setup — Maintenance Workflow Research

*Manual configuration spec, built from `recruitment-form.md`. It hasn't been created yet: this session had no Google Forms access. Someone needs to follow these steps at forms.google.com. Don't add any questions beyond the ones below.*

## 1. Create the form

- **Title:** Maintenance Request Workflow — Research Interview
- **Description:**
  > I'm researching how property managers handle maintenance requests from intake to resolution. This is research only — nothing is being sold. If there's a fit, I'll email you a link to book a 15-minute call. Please don't include any tenant, resident, or vendor details. Takes about 2 minutes.
- Use one section only (no page breaks). Keep it to 10 questions.

## 2. Questions (in this order)

| # | Question | Type | Required | Options / validation |
|---|----------|------|----------|----------------------|
| 1 | What is your role in handling maintenance requests? | Multiple choice | Yes | I manage or coordinate maintenance requests myself · I oversee someone who coordinates them · I'm occasionally involved · I'm not involved in maintenance requests |
| 2 | What type of property do you manage? | Checkboxes | Yes | Residential rental — single-family · Residential rental — multifamily · HOA / condo association · Commercial · **Other** (enable "Other" option) |
| 3 | Which best describes your organization? | Multiple choice | Yes | Self-managing owner / landlord · Independent or small property management company · Larger property management company · **Other** (enable "Other" option) |
| 4 | Roughly how many units do you manage? | Multiple choice | Yes | 1–10 · 11–50 · 51–200 · 201–500 · More than 500 |
| 5 | When did you last handle or oversee a maintenance request? | Multiple choice | Yes | In the last 30 days · 1–6 months ago · More than 6 months ago |
| 6 | What do you currently use to track maintenance requests? | Checkboxes | No | Property-management software · Spreadsheet · Email / text messages · Paper or notebook · **Other** (enable "Other" option) |
| 7 | First name | Short answer | Yes | — |
| 8 | Email address for scheduling | Short answer | Yes | Response validation → Text → Email |
| 9 | Time zone | Dropdown | Yes | See time-zone list below |
| 10 | Consent | Checkboxes | Yes | Single option: "I agree to be contacted by email about a 15-minute research interview. I understand this is not a sales call, participation is voluntary, I can withdraw at any time, and I can ask for my details to be deleted." |

**Q6 note:** `recruitment-form.md` has "Property-management software (name, if you like): ___". Google Forms can't add a text field to a single option. To keep the question count unchanged, set the Q6 description to: *"If you use property-management software, you can name it under Other."*

**Q9 time-zone options:** Pacific (PT) · Mountain (MT) · Central (CT) · Eastern (ET) · Alaska (AKT) · Hawaii (HT) · Atlantic (AT) · UK / Ireland (GMT/BST) · Central Europe (CET) · Australia — Eastern (AET) · Other

## 3. Settings

- **Responses → Collect email addresses:** Do not collect (Q8 already asks for it).
- **Send responders a copy:** Off.
- **Limit to 1 response:** Off (turning it on forces a Google sign-in).
- **Allow response editing:** Off.
- **Presentation → Show progress bar:** Off (single page).
- **Quiz mode:** Off.
- **Default: make questions required:** Off. Set the required flags per question as shown in the table.

## 4. Confirmation message

Settings → Presentation → Confirmation message:

> Thanks! If there's a fit, you'll get an email with a link to book a time. If not, I may not follow up — thank you for taking the time.

Leave out any Calendly link. The booking link goes out later in a reviewed Gmail draft (see `research/validation-automation.md`).

## 5. Connect the response Sheet

1. Open the **Responses** tab and click **Link to Sheets**.
2. Choose **Create a new spreadsheet**.
3. Name it: **Maintenance Workflow Validation**.
4. Share the Sheet with the research team only. Don't share it by public link.

## 6. Source tracking (limitation)

`recruitment-form.md` lists a hidden `source` field. Google Forms has no hidden fields, and adding a visible question would break the "no extra questions" rule. For now, log the source by hand in the Sheet's `Outreach log` tab.

## 7. Before sharing the link

- Submit one test response, check that it lands in the Sheet, then delete that test row.
- Check that none of these are asked anywhere: phone, company name, property address, tenant/resident/vendor details, budget, pricing, or purchase intent.
- Time a full completion. It should take about 2 minutes.
