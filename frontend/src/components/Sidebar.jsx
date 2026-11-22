import { nav } from '../data/cropData'

export default function Sidebar({ active, onLogout }) {
  return (
    <div className="sb">
      <b>🍃 CropGuard AI</b>
      {nav.map((item) => (
        <a
          key={item[0]}
          href={'#/' + item[0]}
          className={active === item[0] ? 'on' : ''}
        >
          {item[1]} {item[2]}
        </a>
      ))}
      <a className="lo" href="#/login" onClick={onLogout}>⎋ Logout</a>
    </div>
  )
}

export function BottomNav({ active }) {
  return (
    <div className="bn">
      {nav.map((item) => (
        <a
          key={item[0]}
          href={'#/' + item[0]}
          className={active === item[0] ? 'on' : ''}
        >
          <b>{item[1]}</b>{item[2].split(' ')[0]}
        </a>
      ))}
    </div>
  )
}
