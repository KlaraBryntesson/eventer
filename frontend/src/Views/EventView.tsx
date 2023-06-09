import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Result } from "../useFetch";
import PrimaryButton from "../Components/PrimaryButton";
import { Clock, ChevronRight, Star, StarFill } from "react-bootstrap-icons";
import styled from "styled-components";

export type Params = {
  eventId: string;
};

export interface MyComponentProps {
  CategoryColor: string;
}

export interface Openhours {
  event_id: Number;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

function EventView() {
  const [event, setEvent] = useState<Result>(),
    [isRotated, setIsRotated] = useState(false),
    [hours, setHours] = useState<Openhours>(),
    [currentHours, setCurrentHours] = useState<string>(""),
    [hasOpenHours, setHasOpenHours] = useState(false),
    [showAllDates, setShowAllDates] = useState(false),
    [isStarClicked, setIsStarClicked] = useState(false),
    currentDay = new Date().getDay(),
    currentWeekday = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][currentDay],
    { eventId } = useParams<Params>();

  useEffect(() => {
    fetch(`/events/${eventId}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setEvent(result);
      });
  }, [eventId]);

  useEffect(() => {
    if (event !== undefined) {
      if (event.openhours === "true") {
        fetch(`/openhours/${event.id}`)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setHours(result);
          });
        setHasOpenHours(true);
      } else if (event.date !== null) {
        setHasOpenHours(true);
      }
    }
  }, [event, currentDay]);

  useEffect(() => {
    if (hours !== undefined) {
      console.log(hours);
      setCurrentHours(String(hours[currentWeekday as keyof Openhours]));
    }
  }, [hours, currentWeekday]);

  useEffect(() => {
    console.log(currentHours);
  }, [currentHours]);

  function handleClick() {
    setIsRotated(!isRotated);
    setShowAllDates(!showAllDates);
  }

  function handleStarClick() {
    setIsStarClicked(!isStarClicked);
  }

  return (
    <main>
      {event !== undefined && (
        <div>
          <ImageDiv>
            <EventImage src={event.image} alt="bild" />
            <h2>{event.name}</h2>
            {!isStarClicked ? (
              <Star className="Bootstrap-star" onClick={handleStarClick} />
            ) : (
              <StarFill className="Bootstrap-star" onClick={handleStarClick} />
            )}
            {event.cost === null && (
              <FreeDiv>
                <p>Gratis</p>
              </FreeDiv>
            )}
          </ImageDiv>
          <div className="main-divs">
            <DesktopDiv>
              <IntroDiv>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
              </IntroDiv>
              <div>
                <EventDivs>
                  <LocationImage src={event.location_image} alt="location" />
                  <div>
                    <CategoryDiv>
                      <CategoryPin
                        CategoryColor={
                          event.category === "Konsert"
                            ? "#8675f1"
                            : event.category === "Museum"
                            ? "#F19075"
                            : "#FDCB08"
                        }
                      />
                      <Paragraphs>{event.category}</Paragraphs>
                    </CategoryDiv>
                    <Paragraphs className="p1">{event.location}</Paragraphs>
                    <Paragraphs className="EventView-grey-p">
                      {event.adress}
                    </Paragraphs>
                  </div>
                </EventDivs>
                {hasOpenHours && (
                  <EventDivs>
                    <Clock className="Bootstrap-icons Bootstrap-clock" />

                    {(currentHours !== "" && (
                      <OpenhoursDiv>
                        <div>
                          <p className="p1">
                            Idag <strong>•</strong> {currentHours}
                          </p>
                          {!showAllDates && (
                            <p className="EventView-grey-p">
                              Visa fler tillfällen
                            </p>
                          )}
                        </div>
                        <ChevronRight
                          style={{
                            cursor: "pointer",
                            transform: isRotated
                              ? "rotate(90deg)"
                              : "rotate(0deg)",
                            transition: "transform 0.3s ease",
                          }}
                          onClick={handleClick}
                        />
                      </OpenhoursDiv>
                    )) ||
                      (event.date !== null && (
                        <div>
                          <p className="p1">{event.date}</p>
                        </div>
                      ))}
                  </EventDivs>
                )}
                {showAllDates && (
                  <div>
                    {hours !== undefined && (
                      <dl>
                        <DottedLine />
                        <ListDiv>
                          <dt>Måndag:</dt>
                          <dd>{hours.monday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Tisdag:</dt>
                          <dd>{hours.tuesday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Onsdag:</dt>
                          <dd>{hours.wednesday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Torsdag:</dt>
                          <dd>{hours.thursday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Fredag:</dt>
                          <dd>{hours.friday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Lördag:</dt>
                          <dd>{hours.saturday}</dd>
                        </ListDiv>
                        <DottedLine />
                        <ListDiv>
                          <dt>Söndag:</dt>
                          <dd>{hours.sunday}</dd>
                        </ListDiv>
                        <DottedLine />
                      </dl>
                    )}
                  </div>
                )}
                {event.cost !== null && (
                  <EventDivs>
                    <CostP className="p1">Pris: {event.cost}</CostP>
                  </EventDivs>
                )}
                {event.link !== null && (
                  <PrimaryButton>
                    <a target="_blank" rel="noreferrer" href={event.link}>
                      Boka biljetter
                    </a>
                  </PrimaryButton>
                )}
              </div>
            </DesktopDiv>
          </div>
        </div>
      )}
    </main>
  );
}

const ImageDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  position: relative;

  h2 {
    display: none;
  }

  @media (min-width: 900px) {
    height: 632px;

    h2 {
      display: block;
      color: #f1f1f1;
      position: absolute;
      bottom: 48px;
      left: 48px;
    }
  }
`;

const EventImage = styled.img`
  width: 100%;
  object-fit: contain;

  @media (min-width: 900px) {
    object-fit: cover;
    height: 100%;
  }
`;

const DesktopDiv = styled.div`
  @media (min-width: 900px) {
    display: flex;
    flex-direction: row;
  }
`;

const IntroDiv = styled.div`
  @media (min-width: 900px) {
    width: 60%;
    margin-right: 64px;
  }
`;

const FreeDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b1b1b;
  color: #f1f1f1;
  border-radius: 10px 0 0 0;
  position: absolute;
  bottom: 0;
  right: 0;
  height: 31px;
  width: 93px;

  @media (min-width: 900px) {
    width: 185px;
    height: 64px;
    border-radius: 10px 10px 0 0;
    right: 48px;

    p {
      font-size: 24px;
      font-weight: bold;
    }
  }
`;

const EventDivs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
`;

const Paragraphs = styled.p`
  margin: 0;
`;

const CostP = styled.p`
  margin-left: 20px !important;
  margin-bottom: 16px !important;
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    text-transform: uppercase;
    font-size: 14px !important;
  }
`;

const CategoryPin = styled.span<MyComponentProps>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.CategoryColor};
  border-radius: 50%;
  margin-right: 8px;
`;

const LocationImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: fill;
  border-radius: 50%;
  margin-right: 24px;
`;

const OpenhoursDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ListDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  margin: auto;
`;

const DottedLine = styled.hr`
  border-top: 1px dotted black;
  margin: 10px 0 10px 0;
`;

export default EventView;
