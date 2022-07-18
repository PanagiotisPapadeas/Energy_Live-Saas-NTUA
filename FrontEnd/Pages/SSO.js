let userJWT
const base_url = "https://oauth2.googleapis.com/tokeninfo?id_token=";


//Function that handles google sign in button
function handleCredentialResponse(data) {

    console.log(data);
    fetchUserDetails(data["credential"])
    //window.location.assign("../Charts/Charts.html");
}

//Function that retrieves user's data from google SSO
//and stores them in browser's cache (localStorage)
function fetchUserDetails(cred) {
    const xhr = new XMLHttpRequest();
    const url = base_url + cred;
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
            const parsedResponse = JSON.parse(xhr.response);
            localStorage.setItem("email", parsedResponse["email"]);
            localStorage.setItem("name", parsedResponse["name"]);
            localStorage.setItem("given_name", parsedResponse["given_name"]);
            localStorage.setItem("family_name", parsedResponse["family_name"]);
            console.log(parsedResponse["given_name"])
            var url = 'http://localhost:4006/ins/'+parsedResponse["email"]+'/'+parsedResponse["given_name"]+'/'+parsedResponse["family_name"];
            fetch(url);
            window.location.assign("Charts.html");
        }
    }


}


