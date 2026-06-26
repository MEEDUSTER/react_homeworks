type SidebarRoute = {
  id: string;
  route: string;
};

type SidebarProps = {
  links: SidebarRoute[];
  selectedRoute: string;
  searchFrom: string;
  searchTo: string;
  onSelectRoute: (route: string) => void;
  onSearchFromChange: (value: string) => void;
  onSearchToChange: (value: string) => void;
  onSearchClick: () => void;
  onClearSearch: () => void;
};

function Sidebar({
  links,
  selectedRoute,
  searchFrom,
  searchTo,
  onSelectRoute,
  onSearchFromChange,
  onSearchToChange,
  onSearchClick,
  onClearSearch,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <h2>🔍 Фільтри</h2>
      <div className="filter-group">
        <label>Звідки?</label>
        <input
          type="text"
          value={searchFrom}
          onChange={(event) => onSearchFromChange(event.target.value)}
          placeholder="Наприклад: Київ"
        />
      </div>
      <div className="filter-group">
        <label>Куди?</label>
        <input
          type="text"
          value={searchTo}
          onChange={(event) => onSearchToChange(event.target.value)}
          placeholder="Наприклад: Одеса"
        />
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
      <button type="button" className="search-btn" onClick={onSearchClick}>
        Пошук поїздок
      </button>

      <h3 style={{ marginTop: '24px' }}>Популярні маршрути</h3>
      <ul className="popular-routes-list">
        {links.map((link) => (
          <li key={link.id}>
            <button
              type="button"
              className={`popular-route-btn ${selectedRoute === link.route ? 'active' : ''}`}
              onClick={() => onSelectRoute(link.route)}
            >
              {link.route}
            </button>
          </li>
        ))}
      </ul>
      {(selectedRoute || searchFrom || searchTo) && (
        <button type="button" className="clear-route-btn" onClick={onClearSearch}>
          Показати всі маршрути
        </button>
      )}
    </aside>
  );
}

export default Sidebar;
