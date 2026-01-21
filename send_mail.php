<?php
// send_mail.php

// 1. Set headers to return JSON
header('Content-Type: application/json');

// 2. Check if the request is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 3. Sanitize and Get Input
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"])); // Optional
    $message = strip_tags(trim($_POST["message"]));

    // 4. Validate Inputs
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please complete the form correctly."]);
        exit;
    }

    // 5. Email Settings
    // RECIPIENT: This is where you receive the email
    $recipient = "ID.TV.1@proton.me"; 
    $subject = "New Inquiry from IDTV Website: $name";

    // 6. Build the Email Content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // 7. Build Email Headers
    // IMPORTANT: 'From' should be an email address on YOUR server domain to avoid spam filters.
    // Replace 'noreply@yourdomain.com' with something like 'noreply@idtv-eire.com' once you have a domain.
    // For now, using the user's email as 'From' might work but is less reliable than using 'Reply-To'.
    $email_headers = "From: IDTV Web Form <noreply@yourdomain.com>\r\n";
    $email_headers .= "Reply-To: $email\r\n";
    $email_headers .= "X-Mailer: PHP/" . phpversion();

    // 8. Send the Email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Server error. Please try WhatsApp."]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Forbidden."]);
}
?>