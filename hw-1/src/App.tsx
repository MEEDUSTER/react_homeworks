import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header title="Знайди свою поїздку сьогодні" />
      <div className="content-wrapper">
        <Sidebar links={[
          { label: 'Київ → Одеса', href: '#' },
          { label: 'Київ → Львів', href: '#' },
          { label: 'Київ → Харків', href: '#' },
          { label: 'Київ → Вінниця', href: '#' },
        ]} />
        <Main
          heading="Зручні поїздки по всій Україні 🚗"
          paragraphs={[
            'RideShare - це сучасна платформа для пошуку та бронювання спільних поїздок. Подорожуй комфортно, економ безпечно і екологічно!',
            'Масу доступ до тисяч перевірених водіїв та можеш вибрати маршрут, який найбільше підходить саме тобі. Прозорі ціни без прихованих комісій.',
            'Приєднайся до мільйонів користувачів, які вже довіряють RideShare. Завантажуй додаток прямо зараз і отримай 50 грн бонусів на першу поїздку!',
          ]}
          imageUrl="https://ukrainesolidaritybus.org/wp-content/uploads/2024/10/bus-web.jpg"
          imageAlt="Modern ride sharing app"
        />
      </div>
      <Footer author="RideShare Company" email="support@rideshare.ua" />
    </div>
  );
}

export default App;
