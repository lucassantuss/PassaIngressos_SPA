import BarraPesquisa from "components/BarraPesquisa";

import styles from "./Banner.module.css";

const Banner = ({ title, subtitle, placeholder, urlImage }) => {
  return (
    <div
      className={styles.bannerContainer}
      style={{ backgroundImage: `url(${urlImage})` }}
    >
      <div className={styles.overlayBanner}>
        <h1 className={styles.titleBanner}>{title}</h1>
        <p className={styles.subtitleBanner}>{subtitle}</p>

        <BarraPesquisa placeholder={placeholder} />
      </div>
    </div>
  );
};

export default Banner;