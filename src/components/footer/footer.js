import "./footer.css";

const AppFooter = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content__logo footer__div">
            <a href="#home"><img src="/images/logo.png" alt="" /></a>
        </div>
        <div className="footer-content__menu footer__div">
            <a href="#home">
              <h3>Главная</h3>
            </a>
            <a href="#catalog">
              <h3>Каталог</h3>
            </a>
            <a href="#reviews">
              <h3>Отзывы</h3>
            </a>
            <a href="#contacts">
              <h3>Контакты</h3>
            </a>
            <a href="#consultation">
              <h3>Консультация</h3>
            </a>
        </div>
        <div className="footer-content__politic footer__div">
        <h3>Политика конфиденциальности</h3>
        <h3>Условия использования</h3>
        <div className="footer__social-media">
            <a href=""><img src="/images/telegram.png" alt="" /></a>
            <a href=""><img src="/images/inst.png" alt="" /></a>
            <img src="/images/facebook.png" alt="" />
        </div>
        </div>
        <div className="footer-content__connection footer__div" >
            <div className="footer_content__connection-mail footer-content__connection-img"><a href="#selection"><img src="/images/chekIcon.png" alt="" /></a><a href="#selection">
              <h3>Получить подбор авто</h3> 
            </a></div>
            <div className="footer_content__connection-phone footer-content__connection-img"> <a href="#contacts"><img src="/images/heloIcon.png" alt="" /></a><a href="#contacts">
              <h3>Связь с экспертом</h3>
            </a></div>
            <div className="footer_content__connection-address footer-content__connection-img"><a href="#advantages"> <img src="/images/achiveIcon.png" alt="" /></a><a href="#advantages">
              <h3>Наши преимущества</h3>
            </a></div>
        </div>
      </div>
    </div>
  );
};
export default AppFooter;
