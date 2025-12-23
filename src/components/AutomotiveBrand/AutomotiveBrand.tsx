import styles from "./AutomotiveBrand.module.scss";
import { audi, bmw, chevrolet, ford, mercedes, nissan, toyota, vw } from "../../assets/car-brands/brand-export";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const BRANDS = [
  { src: bmw, alt: "BMW" },
  { src: mercedes, alt: "Mercedes-Benz" },
  { src: audi, alt: "Audi" },
  { src: nissan, alt: "Nissan" },
  { src: chevrolet, alt: "Chevrolet" },
  { src: vw, alt: "Volkswagen" },
  { src: ford, alt: "Ford" },
  { src: toyota, alt: "Toyota" },
];

const AutomotiveBrand = () => {
  return (
    <section className={styles.brand}>
      <div className={styles.line} />
      <h2 className={styles.title}>Our Partners</h2>
      <h3 className={styles.subtitle}>We work with a wide range of automotive brands worldwide. No matter the brand, we provide solutions that meet manufacturer standards and customer expectations.</h3>
      <div className={styles.container}>
        <Swiper
          className={styles.swiper}
          modules={[Autoplay]}
          loop
          speed={4500}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          allowTouchMove={false}
          spaceBetween={32}
          slidesPerView={6}
          breakpoints={{
            0: { slidesPerView: 3, spaceBetween: 18 },
            700: { slidesPerView: 5, spaceBetween: 24 },
            1024: { slidesPerView: 6, spaceBetween: 32 },
          }}
        >
          {BRANDS.map((b) => (
            <SwiperSlide key={b.alt}>
              <div className={styles.item}>
                <img className={styles.logo} src={b.src} alt={`${b.alt} logo`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default AutomotiveBrand;
