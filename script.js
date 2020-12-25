
console.warn('github 3');

const form    = document.querySelector('#form');
const press   = document.querySelector('#press');
const clear   = document.querySelector('#clear');
const infoImg = document.querySelector('#infoImg');
const infoName  = document.querySelector('#infoName');
const infoEmail = document.querySelector('#infoEmail');
const infoLogin = document.querySelector('#infoLogin');
const publicRepos = document.querySelector('#publicRepos');
const infoLocation = document.querySelector('#infoLocation');
const lastUpdated = document.querySelector('#lastUpdated');
const infoRepos   = document.querySelector('#infoRepos');
const linkRepo = document.querySelector('#linkRepo');

const infoContainer = document.querySelector('#infoContainer');
const errorUser = document.querySelector('#errorUser');
const errorRepo = document.querySelector('#errorRepo');

function clearField() {
    errorUser.innerText = '';
    errorRepo.innerText = '';
}
function clearContainer() {
    infoImg.innerHTML = '';
    infoLogin.innerHTML = '';
    infoName.innerHTML = '';
    linkRepo.innerHTML = '';
    infoLocation.innerHTML = '';
    publicRepos.innerHTML = '';
    lastUpdated.innerHTML = '';
    infoRepos.innerHTML = '';
}

press.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('click');

    clearContainer();
    clearField();

    // console.log(form.field.value);
    const user = form.field.value;
    const promise1 = fetch(`https://api.github.com/users/${user}`);
    promise1
        .then(res => {
            if(res.status === 403) {
                throw Error(res.statusText);
            }
            if(res.status === 404) {
                throw Error(res.statusText);
            }
            return res.json();
        })
        .then(data => {
            infoImg.innerHTML = '<img src='+ data.avatar_url +' />';
            infoLogin.innerText = 'login: ' + data.login;
            if(data.name !== null) 
                infoName.innerText = 'name: ' + data.name;
            if(data.email !== null) 
                infoEmail.innerText = 'email: ' + data.email;
            linkRepo.innerHTML = `<a href="https://github.com/${user}" target="_blank">link do user</a>`;
            if(data.location !== null)
                infoLocation.innerText = 'Location: ' + data.location;
            publicRepos.innerText = 'Public repos: ' + data.public_repos;
            lastUpdated.innerText = 'Last updated: ' + data.updated_at.substring(0,10);
        })
        .catch(err => {
            console.log('Error User: ',err);
            errorUser.innerHTML = '<h3 class="errorStyle">User: </h3> ' + err;
        });

    const repos = fetch(`https://api.github.com/users/${user}/repos`)
    repos
        .then(res => {
            if(res.status === 403) {
                throw  Error(res.statusText);
            }
            if(res.status === 404) {
                throw  Error(res.statusText);
            }
            return res.json()
        })
        .then(repoData => {
            console.log(repoData);
            console.log(repoData.length);
            const numberRepos = repoData.length;

            let content = `<h4>Repositories - ${numberRepos}</h4>`;
            repoData.forEach((item, index) => {
                const linkDoRepo = item.html_url;
                const has_pages = item.has_pages; 
         
                content += `<div>${index+1} ${item.name} - 
                    <a href="${linkDoRepo}" 
                        target="_blank">link to repo</a> - has pages 
                        ${has_pages 
                            ? 
                            `<img src="tik.png" alt="tik" />  
                            <a href="https://${user}.github.io/${item.name}" target="_blank">link</a>` 
                            : 
                            '<img src="no.png" alt="tik" class="no"/>'
                        }</div>`;
            });
            infoRepos.innerHTML = content;
        })
        .catch(err => {
            console.log('Error Repo: ',err);
            errorRepo.innerHTML = '<h3 class="errorStyle">Repo: </h3>' + err;
        }); 

}, false);

clear.onclick = function(e) {
    e.preventDefault();
    console.log('clear');
    form.field.value = '';
    
    clearField();
}











