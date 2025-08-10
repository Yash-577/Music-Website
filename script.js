// script.js

let api = "https://api.github.com/users/";

// Dynamically load Axios
let script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js";
script.integrity = "sha512-DZqqY3PiOvTP9HkjIWgjO6ouCbq+dxqWoJZ/Q+zPYNHmlnI2dQnbJ5bxAHpAMw+LXRm4D72EIRXzvcHQtE8/VQ==";
script.crossOrigin = "anonymous";
document.head.appendChild(script);

// Wait until Axios is loaded before running the main code
script.onload = () => {
    let main = document.getElementById("main");
    let inputForm = document.getElementById("userInput");
    let inputBox = document.getElementById("inputBox");

    const userGetFunction = (name) => {
        axios.get(api + name)
            .then((response) => {
                userCard(response.data);
                repoGetFunction(name);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    errorFunction("No profile with this username");
                } else {
                    errorFunction("Something went wrong");
                }
            });
    };

    const repoGetFunction = (name) => {
        axios.get(`${api}${name}/repos?sort=created`)
            .then((response) => {
                repoCardFunction(response.data);
            })
            .catch(() => {
                errorFunction("Problem fetching repos");
            });
    };

    const userCard = (user) => {
        let id = user.name || user.login;
        let info = user.bio ? `<p>${user.bio}</p>` : "";
        let cardElement = `
            <div class="card">
                <div>
                    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${id}</h2>
                    ${info}
                    <ul>
                        <li>${user.followers} <strong>Followers</strong></li>
                        <li>${user.following} <strong>Following</strong></li>
                        <li>${user.public_repos} <strong>Repos</strong></li>
                    </ul>
                    <div id="repos"></div>
                </div>
            </div>`;
        main.innerHTML = cardElement;
    };

    const errorFunction = (error) => {
        let cardHTML = `
            <div class="card">
                <h1>${error}</h1>
            </div>`;
        main.innerHTML = cardHTML;
    };

    const repoCardFunction = (repos) => {
        let reposElement = document.getElementById("repos");
        reposElement.innerHTML = ""; // Clear previous repos
        for (let i = 0; i < 5 && i < repos.length; i++) {
            let repo = repos[i];
            let repoEl = document.createElement("a");
            repoEl.classList.add("repo");
            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;
            reposElement.appendChild(repoEl);
        }
    };

    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let user = inputBox.value.trim();
        if (user) {
            userGetFunction(user);
            inputBox.value = "";
        }
    });
};




//new code
