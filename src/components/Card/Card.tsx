import styles from "./Card.module.scss";
import Modal from "../Ui/Modal/Modal";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const images = [
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1617531653520-4893f7bbf978?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&w=1200&q=80",
];

const car = {
  id: "1",
  title: "BMW 3 Series (G20)",
  description: "Verified listing. Detailed inspection available. Contact a consultant to confirm availability, delivery time, and final price.",
  year: "2021",
  mileage: "42,000 km",
  fuel: "Petrol",
  transmission: "Automatic",
  location: "Germany / EU",
  price: "from €24,900",
  vin: "WBA8D9C55JA123456",
  color: "Alpine White",
  owners: "1 owner",
  condition: "In stock",
};

const Card = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFsOpen, setIsFsOpen] = useState(false);

  useEffect(() => {
    if (!isFsOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFsOpen]);

  return (
    <section className={styles.card}>
      <div className={styles.container}>
        <div className={styles.photos}>
          <Swiper
            modules={[Navigation, Pagination, Keyboard, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            keyboard={{ enabled: true }}
            spaceBetween={12}
            slidesPerView={1}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            onSlideChange={(sw: SwiperType) => setActiveIndex(sw.activeIndex)}
            className={styles.swiper}
          >
            {images.map((src) => (
              <SwiperSlide key={src} className={styles.slide}>
                <img className={styles.img} src={src} alt="" onClick={() => setIsFsOpen(true)} />
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper modules={[Thumbs, FreeMode]} onSwiper={setThumbsSwiper} spaceBetween={8} slidesPerView={4} freeMode watchSlidesProgress slideToClickedSlide className={styles.thumbs}>
            {images.map((src) => (
              <SwiperSlide key={`${src}-thumb`} className={styles.thumbSlide}>
                <img className={styles.thumbImg} src={src} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
          <Modal open={isFsOpen} onOpenChange={setIsFsOpen} contentClassName={styles.galleryModalContent} bodyClassName={styles.galleryModalBody} closeClassName={styles.galleryClose}>
            <Swiper modules={[Navigation, Pagination, Keyboard]} navigation pagination={{ clickable: true }} keyboard={{ enabled: true }} initialSlide={activeIndex} spaceBetween={12} slidesPerView={1} className={styles.fsSwiper}>
              {images.map((src) => (
                <SwiperSlide key={`${src}-fs`} className={styles.fsSlide}>
                  <img className={styles.fsImg} src={src} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </Modal>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{car.title}</h1>
              <span className={styles.status}>{car.condition}</span>
            </div>

            <p className={styles.desc}>{car.description}</p>

            <div className={styles.chips}>
              <span className={styles.chip}>Verified</span>
              <span className={styles.chip}>Inspection available</span>
              <span className={styles.chip}>EU delivery</span>
            </div>
          </div>

          <div className={styles.specs}>
            <h2 className={styles.blockTitle}>Specifications</h2>

            <div className={styles.specGrid}>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Year</span>
                <span className={styles.specValue}>{car.year}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Mileage</span>
                <span className={styles.specValue}>{car.mileage}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Fuel</span>
                <span className={styles.specValue}>{car.fuel}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>{car.transmission}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Location</span>
                <span className={styles.specValue}>{car.location}</span>
              </div>

              <div className={styles.specRow}>
                <span className={styles.specLabel}>Color</span>
                <span className={styles.specValue}>{car.color}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>Owners</span>
                <span className={styles.specValue}>{car.owners}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specLabel}>VIN</span>
                <span className={styles.specValueMono}>{car.vin}</span>
              </div>
            </div>
          </div>

          <div className={styles.purchase}>
            <div className={styles.priceRow}>
              <div className={styles.priceLabel}>Price</div>
              <div className={styles.price}>{car.price}</div>
            </div>

            <div className={styles.actions}>
              <button className={styles.btnPrimary} type="button">
                Get consultation
              </button>
              <button className={styles.btnGhost} type="button">
                Request inspection report
              </button>
            </div>

            <div className={styles.note}>Usually replies within 15–30 minutes during working hours.</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
