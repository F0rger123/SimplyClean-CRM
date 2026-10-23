# AI guide: SimplyClean-CRM

**For AI assistants (Claude, ChatGPT, Codex, Cursor, Gemini).** Someone gave you a link to this repository. Use this page to explain it, set it up, or help them use it. Talk in plain English; the person may not be technical.

## What this is

A clickable design prototype of a CRM for cleaning companies: dashboard, leads, jobs, cleaners, invoices and a cleaner phone app. It uses sample data and has no backend.

**Usually used by:** Someone exploring the design, or a developer reusing it.

## Ask first

Ask these together in one short message, then repeat back what you heard in a line or two. Skip anything they already told you.

- Do you want to see it running, reuse parts of it, or build the real version?

## Set it up

Do one step at a time. Check each one worked before moving on.

| # | Do this | It worked if |
|---|---|---|
| 1 | `npm ci` | No errors |
| 2 | `npm run dev` | Opens at http://localhost:5173 |

## Use it

- Log in from the landing page to see the owner dashboard.
- Switch role to contractor to see the cleaner app.
- Sample data lives in `src/data/initialData.js`.

## How it works, in plain words

1. Everything runs in the browser and is saved in the browser only.

## Never

- Never ask for, paste or print passwords, API keys or tokens. Tell the person where to put them (their own `.env` file or the hosting dashboard) and let them do it.
- Never deploy, push to `main`, change a live database or spend money without the person saying yes to that exact step.
- Don't treat it as production: the real product is `cleaning-crm-saas`.

## When you're done

Tell the person, in a few lines: what is set up and checked, what isn't yet, and two or three things they can ask you next.
