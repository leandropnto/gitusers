const { ipcRenderer } = require('electron');
const { api } = require('../../services/api');
const repoBody = document.querySelector('#repo-body');
const minimizar = document.querySelector('#minimizar');
const fechar = document.querySelector('#fechar');
const avatar = document.querySelector('#avatar');
const loginSpan = document.querySelector('#login');
const estrelados = document.querySelector('.estrelados');
const user = "diego3g";


const loadUsers = async (user) => {
  const result = await api.get(`/users/${user}`);
  const {avatar_url, login} = result.data;
  avatar.src = avatar_url;
  loginSpan.textContent = "Login: " + login;
}

const loadRepositories = async (user) => {
  const result = await api.get(`https://api.github.com/users/${user}/repos`);
  console.log(result.data);
  const template = result.data.map(repo => `
    <tr>
      <td><a href="#">${repo.name}<a></td>
      <td><a href="#">${repo.full_name}<a></td>
    </tr>
  `).join('\n');

  repoBody.innerHTML = template;

  
}


const loadStarred = async (user) => {
  const result = await api.get(`https://api.github.com/users/${user}/starred`);
  const template = result.data.map(repo => renderEstrelado(repo)).join('\n');
  estrelados.innerHTML = template;
}



window.onload = async (event) => {
  loadUsers(user);
  loadRepositories(user);
  await loadStarred(user);

  const repository = document.querySelectorAll('.repository');
  [...repository].forEach(item => {
    item.addEventListener('click', evt => {
      const url = item.getAttribute('data-repo');
      ipcRenderer.send('navigate-repo', url);
    });
  }) ;

}

fechar.addEventListener('click', _ => {
  ipcRenderer.send('fechar-app');
})

minimizar.addEventListener('click', _ => {
  ipcRenderer.send('minimizar-app');
})

const renderEstrelado = repo => {
  return `
    <div>
      <div>
        <img src="${repo.owner.avatar_url}" alt="Avatar">
        <span class="navigate-user">Nome: ${repo.name}</span>
      </div>
      <span class="repository" data-repo=${repo.url}><strong>Descrição:</strong> ${repo.description}</span>
    </div>
  `;
}
