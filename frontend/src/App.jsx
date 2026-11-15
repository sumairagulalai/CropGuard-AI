 import { useState, useEffect } from 'react'
import { D, SEED } from './data'
import * as P from './pages'

const load = () => { try { return JSON.parse(localStorage.getItem('cg') || '{}') } catch { return {} } }
const PUBLIC = ['landing', 'login', 'register']

export default function App() {
  const [S, setS] = useState(() => ({ users: [], me: null, hist: SEED, last: null, ...load() }))
  const [hash, setHash] = useState(location.hash || '#/landing')
  const [tab, setTab] = useState('ov')
  const [edit, setEdit] = useState(false)
  const [pre, setPre] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => { try { localStorage.setItem('cg', JSON.stringify(S)) } catch {} }, [S])
  useEffect(() => {
    const f = () => { setHash(location.hash || '#/landing'); setTab('ov'); window.scrollTo(0, 0) }
    addEventListener('hashchange', f)
    return () => removeEventListener('hashchange', f)
  }, [])

  const [, r = 'landing', a] = hash.replace('#', '').split('/')
  const go = (h) => { location.hash = '#/' + h }
  const upd = (p) => setS((s) => ({ ...s, ...(typeof p === 'function' ? p(s) : p) }))
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 2200) }

  useEffect(() => { if (!PUBLIC.includes(r) && r !== 'loading' && !S.me) go('login') }, [r, S.me])
  useEffect(() => {
    const t = setTimeout(() => {
      const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: 0.1 })
      document.querySelectorAll('#v .card,#v .crop,#v .stats>div,#v .row,#v .promo,#v .drop,#v .samp img,#v tr,#v .sec h2').forEach((e, i) => { e.classList.add('rv'); e.style.transitionDelay = (i % 8) * 60 + 'ms'; io.observe(e) })
    }, 30)
    return () => clearTimeout(t)
  }, [hash])

  const fin = (k, img) => {
    setPre(img); go('loading')
    setTimeout(() => {
      k = k || ['early', 'late', 'rust', 'ok'][Math.floor(Math.random() * 4)]
      const crop = D[k].c || ['Tomato', 'Wheat', 'Corn'][Math.floor(Math.random() * 3)]
      const conf = Math.floor(86 + Math.random() * 12)
      const date = new Date().toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
      upd((s) => ({ last: { k, img, conf }, hist: [{ k, crop, date, ago: 'Just now' }, ...s.hist] }))
      go(k === 'ok' ? 'none' : 'result')
    }, 2200)
  }
  const pickFile = (f) => {
    if (!f) return
    if (!/image\/(png|jpe?g)/.test(f.type)) return say('Please choose a JPG or PNG image')
    if (f.size > 5242880) return say('Image must be under 5MB')
    const rd = new FileReader(); rd.onload = () => fin(null, rd.result); rd.readAsDataURL(f)
  }
  const view = (i) => {
    const x = S.hist[i]
    if (x.k === 'ok') go('none')
    else { upd({ last: { k: x.k, conf: 92 } }); go('result') }
  }
  const c = { S, upd, go, say, tab, setTab, edit, setEdit, pre, fin, pickFile, view, a, logout: () => upd({ me: null }) }
  const pages = { landing: P.Landing, login: P.Login, register: P.Register, dashboard: P.Dashboard, detect: P.Detect, loading: P.Loading, result: P.Result, none: P.None, disease: P.Disease, history: P.History, guide: P.Guide, crop: P.Crop, profile: P.Profile }
  const Page = pages[r] || P.Landing
  const blocked = !PUBLIC.includes(r) && r !== 'loading' && !S.me

  return (
    <div id="v">
      {!blocked && <Page c={c} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
