type MainProps = {
  heading: string;
  paragraphs: string[];
  imageUrl: string;
  imageAlt: string;
};

function Main({ heading, paragraphs, imageUrl, imageAlt }: MainProps) {
  const rides = [
    { id: 1, from: 'Київ', to: 'Одеса', time: '09:00', price: '350 грн', driver: 'Олег П.', rating: 4.9 },
    { id: 2, from: 'Київ', to: 'Львів', time: '10:30', price: '280 грн', driver: 'Марія К.', rating: 4.8 },
    { id: 3, from: 'Київ', to: 'Харків', time: '14:00', price: '200 грн', driver: 'Іван С.', rating: 5.0 },
    { id: 4, from: 'Київ', to: 'Вінниця', time: '16:45', price: '150 грн', driver: 'Крістина М.', rating: 4.7 },
  ];

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

      <h3 style={{marginTop: '32px', marginBottom: '16px'}}>📍 Найближчі поїздки</h3>
      <div className="rides-grid">
        {rides.map((ride) => (
          <div key={ride.id} className="ride-card">
            <div className="ride-header">
              <div className="ride-route">
                <div className="location">{ride.from}</div>
                <div className="arrow">→</div>
                <div className="location">{ride.to}</div>
              </div>
              <div className="ride-price">{ride.price}</div>
            </div>
            <div className="ride-details">
              <div className="detail-row">
                <span>⏰ Час:</span> <strong>{ride.time}</strong>
              </div>
              <div className="detail-row">
                <span>👤 Водій:</span> <strong>{ride.driver}</strong>
              </div>
              <div className="detail-row">
                <span>⭐ Рейтинг:</span> <strong>{ride.rating}</strong>
              </div>
            </div>
            <button className="book-btn">Забронювати</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Main;
