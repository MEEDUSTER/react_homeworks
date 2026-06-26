type CardItemProps = {
  route: string;
  departure: string;
  duration: string;
  price: number;
  seatsLeft: number;
  description: string;
  isSale?: boolean;
  isNew?: boolean;
};

function CardItem({
  route,
  departure,
  duration,
  price,
  seatsLeft,
  description,
  isSale = false,
  isNew = false,
}: CardItemProps) {
  return (
    <article className="card-item">
      <div className="card-header">
        <div>
          <h4>{route}</h4>
          <p>{description}</p>
        </div>
        <div className="card-price">{price} грн</div>
      </div>
      <div className="route-meta">
        <span>Відправлення: {departure}</span>
        <span>Тривалість: {duration}</span>
        <span>Місць: {seatsLeft}</span>
      </div>
      <div className="card-badges">
        {isNew && <span className="card-badge new">NEW</span>}
        {isSale && <span className="card-badge sale">SALE</span>}
      </div>
      <button className="card-action-btn">Забронювати</button>
    </article>
  );
}

export default CardItem;
