import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../../components/header";
import { apiCall } from "../../../service/common";
import styles from "../../../styles/CountryDetails.module.scss";
import Loading from "../../../components/Loading";

export const LocationIcon = () => {
  return (
    <svg
      width="13"
      height="20"
      viewBox="0 0 13 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 1.66667C9.09675 1.66667 11.375 3.84833 11.375 6.335C11.375 8.9125 9.34944 12.2783 6.5 16.8858C3.65056 12.2783 1.625 8.9125 1.625 6.335C1.625 3.84833 3.90325 1.66667 6.5 1.66667ZM6.5 0C3.08913 0 0 2.83583 0 6.335C0 9.83333 2.81856 14.01 6.5 20C10.1814 14.01 13 9.83333 13 6.335C13 2.83583 9.91169 0 6.5 0V0ZM6.5 9.16667C5.15369 9.16667 4.0625 8.0475 4.0625 6.66667C4.0625 5.28583 5.15369 4.16667 6.5 4.16667C7.84631 4.16667 8.9375 5.28583 8.9375 6.66667C8.9375 8.0475 7.84631 9.16667 6.5 9.16667Z"
        fill="#5D6970"
      />
    </svg>
  );
};

export const SpecialityIcon = () => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 1.5C13.1355 1.5 16.5 4.8645 16.5 9C16.5 13.1355 13.1355 16.5 9 16.5C4.8645 16.5 1.5 13.1355 1.5 9C1.5 4.8645 4.8645 1.5 9 1.5ZM9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM7.6245 7.2645L4.5 7.69575L6.774 9.88125L6.219 12.9855L9 11.499L11.781 12.9862L11.226 9.882L13.5 7.69575L10.3755 7.2645L9 4.4265L7.6245 7.2645Z"
        fill="#5D6970"
      />
    </svg>
  );
};

export interface CountryDetailsProps {}

const CountryDetails: React.SFC<CountryDetailsProps> = () => {
  const router = useRouter();
  const { country_code } = router.query;

  const [apiError, setApiError] = useState(200);
  const [data, setData] = useState(null);

  const getCountry = async () => {
    const res = await apiCall({
      method: "GET",
      url: `api/country/${country_code}`,
    });
    if (res === "500") {
      setApiError(500);
    } else if (res === "404") {
      setApiError(404);
    } else {
      console.log(res.data);
      setData(res.data[0]);
    }
  };

  useEffect(() => {
    if (!country_code) {
      return;
    } else {
      getCountry();
    }
  }, [router]);

  return (
    <>
      <Head>
        <title> country_code | Country</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {data ? (
        <section className={styles.container}>
          <h3>Country</h3>

          <div className={styles.country_container}>
            <div>
              <img
                alt={`${data.name} Image`}
                src={data.flag}
                className={styles.country_img}
              />
            </div>

            <div className={styles.right_container}>
              <span>{`${data.name}`}</span>
              <p>@{data.code}</p>

              <div className={styles.sub_container}>
                <LocationIcon />
                <span>Region:</span>
                <p>{`${data.region}`}</p>
              </div>

              <div className={styles.sub_container}>
                <SpecialityIcon />
                <span>Capital:</span>
                <p>{data.capital}</p>
              </div>

              <div className={styles.sub_container}>
                <SpecialityIcon />
                <span>Population:</span>
                <p>{data.population}</p>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CountryDetails;
