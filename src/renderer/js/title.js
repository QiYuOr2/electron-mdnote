class TitleButtons {
  constructor(closeButton, minButton) {
    this.closeButton = closeButton;
    this.minButton = minButton;
  }

  /**
   * 注册关闭和最小化按钮事件
   */
  register() {
    this.closeButton.addEventListener('click', async function () {
      await ipcRenderer.invoke('window-close');
    });
    this.minButton.addEventListener('click', async function () {
      await ipcRenderer.invoke('window-min');
    });
    return this;
  }
}

new TitleButtons(
  document.getElementById('close'),
  document.getElementById('small')
).register();
