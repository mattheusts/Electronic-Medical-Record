import { ipcRenderer } from 'electron';

window.onload;

ipcRenderer.on('showPDF', (event, res: string) => {
  const container = document.getElementById('root') as HTMLInputElement;

  const embed = document.createElement('iframe');
  embed.setAttribute('src', res);
  embed.setAttribute('width', '500');
  embed.setAttribute('height', '500');
  embed.setAttribute('style', 'overflow: hidden');
  container.appendChild(embed);
});
