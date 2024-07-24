import "./brands.css";

const AppBrands = () => {
  return (
    <div className="brands">
    <div className="brands-orangLine"></div>
      <div className="brands-content">
        <p>Работаем с более чем 100 брендами по всему миру</p>
        <div className="brands-content__logo">
  <div><img className="bmw"  src="/images/bmw.jpg" alt="" /></div>
  <div><img className="merc" src="/images/mercedesImg.png" alt="" /></div>
  <div><img className="audi" src="/images/audiImg.png" alt="" /></div>
  <div><img className="niss" src="/images/nissanImg.png" alt="" /></div>
  <div><img className="chev" src="/images/chevroImg.png" alt="" /></div>
  <div><img className="wolc" src="/images/wolcImg.jpg" alt="" /></div>
  <div className="ford__div"><img className="ford" src="/images/fordImg.png" alt="" /></div>
  <div className="toyo__div"><img className="toyo" src="/images/toyotaImg.png" alt="" /></div>
        </div>
      </div>
    </div>
  );
};

export default AppBrands;
