# Sahim

Arabic-first investment intelligence for beginner investors.

Sahim is a Qabilah Hackathon MVP that helps new investors understand market risk,
news context, and Shariah-compliance signals before making decisions. It combines
a bilingual Next.js frontend, a FastAPI analysis backend, Firebase Auth,
Firestore user storage, and AI-powered news summaries into one guided product
experience.

Sahim is educational software. It does not execute trades, provide brokerage
services, collect KYC documents, or provide licensed investment advice.

## Highlights

- Arabic and English product experience with RTL/LTR support.
- Stock search and stock detail pages for beginner-friendly market analysis.
- Investment Readiness Score using volatility, VaR, Sharpe ratio, beta, and news
  sentiment.
- Shariah/Halal screening panel with clear responsibility disclaimers.
- Gemini-backed Arabic market-news summary, risks, and opportunities.
- ARIMA forecast visualization for supported tickers.
- Risk Wizard, Zakat Calculator, purification calculator, allocator, and sector
  insights.
- Firebase Auth and Firestore for lightweight user-owned state.
- In-memory FastAPI TTL cache for anonymous provider responses.
- Netlify-ready frontend and Render-ready backend configuration.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14, TypeScript, Tailwind CSS, next-intl |
| UI + Charts | lucide-react, Chart.js, Recharts, Framer Motion, Three.js |
| Backend | Python 3.11, FastAPI, Pydantic, cachetools |
| Analysis | NumPy, pandas, scipy, statsmodels |
| Auth + Storage | Firebase Auth, Firestore |
| AI + Data | Gemini, NewsAPI, Twelve Data, Alpha Vantage |
| Deployment | Netlify frontend, Render backend |

## Project Structure

```text
backend/
  app/
    api/            FastAPI route modules
    models/         Pydantic request and response models
    services/       Market, score, risk, news, halal, forecast, sector services
    cache.py        In-memory TTL cache
    main.py         FastAPI app entry point
  tests/            Backend tests

frontend/
  src/
    app/            Next.js App Router pages
    components/     Landing, dashboard, stock, tools, and UI components
    hooks/          Dashboard, Firestore, tier, watchlist, and soft-gate hooks
    lib/            API client, Firebase, Firestore, pricing, and shared types
    messages/       Arabic and English translations

docs/
  mvp-storage.md    Firestore and backend-cache storage boundary

specs/
  005-firestore-mvp-storage/
```

## Local Development

Run the backend and frontend in separate terminals.

### Backend

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e ".[dev]"
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload --reload-dir app --port 8000
```

Backend URLs:

- Health check: `http://localhost:8000/api/health`
- API docs: `http://localhost:8000/docs`

### Frontend

```powershell
cd frontend
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Frontend URLs:

- Arabic app: `http://localhost:3000/ar`
- English app: `http://localhost:3000/en`

## Environment Variables

Use `backend/.env.example` and `frontend/.env.local.example` as the setup
references.

Backend:

- `TWELVE_DATA_API_KEY`
- `ALPHA_VANTAGE_API_KEY`
- `GEMINI_API_KEY`
- `NEWSAPI_KEY`
- `MUSAFFA_API_KEY` or another halal provider key, if available
- `ALLOWED_ORIGINS`

Frontend:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_AUTH_COOKIE_NAME`

## Firebase Setup

1. Create a Firebase project.
2. Enable Firebase Authentication.
3. Enable Firestore in Native mode.
4. Copy the Firebase web app config into `frontend/.env.local`.
5. Apply `firestore.rules` in the Firebase Console.
6. Promote demo Pro or Enterprise users manually in Firestore when needed.

Firestore stores only owner-scoped demo user state: profile metadata, locale,
tier, watchlist, risk profile, latest Zakat reminder metadata, and compliance
alert preferences. It does not store brokerage credentials, KYC documents,
payment methods, real transactions, raw Zakat inputs, or persistent provider
response history.

## Demo Flow

1. Open `http://localhost:3000/ar`.
2. Search for a stock or company from the landing page.
3. Open a stock detail page such as `http://localhost:3000/ar/stock/AAPL`.
4. Show the readiness score, risk metrics, Halal panel, news panel, forecast,
   and sector comparison.
5. Sign in or create an account.
6. Complete the Risk Wizard.
7. Save a ticker to the watchlist.
8. Use the Zakat Calculator and save the latest reminder metadata.
9. Open the dashboard and show the personalized watchlist, risk, Zakat, news,
   alerts, and service cards.

## Validation

Frontend:

```powershell
cd frontend
npx tsc --noEmit --pretty false
npm run build
```

Backend:

```powershell
cd backend
.venv\Scripts\Activate.ps1
pytest tests/unit/ -v
```

## Deployment

Frontend deployment is configured through `netlify.toml`.

- Base directory: `frontend`
- Build command: `npm ci && npm run build`
- Publish directory: `.next`

Backend deployment is configured through `render.yaml`.

- Root directory: `backend`
- Build command: `pip install -e ".[dev]"`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check: `/api/health`

## Scope

Sahim is built for a hackathon MVP. The product focuses on education,
personalization, and explainable analysis. It intentionally excludes real trade
execution, brokerage integrations, payments, subscription billing, KYC/AML
collection, and licensed investment advice.
