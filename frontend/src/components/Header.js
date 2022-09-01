import logo from '../images/Logo.svg';

function Header({
  headerButtonText,
  userEmail,
  headerLink,
  onExit,
  })
  {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого" />
      <div className="header__reg-block">
        <h1 className="header__user-email">{userEmail}</h1>
        <a className="header__text" href={headerLink} onClick={onExit}>{headerButtonText}</a>
      </div>
    </header>
  )
}

export default Header;
