# Student Race

Referral race for the free workshop "Build Your First AI Project in 60 Minutes".
Demo mode: no database, no env vars. Data lives in the browser (localStorage) merged with sample students.

## Run locally (Mac)
```
cd student-race
npm install
npm run dev
```
Open http://localhost:3000 (landing), /join, /leaderboard, /admin.

## Deploy to Vercel
1. `git init && git add . && git commit -m "Student Race"`
2. Create an empty GitHub repo, then `git remote add origin <url> && git push -u origin main`
3. vercel.com > Add New > Project > import the repo > Deploy (no settings needed).

## Customise
- Video: set `YOUTUBE_ID` in `lib/config.js`.
- Goal, colleges, branches, points: `lib/config.js`. Sample students: `lib/seed.js`.
