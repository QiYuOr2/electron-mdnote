const { ipcRenderer } = require('electron');
const Vditor = require('vditor');

const vditor = document.getElementById('editor');

new Vditor('editor', {
  toolbar: [],
  mode: 'ir',
  height: window.innerHeight - 35,
  width: window.innerWidth,
  outline: true,
  debugger: true,
  typewriterMode: true,
  placeholder: `欢迎使用md便签\n右键置顶窗口`,
});

vditor.addEventListener('contextmenu', async function (e) {
  e.preventDefault();
  await ipcRenderer.invoke('right-click');
});

ipcRenderer.on('win-status-change', function (e, top) {
  document.getElementById('status').innerText = top ? '置顶' : '浮动';
});
