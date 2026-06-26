import CardItem from './CardItem';

type CardData = {
  id: string;
  route: string;
  departure: string;
  duration: string;
  price: number;
  seatsLeft: number;
  description: string;
  isSale?: boolean;
  isNew?: boolean;
};

type MainProps = {
  heading: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
  cardItems: CardData[];
  filterLabel: string;
};

function Main({ heading, paragraphs, imageUrl, imageAlt, cardItems, filterLabel }: MainProps) {
  return (
    <main className="main">
      <h2>{heading}</h2>
      <div className="main-image">
        <img src={imageUrl} alt={imageAlt} />
      </div>

      <div className="content-text">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      <div className="search-summary">
        {filterLabel ? (
          <p>
            Показано результати для пошуку <strong>{filterLabel}</strong>.
          </p>
        ) : (
          <p>Виберіть популярний маршрут або введіть напрямок та натисніть пошук.</p>
        )}
      </div>

      <h3>📍 Популярні маршрути</h3>
      <div className="cards-grid">
        {cardItems.length > 0 ? (
          cardItems.map((item) => (
            <CardItem
              key={item.id}
              route={item.route}
              departure={item.departure}
              duration={item.duration}
              price={item.price}
              seatsLeft={item.seatsLeft}
              description={item.description}
              isSale={item.isSale}
              isNew={item.isNew}
            />
          ))
        ) : (
          <div className="no-results">На жаль, за цим маршрутом поки що немає доступних поїздок.</div>
        )}
      </div>
    </main>
  );
}

export default Main;
