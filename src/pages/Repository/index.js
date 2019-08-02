const { ipcRenderer } = require("electron");
const {api} = require('../../services/api');
let repoUrl = null;
const avatar = document.querySelector('#avatar');
const descriptionElement = document.querySelector('.description');
const fecharBtn = document.querySelector('#fechar');

ipcRenderer.on('carregar-repo', async (event, url) => {
  if (url) repoUrl = url;
  const result = await api.get(repoUrl);
  const {owner, description} = result.data;
  avatar.src = owner.avatar_url;
  descriptionElement.textContent = description;
  console.log(owner);
});


fecharBtn.addEventListener('click', _ => {
  ipcRenderer.send('reload-main');
})
