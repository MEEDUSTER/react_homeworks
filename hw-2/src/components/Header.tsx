type MenuItem = {
  id: string;
  label: string;
  link: string;
};

type HeaderProps = {
  title: string;
  menuItems: MenuItem[];
  isLoggedIn: boolean;
  username: string;
  isOnline: boolean;
};

function Header({ title, menuItems, isLoggedIn, username, isOnline }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">🚗 RideShare</div>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <a key={item.id} href={item.link}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="user-panel">
          <div className="user-status">
            <span className={`status-dot ${isOnline ? 'online' : 'offline'}`} />
            <span>{isOnline ? 'Онлайн' : 'Офлайн'}</span>
          </div>
          {isLoggedIn ? (
            <>
              <span className="welcome">Вітаємо, {username}!</span>
              <button className="login-btn logout-btn">Вийти</button>
            </>
          ) : (
            <button className="login-btn">Увійти</button>
          )}
        </div>
      </div>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
