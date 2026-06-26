type HeaderProps = {
  title: string;
};

function Header({ title }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">🚗 RideShare</div>
        <nav className="nav-menu">
          <a href="#">Головна</a>
          <a href="#">Знайти поїздку</a>
          <a href="#">Стати водієм</a>
          <a href="#">Про нас</a>
          <a href="#">Контакти</a>
        </nav>
        <button className="login-btn">Вход</button>
      </div>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
