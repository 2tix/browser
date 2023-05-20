const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    setUrl: url => ipcRenderer.send('url', url)
})