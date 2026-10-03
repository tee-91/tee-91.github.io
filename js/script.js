// The word 'async' is used because the function needs to wait
// for information to be returned from an external API

function customToast(toastMessage) {
  //Javascript copied from source to execute imported toast in html
  Toastify({
    text: toastMessage,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

async function getCountry() {
  const mapFrame = document.getElementById("mapFrame");
  // .value gets whatever the user has typed into the textbox
  const countryName = document.getElementById("countryName").value;

  // find div with id 'result'
  // this will be used to display the information
  // stop the function
  if (countryName.trim() === "") {
    customToast("Please enter the name of a country");
    return;
  }
  // try allows us to attempt some code that could fail.
  //
  // instance: the API may be unavailble oro the country
  // the user entered might not exist
  try {
    // Create the address of the API first
    //
    // if the user entered "France", the URL woudl become:
    //
    // https://countries.dev/name/France
    //
    // encodeURIComponent() makes the text suitable
    // for putting inside a web address
    const apiURL =
      "https://countries.dev/name/" + encodeURIComponent(countryName);
    // fetch() sends a request to the API.
    //
    // "await" tells Javascript to wait until the
    // API has repsonded before continuing
    const response = await fetch(apiURL);
    //Check whether the API request was successful,
    //
    // If it wasn't successful,create an error
    if (!response.ok) {
      throw new Error("Country not found");
    }

    // The API sends its information back as JSON.
    //
    // .json() converts the JSON response into
    // data that JavaScript can work with.
    const data = await response.json();
    // A search could potentially return more than
    // one country.
    //
    // If the API has returned an array (a list),
    // use the first country in that list.
    //
    //otherwise, use the data directly.
    const country = Array.isArray(data) ? data[0] : data;
    //log and lat of country
    // const lat = country.latlng[0];
    // const lng = country.latlng[1];
    // // lug in lat and log into google maps api
    // mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
    // Display the country information on the webpage.
    //
    // Template literals use backticks (`) and allow
    // Javascript to be inserted using $()

    result.innerHTML = `
    <div class="card">
      <img src=${country.flags.svg} alt=${country.name}'s flag image id="flags"/>
      <h1 id="card-title">${country.name}</h1>
      <div class="card-body">
        <div class="grid-container">
          <div>
             <p><strong>Capital:</strong></p>
             <p>${country.capital}</p>
          </div>
          <div>
            <p><strong>Currency Name:</strong></p> 
            <p>${country.currencies[0].name}</p> 
          </div>
          <div>
            <p><strong>Currency Symbol:</strong></p> 
            <p>${country.currencies[0].symbol}</p>
          </div>
          <div>
              <p><strong>Region:</strong></p>
              <p>${country.region}</p> 
          </div>
          <div>
            <p><strong>Language Spoken:</strong></p>
            <p>${country.languages[0].name}</p>
          </div>
          <div>
           <p><strong>Population:</strong></p>
            <p>${country.population.toLocaleString()}</p>
          </div>
          <div class="wide">
          <p >
           <strong>Area:</strong>
              ${country.area.toLocaleString()} 
          </p>
          </div>
        </div> 
      </div>
    </div>

    `;
  } catch (error) {
    // Display a friendly error message instead
    // of showing a JavaScript error to the user
    customToast("Sorry, the country could not be found");
  }
}
