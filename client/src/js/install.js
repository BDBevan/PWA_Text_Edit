const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Remove the hidden class from the install button (if it's hidden)
  butInstall.style.display = 'block';

  console.log('👍', 'beforeinstallprompt fired');
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  console.log('👍', 'Install button clicked');
  
  if (!deferredPrompt) {
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  console.log('👍', 'User response to the install prompt:', outcome);

  // Clear the deferred prompt
  deferredPrompt = null;

  // Hide the install button after user action
  butInstall.style.display = 'none';
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'App installed', event);
  
  // Optionally, hide the install button once the app is installed
  butInstall.style.display = 'none';
});
