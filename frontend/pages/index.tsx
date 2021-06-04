import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import CustomButton from "../components/buttons/button";
import CountryCard from "../components/countryCard";
import { apiCall } from "../service/common";

const Home: React.SFC<{}> = () => {
  const router = useRouter();
  let { search } = router.query;

  const [searchText, setSearchText] = useState("");
  const [apiError, setApiError] = useState(200);
  const [data, setData] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchText.length !== 0) {
      router.push(`?search=${searchText}`);
    }
  };

  const handleText = (event) => {
    setSearchText(event.target.value);
  };

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

  const getSearchCountries = async () => {
    const res = await apiCall({
      method: "GET",
      url: `api/country/search/${search}`,
    });
    if (res === "500") {
      setApiError(500);
    } else if (res === "404") {
      setApiError(404);
    } else {
      setData(res.data);
    }
  };

  useEffect(() => {
    if (!search) {
      getCountries();
      setSearchText("");
      return;
    } else if (Array.isArray(search)) {
      search = search[0];
    }
    setSearchText(search);

    getSearchCountries();
  }, [search]);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleSearch} className={styles.search_container}>
          <input
            type="text"
            onChange={(event) => handleText(event)}
            className={styles.search_bar}
            value={searchText}
          />
          <CustomButton> Search</CustomButton>
        </form>

        <div className={styles.countries_grid}>
          {data?.map((country) => {
            return <CountryCard key={country._id} country={country} />;
          })}
          {data?.length === 0 && (
            <div>
              <p>no country found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
