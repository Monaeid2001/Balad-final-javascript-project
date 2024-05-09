const ourList = document.getElementById("ourList");
const ourContent = document.getElementById("content");
let data;
let added = false;
const countriesMapped = new Map();
const newsApiKey = '5211b9bd735a4537a5dd425305b389da';

ourList.addEventListener('change', async (e) => {
    const ourCountry = e.target.value;
    await printCountryContent(ourCountry);
});

const getCountryData = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error('Failed to fetch');
        return await response.json();
    } catch (error) {
        console.error("Error fetching country data: ", error);
        return null;
    }
};

const getCountryNew = async (countryNum) => {
    try {
        const response = await fetch(`https://api.worldnewsapi.com/search-news?api-key=${newsApiKey}&source-countries=${countryNum}`);
        if (!response.ok) throw new Error('Failed to fetch news');
        return await response.json();
    } catch (error) {
        console.error("Error fetching news: ", error);
        return null;
    }
};

const addCountryName = (countriesData) => {
    countriesData
        .map(element => element.name.common)
        .sort()
        .forEach(name => {
            const country = countriesData.find(country => country.name.common === name);
            countriesMapped.set(name, country);
            ourList.innerHTML += `<option>${name}</option>`;
        });
};

const insideCountryList = async () => {
    if (!data) {
        data = await getCountryData();
        if (data) addCountryName(data);
        else console.error('Failed to fetch country data.');
    }
};

// Functions for countryDetails, countryFacts, countryLocation, and countryNews 
const countryDetails = (ourCountry) => {
  const selcountdata = countriesMapped.get(ourCountry);
  const notMem = selcountdata.unMember ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i> `;
  const indepcount = selcountdata.independent ? `<i class="fas fa-check"></i>` : `<i class="fas fa-times"></i> `;
  return `
      <section class="wf100 p80 h2-local-brands depart-info" id="countryInfo">
          <div class="container">
              <div class="row">
                  <div class="col-md-12">
                      <div class="section-title">
                          <h2>Country Information</h2>
                          <p>For the beginning of a new paragraph marks a change of topic or a step in the development of an<br>
                              argument or of a story. In writing essays or other compositions too include.
                          </p>
                      </div>
                  </div>
              </div>
              <div class="row">
              <!--Local Box Start-->
              <div class="col-md-3 col-sm-3">
              <div class="deprt-icon-box">
                  <img src="${selcountdata.flags.png}" alt="">
                  <h6> <a href="#">Flag</a> </h6>
              </div>
              </div>
              <!--Local Box End--> 
              <!--Local Box Start-->
              <div class="col-md-3 col-sm-3">
              <div class="deprt-icon-box">
                  <img src="${selcountdata.coatOfArms.png}" alt="">
                  <h6> <a href="">Coat Of Arms</a> </h6>
              </div>
              </div>
              <!--Local Box End--> 
              <!--Local Box Start-->
              <div class="col-md-3 col-sm-3">
              <div class="deprt-icon-box">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/UN_emblem_blue.svg/200px-UN_emblem_blue.svg.png" alt="">
                  <h6> <a href="aboutus.html#">United Nations 
                      ${notMem}
                  </a> </h6>
              </div>
              </div>
              <!--Local Box End--> 
              <!--Local Box Start-->
              <div class="col-md-3 col-sm-3">
              <div class="deprt-icon-box">
                  <img src="https://cdn4.iconfinder.com/data/icons/digital-nomad-volume-1/1000/INDEPENDENT-512.png" alt="">
                  <h6> <a href="#">Independent 
                      ${indepcount}
                  </a> 
                  </h6>
              </div>
              </div>
              <!--Local Box End--> 
          </div>
      </div>
  </section>
`
};

const countryFacts = (ourCountry) => {
  const selcountdata = countriesMapped.get(ourCountry);
  return `
      <section class="wf100 some-facts" id="countryFacts">
          <div class="container">
          <h2>Read Some Facts</h2>
          <ul>
              <li>
                  <div class="facts-icon"><i class="fas fa-users"></i></div>
                  <strong>${(selcountdata.population).toLocaleString()}</strong> <span>Population</span> 
              </li>
              <li>
                  <div class="facts-icon"><i class="fas fa-map-marked-alt"></i></div>
                  <strong>${selcountdata.region}</strong> <span>Region</span> 
              </li>
              <li>
                  <div class="facts-icon"><i class="fas fa-calendar-alt"></i></div>
                  <strong>${selcountdata.startOfWeek}</strong> <span>Start Of Week</span> 
              </li>
              <li>
                  <div class="facts-icon"><i class="fas fa-clock"></i></div>
                  <strong>${selcountdata.timezones[0]}</strong> <span>Time zone</span> 
              </li>
              <li>
                  <div class="facts-icon"><i class="fas fa-home"></i></div>
                  <strong>${selcountdata.capital[0]}</strong> <span>Capital</span> 
              </li>
          </ul>
          </div>
      </section>
  `
};

const countryLocation = (ourCountry) => {
  const selcountdata = countriesMapped.get(ourCountry);
  const apiKey = "AIzaSyDCCfoXSZoK3UBns2vOgqjxikkomxkSp6k";
  const url = `https://www.google.com/maps/embed/v1/search?key=${apiKey}&zoom=6&q=${ourCountry}`;
  return `
      <div class="map-form p80" id="countryLocation">
          <div class="container">
          <div class="row">
          <div class="col-md-4 col-sm-5">
              <h3 class="stitle">Location On Map</h3>
              <p class="m80">Discover the world with Google Maps. Experience Street View, 3D Mapping, turn-by-turn directions, indoor maps and more across your devices.</p>

              <a href=${selcountdata.maps.googleMaps} class="btn btn-danger">
              See On Google Maps
              </a>
              
          </div>
          <div class="col-md-8 col-sm-7">
              <div class="map">
                  <iframe src=${url}></iframe>
              </div>
          </div>
      </div>
  </div>
</div>
`
};

const countryNews = async (ourCountry) => {
    const selcountdata = countriesMapped.get(ourCountry);
    const countryNum = selcountdata.cca2;
    const newsjson = await getCountryNew(countryNum);
    console.log(newsjson);

    const generateNewsBox = (index) => {
        const newsItem = newsjson.news[index];
        return `
            <div class="col-md-3 col-sm-6">
                <div class="news-box">
                    <div class="new-thumb">
                        <span class="cat c${index + 1}">${newsItem.category}</span>
                        <img src="${newsItem.image}" alt="">
                    </div>
                    <div class="new-txt">
                        <ul class="news-meta">
                            <li>${(newsItem.publish_date).split(" ")[0]}</li>
                        </ul>
                        <h6><a href="${newsItem.url}">${newsItem.title}</a></h6>
                        <p>${newsItem.text.length >= 50 ? newsItem.text.substring(0, 50) + "..." : newsItem.text}</p>
                    </div>
                    <div class="news-box-f">
                        <img src="https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png" alt="">
                        ${newsItem.author} <a href="index.html#"><i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `;
    };

    return `
        <section class="wf100 city-news p75" id="countryNews">
            <div class="container">
                <div class="title-style-3">
                    <h3>Be Updated with City News</h3>
                    <p>Read the News Updates and Articles about Government </p>
                </div>
                <div class="row">
                    ${[0, 1, 2, 3].map((index) => generateNewsBox(index)).join('\n')}
                </div>
            </div>
        </section>
    `;
};

const printCountryContent = async (ourCountry) => {
    const detailsHTML = countryDetails(ourCountry);
    const factsHTML = countryFacts(ourCountry);
    const locationHTML = countryLocation(ourCountry);
    const newsHTML = await countryNews(ourCountry);
    if (!added) { // Check for added as false
        ourContent.innerHTML += await detailsHTML + await factsHTML + await locationHTML + await newsHTML;
        added = true; 
        let  ourList = document.getElementById("ourList");
        ourList.addEventListener('change', async (e) => {
            const ourCountry = e.target.value;
             printCountryContent(ourCountry);
        });    
    } else {
        document.getElementById("countryInfo").innerHTML = await detailsHTML;
        document.getElementById("countryFacts").innerHTML = await factsHTML;
        document.getElementById("countryLocation").innerHTML = await locationHTML;
        document.getElementById("countryNews").innerHTML = await newsHTML;
    
    }
};

insideCountryList();

function SendMail(){
    var params ={
        from_name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    console.log('Sending email with params:', params);

    emailjs.send("service_5mdw2c5", "template_byffjgh", params).then(function(res){
        console.log('Email sent successfully. Response:', res);
        alert("success!!" + res.status);
    }).catch(function(error) {
        console.error('Failed to send email. Error:', error);
        alert("Failed to send email. Check the console for details.");
    });
}


