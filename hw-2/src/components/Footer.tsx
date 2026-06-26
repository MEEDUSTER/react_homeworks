type FooterProps = {
  author: string;
  email: string;
};

function Footer({ author, email }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>RideShare</h4>
          <p>Найпопулярніший сервіс пошуку спільних поїздок в Україні</p>
        </div>
        <div className="footer-section">
          <h4>Посилання</h4>
          <ul>
            <li><a href="#">Про сервіс</a></li>
            <li><a href="#">Правила користування</a></li>
            <li><a href="#">Безпека</a></li>
            <li><a href="#">Блог</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Контакти</h4>
          <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
          <p>Телефон: +38 (0) 44 123-45-67</p>
          <p>Адреса: м. Київ, вул. Головна, 1</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 {author}. Всі права захищені.</p>
      </div>
    </footer>
  );
}

export default Footer;
