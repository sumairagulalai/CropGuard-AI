import { useState, useEffect, useMemo, useRef } from 'react'
import { E, D, CR, nav } from './data'
import { IM } from './images'

export const SM = [['ok', IM.s1], ['early', IM.s2], ['late', IM.s3], ['rust', IM.s4]]
const ci = (c) => (IM[c] ? <img src={IM[c]} alt={c} /> : '🍃')
const sc = (id) => document.getElementById(id)?.scrollIntoView()

function Count({ n, pre = '', suf = '' }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let s = 0
    const id = setInterval(() => { s += Math.max(1, Math.ceil(n / 20)); if (s >= n) { s = n; clearInterval(id) } setV(s) }, 40)
    return () => clearInterval(id)
  }, [n])
  return <>{pre}{v}{suf}</>
}
function Leaves() {
  const L = useMemo(() => Array.from({ length: 14 }, () => ({ left: Math.random() * 100 + '%', fontSize: 14 + Math.random() * 20, animationDuration: 8 + Math.random() * 10 + 's', animationDelay: -Math.random() * 12 + 's' })), [])
  return <div className="fl">{L.map((s, i) => <span key={i} style={s}>🍃</span>)}</div>
}
function Redirect({ to, go }) { useEffect(() => go(to), []); return null }
function Shell({ on, c, children }) {
  return (
    <>
      <div className="app">
        <div className="sb"><b>🍃 CropGuard AI</b>
          {nav.map((n) => <a key={n[0]} href={'#/' + n[0]} className={on === n[0] ? 'on' : ''}>{n[1]} {n[2]}</a>)}
          <a className="lo" href="#/login" onClick={c.logout}>⎋ Logout</a>
        </div>
        <div className="main">{children}</div>
      </div>
      <div className="bn">{nav.map((n) => <a key={n[0]} href={'#/' + n[0]} className={on === n[0] ? 'on' : ''}><b>{n[1]}</b>{n[2].split(' ')[0]}</a>)}</div>
    </>
  )
}
const AuthSide = () => (
  <div className="side" style={{ background: `linear-gradient(180deg,#17372600 15%,#173726 80%),url(${IM.auth}) top/cover` }}>
    <Leaves /><div style={{ height: 130 }} /><h1>CropGuard AI</h1><p>Smart Detection<br />for Healthier Crops</p>
  </div>
)

export function Landing() {
  return (
    <>
      <div className="hero"><Leaves />
        <div className="nav"><b>🍃 CropGuard AI</b>
          <a className="h" style={{ cursor: 'pointer' }} onClick={() => scrollTo(0, 0)}>Home</a>
          <a className="h" style={{ cursor: 'pointer' }} onClick={() => sc('about')}>About</a>
          <a className="h" style={{ cursor: 'pointer' }} onClick={() => sc('feat')}>Features</a>
          <a className="h" style={{ cursor: 'pointer' }} onClick={() => sc('contact')}>Contact</a>
          <a className="btn s" href="#/login">Login</a></div>
        <div className="hc">
          <div><h1>Healthy Crops<span>Brighter Future</span></h1><h3>AI-Powered Crop Disease Detection for a Better Tomorrow</h3>
            <p>Upload a leaf image, detect diseases instantly and get expert advice for healthier crops and higher yields.</p>
            <a className="btn" href="#/register">Get Started</a> <a className="btn o" style={{ cursor: 'pointer' }} onClick={() => sc('about')}>Learn More</a></div>
          <div className="hp"><img className="hi" src={IM.hero} alt="Healthy crop with AI detection" /></div>
        </div>
      </div>
      <div className="sec" id="about"><h2>About</h2><p>CropGuard AI helps farmers identify crop diseases from a single photograph and gives treatment and prevention guidance in seconds.</p></div>
      <div className="sec" id="feat" style={{ paddingTop: 0 }}><h2>Features</h2>
        <div className="grid">{[['📷', 'Instant Detection', 'Upload a leaf image and get a result with a confidence score.'], ['💊', 'Treatment Advice', 'Clear treatment and prevention steps for every disease.'], ['🕘', 'Detection History', 'Track all your previous scans in one place.'], ['📖', 'Crop Guide', 'Learn about common crops and their diseases.']].map((x) => <div className="card" key={x[1]}><div style={{ fontSize: 30 }}>{x[0]}</div><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div>
      <ContactSec />
    </>
  )
}
function ContactSec() {
  return (
    <div className="sec" id="contact" style={{ paddingTop: 0 }}><h2>Contact</h2>
      <div className="card" style={{ maxWidth: 480 }}><label>Your email</label><input type="email" /><label>Message</label><input /><br /><br />
        <button className="btn" onClick={() => alert('Thanks! We will get back to you.')}>Send</button></div></div>
  )
}

export function Login({ c }) {
  const [i, setI] = useState(''), [p, setP] = useState(''), [er, setEr] = useState('')
  const sub = () => {
    if (!i.trim() || !p) return setEr('Please fill in all fields.')
    const u = c.S.users.find((x) => (x.email === i.trim() || x.name === i.trim()) && x.pw === p)
    if (!u) return setEr('Invalid credentials. Please register first.')
    c.upd({ me: u }); c.go('dashboard')
  }
  const google = () => { c.upd({ me: { name: 'Ali Khan', email: 'ali@gmail.com', role: 'Farmer', loc: 'Peshawar, Pakistan', join: 'April 2025', crops: ['Tomato', 'Potato', 'Wheat', 'Corn'] } }); c.go('dashboard') }
  return (
    <div className="auth"><AuthSide />
      <div className="form"><h2>Welcome Back!</h2><p className="sub">Login to your account</p>
        <label>Email or Username</label><input value={i} onChange={(e) => setI(e.target.value)} placeholder="Enter your email or username" />
        <label>Password</label><input type="password" value={p} onChange={(e) => setP(e.target.value)} placeholder="Enter your password" />
        <label style={{ fontWeight: 400 }}><input type="checkbox" style={{ width: 'auto' }} /> Remember me</label>
        <div className="err">{er}</div><button className="btn w" onClick={sub}>Login</button>
        <div className="ctr">— OR —</div>
        <button className="btn w" style={{ background: 'var(--c)', color: 'var(--t)', border: '1px solid var(--b)' }} onClick={google}>G Continue with Google</button>
        <div className="ctr">Don't have an account? <a href="#/register">Register</a></div></div></div>
  )
}
export function Register({ c }) {
  const [f, setF] = useState({ n: '', e: '', p: '', r: '' }), [er, setEr] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const sub = () => {
    if (!f.n.trim() || !f.e.trim() || !f.p || !f.r) return setEr('Please complete all fields.')
    if (!/^\S+@\S+\.\S+$/.test(f.e)) return setEr('Enter a valid email.')
    if (f.p.length < 6) return setEr('Password must be at least 6 characters.')
    if (c.S.users.some((x) => x.email === f.e)) return setEr('Email already registered.')
    const u = { name: f.n.trim(), email: f.e.trim(), pw: f.p, role: f.r, loc: '', join: new Date().toLocaleString('en', { month: 'long', year: 'numeric' }), crops: ['Tomato', 'Potato', 'Wheat', 'Corn'] }
    c.upd((s) => ({ users: [...s.users, u], me: u })); c.go('dashboard')
  }
  return (
    <div className="auth"><AuthSide />
      <div className="form"><h2>Create Your Account</h2><p className="sub">Join us and make farming smarter</p>
        <label>Full Name</label><input value={f.n} onChange={set('n')} />
        <label>Email</label><input type="email" value={f.e} onChange={set('e')} />
        <label>Password</label><input type="password" value={f.p} onChange={set('p')} />
        <label>Role</label><select value={f.r} onChange={set('r')}><option value="">Select your role</option><option>Farmer</option><option>Agricultural Expert</option><option>Student</option></select>
        <div className="err">{er}</div><button className="btn w" onClick={sub}>Register</button>
        <div className="ctr">Already have an account? <a href="#/login">Login</a></div></div></div>
  )
}

export function Dashboard({ c }) {
  const { S } = c, h = S.hist, bad = h.filter((x) => x.k !== 'ok').length, nm = S.me?.name || 'Guest'
  return (
    <Shell on="dashboard" c={c}>
      <div className="top"><div><h1>Good Morning, {nm.split(' ')[0]}! 👋</h1><p className="sub">Here's what's happening with your crops today.</p></div><div className="av">{nm[0].toUpperCase()}</div></div>
      <div className="stats">
        <div className="card"><small>Total Scans</small><div><Count n={h.length} /></div></div>
        <div className="card"><small>Healthy Crops</small><div><Count n={h.length - bad} /></div></div>
        <div className="card"><small>Diseases Detected</small><div><Count n={bad} /></div></div>
        <div className="card"><small>Saved Yield</small><div><Count n={20} pre="+" suf="%" /></div></div>
      </div>
      <div className="two">
        <div className="card"><b>Recent Detections</b> <a href="#/history" style={{ float: 'right', color: 'var(--a)', fontSize: 13 }}>View All</a>
          {h.slice(0, 3).map((x, i) => <div className="row" key={i}><div className="th">{ci(x.crop)}</div><div>{x.crop} Leaf<br /><small className={x.k === 'ok' ? 'good' : 'bad'}>{D[x.k].n}</small></div><span>{x.ago || x.date}</span></div>)}</div>
        <div className="promo" style={{ background: `linear-gradient(180deg,#183c2dcc,#183c2d88),url(${IM.field}) center/cover` }}>Healthy Crops<br />+<br />Better Harvest<small style={{ fontWeight: 400, marginTop: 10 }}>Keep your crops safe and productive!</small></div>
      </div>
    </Shell>
  )
}

export function Detect({ c }) {
  const [dg, setDg] = useState(false), fi = useRef()
  return (
    <Shell on="detect" c={c}>
      <h1>Detect Crop Disease</h1><p className="sub">Upload a clear image of the affected leaf or plant.</p>
      <div className={'drop' + (dg ? ' dg' : '')} onClick={() => fi.current.click()} onDragOver={(e) => { e.preventDefault(); setDg(true) }} onDragLeave={() => setDg(false)} onDrop={(e) => { e.preventDefault(); setDg(false); c.pickFile(e.dataTransfer.files[0]) }}>
        <div className="ic">☁️</div><p>Drag &amp; drop an image here<br />or</p><span className="btn">Choose File</span>
        <p style={{ fontSize: 12, color: 'var(--m)' }}>Supported formats: JPG, JPEG, PNG | Max size 5MB</p></div>
      <input ref={fi} type="file" accept="image/png,image/jpeg" hidden onChange={(e) => c.pickFile(e.target.files[0])} />
      <h3>Or try sample images</h3>
      <div className="samp">{SM.map((s, i) => <img key={i} src={s[1]} alt={'Sample ' + (i + 1)} onClick={() => c.fin(s[0], s[1])} />)}</div>
    </Shell>
  )
}
export function Loading({ c }) {
  return (
    <div className="full"><Leaves />
      {c.pre ? <div className="sw"><img src={c.pre} alt="" /><i className="sl" /></div> : <div style={{ fontSize: 60 }}>🍃</div>}
      <h1>CropGuard AI</h1><p style={{ color: 'var(--y)' }}>Analyzing your image...</p><div className="spin" />
      <p>This may take a few seconds.<br />Please wait...</p></div>
  )
}
export function Result({ c }) {
  const l = c.S.last
  if (!l) return <Redirect to="detect" go={c.go} />
  const d = D[l.k]
  return (
    <Shell on="detect" c={c}>
      <div className="card"><div className="res"><img className="pic" src={l.img || IM.dis} alt="Uploaded leaf" />
        <div><div className="bad">⚠ Disease Detected</div><h1 style={{ color: 'var(--r)' }}>{d.n}</h1><small>({d.s})</small>
          <p>Confidence Score <b style={{ float: 'right' }}>{l.conf}%</b></p><div className="bar"><i style={{ width: l.conf + '%' }} /></div></div></div>
        <h3>About the Disease</h3><p>{d.d}</p>
        <h3>Recommended Treatment</h3><ul className="l">{d.tr.map((x) => <li key={x}>{x}</li>)}</ul>
        <a className="btn s" style={{ float: 'right' }} href={'#/disease/' + l.k}>View More Details</a>
        <a className="btn s o" style={{ color: 'var(--t)', borderColor: 'var(--b)' }} href="#/detect">Scan Another</a></div>
    </Shell>
  )
}
export function None() {
  return (
    <div className="full none"><div className="e">🍃</div><h2>No Disease Detected</h2><p>The image looks healthy!</p>
      <p style={{ maxWidth: 360, color: 'var(--m)' }}>If you're still concerned, try a clearer image or check the crop guide for more information.</p>
      <a className="btn" style={{ minWidth: 240 }} href="#/detect">Go Back</a><p><a href="#/guide" style={{ color: 'var(--a)', fontSize: 13 }}>View Crop Guide</a></p></div>
  )
}
export function Disease({ c }) {
  const d = D[c.a] && c.a !== 'ok' ? D[c.a] : D.early
  const T = { ov: 'Overview', sy: 'Symptoms', tr: 'Treatment', pr: 'Prevention' }
  return (
    <Shell on="guide" c={c}>
      <h1>{d.n} ({d.c})<span className="badge">{d.t}</span></h1>
      <div className="tabs">{Object.keys(T).map((t) => <button key={t} className={c.tab === t ? 'on' : ''} onClick={() => c.setTab(t)}>{T[t]}</button>)}</div>
      <div className="card"><div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}><img src={IM.dis} style={{ width: 200, borderRadius: 12 }} alt="" />
        <div style={{ flex: 1, minWidth: 220 }}>{c.tab === 'ov' ? <><p>{d.d}</p><p><b>Scientific name:</b> {d.s}<br /><b>Affected crop:</b> {d.c}</p></> : <ul className="l">{d[c.tab].map((x) => <li key={x}>{x}</li>)}</ul>}</div></div></div>
    </Shell>
  )
}
export function History({ c }) {
  const h = c.S.hist
  return (
    <Shell on="history" c={c}>
      <div className="top"><h1>Detection History</h1><button className="btn s r" onClick={() => c.upd({ hist: [] })}>Clear All</button></div>
      <div className="card ov"><table><thead><tr><th>Image</th><th>Crop</th><th>Disease</th><th>Date</th><th>Action</th></tr></thead><tbody>
        {h.map((x, i) => <tr key={i}><td><div className="th">{ci(x.crop)}</div></td><td>{x.crop}</td><td className={x.k === 'ok' ? 'good' : 'bad'}>{D[x.k].n}</td><td>{x.date}</td><td><button className="btn s" onClick={() => c.view(i)}>View</button></td></tr>)}
        {!h.length && <tr><td colSpan="5">No detections yet.</td></tr>}</tbody></table></div>
    </Shell>
  )
}
export function Guide({ c }) {
  const [q, setQ] = useState('')
  return (
    <Shell on="guide" c={c}>
      <div className="top"><div><h1>Crop Guide</h1><p className="sub">Learn about common crops, diseases and how to manage them.</p></div><input placeholder="🔍 Search crops..." style={{ maxWidth: 200 }} value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="crops">{Object.keys(CR).filter((k) => k.toLowerCase().includes(q.toLowerCase())).map((k) =>
        <div className="card crop" key={k} onClick={() => c.go('crop/' + k)}><div className="ci">{ci(k)}</div><b>{k}</b><small>{CR[k]} diseases</small><a style={{ color: 'var(--a)', fontSize: 13 }}>View Details →</a></div>)}</div>
    </Shell>
  )
}
export function Crop({ c }) {
  const k = c.a, ds = Object.keys(D).filter((x) => D[x].c === k)
  return (
    <Shell on="guide" c={c}>
      <h1>{E[k]} {k}</h1><p className="sub">{CR[k] || 0} known diseases</p>
      <div className="card">{ds.length ? ds.map((x) => <div className="row" key={x}><b>{D[x].n}</b><span><a className="btn s" href={'#/disease/' + x}>Details</a></span></div>) : 'Detailed disease information for this crop is coming soon.'}</div><br />
      <a className="btn s" href="#/guide">← Back to Crop Guide</a>
    </Shell>
  )
}
export function Profile({ c }) {
  const m = c.S.me || {}, [n, setN] = useState(m.name || ''), [l, setL] = useState(m.loc || '')
  const save = () => {
    if (c.edit) { const me = { ...m, name: n || m.name, loc: l }; c.upd((s) => ({ me, users: s.users.map((u) => (u.email === me.email ? { ...u, ...me } : u)) })); c.say('Profile saved') }
    c.setEdit(!c.edit)
  }
  return (
    <Shell on="profile" c={c}>
      <div className="top"><h1>Profile Information</h1><button className="btn s" onClick={save}>{c.edit ? 'Save' : 'Edit'}</button></div>
      <div className="card"><div className="pf"><div className="av">{(m.name || '?')[0].toUpperCase()}</div>
        <div>{c.edit ? <input value={n} onChange={(e) => setN(e.target.value)} /> : <h2 style={{ margin: 0 }}>{m.name}</h2>}<small className="good">{m.role}</small><br /><small>{m.email}</small><br /><small>Member since: {m.join}</small></div></div>
        <table><tbody><tr><th>Role</th><td>{m.role}</td></tr><tr><th>Location</th><td>{c.edit ? <input value={l} onChange={(e) => setL(e.target.value)} /> : m.loc || '—'}</td></tr><tr><th>Joined</th><td>{m.join}</td></tr></tbody></table>
        <h3>My Crops</h3><div className="samp">{(m.crops || ['Tomato', 'Potato', 'Wheat', 'Corn']).map((k) => <div className="card crop" style={{ width: 90 }} key={k}><div className="ci" style={{ height: 56 }}>{ci(k)}</div><small>{k}</small></div>)}</div></div>
    </Shell>
  )
}
