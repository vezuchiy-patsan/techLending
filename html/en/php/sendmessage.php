<?php
echo 'Message has been sent';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once '../php/phpmailer/Exception.php';
require_once '../php/phpmailer/phpmailer.php';
require_once '../php/phpmailer/smtp.php';


$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

// Настройки SMTP
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;
$mail->Host = 'ssl://smtp.mail.ru';
$mail->Port = 465;
$mail->Username = 'info@garveks.ru';
$mail->Password = 'jp8k3kyTFrtcc2SirTiN';

// От кого
$mail->setFrom('info@garveks.ru', 'Info');

// Кому
$mail->addAddress('d.ahiyan@garveks.ru', 'Smart');
// $mail->addAddress('sale@garveks.ru', 'Sale');

// Тема письма
$mail->Subject = 'Новая заявка c garvex.tech';

// Тело письма
//Тело письма
$userphone = $_POST['tel'];
$username = $_POST['name'];
isset($_POST['email']) ? $useremail = nl2br($_POST['email']) : $usertext = nl2br($_POST['message']);
$usertitle = $_POST['title'];

$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новая заявка</h2>\r\n";
$msg .= "<p><strong>Имя:</strong> " . $username . "</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> " . $userphone . "</p>\r\n";
$msg .= "</body></html>";

$body = $msg;
$mail->msgHTML($body);

if ($mail->send()) {
	echo 'Message has been sent';
} else {

	echo 'Message could not be sent.';

	echo 'Mailer Error: ' . $mail->ErrorInfo;
}
