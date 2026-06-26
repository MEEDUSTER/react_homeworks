type SidebarLink = {
  label: string;
  href: string;
};

type SidebarProps = {
  links: SidebarLink[];
};

function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>🔍 Фільтри</h2>
      <div className="filter-group">
        <label>Напрямок</label>
        <input type="text" placeholder="Звідки?" />
        <input type="text" placeholder="Куди?" />
      </div>
      <div className="filter-group">
        <label>Дата поїздки</label>
        <input type="date" />
      </div>
      <div className="filter-group">
        <label>Кількість пасажирів</label>
        <select>
          <option>1 пасажир</option>
          <option>2 пасажири</option>
          <option>3 пасажири</option>
          <option>4+ пасажирів</option>
        </select>
      </div>
      <button className="search-btn">Пошук поїздок</button>
      
      <h3 style={{marginTop: '24px'}}>Популярні маршрути</h3>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
