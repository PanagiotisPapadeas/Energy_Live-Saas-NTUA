let userID = "";
let userJWT = "";
let given_name = "";
let family_name = "";

function handleCredentialResponse(data) {

    console.log(data);
    userID = data['credential'];
    fetchUserDetails(data['credential']);
    // window.alert(given_name + " IS " + family_name);

}

function fetchUserDetails(cred) {
    const xhr = new XMLHttpRequest();
    const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + cred;
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
            const parsedResponse = JSON.parse(xhr.responseText);
            given_name = parsedResponse['given_name'];
            family_name = parsedResponse['family_name'];
            email = parsedResponse['email'];
            window.location.href="../HighCharts/Charts.html?" + email;
            // sessionStorage.setItem("given_name", given_name);
            // window.alert("User " + given_name + " " + family_name + " just logged in!")
            // document.getElementById("given_last_name").innerHTML = given_name + " " + family_name;
        }
    }
}



































// function action(){
//     if(!checkLogin()){
//         window.alert("User must login!");
//     }
//     else{
//         window.alert("User is logged in!"); 
//     }
// }

// async function checkLogin() {
//     const url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' + userID;
//     result = await fetch(url).then(response => response.json())
//         .then(json => {
//             // if(Object.keys(json)[0] == "error");
//             alert(Object.keys(json));
//             // else return true;
//         });
//     return result;
// }