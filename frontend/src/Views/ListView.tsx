import BigEventCard from "../Components/BigEventCard";
import SearchField from "../Components/SearchField";
import { SomeContext } from "../SomeContext";
import React, { useContext, useEffect, useState } from "react";

import { Sliders, ChevronDown, XLg } from "react-bootstrap-icons";

import styled from "styled-components";
import { Result } from "../useFetch";

function ListView() {
  const cityOptions: string[] = ["Göteborg", "Stockholm", "Malmö"],
    categoryOptions: string[] = ["Konsert", "Museum", "Friluftsliv"],
    [selectedCities, setSelectedCities] = useState<string[]>([]),
    [selectedCategories, setSelectedCategories] = useState<string[]>([]),
    [showPriceCheck, setShowPriceCheck] = useState(false),
    [showFilters, setShowFilters] = useState(false),
    [showCities, setShowCities] = useState(false),
    [showPrice, setShowPrice] = useState(false),
    [showCategory, setShowCategory] = useState(false),
    [isRotatedCity, setIsRotatedCity] = useState(false),
    [isRotatedPrice, setIsRotatedPrice] = useState(false),
    [isRotatedCategory, setIsRotatedCategory] = useState(false),
    eventResult = useContext(SomeContext)?.eventResult,
    filteredEvents = useContext(SomeContext)?.filteredEvents,
    setFilteredEvents = useContext(SomeContext)?.setFilteredEvents;

  useEffect(() => {
    if (filteredEvents) {
      if (filteredEvents?.length < 1 && eventResult) {
        setFilteredEvents?.(eventResult);
        console.log(filteredEvents);
        console.log(eventResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventResult]);

  function filterArrays(arrays: Result[][]) {
    const copyArray = [...arrays[0]];

    const filterArray = copyArray.filter((object) => {
      return arrays.every((array) => array.some((item) => item === object));
    });

    return filterArray;
  }

  useEffect(() => {
    if (eventResult) {
      const originalEvents = eventResult.slice();
      console.log(originalEvents);

      let priceArray: Result[] = showPriceCheck
        ? originalEvents.filter((event) => event.cost === null)
        : originalEvents;

      console.log(selectedCities);

      let citiesArray: Result[] =
        selectedCities.length > 0
          ? originalEvents.filter((event) =>
              selectedCities.includes(event.city)
            )
          : originalEvents;

      let categoriesArray: Result[] =
        selectedCategories.length > 0
          ? originalEvents.filter((event) =>
              selectedCategories.includes(event.category)
            )
          : originalEvents;

      const filteredArray = filterArrays([
        priceArray,
        citiesArray,
        categoriesArray,
      ]);

      console.log(filteredArray);

      setFilteredEvents?.(filteredArray);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCities, selectedCategories, showPriceCheck, eventResult]);

  function handleClick() {
    setShowFilters(!showFilters);
  }

  function handleToggleClick(
    showState: React.Dispatch<React.SetStateAction<boolean>>,
    rotateState: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    return function () {
      showState((prevState: boolean) => !prevState);
      rotateState((prevState: boolean) => !prevState);
    };
  }

  const handleCityClick = handleToggleClick(setShowCities, setIsRotatedCity);
  const handlePriceClick = handleToggleClick(setShowPrice, setIsRotatedPrice);
  const handleCategoryClick = handleToggleClick(
    setShowCategory,
    setIsRotatedCategory
  );

  // function handleCityClick() {
  //   setShowCities(!showCities);
  //   setIsRotatedCity(!isRotatedCity);
  // }

  // function handlePriceClick() {
  //   setShowPrice(!showPrice);
  //   setIsRotatedPrice(!isRotatedPrice);
  // }

  // function handleCategoryClick() {
  //   setShowCategory(!showCategory);
  //   setIsRotatedCategory(!isRotatedCategory);
  // }

  const handleChange = (
    value: string,
    selectedValues: string[],
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selectedValues.some((val) => val === value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  // const handleCityChange = (selectCity: string) => {
  //   if (selectedCities.some((city) => city === selectCity)) {
  //     setSelectedCities(selectedCities.filter((city) => city !== selectCity));
  //   } else {
  //     setSelectedCities([...selectedCities, selectCity]);
  //   }
  // };

  // const handleCategoryChange = (category: string) => {
  //   if (selectedCategories.some((cat) => cat === category)) {
  //     setSelectedCategories(
  //       selectedCategories.filter((cat) => cat !== category)
  //     );
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // };

  return (
    <main className="main-divs">
      <SearchFieldDiv>
        <SearchField />
        {!showFilters ? (
          <Sliders onClick={handleClick} className="Bootstrap-icons" />
        ) : (
          <XLg onClick={handleClick} className="Bootstrap-icons" />
        )}
        {showFilters && (
          <FilterDiv>
            <div>
              <div>
                <p>Stad</p>
                <ChevronDown
                  style={{
                    cursor: "pointer",
                    transform: isRotatedCity
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={handleCityClick}
                />
              </div>
              {showCities && (
                <CheckboxDiv>
                  {cityOptions.map((selectCity: string) => (
                    <label key={selectCity} className="checkbox-label">
                      <input
                        className="checkbox-input"
                        name={selectCity}
                        type="checkbox"
                        checked={selectedCities.some(
                          (city) => city === selectCity
                        )}
                        // onChange={() => handleCityChange(selectCity)}
                        onChange={() =>
                          handleChange(
                            selectCity,
                            selectedCities,
                            setSelectedCities
                          )
                        }
                      />
                      <span className="checkbox-span" />
                      {selectCity}
                    </label>
                  ))}
                </CheckboxDiv>
              )}
            </div>
            <div>
              <div>
                <p>Pris</p>
                <ChevronDown
                  style={{
                    cursor: "pointer",
                    transform: isRotatedPrice
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={handlePriceClick}
                />
              </div>
              {showPrice && (
                <CheckboxDiv>
                  <label className="checkbox-label">
                    <input
                      className="checkbox-input"
                      name="Gratis"
                      type="checkbox"
                      checked={showPriceCheck}
                      onChange={() => setShowPriceCheck(!showPriceCheck)}
                    />
                    <span className="checkbox-span" />
                    Gratis
                  </label>
                </CheckboxDiv>
              )}
            </div>
            <div>
              <div>
                <p>Kategori</p>
                <ChevronDown
                  style={{
                    cursor: "pointer",
                    transform: isRotatedCategory
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                  onClick={handleCategoryClick}
                />
              </div>
              {showCategory && (
                <CheckboxDiv>
                  {categoryOptions.map((category) => (
                    <label key={category} className="checkbox-label">
                      <input
                        className="checkbox-input"
                        name={category}
                        type="checkbox"
                        checked={selectedCategories.some(
                          (cat) => cat === category
                        )}
                        onChange={() =>
                          handleChange(
                            category,
                            selectedCategories,
                            setSelectedCategories
                          )
                        }
                        // onChange={() => handleCategoryChange(category)}
                      />
                      <span className="checkbox-span" />
                      {category}
                    </label>
                  ))}
                </CheckboxDiv>
              )}
            </div>
          </FilterDiv>
        )}
      </SearchFieldDiv>
      <h3>Aktiviteter just nu</h3>
      <ListDiv>
        {filteredEvents?.map((event) => (
          <BigEventCard key={event.id} eventprop={event} />
        ))}
      </ListDiv>
    </main>
  );
}

const SearchFieldDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  position: relative;

  > svg {
    width: 30px;
    height: 30px;
    margin: 0;
  }
`;

const FilterDiv = styled.div`
  top: 60px;
  left: -16px;
  z-index: 8;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: calc(100% + 32px);
  align-items: center;
  padding-bottom: 16px;
  background-color: white;
  border-radius: 0 0 10px 10px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);

  > div {
    display: flex;
    flex-direction: column;
    width: 90%;
  }

  div > div {
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-weight: bold;
  }

  @media (min-width: 900px) {
    left: -48px;
    width: calc(100% + 96px);
    /* flex-direction: row;
    justify-content: space-around;

    > div {
      width: 30%;
    } */
  }
`;

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: column !important;
  align-items: flex-start !important;

  .checkbox-label {
    display: block;
    cursor: pointer;
    position: relative;
    padding-left: 45px;
    margin-bottom: 10px;
  }

  .checkbox-span {
    position: absolute;
    width: 26px;
    height: 26px;
    top: 0;
    left: 5px;
    background-color: #f1f1f1;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .checkbox-label:hover input ~ .checkbox-span {
    background-color: #dfdfdf;
  }

  .checkbox-span:after {
    content: "";
    position: absolute;
    display: none;
  }

  .checkbox-label input:checked ~ .checkbox-span:after {
    display: block;
  }

  .checkbox-label .checkbox-span:after {
    border: solid black;
    border-width: 0 2px 2px 0;
    height: 13px;
    left: 9px;
    top: 5px;
    transform: rotate(45deg);
    width: 7px;
  }

  .checkbox-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }
`;

const ListDiv = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
  }

  @media (min-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 24px;
  }

  @media (min-width: 1400px) {
    gap: 48px;
  }
`;

export default ListView;
