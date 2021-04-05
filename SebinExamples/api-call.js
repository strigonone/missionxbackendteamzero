const getACarFromMyBackend = () => {
	const requestURL1 = "http://localhost:8080/car";
	fetch(requestURL1)
		.then((response) => response.text())
		.then((data) => putDataIntoPage(data, "content1"));
};

const getABaloonFromMyBackend = () => {
	const requestURL2 = "http://localhost:8080/baloon";

	// calls the API with the url 'requestURL2'
	// once we get the response then do something with it
	// * CONSUMER of the promise returned by the Fetch API
	fetch(requestURL2)
		.then((response) => response.text())
		.then((data) => putDataIntoPage(data, "content2"));
};

const getFileContentFromMyBackend = (methodOfRequest) => {
	const requestURL3 = "http://localhost:8080/hello";

	// calls the API with the url 'requestURL2'
	// once we get the response then do something with it
	// * CONSUMER of the promise returned by the Fetch API
	fetch(requestURL3, { method: methodOfRequest })
		.then((response) => response.text())
		.then((data) => putDataIntoPage(data, "content3"));
};

const getFileContentFromMyBackend2 = (methodOfRequest) => {
	const requestURL4 = "http://localhost:8080/test";

	// calls the API with the url 'requestURL2'
	// once we get the response then do something with it
	// * CONSUMER of the promise returned by the Fetch API
	fetch(requestURL4, { method: methodOfRequest })
		.then((response) => response.text())
		.then((data) => putDataIntoPage(data, "content4"));
};

/**
 * This method is used to insert the given data into a HTML element having the provided ID.
 *
 * @param {*} data  The response from the API that is to be put into the page
 * @param {*} id The id of the HTML element that you wish to put the data into
 */
function putDataIntoPage(data, id) {
	// data from the API response is put into the div
	console.log(data);
	document.getElementById(id).innerHTML = data;
}
