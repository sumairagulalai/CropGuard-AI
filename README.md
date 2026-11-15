# CropGuard AI - FYP

AI-powered crop disease detection system.

## Folders
- frontend/  : React + Vite website (13 screens)
- backend/   : FastAPI server (/predict) - starter
- model/     : dataset + training + trained model (baaki hai)
- docs/      : project proposal aur baaki documentation

## Website chalane ka tareeqa (VS Code)
1. VS Code mein File > Open Folder > CropGuard-AI
2. Terminal kholein (Ctrl + `) aur ye chalayein:
   cd frontend
   npm install
   npm run dev
3. Terminal mein jo link aaye (http://localhost:5173) wo browser mein kholein.
(Node.js installed hona chahiye: nodejs.org)

Production build: npm run build (dist/ folder Netlify par upload karein)

## Backend chalane ka tareeqa (jab ready ho)
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
API docs: http://127.0.0.1:8000/docs

## FYP checklist
- [x] Proposal
- [x] UI design + React frontend (detection abhi simulated)
- [ ] Dataset collect karna
- [ ] Model train karna
- [ ] Backend se model jodna
- [ ] Frontend ko API se jodna
- [ ] Firebase login + database
- [ ] Disease knowledge base verify karwana
- [ ] Deployment (Netlify + Render)
- [ ] Testing + final report
