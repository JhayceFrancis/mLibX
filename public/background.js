// Real Background Worker for mLibX Extension

chrome.runtime.onInstalled.addListener(() => {
  console.log("mLibX Extension Installed and Active");
});

// Listen for messages from content scripts regarding media detection
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'NOW_PLAYING') {
    console.log("mLibX Engine - Media Detected:", message.data);
    // In a full extension environment, this triggers a write to IndexedDB or syncs via the engine.ts API.
  }
});
