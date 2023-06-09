import { useEffect, useContext } from "react";
import EventCard from "../Components/EventCard";
import PrimaryButton from "../Components/PrimaryButton";
import SecondaryButton from "../Components/SecondaryButton";
import { SomeContext } from "../SomeContext";
// import {
//   // Instagram,
//   // Twitter,
//   // Facebook,
//   // Youtube,
//   // Tiktok,
//   // GeoAltFill,
// } from "react-bootstrap-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

function HomeView() {
  const concerts = useContext(SomeContext)?.concerts,
    museums = useContext(SomeContext)?.museums,
    activities = useContext(SomeContext)?.activities;

  useEffect(() => {
    console.log(concerts);
  }, [concerts]);

  return (
    <main>
      <ImageDiv>
        <h1>Vad vill du göra ikväll?</h1>
        <DesktopDiv>
          <h3>Aktivitetskalendern nära dig</h3>
          <p>
            Vill du cykla, nätverka eller gå på konsert? Vi samlar alla olika
            evenemang på en och samma plats så att du enkelt kan hitta något som
            passar dig.
          </p>

          <PrimaryButton>
            <Link to="/eventlist">Upptäck alla event</Link>
          </PrimaryButton>
        </DesktopDiv>
      </ImageDiv>
      <div className="main-divs">
        <MobileDiv>
          <h3>Aktivitetskalendern nära dig</h3>
          <p>
            Vill du cykla, nätverka eller gå på konsert? Vi samlar alla olika
            evenemang på en och samma plats så att du enkelt kan hitta något som
            passar dig.
          </p>

          <ButtonDiv>
            <PrimaryButton>
              <Link to="/eventlist">Upptäck alla event</Link>
            </PrimaryButton>

            <SecondaryButton>
              <Link to="/login">Logga in</Link>
            </SecondaryButton>
          </ButtonDiv>
        </MobileDiv>
        <div>
          {concerts && concerts !== undefined && (
            <CategoryDivs>
              <h3>Konserter</h3>
              <EventDiv>
                {concerts.map((event) => (
                  <EventCard eventprop={event} />
                ))}
              </EventDiv>
            </CategoryDivs>
          )}
          {museums && museums !== undefined && (
            <CategoryDivs>
              <h3>Museum</h3>
              <EventDiv>
                {museums.map((event) => (
                  <EventCard eventprop={event} />
                ))}
              </EventDiv>
            </CategoryDivs>
          )}
          {activities && activities !== undefined && (
            <CategoryDivs>
              <h3>Friluftsliv</h3>
              <EventDiv>
                {activities.map((event) => (
                  <EventCard eventprop={event} />
                ))}
              </EventDiv>
            </CategoryDivs>
          )}
        </div>
        <div className="HomeView-desktop-button">
          <PrimaryButton>
            <Link to="/eventlist">Upptäck alla event</Link>
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}

const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 260px;
  background-image: url("images/danny-howe-bn-D2bCvpik-unsplash.jpg");
  background-size: contain;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 260px;
    background-color: #1b1b1bb6;
  }

  h1 {
    z-index: 10;
    width: 70%;
  }

  @media (min-width: 900px) {
    flex-direction: column;
    height: 738px;
    background-repeat: no-repeat;
    background-size: cover;

    &::after {
      height: 100%;
    }

    h1 {
      align-self: center;
      width: 80%;
      z-index: 4;
    }
  }
`;

const DesktopDiv = styled.div`
  display: none;

  @media (min-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 4;

    h3 {
      margin: 71px 0 24px 0;
      color: #f1f1f1;
    }

    p {
      color: #f1f1f1;
      width: 70%;
      text-align: center;
      margin-bottom: 24px !important;
    }
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 116px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const EventDiv = styled.div`
  width: 105%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;

  @media (min-width: 900px) {
    width: 106%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  @media (min-width: 1300px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (min-width: 1400px) {
    width: 102%;
    overflow-x: hidden;
    margin: auto;
    justify-content: space-between;
  }
`;

const MobileDiv = styled.div`
  p {
    width: 95%;
    margin-bottom: 16px !important;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const CategoryDivs = styled.div`
  margin-top: 16px;

  @media (min-width: 900px) {
    h3 {
      margin: 0 0 16px 16px;
    }
  }
`;

export default HomeView;
