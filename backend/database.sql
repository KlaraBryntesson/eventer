DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS museums;
DROP TABLE IF EXISTS activities;

 CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  id_name TEXT UNIQUE NOT NULL,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  city TEXT NOT NULL,
  adress TEXT,
  cost TEXT,
  link TEXT,
  date TEXT,
  image TEXT,
  location_image TEXT);

  -- ----KONSERTER-------

  INSERT INTO events (name, id_name, description, category, location, city, adress, cost, link, date) VALUES ('Laleh', 'laleh', 'Laleh ger sig ut på en sommarturné som tar avstamp i Helsingborg 28 juli och avslutas i barndomsstaden Göteborg på anrika Ullevi där hon i somras gjorde en exklusiv hyllad spelning. Det blir den perfekta finalen på sommaren innan det är dags att gå tillbaka till jobbet, skolan eller studierna. Sittande publik, ingen åldersgräns – det blir en fantastisk upplevelse för såväl unga som gamla fans.
', 'Konsert', 'Ullevi', 'Göteborg', 'Ullevigatan 411 40, Göteborg', '325-600kr ', 'https://www.ticketmaster.se/event/laleh-biljetter/627929', 'Lördag 26 Augusti 2023, 19.30');

  INSERT INTO events (name, id_name, description, category, location, city, adress, cost, link, date) VALUES ('Hans Zimmer', 'hanszimmer', 'Kraftfullt. Vackert. Dramatiskt. Starkt. Berörande. Allt det och mycket mer är den tvåfaldiga Oscarsvinnaren Hans Zimmers musik. 2024 får hans succéshow The World of Hans Zimmer nytt liv. Den nya föreställningen heter The World of Hans Zimmer – A New Dimension. Med över 30 konserter i 13 olika länder kommer turnén att kunna upplevas över hela Europa. Den enda chansen att se The World of Hans Zimmer – A New Dimension i Sverige blir på Scandinavium i Göteborg 9 maj 2024.
', 'Konsert', 'Scandinavium', 'Göteborg', 'Valhallagatan 1, 41 251 Göteborg ', '755 - 1075kr', 'https://www.ticketmaster.se/event/the-world-of-hans-zimmer-a-new-dimension-biljetter/638225', 'Torsdag 9 maj, 2024, 20.00');

  INSERT INTO events (name, id_name, description, category, location, city, adress, cost, link, date) VALUES ('Gyllene Tider', 'gyllenetider', 'Vissa förhållanden är för dyrbara att ge upp. Som den till synes rostfria kärleksrelationen mellan Gyllene Tider och deras hängivna publik. Under mer än 40 år har Halmstad-gruppen fortsatt att locka lyssnare – nya som gamla – med sin stora låtskatt och sina omtalade konserter. En bedrift som saknar motstycke i svensk pophistoria. Nästa år återvänder Gyllene Tider för att ännu en gång sätta guldkant på den svenska sommaren. Den omfattande sommarturnén heter ”Hux Flux”.
', 'Konsert', 'Ullevi', 'Göteborg', 'Ullevigatan 411 40, Göteborg', '795-1095kr', 'https://www.ticketmaster.se/event/gyllene-tider-hux-flux-sommarturne-2023-biljetter/627189', 'Lördag 5 Augusti 2023, 20.00');

 -- ----MUSEUM-------

  INSERT INTO events (name, id_name, description, category, location, city, adress) VALUES ('Naturhistoriska', 'naturhistoriska', 'Göteborgs Naturhistoriska museum är ett naturhistoriskt museum, beläget på en höjd i Slottsskogen alldeles ovanför Linnéplatsen, en höjd som tidigare kallats Olivedalshöjden eller Ekebacken.
', 'Museum', 'Göteborgs Naturhistoriska museum', 'Göteborg', 'Museivägen 10, Göteborg');

  INSERT INTO events (name, id_name, description, category, location, city, adress) VALUES ('Konstmuseet', 'konstmuseet', 'Göteborgs Konstmuseum är en framstående konstinstitution belägen i Göteborgs centrum. Museet är känt för sin imponerande samling av modern och samtida konst, som sträcker sig från 1800-talets mästerverk till nutida verk.
', 'Museum', 'Göteborgs Konstmuseum', 'Göteborg', 'Götaplatsen 412 56, Göteborg');

  INSERT INTO events (name, id_name, description, category, location, city, adress) VALUES ('Göteborgs Konsthall', 'göteb orgskonsthall', 'Göteborgs konsthall är inrymd i en klassicistisk byggnad från 1923 som ligger vid Götaplatsen i centrala Göteborg. På Göteborgs konsthall står samtidskonsten i centrum. Här visas grupp- och soloutställningar med svenska och internationella konstnärer som visar på mångfalden inom den samtida konsten.
', 'Museum', 'Göteborgs Konsthall', 'Göteborg', 'Götaplatsen 10, 412 56, Göteborg');

 -- ----FRILUFTSLIV-------

  INSERT INTO events (name, id_name, description, category, city) VALUES ('Bouldering', 'bouldering', 'Hönö, beläget i Göteborgs norra skärgård, är en populär destination för klättringsentusiaster och erbjuder utmärkta möjligheter för bouldering. Hönö har flera fantastiska boulderingområden som lockar klättrare från när och fjärran. Ett av de mest kända områdena är Källviken, som har ett varierat utbud av klätterproblem för alla nivåer, från nybörjare till mer erfarna klättrare
', 'Friluftsliv', 'Hönö');

  INSERT INTO events (name, id_name, description, category, city) VALUES ('Paddla kanot', 'paddla', 'Önnered är ett vackert område beläget i Göteborgs södra delar, vid kusten mot västerhavet. Med sin pittoreska skärgårdsatmosfär och omgivande natur är det en populär destination för paddling och andra vattensportaktiviteter.
', 'Friluftsliv', 'Önnered');

  INSERT INTO events (name, id_name, description, category, city) VALUES ('Höghöjdsbana', 'höghöjdsbana', 'Få lite äventyr i vardagen! Äventyr uppe bland trädtopparna på banor och ziplinor med olika svårighetsgrad. De stora höghöjdsbanorna har åldersgränser runt 12 år men det brukar även finnas mindre banor i anslutning för barn från ca 7-8 år.
', 'Friluftsliv', 'Mölndal');


  INSERT INTO events (name, id_name, description, category, location, city, cost, first, last) VALUES ('Art Exhibition', 'artexhibition', 'Discover a collection of contemporary art installations.', 'Museum', 'Konstmuseet', 'Göteborg', 'från 120:-', '2023-06-15', '2023-09-20');

  -- INSERT INTO accounts (email, password) VALUES ('klara@hotmail.com', 'secret');


CREATE TABLE openhours (
  event_id INTEGER,
  monday TEXT NOT NULL,
  tuesday TEXT NOT NULL,
  wednesday TEXT NOT NULL,
  thursday TEXT NOT NULL,
  friday TEXT NOT NULL,
  saturday TEXT NOT NULL,
  sunday TEXT NOT NULL,
  FOREIGN KEY (event_id) REFERENCES events(id)
);

  INSERT INTO activities (name, description, category, adress, city)
  VALUES ("Bouldering", "Hönö, beläget i Göteborgs norra skärgård, är en populär destination för klättringsentusiaster och erbjuder utmärkta möjligheter för bouldering. Hönö har flera fantastiska boulderingområden som lockar klättrare från när och fjärran. Ett av de mest kända områdena är Källviken, som har ett varierat utbud av klätterproblem för alla nivåer, från nybörjare till mer erfarna klättrare
", "friluftsliv", "En adress", "Hönö");
