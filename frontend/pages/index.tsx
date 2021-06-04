import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import CustomButton from "../components/buttons/button";
import CountryCard from "../components/countryCard";
import { apiCall } from "../service/common";

const Home: React.SFC<{}> = () => {
  const [searchText, setSearchText] = useState("");
  const [apiError, setApiError] = useState(200);
  const [data, setData] = useState(null);

  const handleSearch = () => {
    console.log("search");
  };

  const handleText = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const getCountries = async () => {
      const res = await apiCall({ method: "GET", url: `api/country/` });
      if (res === "500") {
        setApiError(500);
      } else if (res === "404") {
        setApiError(404);
      } else {
        setData(res.data);
      }
    };

    getCountries();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.search_container}>
          <input
            type="text"
            onChange={(event) => handleText(event)}
            className={styles.search_bar}
            value={searchText}
          />
          <CustomButton clickAction={handleSearch}>Search</CustomButton>
        </div>

        <div className={styles.countries_grid}>
          {data?.map((country) => {
            return <CountryCard key={country._id} country={country} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;