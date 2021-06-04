import Link from "next/link";
import { CountryModel } from "../models/types";
import styles from "../styles/components/card.module.scss";

export interface CountryCardProps {
  country: CountryModel;
}

const CountryCard: React.SFC<CountryCardProps> = ({ country }) => {
  return (
    <>
      <div className={styles.card_container}>
        <Link href={{ pathname: "/country" + "/" + country.code }}>
          <a>
            <img
              className={styles.image}
              src={country.flag}
              alt={country.name}
            />

            <h1>{country.name}</h1>
          </a>
        </Link>
        <div className={styles.sub_container}>
          <span>capital: </span>
          <p>{country.capital}</p>
        </div>
        <div className={styles.sub_container}>
          <span>Population: </span>
          <p>{country.population}</p>
        </div>
      </div>
    </>
  );
};

export default CountryCard;
