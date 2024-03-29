# #newsBuzz

#newsBuzz is an app that collects articles from popular news websites and turns them into hashtags. These hashtags are then stored in a SQL database and displayed on an interactive map, allowing users to see what news is trending in the UK.

Users can zoom in and out of the map to see more or less detail, and can click on individual hashtags to see the corresponding articles. This allows users to quickly and easily stay up-to-date with the latest news from the UK.

![Untitled](https://user-images.githubusercontent.com/54317800/207690300-a155a4a1-eeb6-430d-8700-df4c5a210054.png)

![Untitlred](https://user-images.githubusercontent.com/54317800/207690343-d51212d6-3987-4261-a591-c6c187318319.png)

![image](https://user-images.githubusercontent.com/54317800/207690108-5fe67131-f12a-4379-9dbe-c7a6479e6550.png)

## Getting started
Before you continue with the installation make sure you have: git Node and npm installed on your machine. You should also have PostgreSQL installed.

## Installation
1. Clone the repo
```bash
git clone https://github.com/vadim-nest/Newsbuzz.git
cd Newsbuzz
```

2. For the program to run properly, you need to get an API key from [www.mapbox.com](https://www.mapbox.com/).

   When you get an API key, you need to paste it into Newzbuzz/Client/public/env.js

3. Add the hashtags data from .csv files to the db
```bash
cd server
npm install
npm start
```

You should see the following output in the console:
```
Populating the database:
1/5 - articles table has been populated
2/5 - locations table has been populated
3/5 - hashtags table has been populated
4/5 - occurrences table has been populated
5/5 - sources table has been populated
Server is running in PORT:3000
```

4. Now your server is ready. Open a new terminal and run the client:
```bash
cd client
npm install
npm start
```

### Enjoy!

## Made using:
-  React
-  mapbox (Maps API)
-  Node.js
-  ExpressJS
-  PostgreSQL
-  Sequelize
-  Axios
-  Cheerio
