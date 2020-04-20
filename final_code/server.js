const express = require('express');
const app = express();
const request = require('request');
const FORECAST_API_KEY = "7799d76f81b86b1da2e04b1123863bc5";
const GOOGLE_API_KEY = "AIzaSyCxqHnMc1INl6YR2JomYFLcIm5KmFsVm1o";
// const CUSTOM_SEARCH_API_KEY = "AIzaSyCxqHnMc1INl6YR2JomYFLcIm5KmFsVm1o";
// const CX = "002822165128262067703:hx6l2c5khvz";
const CUSTOM_SEARCH_API_KEY = "AIzaSyA7tBKELLkoZi00WcFovv4c9k7lU72wrK4";
const CX = "002822165128262067703:0swuij81sp5";

// https://www.googleapis.com/customsearch/v1?q=seattle&cx=002822165128262067703:0swuij81sp5&num=8&searchType=image&key=AIzaSyA7tBKELLkoZi00WcFovv4c9k7lU72wrK4
// const __dirname = 'dist/forecast';
// app.use(express.static(__dirname));

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type ,Accept , Authorization");
    response.setHeader("Acces-Control-Allow-Methods", "GET , POST , PATCH , DELETE ,PUT, OPTIONS");
    next();
});

app.get('/', (req, res) => {
    res.send("Works fine");
    // res.send({"lat":34.03165,"lng":-118.285245,"stateAbbreviation":"CA"});
});

app.get('/photos', (req, res) => {
    let city = encodeURI(req.query.city);
    let url = `https://www.googleapis.com/customsearch/v1?q=${city}&cx=${CX}&num=8&searchType=image&key=${CUSTOM_SEARCH_API_KEY}`;
    
    callAPI(url, (responseData) => {
        let imgUrls = [];
        if ( responseData.hasOwnProperty('error')) {
            res.status(500).send();
        } else {
            res.send({"photos":responseData});
        }
    });

    let obj = 
    {"kind": "customsearch#search",
  "url": {
    "type": "application/json",
    "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
  },
  "queries": {
    "request": [
      {
        "title": "Google Custom Search - seattle",
        "totalResults": "1230000000",
        "searchTerms": "seattle",
        "count": 8,
        "startIndex": 1,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "002822165128262067703:0swuij81sp5",
        "searchType": "image"
      }
    ],
    "nextPage": [
      {
        "title": "Google Custom Search - seattle",
        "totalResults": "1230000000",
        "searchTerms": "seattle",
        "count": 8,
        "startIndex": 9,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "002822165128262067703:0swuij81sp5",
        "searchType": "image"
      }
    ]
  },
  "context": {
    "title": "HW9"
  },
  "searchInformation": {
    "searchTime": 0.253614,
    "formattedSearchTime": "0.25",
    "totalResults": "1230000000",
    "formattedTotalResults": "1,230,000,000"
  },
  "items": [
    {
      "kind": "customsearch#result",
      "title": "Seattle - Wikipedia",
      "htmlTitle": "<b>Seattle</b> - Wikipedia",
      "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Seattle_Kerry_Park_Skyline.jpg/1200px-Seattle_Kerry_Park_Skyline.jpg",
      "displayLink": "en.wikipedia.org",
      "snippet": "Seattle - Wikipedia",
      "htmlSnippet": "<b>Seattle</b> - Wikipedia",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://en.wikipedia.org/wiki/Seattle",
        "height": 600,
        "width": 1200,
        "byteSize": 164548,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtip3l2GGJwXXRuSkd5henlxLWCodYCum7yhjZaXb6xnLwvMfGao8IkRdB&s",
        "thumbnailHeight": 75,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Seattle Travel Guide",
      "htmlTitle": "<b>Seattle</b> Travel Guide",
      "link": "https://www.nationalgeographic.com/content/dam/travel/Guide-Pages/north-america/seattle-travel.adapt.1900.1.jpg",
      "displayLink": "www.nationalgeographic.com",
      "snippet": "Seattle Travel Guide",
      "htmlSnippet": "<b>Seattle</b> Travel Guide",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://www.nationalgeographic.com/travel/destinations/north-america/united-states/washington/seattle/",
        "height": 1259,
        "width": 1900,
        "byteSize": 349618,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdyV0DhUUFDe1MRalB_WQQYxC1GG0S5eo9JWZiN6Fcbe6y6nrzcmIpJhLy&s",
        "thumbnailHeight": 99,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Seattle - Wikipedia",
      "htmlTitle": "<b>Seattle</b> - Wikipedia",
      "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Seattle_Kerry_Park_Skyline.jpg/280px-Seattle_Kerry_Park_Skyline.jpg",
      "displayLink": "en.wikipedia.org",
      "snippet": "Seattle - Wikipedia",
      "htmlSnippet": "<b>Seattle</b> - Wikipedia",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://en.wikipedia.org/wiki/Seattle",
        "height": 140,
        "width": 280,
        "byteSize": 11947,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0xnK0qQjRnsyGyt4ZVr6mmEDlnoIZg-SSSq2cs0f2zKZ1gmKS4Fd9rA&s",
        "thumbnailHeight": 57,
        "thumbnailWidth": 114
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Seattle | Geography, History, & Points of Interest | Britannica",
      "htmlTitle": "<b>Seattle</b> | Geography, History, &amp; Points of Interest | Britannica",
      "link": "https://cdn.britannica.com/41/41341-050-1C78C21D/Seattle-background-Mount-Rainier.jpg",
      "displayLink": "www.britannica.com",
      "snippet": "Seattle | Geography, History, & Points of Interest | Britannica",
      "htmlSnippet": "<b>Seattle</b> | Geography, History, &amp; Points of Interest | Britannica",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://www.britannica.com/place/Seattle-Washington",
        "height": 1389,
        "width": 1600,
        "byteSize": 514521,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyE2Anbnr7MZOaJvsEJVTJLWn298WZfgWlXgVTEeGdEIflIUF47uRcXF0k9Q&s",
        "thumbnailHeight": 130,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Seattle Travel Guide | Marriott Bonvoy Traveler",
      "htmlTitle": "<b>Seattle</b> Travel Guide | Marriott Bonvoy Traveler",
      "link": "https://traveler.marriott.com/wp-content/uploads/2019/08/GI_157380908_SeattleNeighborhoods.jpg",
      "displayLink": "traveler.marriott.com",
      "snippet": "Seattle Travel Guide | Marriott Bonvoy Traveler",
      "htmlSnippet": "<b>Seattle</b> Travel Guide | Marriott Bonvoy Traveler",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://traveler.marriott.com/seattle/",
        "height": 960,
        "width": 1920,
        "byteSize": 491981,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS42etD7UcVv0VAaCeFUvedAmNAGWSL7xU9MCECOBsQA-eyrtvhzz2bslv0&s",
        "thumbnailHeight": 75,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Why Seattle Has the Third-Most Expensive Housing in the US - Slog ...",
      "htmlTitle": "Why <b>Seattle</b> Has the Third-Most Expensive Housing in the US - Slog ...",
      "link": "https://media2.fdncms.com/stranger/imager/u/large/31559996/1535587014-gettyimages-687610952.jpg",
      "displayLink": "www.thestranger.com",
      "snippet": "Why Seattle Has the Third-Most Expensive Housing in the US - Slog ...",
      "htmlSnippet": "Why <b>Seattle</b> Has the Third-Most Expensive Housing in the US - Slog ...",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://www.thestranger.com/slog/2018/08/29/31554953/why-seattle-has-the-third-most-expensive-housing-in-the-us",
        "height": 467,
        "width": 700,
        "byteSize": 88417,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIG2Cid606oX3W311ntkJOe74q9p_XiHsEv3L3kb6tPJG0qhHxg5xE2js&s",
        "thumbnailHeight": 93,
        "thumbnailWidth": 140
      }
    },
    {
      "kind": "customsearch#result",
      "title": "Seattle braces for highway closure, historic traffic squeeze | The ...",
      "htmlTitle": "<b>Seattle</b> braces for highway closure, historic traffic squeeze | The ...",
      "link": "https://media.spokesman.com/photos/2019/01/09/Seattle_Traffic_Squeeze.JPG.jpg",
      "displayLink": "www.spokesman.com",
      "snippet": "Seattle braces for highway closure, historic traffic squeeze | The ...",
      "htmlSnippet": "<b>Seattle</b> braces for highway closure, historic traffic squeeze | The ...",
      "mime": "image/jpeg",
      "image": {
        "contextLink": "https://www.spokesman.com/stories/2019/jan/09/seattle-braces-for-highway-closure-historic-traffi/",
        "height": 3373,
        "width": 5315,
        "byteSize": 2731378,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgB2yiw_Qawew2t-7RNd3n0GPvV__jcgFvjPjGW-2zea623PNlvISxxiqJ&s",
        "thumbnailHeight": 95,
        "thumbnailWidth": 150
      }
    },
    {
      "kind": "customsearch#result",
      "title": "The Best Seattle Hotels",
      "htmlTitle": "The Best <b>Seattle</b> Hotels",
      "link": "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F1156922779%2F960x0.jpg%3Ffit%3Dscale",
      "displayLink": "www.forbes.com",
      "snippet": "The Best Seattle Hotels",
      "htmlSnippet": "The Best <b>Seattle</b> Hotels",
      "mime": "image/",
      "image": {
        "contextLink": "https://www.forbes.com/sites/micahsolomon/2019/07/10/the-best-seattle-hotels-2019/",
        "height": 640,
        "width": 960,
        "byteSize": 86292,
        "thumbnailLink": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwMLodd-QhIBmnu_nQeUW-RLJ1WgHVQFMwBAhfxMBFSo2cF_wF5yjp9xg&s",
        "thumbnailHeight": 99,
        "thumbnailWidth": 148
      }
    }
  ]}
    // res.send({"photos":obj});

    
});

app.get('/location', (req, res) => {

    let city = encodeURI(req.query.city);
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`
    callAPI(url, (responseData) => {

        if (responseData['results'] == "error") {
            res.status(500).send();
        } else {
            // responseData['results'][0]['geometry']['location']['stateAbbreviation'] = responseData['results'][0]['address_components'][5]['short_name'];
            res.send(responseData['results'][0]['geometry']['location']);
        }
    });
    // res.send({"lat":34.03165,"lng":-118.285245});
});

app.get('/forecast', (req, res) => {
    let latitude = encodeURI(req.query.latitude);
    let longitude = encodeURI(req.query.longitude);
    
    let url = `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${latitude},${longitude}`;
    
    let obj = {
  "latitude": 34.0322,
  "longitude": -118.2836,
  "timezone": "America/Los_Angeles",
  "currently": {
    "time": 1574647669,
    "summary": "Clear",
    "icon": "clear-night",
    "nearestStormDistance": 202,
    "nearestStormBearing": 312,
    "precipIntensity": 0,
    "precipProbability": 0,
    "temperature": 62.79,
    "apparentTemperature": 62.79,
    "dewPoint": 44.21,
    "humidity": 0.51,
    "pressure": 1015.6,
    "windSpeed": 3.83,
    "windGust": 7.28,
    "windBearing": 340,
    "cloudCover": 0,
    "uvIndex": 0,
    "visibility": 5.797,
    "ozone": 278.5
  },
  "minutely": {
    "summary": "Clear for the hour.",
    "icon": "clear-night",
    "data": [
      {
        "time": 1574647620,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647680,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647740,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647800,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647860,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647920,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574647980,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648040,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648100,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648160,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648220,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648280,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648340,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648400,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648460,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648520,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648580,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648640,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648700,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648760,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648820,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648880,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574648940,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649000,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649060,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649120,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649180,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649240,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649300,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649360,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649420,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649480,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649540,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649600,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649660,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649720,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649780,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649840,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649900,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574649960,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650020,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650080,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650140,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650200,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650260,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650320,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650380,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650440,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650500,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650560,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650620,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650680,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650740,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650800,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650860,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650920,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574650980,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574651040,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574651100,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574651160,
        "precipIntensity": 0,
        "precipProbability": 0
      },
      {
        "time": 1574651220,
        "precipIntensity": 0,
        "precipProbability": 0
      }
    ]
  },
  "hourly": {
    "summary": "Clear throughout the day.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1574647200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 63.08,
        "apparentTemperature": 63.08,
        "dewPoint": 44,
        "humidity": 0.5,
        "pressure": 1015.5,
        "windSpeed": 3.97,
        "windGust": 7.5,
        "windBearing": 339,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 5.955,
        "ozone": 278.4
      },
      {
        "time": 1574650800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 61.24,
        "apparentTemperature": 61.24,
        "dewPoint": 44.94,
        "humidity": 0.55,
        "pressure": 1015.6,
        "windSpeed": 3.23,
        "windGust": 6.72,
        "windBearing": 333,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 6.294,
        "ozone": 279.1
      },
      {
        "time": 1574654400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.96,
        "apparentTemperature": 60.96,
        "dewPoint": 44.8,
        "humidity": 0.55,
        "pressure": 1015.9,
        "windSpeed": 3.47,
        "windGust": 6.96,
        "windBearing": 297,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 278.9
      },
      {
        "time": 1574658000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.43,
        "apparentTemperature": 60.43,
        "dewPoint": 43.86,
        "humidity": 0.54,
        "pressure": 1016.3,
        "windSpeed": 3.79,
        "windGust": 6.41,
        "windBearing": 274,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 278.4
      },
      {
        "time": 1574661600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 59.06,
        "apparentTemperature": 59.06,
        "dewPoint": 42.84,
        "humidity": 0.55,
        "pressure": 1016.1,
        "windSpeed": 3.35,
        "windGust": 4.82,
        "windBearing": 9,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 277.5
      },
      {
        "time": 1574665200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 57.98,
        "apparentTemperature": 57.98,
        "dewPoint": 42.46,
        "humidity": 0.56,
        "pressure": 1015.7,
        "windSpeed": 3.47,
        "windGust": 3.86,
        "windBearing": 37,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 276.3
      },
      {
        "time": 1574668800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56.94,
        "apparentTemperature": 56.94,
        "dewPoint": 42.92,
        "humidity": 0.59,
        "pressure": 1015.3,
        "windSpeed": 3.49,
        "windGust": 4.3,
        "windBearing": 46,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 275.1
      },
      {
        "time": 1574672400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56,
        "apparentTemperature": 56,
        "dewPoint": 42.57,
        "humidity": 0.61,
        "pressure": 1015.2,
        "windSpeed": 3.62,
        "windGust": 4.86,
        "windBearing": 53,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 274.5
      },
      {
        "time": 1574676000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 55.38,
        "apparentTemperature": 55.38,
        "dewPoint": 41.68,
        "humidity": 0.6,
        "pressure": 1014.9,
        "windSpeed": 3.74,
        "windGust": 5.06,
        "windBearing": 52,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 275.3
      },
      {
        "time": 1574679600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.79,
        "apparentTemperature": 54.79,
        "dewPoint": 41.06,
        "humidity": 0.6,
        "pressure": 1014.6,
        "windSpeed": 3.72,
        "windGust": 5.36,
        "windBearing": 61,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 276.8
      },
      {
        "time": 1574683200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.43,
        "apparentTemperature": 54.43,
        "dewPoint": 41.11,
        "humidity": 0.61,
        "pressure": 1013.9,
        "windSpeed": 3.93,
        "windGust": 5.89,
        "windBearing": 66,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 278.3
      },
      {
        "time": 1574686800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 53.78,
        "apparentTemperature": 53.78,
        "dewPoint": 42.13,
        "humidity": 0.65,
        "pressure": 1014,
        "windSpeed": 4.05,
        "windGust": 6.16,
        "windBearing": 61,
        "cloudCover": 0.05,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 279.6
      },
      {
        "time": 1574690400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 53.2,
        "apparentTemperature": 53.2,
        "dewPoint": 43.22,
        "humidity": 0.69,
        "pressure": 1013.8,
        "windSpeed": 4.22,
        "windGust": 5.94,
        "windBearing": 59,
        "cloudCover": 0.1,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 280.9
      },
      {
        "time": 1574694000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 53.25,
        "apparentTemperature": 53.25,
        "dewPoint": 43.93,
        "humidity": 0.71,
        "pressure": 1013.9,
        "windSpeed": 4.32,
        "windGust": 5.77,
        "windBearing": 60,
        "cloudCover": 0.14,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 282.1
      },
      {
        "time": 1574697600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56.05,
        "apparentTemperature": 56.05,
        "dewPoint": 44.28,
        "humidity": 0.65,
        "pressure": 1013.8,
        "windSpeed": 3.73,
        "windGust": 5.99,
        "windBearing": 88,
        "cloudCover": 0.22,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 284.1
      },
      {
        "time": 1574701200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0005,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 59.32,
        "apparentTemperature": 59.32,
        "dewPoint": 45.13,
        "humidity": 0.59,
        "pressure": 1013.7,
        "windSpeed": 3.58,
        "windGust": 6.9,
        "windBearing": 129,
        "cloudCover": 0.23,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 286.1
      },
      {
        "time": 1574704800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0002,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 62.06,
        "apparentTemperature": 62.06,
        "dewPoint": 46.14,
        "humidity": 0.56,
        "pressure": 1013.4,
        "windSpeed": 3.9,
        "windGust": 7.71,
        "windBearing": 153,
        "cloudCover": 0.21,
        "uvIndex": 2,
        "visibility": 10,
        "ozone": 287.1
      },
      {
        "time": 1574708400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 63.79,
        "apparentTemperature": 63.79,
        "dewPoint": 47.38,
        "humidity": 0.55,
        "pressure": 1012.3,
        "windSpeed": 5.18,
        "windGust": 8.44,
        "windBearing": 176,
        "cloudCover": 0.18,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 285.8
      },
      {
        "time": 1574712000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 65.09,
        "apparentTemperature": 65.09,
        "dewPoint": 48.61,
        "humidity": 0.55,
        "pressure": 1010.6,
        "windSpeed": 6.89,
        "windGust": 8.94,
        "windBearing": 199,
        "cloudCover": 0.12,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 283.4
      },
      {
        "time": 1574715600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 66.13,
        "apparentTemperature": 66.13,
        "dewPoint": 48.91,
        "humidity": 0.54,
        "pressure": 1009.1,
        "windSpeed": 7.96,
        "windGust": 8.78,
        "windBearing": 210,
        "cloudCover": 0.1,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 281.9
      },
      {
        "time": 1574719200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0002,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 66.87,
        "apparentTemperature": 66.87,
        "dewPoint": 47.69,
        "humidity": 0.5,
        "pressure": 1008.5,
        "windSpeed": 7.73,
        "windGust": 8.25,
        "windBearing": 202,
        "cloudCover": 0.13,
        "uvIndex": 2,
        "visibility": 10,
        "ozone": 282.2
      },
      {
        "time": 1574722800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0005,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 66.75,
        "apparentTemperature": 66.75,
        "dewPoint": 45.25,
        "humidity": 0.46,
        "pressure": 1008.4,
        "windSpeed": 6.91,
        "windGust": 7.18,
        "windBearing": 233,
        "cloudCover": 0.18,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 283.4
      },
      {
        "time": 1574726400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0007,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 66.15,
        "apparentTemperature": 66.15,
        "dewPoint": 42.49,
        "humidity": 0.42,
        "pressure": 1008.8,
        "windSpeed": 6.57,
        "windGust": 6.85,
        "windBearing": 255,
        "cloudCover": 0.2,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 284.2
      },
      {
        "time": 1574730000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0.0005,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 64.72,
        "apparentTemperature": 64.72,
        "dewPoint": 38.8,
        "humidity": 0.38,
        "pressure": 1008.9,
        "windSpeed": 7.42,
        "windGust": 8.46,
        "windBearing": 177,
        "cloudCover": 0.17,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283.7
      },
      {
        "time": 1574733600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 62.81,
        "apparentTemperature": 62.81,
        "dewPoint": 33.95,
        "humidity": 0.34,
        "pressure": 1009.7,
        "windSpeed": 8.74,
        "windGust": 13.87,
        "windBearing": 48,
        "cloudCover": 0.1,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283
      },
      {
        "time": 1574737200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 61.23,
        "apparentTemperature": 61.23,
        "dewPoint": 29.65,
        "humidity": 0.3,
        "pressure": 1010.6,
        "windSpeed": 9.62,
        "windGust": 18.21,
        "windBearing": 14,
        "cloudCover": 0.05,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 282.5
      },
      {
        "time": 1574740800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.23,
        "apparentTemperature": 60.23,
        "dewPoint": 27.47,
        "humidity": 0.29,
        "pressure": 1011.2,
        "windSpeed": 9.62,
        "windGust": 19.75,
        "windBearing": 9,
        "cloudCover": 0.03,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 282.7
      },
      {
        "time": 1574744400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 59.45,
        "apparentTemperature": 59.45,
        "dewPoint": 26.62,
        "humidity": 0.28,
        "pressure": 1011.8,
        "windSpeed": 9.16,
        "windGust": 19.78,
        "windBearing": 15,
        "cloudCover": 0.02,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283.2
      },
      {
        "time": 1574748000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 58.59,
        "apparentTemperature": 58.59,
        "dewPoint": 26.11,
        "humidity": 0.29,
        "pressure": 1012.4,
        "windSpeed": 8.58,
        "windGust": 18.94,
        "windBearing": 20,
        "cloudCover": 0.02,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283.7
      },
      {
        "time": 1574751600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 57.56,
        "apparentTemperature": 57.56,
        "dewPoint": 25.88,
        "humidity": 0.29,
        "pressure": 1012.7,
        "windSpeed": 7.86,
        "windGust": 16.83,
        "windBearing": 17,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283.8
      },
      {
        "time": 1574755200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56.76,
        "apparentTemperature": 56.76,
        "dewPoint": 25.84,
        "humidity": 0.3,
        "pressure": 1013,
        "windSpeed": 7,
        "windGust": 13.85,
        "windBearing": 3,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 283.9
      },
      {
        "time": 1574758800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56.41,
        "apparentTemperature": 56.41,
        "dewPoint": 25.03,
        "humidity": 0.3,
        "pressure": 1013.1,
        "windSpeed": 6.36,
        "windGust": 11.55,
        "windBearing": 351,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 284.4
      },
      {
        "time": 1574762400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 56.03,
        "apparentTemperature": 56.03,
        "dewPoint": 23,
        "humidity": 0.28,
        "pressure": 1013.1,
        "windSpeed": 6.12,
        "windGust": 10.67,
        "windBearing": 348,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 285.5
      },
      {
        "time": 1574766000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 55.38,
        "apparentTemperature": 55.38,
        "dewPoint": 20.43,
        "humidity": 0.25,
        "pressure": 1013.1,
        "windSpeed": 6.08,
        "windGust": 10.44,
        "windBearing": 351,
        "cloudCover": 0,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 287
      },
      {
        "time": 1574769600,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.78,
        "apparentTemperature": 54.78,
        "dewPoint": 18.44,
        "humidity": 0.24,
        "pressure": 1013.4,
        "windSpeed": 6.11,
        "windGust": 10.27,
        "windBearing": 354,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 288.2
      },
      {
        "time": 1574773200,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 53.79,
        "apparentTemperature": 53.79,
        "dewPoint": 17.62,
        "humidity": 0.24,
        "pressure": 1014,
        "windSpeed": 6.26,
        "windGust": 9.99,
        "windBearing": 352,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 289.4
      },
      {
        "time": 1574776800,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 52.76,
        "apparentTemperature": 52.76,
        "dewPoint": 17.4,
        "humidity": 0.24,
        "pressure": 1014.7,
        "windSpeed": 6.48,
        "windGust": 9.75,
        "windBearing": 351,
        "cloudCover": 0.01,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 290.6
      },
      {
        "time": 1574780400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 52.77,
        "apparentTemperature": 52.77,
        "dewPoint": 16.87,
        "humidity": 0.24,
        "pressure": 1015.3,
        "windSpeed": 6.4,
        "windGust": 9.38,
        "windBearing": 356,
        "cloudCover": 0.02,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.2
      },
      {
        "time": 1574784000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 54.42,
        "apparentTemperature": 54.42,
        "dewPoint": 15.15,
        "humidity": 0.21,
        "pressure": 1015.8,
        "windSpeed": 5.81,
        "windGust": 8.87,
        "windBearing": 12,
        "cloudCover": 0.06,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 291.1
      },
      {
        "time": 1574787600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 57.01,
        "apparentTemperature": 57.01,
        "dewPoint": 12.65,
        "humidity": 0.17,
        "pressure": 1016,
        "windSpeed": 4.95,
        "windGust": 8.19,
        "windBearing": 36,
        "cloudCover": 0.12,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 290.4
      },
      {
        "time": 1574791200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 59.78,
        "apparentTemperature": 59.78,
        "dewPoint": 10.75,
        "humidity": 0.14,
        "pressure": 1015.9,
        "windSpeed": 4.26,
        "windGust": 7.34,
        "windBearing": 54,
        "cloudCover": 0.15,
        "uvIndex": 2,
        "visibility": 10,
        "ozone": 290.1
      },
      {
        "time": 1574794800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 61.96,
        "apparentTemperature": 61.96,
        "dewPoint": 9.87,
        "humidity": 0.13,
        "pressure": 1015.3,
        "windSpeed": 3.76,
        "windGust": 6.23,
        "windBearing": 93,
        "cloudCover": 0.12,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 290.6
      },
      {
        "time": 1574798400,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 64.36,
        "apparentTemperature": 64.36,
        "dewPoint": 9.27,
        "humidity": 0.11,
        "pressure": 1014.3,
        "windSpeed": 3.42,
        "windGust": 5.04,
        "windBearing": 136,
        "cloudCover": 0.07,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 291.4
      },
      {
        "time": 1574802000,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0003,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 65.85,
        "apparentTemperature": 65.85,
        "dewPoint": 9.71,
        "humidity": 0.11,
        "pressure": 1013.5,
        "windSpeed": 3.49,
        "windGust": 4.28,
        "windBearing": 163,
        "cloudCover": 0.04,
        "uvIndex": 3,
        "visibility": 10,
        "ozone": 291.6
      },
      {
        "time": 1574805600,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0003,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 66.83,
        "apparentTemperature": 66.83,
        "dewPoint": 11.56,
        "humidity": 0.11,
        "pressure": 1012.9,
        "windSpeed": 4.41,
        "windGust": 4.43,
        "windBearing": 197,
        "cloudCover": 0.03,
        "uvIndex": 2,
        "visibility": 10,
        "ozone": 290.8
      },
      {
        "time": 1574809200,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0003,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 66.18,
        "apparentTemperature": 66.18,
        "dewPoint": 14.89,
        "humidity": 0.14,
        "pressure": 1012.5,
        "windSpeed": 5.77,
        "windGust": 5.77,
        "windBearing": 222,
        "cloudCover": 0.05,
        "uvIndex": 1,
        "visibility": 10,
        "ozone": 289.5
      },
      {
        "time": 1574812800,
        "summary": "Clear",
        "icon": "clear-day",
        "precipIntensity": 0.0003,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperature": 64.99,
        "apparentTemperature": 64.99,
        "dewPoint": 18.65,
        "humidity": 0.17,
        "pressure": 1012.3,
        "windSpeed": 6.47,
        "windGust": 6.48,
        "windBearing": 229,
        "cloudCover": 0.09,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 288.3
      },
      {
        "time": 1574816400,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 62.8,
        "apparentTemperature": 62.8,
        "dewPoint": 23.31,
        "humidity": 0.22,
        "pressure": 1012.5,
        "windSpeed": 5.91,
        "windGust": 5.96,
        "windBearing": 199,
        "cloudCover": 0.16,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 287.7
      },
      {
        "time": 1574820000,
        "summary": "Clear",
        "icon": "clear-night",
        "precipIntensity": 0,
        "precipProbability": 0,
        "temperature": 60.63,
        "apparentTemperature": 60.63,
        "dewPoint": 27.37,
        "humidity": 0.28,
        "pressure": 1012.9,
        "windSpeed": 4.7,
        "windGust": 5.96,
        "windBearing": 262,
        "cloudCover": 0.25,
        "uvIndex": 0,
        "visibility": 10,
        "ozone": 287.3
      }
    ]
  },
  "daily": {
    "summary": "Light rain on Wednesday and Thursday.",
    "icon": "rain",
    "data": [
      {
        "time": 1574582400,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1574606160,
        "sunsetTime": 1574642820,
        "moonPhase": 0.95,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0015,
        "precipIntensityMaxTime": 1574647200,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperatureHigh": 74.75,
        "temperatureHighTime": 1574634780,
        "temperatureLow": 52.51,
        "temperatureLowTime": 1574692620,
        "apparentTemperatureHigh": 74.25,
        "apparentTemperatureHighTime": 1574634780,
        "apparentTemperatureLow": 53,
        "apparentTemperatureLowTime": 1574692620,
        "dewPoint": 36.01,
        "humidity": 0.39,
        "pressure": 1017.1,
        "windSpeed": 3.46,
        "windGust": 11.45,
        "windGustTime": 1574639880,
        "windBearing": 299,
        "cloudCover": 0,
        "uvIndex": 4,
        "uvIndexTime": 1574624520,
        "visibility": 9.476,
        "ozone": 280.3,
        "temperatureMin": 55.23,
        "temperatureMinTime": 1574606640,
        "temperatureMax": 74.75,
        "temperatureMaxTime": 1574634780,
        "apparentTemperatureMin": 55.72,
        "apparentTemperatureMinTime": 1574606640,
        "apparentTemperatureMax": 74.25,
        "apparentTemperatureMaxTime": 1574634780
      },
      {
        "time": 1574668800,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1574692620,
        "sunsetTime": 1574729220,
        "moonPhase": 0.98,
        "precipIntensity": 0.0006,
        "precipIntensityMax": 0.0019,
        "precipIntensityMaxTime": 1574686920,
        "precipProbability": 0.04,
        "precipType": "rain",
        "temperatureHigh": 67.41,
        "temperatureHighTime": 1574720220,
        "temperatureLow": 52.1,
        "temperatureLowTime": 1574778780,
        "apparentTemperatureHigh": 66.91,
        "apparentTemperatureHighTime": 1574720220,
        "apparentTemperatureLow": 52.59,
        "apparentTemperatureLowTime": 1574778780,
        "dewPoint": 39.77,
        "humidity": 0.5,
        "pressure": 1012.1,
        "windSpeed": 6.1,
        "windGust": 19.91,
        "windGustTime": 1574742480,
        "windBearing": 45,
        "cloudCover": 0.1,
        "uvIndex": 3,
        "uvIndexTime": 1574711280,
        "visibility": 10,
        "ozone": 282,
        "temperatureMin": 52.51,
        "temperatureMinTime": 1574692620,
        "temperatureMax": 67.41,
        "temperatureMaxTime": 1574720220,
        "apparentTemperatureMin": 53,
        "apparentTemperatureMinTime": 1574692620,
        "apparentTemperatureMax": 66.91,
        "apparentTemperatureMaxTime": 1574720220
      },
      {
        "time": 1574755200,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1574779080,
        "sunsetTime": 1574815560,
        "moonPhase": 0.02,
        "precipIntensity": 0.0002,
        "precipIntensityMax": 0.0004,
        "precipIntensityMaxTime": 1574769060,
        "precipProbability": 0.01,
        "precipType": "rain",
        "temperatureHigh": 67.33,
        "temperatureHighTime": 1574805840,
        "temperatureLow": 52.72,
        "temperatureLowTime": 1574852760,
        "apparentTemperatureHigh": 66.83,
        "apparentTemperatureHighTime": 1574805840,
        "apparentTemperatureLow": 53.21,
        "apparentTemperatureLowTime": 1574852760,
        "dewPoint": 19.61,
        "humidity": 0.23,
        "pressure": 1013.7,
        "windSpeed": 4.99,
        "windGust": 13.85,
        "windGustTime": 1574755200,
        "windBearing": 353,
        "cloudCover": 0.19,
        "uvIndex": 3,
        "uvIndexTime": 1574797500,
        "visibility": 10,
        "ozone": 289.1,
        "temperatureMin": 52.1,
        "temperatureMinTime": 1574778780,
        "temperatureMax": 67.33,
        "temperatureMaxTime": 1574805840,
        "apparentTemperatureMin": 52.59,
        "apparentTemperatureMinTime": 1574778780,
        "apparentTemperatureMax": 66.83,
        "apparentTemperatureMaxTime": 1574805840
      },
      {
        "time": 1574841600,
        "summary": "Light rain throughout the day.",
        "icon": "rain",
        "sunriseTime": 1574865540,
        "sunsetTime": 1574901960,
        "moonPhase": 0.06,
        "precipIntensity": 0.0312,
        "precipIntensityMax": 0.0758,
        "precipIntensityMaxTime": 1574877120,
        "precipProbability": 0.93,
        "precipType": "rain",
        "temperatureHigh": 60.55,
        "temperatureHighTime": 1574893200,
        "temperatureLow": 45.05,
        "temperatureLowTime": 1574951520,
        "apparentTemperatureHigh": 60.05,
        "apparentTemperatureHighTime": 1574893200,
        "apparentTemperatureLow": 41.78,
        "apparentTemperatureLowTime": 1574952300,
        "dewPoint": 40.17,
        "humidity": 0.6,
        "pressure": 1007.5,
        "windSpeed": 8.28,
        "windGust": 22.26,
        "windGustTime": 1574890920,
        "windBearing": 199,
        "cloudCover": 0.79,
        "uvIndex": 2,
        "uvIndexTime": 1574883960,
        "visibility": 9.074,
        "ozone": 323.4,
        "temperatureMin": 50.23,
        "temperatureMinTime": 1574928000,
        "temperatureMax": 60.55,
        "temperatureMaxTime": 1574893200,
        "apparentTemperatureMin": 50.72,
        "apparentTemperatureMinTime": 1574928000,
        "apparentTemperatureMax": 60.05,
        "apparentTemperatureMaxTime": 1574893200
      },
      {
        "time": 1574928000,
        "summary": "Light rain until evening.",
        "icon": "rain",
        "sunriseTime": 1574951940,
        "sunsetTime": 1574988360,
        "moonPhase": 0.09,
        "precipIntensity": 0.0332,
        "precipIntensityMax": 0.0983,
        "precipIntensityMaxTime": 1575005700,
        "precipProbability": 0.97,
        "precipType": "rain",
        "temperatureHigh": 58.62,
        "temperatureHighTime": 1574978340,
        "temperatureLow": 45.56,
        "temperatureLowTime": 1575037260,
        "apparentTemperatureHigh": 58.12,
        "apparentTemperatureHighTime": 1574978340,
        "apparentTemperatureLow": 44.41,
        "apparentTemperatureLowTime": 1575036720,
        "dewPoint": 40.71,
        "humidity": 0.68,
        "pressure": 1007,
        "windSpeed": 5.53,
        "windGust": 13.41,
        "windGustTime": 1574953860,
        "windBearing": 275,
        "cloudCover": 0.91,
        "uvIndex": 2,
        "uvIndexTime": 1574970000,
        "visibility": 7.377,
        "ozone": 380.6,
        "temperatureMin": 45.05,
        "temperatureMinTime": 1574951520,
        "temperatureMax": 58.62,
        "temperatureMaxTime": 1574978340,
        "apparentTemperatureMin": 41.78,
        "apparentTemperatureMinTime": 1574952300,
        "apparentTemperatureMax": 58.12,
        "apparentTemperatureMaxTime": 1574978340
      },
      {
        "time": 1575014400,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1575038400,
        "sunsetTime": 1575074760,
        "moonPhase": 0.12,
        "precipIntensity": 0.0008,
        "precipIntensityMax": 0.0087,
        "precipIntensityMaxTime": 1575014400,
        "precipProbability": 0.2,
        "precipType": "rain",
        "temperatureHigh": 55.21,
        "temperatureHighTime": 1575064680,
        "temperatureLow": 40.57,
        "temperatureLowTime": 1575123840,
        "apparentTemperatureHigh": 54.71,
        "apparentTemperatureHighTime": 1575064680,
        "apparentTemperatureLow": 39.32,
        "apparentTemperatureLowTime": 1575122100,
        "dewPoint": 35.38,
        "humidity": 0.59,
        "pressure": 1008.3,
        "windSpeed": 5.33,
        "windGust": 13.57,
        "windGustTime": 1575073080,
        "windBearing": 312,
        "cloudCover": 0.03,
        "uvIndex": 2,
        "uvIndexTime": 1575056820,
        "visibility": 10,
        "ozone": 365,
        "temperatureMin": 42.96,
        "temperatureMinTime": 1575100800,
        "temperatureMax": 55.21,
        "temperatureMaxTime": 1575064680,
        "apparentTemperatureMin": 40.47,
        "apparentTemperatureMinTime": 1575100800,
        "apparentTemperatureMax": 54.71,
        "apparentTemperatureMaxTime": 1575064680
      },
      {
        "time": 1575100800,
        "summary": "Clear throughout the day.",
        "icon": "clear-day",
        "sunriseTime": 1575124860,
        "sunsetTime": 1575161160,
        "moonPhase": 0.16,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0003,
        "precipIntensityMaxTime": 1575159840,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperatureHigh": 57.38,
        "temperatureHighTime": 1575151800,
        "temperatureLow": 41.29,
        "temperatureLowTime": 1575210480,
        "apparentTemperatureHigh": 56.88,
        "apparentTemperatureHighTime": 1575151800,
        "apparentTemperatureLow": 38.8,
        "apparentTemperatureLowTime": 1575209880,
        "dewPoint": 30.25,
        "humidity": 0.5,
        "pressure": 1016.1,
        "windSpeed": 4.25,
        "windGust": 7.64,
        "windGustTime": 1575139260,
        "windBearing": 66,
        "cloudCover": 0.29,
        "uvIndex": 3,
        "uvIndexTime": 1575142980,
        "visibility": 10,
        "ozone": 307.3,
        "temperatureMin": 40.57,
        "temperatureMinTime": 1575123840,
        "temperatureMax": 57.38,
        "temperatureMaxTime": 1575151800,
        "apparentTemperatureMin": 39.32,
        "apparentTemperatureMinTime": 1575122100,
        "apparentTemperatureMax": 56.88,
        "apparentTemperatureMaxTime": 1575151800
      },
      {
        "time": 1575187200,
        "summary": "Partly cloudy throughout the day.",
        "icon": "partly-cloudy-day",
        "sunriseTime": 1575211320,
        "sunsetTime": 1575247500,
        "moonPhase": 0.19,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0003,
        "precipIntensityMaxTime": 1575190800,
        "precipProbability": 0.02,
        "precipType": "rain",
        "temperatureHigh": 61.56,
        "temperatureHighTime": 1575241020,
        "temperatureLow": 43.01,
        "temperatureLowTime": 1575297180,
        "apparentTemperatureHigh": 61.06,
        "apparentTemperatureHighTime": 1575241020,
        "apparentTemperatureLow": 40.4,
        "apparentTemperatureLowTime": 1575297060,
        "dewPoint": 25.01,
        "humidity": 0.39,
        "pressure": 1022.2,
        "windSpeed": 4.28,
        "windGust": 8.17,
        "windGustTime": 1575223500,
        "windBearing": 15,
        "cloudCover": 0.63,
        "uvIndex": 3,
        "uvIndexTime": 1575228600,
        "visibility": 10,
        "ozone": 300.5,
        "temperatureMin": 41.29,
        "temperatureMinTime": 1575210480,
        "temperatureMax": 61.56,
        "temperatureMaxTime": 1575241020,
        "apparentTemperatureMin": 38.8,
        "apparentTemperatureMinTime": 1575209880,
        "apparentTemperatureMax": 61.06,
        "apparentTemperatureMaxTime": 1575241020
      }
    ]
  },
  "alerts": [
    {
      "title": "Coastal Flood Advisory",
      "regions": [
        "Los Angeles County Coast including Downtown Los Angeles"
      ],
      "severity": "advisory",
      "time": 1574690400,
      "expires": 1574791200,
      "description": "...COASTAL FLOOD ADVISORY IN EFFECT FROM 6 AM MONDAY TO 10 AM PST TUESDAY... The National Weather Service in Los Angeles/Oxnard has issued a Coastal Flood Advisory, which is in effect from 6 AM Monday to 10 AM PST Tuesday. * COASTAL FLOODING...Minor tidal overflow is possible around the time of high tide. Only the lowest sections of coastline and exposed beach parking lots will be affected by this event. * IMPACTS...Dangerous rip currents and breaking waves are expected due to elevated surf of 3 to 6 feet. * TIDES...Highest tides will occur around 8 am Monday and Tuesday with a height of just over 7 feet.\n",
      "uri": "https://alerts.weather.gov/cap/wwacapget.php?x=CA125D1CC908AC.CoastalFloodAdvisory.125D1CE750A0CA.LOXCFWLOX.6a2bac8fc8d56cf91c7d5d3ac9843437"
    }
  ],
  "flags": {
    "sources": [
      "nwspa",
      "cmc",
      "gfs",
      "hrrr",
      "icon",
      "isd",
      "madis",
      "nam",
      "sref",
      "darksky",
      "nearest-precip"
    ],
    "nearest-station": 0.707,
    "units": "us"
  },
  "offset": -8
}
    
    callAPI(url, (responseData) => {
            res.send(responseData);
    
    });
    // res.send(obj);
});

app.get('/detailedForecast', (req, res) => {
    let latitude = encodeURI(req.query.latitude);
    let longitude = encodeURI(req.query.longitude);
    let time = encodeURI(req.query.timestamp);
    let url = `https://api.darksky.net/forecast/${FORECAST_API_KEY}/${latitude},${longitude},${time}`;
    callAPI(url, (responseData) => {
        res.send(responseData);
    });

});

app.get('/autocomplete', (req, res) => {
    let input = encodeURI(req.query.input);
    let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&language=en&key=${GOOGLE_API_KEY}`;
    callAPI(url, (responseData) => {
        let predictions = [];
        for (let prediction of responseData['predictions']) {
            predictions.push(prediction['description']);
        }
        res.send(predictions);
    });
});



function callAPI(url, callback) {
    let result;
    request(url, function(error, response) {
        if (error) {
            callback({ "results": "error" })
        } else {
            try {
                result = JSON.parse(response.body);
                callback(result);
            } catch (err) {
                callback({ "results": "error" });
            }
        }
    });
}
let port = process.env.PORT || 8081;
// let port = 8081;
app.listen(port, () => console.log(`app listening on port ${port}`));