import { useMemo, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Footer from './components/Footer';

const menuItems = [
  { id: '1', label: 'Головна', link: '#' },
  { id: '2', label: 'Про нас', link: '#' },
  { id: '3', label: 'Послуги', link: '#' },
  { id: '4', label: 'Контакти', link: '#' },
];

const cardItems = [
  {
    id: '1',
    route: 'Київ → Одеса',
    departure: '09:00',
    duration: '5 годин 30 хв',
    price: 350,
    seatsLeft: 3,
    description: 'Комфортний маршрут з кондиціонером та невеликою зупинкою біля Вінниці.',
    isSale: true,
    isNew: false,
  },
  {
    id: '2',
    route: 'Київ → Львів',
    departure: '10:45',
    duration: '6 годин 10 хв',
    price: 420,
    seatsLeft: 5,
    description: 'Швидкий рейс з безкоштовним Wi-Fi та місцем для багажу.',
    isSale: false,
    isNew: true,
  },
  {
    id: '3',
    route: 'Київ → Харків',
    departure: '14:15',
    duration: '6 годин 50 хв',
    price: 390,
    seatsLeft: 2,
    description: 'Надійний маршрут з перевіреним водієм та комфортними сидіннями.',
    isSale: true,
    isNew: true,
  },
  {
    id: '4',
    route: 'Київ → Вінниця',
    departure: '12:30',
    duration: '4 год 20 хв',
    price: 280,
    seatsLeft: 6,
    description: 'Тихий маршрут з гарними краєвидами та зручним графіком.',
    isSale: false,
    isNew: false,
  },
  {
    id: '5',
    route: 'Київ → Чернівці',
    departure: '16:00',
    duration: '7 годин',
    price: 470,
    seatsLeft: 4,
    description: 'Стильний рейс із погодинним оновленням інформації про дорогу.',
    isSale: true,
    isNew: false,
  },
];

const sidebarRoutes = [
  { id: '1', route: 'Київ → Одеса' },
  { id: '2', route: 'Київ → Львів' },
  { id: '3', route: 'Київ → Харків' },
  { id: '4', route: 'Київ → Вінниця' },
  { id: '5', route: 'Київ → Чернівці' },
];

function App() {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [searchFrom, setSearchFrom] = useState('');
  const [searchTo, setSearchTo] = useState('');
  const [filterLabel, setFilterLabel] = useState('');
  const isLoggedIn = true;
  const username = 'Олександра';
  const isOnline = true;

  const filteredRoutes = useMemo(() => {
    const from = searchFrom.trim().toLowerCase();
    const to = searchTo.trim().toLowerCase();

    if (selectedRoute) {
      return cardItems.filter((item) => item.route.toLowerCase().includes(selectedRoute.toLowerCase()));
    }

    if (!from && !to) {
      return cardItems;
    }

    return cardItems.filter((item) => {
      const routeLower = item.route.toLowerCase();
      return (!from || routeLower.includes(from)) && (!to || routeLower.includes(to));
    });
  }, [selectedRoute, searchFrom, searchTo]);

  const handlePopularRouteClick = (route: string) => {
    setSelectedRoute(route);
    setSearchFrom('');
    setSearchTo('');
    setFilterLabel(route);
  };

  const handleSearchClick = () => {
    setSelectedRoute('');
    const searchValue = [searchFrom.trim(), searchTo.trim()].filter(Boolean).join(' ');
    setFilterLabel(searchValue);
  };

  const handleClearSearch = () => {
    setSelectedRoute('');
    setSearchFrom('');
    setSearchTo('');
    setFilterLabel('');
  };

  return (
    <div className="app">
      <Header
        title="Знайди свою поїздку сьогодні"
        menuItems={menuItems}
        isLoggedIn={isLoggedIn}
        username={username}
        isOnline={isOnline}
      />
      <div className="content-wrapper">
        <Sidebar
          links={sidebarRoutes}
          selectedRoute={selectedRoute}
          searchFrom={searchFrom}
          searchTo={searchTo}
          onSelectRoute={handlePopularRouteClick}
          onSearchFromChange={setSearchFrom}
          onSearchToChange={setSearchTo}
          onSearchClick={handleSearchClick}
          onClearSearch={handleClearSearch}
        />
        <Main
          heading="Зручні поїздки по всій Україні 🚗"
          paragraphs={[
            'RideShare - це сучасна платформа для пошуку та бронювання спільних поїздок. Подорожуй комфортно, економ безпечно і екологічно!',
            'Масу доступ до тисяч перевірених водіїв та можеш вибрати маршрут, який найбільше підходить саме тобі. Прозорі ціни без прихованих комісій.',
            'Приєднайся до мільйонів користувачів, які вже довіряють RideShare. Завантажуй додаток прямо зараз і отримай 50 грн бонусів на першу поїздку!',
          ]}
          imageUrl="https://ukrainesolidaritybus.org/wp-content/uploads/2024/10/bus-web.jpg"
          imageAlt="Modern ride sharing app"
          cardItems={filteredRoutes}
          filterLabel={filterLabel}
        />
      </div>
      <Footer author="RideShare Company" email="support@rideshare.ua" />
    </div>
  );
}

export default App;
