# Validation Automation Plan — Maintenance Request-to-Resolution Kit

*Design only — nothing here is built. The kit is an unvalidated prototype; this workflow exists to run the interviews in `validation-plan.md` using `validation-interview-guide.md`. Target: 8 qualified independent managers who oversee maintenance.*

**Flow:** outreach → voluntary form response → qualification → scheduling → 15-minute interview → structured notes → AI-assisted summary → human review.

**Tools:** Google Forms (intake), Google Sheets (single tracker), Gmail (messages), Calendly (booking), n8n or Make (glue between steps).

## Steps

| # | Step | Trigger | Action | Data needed | Destination | Human approval needed |
|---|------|---------|--------|-------------|-------------|-----------------------|
| 1 | Outreach | Researcher decides to post/message | Manually post or send a message from `marketing/outreach-message.md` with the form link | Community name, post date, form link with `source` tag | Sheet tab `Outreach log` (manual entry) | Yes — every post and message is written and sent by a person, following each community's rules |
| 2 | Form response | Participant submits Google Form | Form writes a row; n8n/Make adds `status = New`, timestamp, and response ID | Answers from `marketing/recruitment-form.md` | Sheet tab `Responses` | No |
| 3 | Qualification | New row in `Responses` | n8n/Make applies simple fit rules and sets `suggested_fit` = Likely / Unclear / Not a fit (see rules below) | Role, maintenance involvement, portfolio size, recent-request recency, consent | Same row, `suggested_fit` column | Yes — a person sets final `status` (Invite / Decline / Hold). Automation only suggests |
| 4 | Invitation | Row `status` changed to `Invite` by a person | n8n/Make creates a Gmail **draft** with the Calendly link; person reviews and sends | First name, email, Calendly link | Gmail Drafts; Sheet `invited_at` | Yes — person sends the draft |
| 5 | Decline / hold | Row `status` changed to `Decline` | Create a short, polite Gmail draft (optional) | First name, email | Gmail Drafts | Yes — person sends or skips |
| 6 | Scheduling | Calendly booking created | n8n/Make matches booking email to row; sets `status = Scheduled`, records time | Calendly event time, email | Sheet `Responses`; researcher's calendar | No (participant self-books) |
| 7 | Reminder | 24 h before event | Calendly's built-in reminder email | Event time | Participant inbox | No — set up once, reviewed once |
| 8 | Interview (15 min) | Scheduled time | Person runs the interview with the guide; prototype shown only if useful | Interview guide, workflow prototype | — | Conducted entirely by a person |
| 9 | Structured notes | Interview ends | Person fills a notes form/template (fields below) within 24 h | Participant ID (not name), notes | Sheet tab `Interview notes` | Written by a person |
| 10 | AI-assisted summary | New row in `Interview notes` | n8n/Make sends **only the de-identified notes row** to an LLM with a fixed prompt; output saved as a draft | Notes fields only | Sheet `ai_summary_draft` column | Yes — see step 11 |
| 11 | Human review | AI draft present | Person compares draft with original notes, corrects it, marks `reviewed = Yes` | Notes + draft | Sheet `reviewed_summary` column | Yes — only reviewed summaries are used in decisions |
| 12 | Tally | Researcher chooses to review progress | Sheet formulas count reviewed interviews against the screening rule in `validation-plan.md` | Reviewed fields only | Sheet tab `Tally` | Yes — go/modify/abandon is a human decision |

## Qualification rules (suggestion only)

- **Likely:** manages or coordinates maintenance for residential rental property; handled a maintenance request in the last 30 days; consented to be contacted.
- **Unclear:** indirect role, or last request 1–6 months ago.
- **Not a fit:** no maintenance involvement, no consent, or vendor/software seller recruiting for their own purposes.
- Prefer independent/small-portfolio managers; cap any single community source to avoid a skewed sample.

## Structured notes fields

Participant ID · date · role · portfolio size · tools used · last 3 requests (brief) · longest wait and cause · lost-information example · reopened-work example · vendor communication gap · approval gap · what software already handles · what happens outside software · prototype feedback (remove/change/add) · actual past spend (fact) · hypothetical intent (kept separate) · concrete next step offered (yes/no, what) · researcher confidence notes.

## AI summary prompt constraints

Summarize only what is in the notes. Separate observed facts from participant opinions. Do not infer demand, pricing, or willingness to pay. Flag gaps as "not discussed". Output fixed headings matching the notes fields.

## What should NOT be automated

- Posting in communities or sending cold/direct messages (spam risk, community rules).
- Final qualification, invite, or decline decisions.
- Sending any email without a person reviewing it.
- Conducting or recording interviews without explicit consent; no AI note-takers joining calls by default.
- Sending names, emails, addresses, tenant/resident details, or vendor details to an AI tool.
- Deciding whether a pain point is "validated", counting commitments, or choosing to build/abandon.
- Collecting payment, pre-orders, or paid-pilot commitments.
- Contacting vendors, residents, or anyone other than the participant.
- Follow-up sequences beyond one reminder.

## Data handling

Collect the minimum in `recruitment-form.md`. Keep contact details in the `Responses` tab only; use participant IDs elsewhere. Restrict sheet sharing to the research team. Delete contact details of people not interviewed after the study, and offer deletion to anyone on request.
