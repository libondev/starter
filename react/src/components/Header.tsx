export default function Header() {
  const navigate = useViewNavigate()

  return (
    <div className="header__container">
      <span>ReactJs - React Router - View Transitions API</span>
      <div className="link__container">
        <button
          onClick={() => { navigate('/') }}
        >
          Home
        </button>
        <button
          onClick={() => { navigate('/download') }}
        >
          Download
        </button>
        <button
          onClick={() => { navigate('/about') }}
        >
          About
        </button>
      </div>
    </div>
  )
}
