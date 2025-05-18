<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';

$receiving_email_address = 'dabalos.gerald@dnsc.edu.ph';

// Validate inputs
if(empty($_POST['name']) || empty($_POST['email']) || empty($_POST['message'])) {
    die(json_encode(['status' => 'error', 'message' => 'All fields are required']));
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'dabalos.gerald@dnsc.edu.ph';
    $mail->Password = 'hesl rldy oqxh elcr';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Sender and recipient
    $mail->setFrom('dabalos.gerald@dnsc.edu.ph', $_POST['name']); 
    $mail->addReplyTo($_POST['email'], $_POST['name']); 
    $mail->addAddress($receiving_email_address);
    
    // Email content
    $mail->Subject = $_POST['subject'] ?: 'No Subject Provided';  
    $mail->Body = $_POST['message']; 

    $mail->send();
    echo "OK";
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => "Message could not be sent. Error: {$mail->ErrorInfo}"]);
}