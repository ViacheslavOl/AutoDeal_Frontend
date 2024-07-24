import "./advantages.css";

const AppAdvantages = () => {
  return (
    <div id="advantages" className="advantages">
      <div className="advantages-content">
       <h1>Наши преимущества </h1>
       <div className="advantages__parents">
         <div class="advantages-content__grid-container">
          <div class="advantages__grid-item">
            <div className="advantages__grid-item__text-content">
              <h2>Выгодно</h2>
              <p>Благодаря нашим прямым поставкам и налаженным связям с дилерами, мы предлагаем конкурентоспособные цены на все автомобили.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>01</h2>
            </div>
          </div>
          <div class="advantages__grid-item">
            <div className="advantages__grid-item__text-content">
              <h2>Ассортимент</h2>
              <p>Мы предлагаем широкий ассортимент автомобилей из Европы, США и Китая, удовлетворяющий любые предпочтения и бюджеты.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>02</h2>
            </div>
          </div>
          <div class="advantages__grid-item">
            <div  className="advantages__grid-item__text-content">
              <h2>Опыт</h2>
              <p>11 лет на рынке: Мы работаем с 2013 года, предоставляя надежные и качественные услуги по покупке и доставке автомобилей.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>03</h2>
            </div>
          </div>
          <div class="advantages__grid-item">
            <div  className="advantages__grid-item__text-content">
              <h2>Безопасно</h2>
              <p>Мы обеспечиваем быструю и безопасную доставку автомобилей из Европы, США и Китая с минимальными сроками.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>04</h2>
            </div>
          </div>
          <div class="advantages__grid-item">
            <div  className="advantages__grid-item__text-content">
              <h2>С любовью</h2>
              <p>Мы работаем с любовью и вниманием к каждому клиенту, обеспечивая персонализированный сервис и поддержку.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>05</h2>
            </div>
          </div>
          <div class="advantages__grid-item">
            <div  className="advantages__grid-item__text-content">
              <h2>Качество</h2>
              <p>Все автомобили проходят тщательную проверку перед покупкой и доставкой, что гарантирует их высокое качество и надежность.</p>
            </div>
            <div className="advantages__grid-item__number">
              <h2>06</h2>
            </div>
          </div>
             </div>
       </div>
    <div className="advantages__light-container">
          <img className="advantages__light" src="/images/lightOrange.png" alt="" />
        </div>
       
      </div>
    </div>
  );
};

export default AppAdvantages
