import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Header from "../components/header";
import styles from "../styles/Home.module.scss";
import CustomButton from "../components/buttons/button";
import CountryCard from "../components/countryCard";
import { apiCall } from "../service/common";
import Head from "next/head";
import Select from "react-select";

const regionOptions = [
  { value: "", label: "All" },
  { value: "Americas", label: "Americas" },
  { value: "Polar", label: "Polar" },
  { value: "Africa", label: "Africa" },
  { value: "Oceania", label: "Oceania" },
  { value: "Europe", label: "Europe" },
  { value: "Asia", label: "Asia" },
];

const Home: React.SFC<{}> = () => {
  const router = useRouter();
  let { search, region } = router.query;

  const [searchText, setSearchText] = useState("");
  const [apiError, setApiError] = useState(200);
  const [data, setData] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchText.length !== 0 && currentRegion) {
      router.push(`?search=${searchText}&region=${currentRegion.value}`);
    } else if (searchText.length !== 0) {
      router.push(`?search=${searchText}`);
    }
  };

  const handleText = (event) => {
    setSearchText(event.target.value);
  };

  const handleRegionChange = (selectedOption) => {
    if (selectedOption.value !== "") {
      router.push(`?region=${selectedOption.value}`);
    } else {
      router.push("/");
    }
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

  const getSearchCountries = async (currentRegionObject) => {
    let searchRegion = "";

    if (currentRegionObject && currentRegionObject.value) {
      searchRegion = currentRegionObject.value;
    }
    const res = await apiCall({
      method: "GET",
      url: `api/country/search/${search}?region=${searchRegion}`,
    });
    if (res === "500") {
      setApiError(500);
    } else if (res === "404") {
      setApiError(404);
    } else {
      setData(res.data);
    }
  };

  const getRegionCountries = async () => {
    const res = await apiCall({
      method: "GET",
      url: `api/country/region/${region}`,
    });
    if (res === "500") {
      setApiError(500);
    } else if (res === "404") {
      setApiError(404);
    } else {
      setData(res.data);
    }
  };

  const getRegionObject = (name) => {
    let obj = null;
    regionOptions.forEach(function (item, index) {
      if (item.value === name) {
        obj = item;
      }
    });
    return obj;
  };

  useEffect(() => {
    if (Array.isArray(search)) {
      search = search[0];
    }
    if (Array.isArray(region)) {
      region = region[0];
    }

    if (search && region) {
      const currentRegionObject = getRegionObject(region);
      setCurrentRegion(currentRegionObject);
      setSearchText(search);
      getSearchCountries(currentRegionObject);
    } else if (search) {
      setSearchText(search);
      getSearchCountries(null);
    } else if (region) {
      const currentRegionObject = getRegionObject(region);
      setCurrentRegion(currentRegionObject);
      setSearchText("");
      getRegionCountries();
    } else {
      getCountries();
      setSearchText("");
      setCurrentRegion(null);
    }
  }, [search, region]);

  return (
    <>
      <Head>
        <title>Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <div className={styles.search_container}>
          <div className={styles.search_dropdown}>
            <Select
              instanceId="regionType"
              width="200px"
              value={currentRegion}
              onChange={handleRegionChange}
              options={regionOptions}
            />
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              onChange={(event) => handleText(event)}
              className={styles.search_bar}
              value={searchText}
            />
            <CustomButton> Search</CustomButton>
          </form>
        </div>

        <br />

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
