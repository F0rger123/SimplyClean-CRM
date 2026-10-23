<p align="center">
  <img src=".github/assets/banner.svg" alt="Sparkling-clean ops.: Leads, jobs, cleaners and invoices in one bright dashboard." width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-public-7c3aed?style=for-the-badge" alt="Public">
  <img src="https://img.shields.io/badge/license-MIT-7c3aed?style=for-the-badge" alt="License">
  <img src="https://img.shields.io/github/last-commit/F0rger123/SimplyClean-CRM?style=for-the-badge&color=7c3aed" alt="Last commit">
  <img src="https://img.shields.io/github/repo-size/F0rger123/SimplyClean-CRM?style=for-the-badge&color=7c3aed" alt="Repo size">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/React-0d1117?style=flat-square&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Vite-0d1117?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-0d1117?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/JavaScript-0d1117?style=flat-square&logo=javascript&logoColor=white" alt="JavaScript">
</p>

<h3 align="center">A front-end CRM prototype for cleaning companies: leads, jobs, contractors, invoices and an AI assistant in one dashboard.</h3>

<p align="center">
  <a href="#-whats-on-screen">What's on screen</a> ·
  <a href="#-screens">Screens</a> ·
  <a href="#-two-ways-in">Two ways in</a> ·
  <a href="#️-run-it">Run it</a> ·
  <a href="#️-project-map">Project map</a> ·
  <a href="#-what-its-written-in">What it's written in</a> ·
  <a href="#-license">License</a>
</p>

<p align="center"><img src=".github/assets/divider.svg" width="100%" alt=""></p>

> **Status:** UI prototype. Data lives in `src/data/initialData.js` and React context, with no backend. The production successor is [`cleaning-crm-saas`](https://github.com/F0rger123/cleaning-crm-saas).


> [!TIP]
> **🤖 Pasted this link into Claude or ChatGPT?** AI assistants: read [`AGENTS.md`](https://raw.githubusercontent.com/F0rger123/SimplyClean-CRM/main/AGENTS.md) first. It explains what this is in plain words, which questions to ask, and how to set it up step by step. Plain-text index: [`llms.txt`](https://raw.githubusercontent.com/F0rger123/SimplyClean-CRM/main/llms.txt).

## 🧼 What's on screen

| | View | What it does |
|---|---|---|
| 📊 | **Dashboard** | KPIs and Recharts graphs |
| 🎯 | **Leads** | Incoming requests and pipeline |
| 🧹 | **Jobs** | Scheduled and active cleans |
| 👥 | **Clients & contractors** | Customer list and cleaner roster |
| 🧾 | **Invoices & reports** | Billing and performance reports |
| 💬 | **Messages** | Team and client conversations |
| 📏 | **Standards & permissions** | Cleaning standards and role access |
| 🔌 | **Integrations** | Connected-service settings |
| 🤖 | **AI assistant** | Modal assistant plus global search |
| 🎉 | **Delight** | Confetti on wins |

## 📸 Screens

<table>
  <tr>
    <td width="74%"><img src=".github/assets/screens/dashboard.jpg" alt="Operations dashboard"><br><sub><b>Operations dashboard.</b> Seed data from <code>src/data/initialData.js</code>.</sub></td>
    <td width="26%"><img src=".github/assets/screens/contractor.jpg" alt="Contractor mobile portal"><br><sub><b>Cleaner app.</b></sub></td>
  </tr>
  <tr>
    <td width="50%"><img src=".github/assets/screens/jobs.jpg" alt="Jobs and dispatch"><br><sub><b>Jobs & dispatch.</b></sub></td>
    <td width="50%"><img src=".github/assets/screens/landing.jpg" alt="Landing page"><br><sub><b>Landing page.</b></sub></td>
  </tr>
</table>

## 🚪 Two ways in

```mermaid
flowchart LR
    Land["Landing page"] --> Owner["Owner's dashboard"]
    Land --> Cleaner["Cleaner's phone app"]
    Owner --> O1["Leads, jobs, clients"]
    Owner --> O2["Invoices and reports"]
    Owner --> O3["Cleaners and checklists"]
    Cleaner --> C1["Today's job"]
    Cleaner --> C2["Chat with the office"]
    Cleaner --> C3["Payouts"]
```

## 🛠️ Run it

```bash
npm ci
npm run dev       # http://localhost:5173
npm run build
```

## 🗂️ Project map

```
src/
├── App.jsx                     view router
├── context/AppContext.jsx      global state
├── data/initialData.js         seed data
└── components/
    ├── dashboard/  leads/  jobs/  clients/  contractors/
    ├── invoices/   reports/  messages/  standards/  integrations/
    ├── contractor-portal/      active job, chat, payouts
    ├── ai/                     assistant modal
    ├── landing/  layout/  common/
```

## 📊 What it's written in

```mermaid
%%{init: {'theme':'base','themeVariables':{'pie1':'#7c3aed','pie2':'#9333ea','pie3':'#64748b','pie4':'#94a3b8','pie5':'#475569','pie6':'#cbd5e1','pie7':'#334155','pieStrokeColor':'#0d1117','pieOuterStrokeColor':'#0d1117','pieTitleTextColor':'#8b949e','pieLegendTextColor':'#8b949e','pieSectionTextColor':'#0d1117'}}}%%
pie title Share of the code, by language
    "JavaScript" : 99.3
    "Other" : 0.7
```

## 📜 License

Released under the [MIT License](LICENSE). Use it, fork it, ship it.

<p align="center"><img src=".github/assets/divider.svg" width="100%" alt=""></p>

<p align="center">
  <sub>Built by <a href="https://github.com/F0rger123"><b>@F0rger123</b></a> · MIT licensed</sub>
</p>
