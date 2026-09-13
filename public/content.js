// Real DOM Extraction for Media Detection

setInterval(() => {
  try {
    const hostname = window.location.hostname;
    
    if (hostname.includes('crunchyroll.com')) {
      // Find the currently playing title from the player DOM
      const titleElement = document.querySelector('.current-media-title, h1.title');
      if (titleElement && titleElement.textContent) {
        chrome.runtime.sendMessage({
          type: 'NOW_PLAYING',
          data: {
            title: titleElement.textContent.trim(),
            source: 'Crunchyroll'
          }
        });
      }
    }
    
    // Add logic for Netflix, etc.
  } catch (error) {
    // Fail silently in content script
  }
}, 10000); // Check every 10 seconds
