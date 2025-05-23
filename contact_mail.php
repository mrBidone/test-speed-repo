<?php
$toEmail = "hello@twolegit.com";
$mailHeaders = "From: " . $_POST["name"] . "<benny@twolegit.com>\r\nReply-To: ".$_POST['email'] . "\r\n";
$msgbody = "Name: " . $_POST["name"] . "\nEmail: ". $_POST["email"] ."\nCompany: ". $_POST["company"] ."\nPhone: ". $_POST["phone"] ."\nProject Start Date: ". $_POST["startDate"] ."\nAbout the Project: ". $_POST["project"] ."\n";



use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/vendor/phpmailer/src/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/src/SMTP.php';

// passing true in constructor enables exceptions in PHPMailer
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = false; // for detailed debug output
    //$mail->SMTPDebug =2;
    $mail->isSMTP();
    $mail->Host = 'smtp-relay.brevo.com';
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->Username = '8c389a001@smtp-brevo.com'; // YOUR gmail email
    $mail->Password = 'VdOUJYba4rK8mLZ6'; // YOUR gmail password

    // Sender and recipient settings
    $mail->setFrom('benny@twolegit.com',$_POST["name"] );
    $mail->addAddress($toEmail, 'Two Legit');
    $mail->addReplyTo($_POST['email'], $_POST["name"]); // to set the reply to

    // Setting the email content
    $mail->IsHTML(false);
    $mail->Subject = "Two Legit Website Contact Form Submission";
    $mail->Body = $msgbody;
    //$mail->AltBody = 'Plain text message body for non-HTML email client. Gmail SMTP email body.';

    $mail->send();
    echo "<p class='success'>Contact Mail Sent.</p>";
} catch (Exception $e) {
    echo "<p class='Error'>Problem in Sending Mail.</p>";
}






// if(mail($toEmail, "Two Legit website Enquiry" , $msgbody, $mailHeaders)) {
// print "<p class='success'>Contact Mail Sent.</p>";
// } else {
// print "<p class='Error'>Problem in Sending Mail.</p>";
// }
?>