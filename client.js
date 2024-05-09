const apiURL = "http://localhost:8081";

// Q1 replace the ????? so that this event listener handles click events on
// the 'search for flight' button
document.getElementById('btnFlightSearch').addEventListener('click', () => {

	// Q2 complete these statements to read destination and date from form
	const city = document.getElementById("theDest").value;
	const date = document.getElementById("theDate").value;

	// Q3 complete the fetch API call to send the user's chosen city and
	// date to the 'flight search' route in server.js. You will need to look
	// at the server.js code to complete this successfully.
	fetch(apiURL + "/search/" + city + "/" + date).then(response => response.json())
	    .then(json => {
		// Q6 complete so that it parses the JSON returned and outputs the
		// data to the searchResults <div> in the format shown on the paper.
		const flights = json.flights;
		const searchElement = document.getElementById("searchResults");
		searchElement.innerHTML = "";
		
		flights.forEach((flight) => {
			searchElement.innerHTML += `
				<div class='search-result-item'>
					<p>Flight Number - ${flight.fnumber}</p>
					<p>Destination - ${flight.endcity}</p>
					<p>Date - ${flight.date}</p>
					<p>Departs - ${flight.depart}</p>
					<p>Arrives - ${flight.arrive}</p>
					<p>Price - ${flight.price}</p>
					<button onclick='bookHandler(${flight.ID})'>Book</button>
				</div>
			`;
		});
	});	
});

// Q8 update with a book button - see question paper
function bookHandler(flightId) {
	// This is a callback function which is attached to searchResults item button
	// We need to add this function on window scope so that we bind to the button
	// it is very difficult to add implementation of book inside btnFlightSearch eventListener
	fetch(apiURL + "/flightbook/" + flightId, { method: "POST"})
		.then(response => {
			if (response.status !== 200) {
				throw new Error(response.statusText || "Server Error");
			}
		})
		.then(() => alert("Successfully booked"))
		.catch(err => alert("Error while booking: " + err.message));
}

// Q9 replace the ????? so that this event listener handles click events on
// the 'add flight' button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById('btnFlightAdd').addEventListener('click', async() => {

	// Q9 complete these statements to read flight details from the form
	const number = document.getElementById("fNumber").value;
	const dest = document.getElementById("destCity").value;
	const date = document.getElementById("theDate2").value;
	const deptime = document.getElementById("departTime").value;
	const arrtime = document.getElementById("arriveTime").value;
	const thePrice = document.getElementById("price").value;
	const numSeats = document.getElementById("numSeats").value;
	const flightPayload = { number, dest, date, deptime, arrtime, thePrice, numSeats };

	// Q9 complete the fetch API call to send the data to the 'add flight'
	// route on the server as a POST request... 
	const flightAddStatus = document.getElementById("flightAddStatus");
	try {
		const headers = { 
			Accept: 'application.json',
    		'Content-Type': 'application/json'
		};
		const response = await fetch(apiURL + "/flightadd", { 
			method: "POST", 
			body: JSON.stringify(flightPayload), 
			headers 
		});
		const body = await response.json();
		
		if(response.status === 400) {
			const { message, errors } = body;
			throw { message, errors, status: response.status };
		} else if (response.status !== 200) {
			throw { message: response.statusText, status: response.status };
		} else {
			flightAddStatus.innerHTML = "<h1>Successfully added a flight</h1>";
		}
	} catch (err) {
		// Q12 modify Q9 answer to handle non-200 status codes. Ensure that
		// user-friendly error messages are displayed to the user in the
		// 'flightAddStatus' <div>.
		if (err.status === 400) {
			const { message, errors } = err;

			flightAddStatus.innerHTML = `<h1>${message}</h1>`;
			errors.forEach(error => flightAddStatus.innerHTML += `<p>${error}</p>`);
		} else {
			flightAddStatus.innerHTML = `<h1>Error: ${err.message}</h1>`;
		}
	}

});

// Q13 replace the ????? so that this event listener handles click events on
// the login button
// Note the event listener has been setup to be an async function - this may help you
document.getElementById('?????').addEventListener('click', async() => {

	// Q13 complete these statements to read login details from the form
	// uncomment the code
	// const u = ?????;
	// const p = ?????;
	// uncomment the code


	// Q13 complete the fetch API call to send the data to the login 
	// route on the server as a POST request... 

	// Q14 modify Q13 answer so that if the user did not log in correctly, 
	// a user-friendly error message is displayed to the user in the
	// 'loginStatus' <div>.
});
