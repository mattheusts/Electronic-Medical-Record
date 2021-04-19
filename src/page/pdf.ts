import { ipcRenderer } from 'electron';

window.onload = () => {
  console.log('loaded');
};

ipcRenderer.on('showPDF', async (event, res: string) => {
  const container = document.getElementById('root') as HTMLInputElement;
  console.log(res);
  setTimeout(() => {
    const embed = document.createElement('iframe');
    embed.setAttribute('src', res);
    embed.setAttribute('width', '500');
    embed.setAttribute('height', '500');
    embed.setAttribute('style', 'overflow: hidden');
    container.appendChild(embed);

    const loader = document.getElementById('loader') as HTMLElement;
    loader.className = 'hidden_loader';
  }, 1000);
});
