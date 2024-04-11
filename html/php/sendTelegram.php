<?php
// $text = 'Новая заявка #1111';
// $text .= PHP_EOL.'<b>Сайт</b>: <a href="tel:89052714903">адрес</a>';
// $text .= PHP_EOL.'<b>Страница</b>: Название страницы - <a href="https://garvex.tech">Адрес страницы</a>';
// $text .= PHP_EOL.'<b>Название формы</b>: Название формы';
// $text .= PHP_EOL.'<b>Номер заявки</b>: id';
// $text .= PHP_EOL.'<b>ФИО</b>: ФИО';
// $text .= PHP_EOL.'<b>Телефон</b>: <a href="tel:89052714903">номер</a>';
// $text .= PHP_EOL.'<b>Почта</b>: <a href="mailto:daniil.axiyan.316@mail.ru">почта</a>';
// $text .= PHP_EOL.'<b>Сообщение</b>: Сообщение'; 

enum MyEnum: int
{
    case gut_id = -4144784863;
    case eng_id = -4172454446;
    case tpk_id = -4166978429;
    case test_dan = 180823165;
}

$botApiToken = '6938885385:AAGJlfJeG98ufjh91bvR4OcPdKtq059cl_4';
$channelId = MyEnum::test_dan;
$text = 'Новая заявка';
$text .= PHP_EOL.'<b>Сайт</b>: <a href="'.$_POST['link'].'">'.parse_url($_POST['title'])['host'].'</a>';
$text .= PHP_EOL.'<b>Название формы</b>: '.$_POST['name_form'];
$text .= PHP_EOL.'<b>ФИО</b>: '.$_POST['name'];
$text .= PHP_EOL.'<b>Телефон</b>: '.$_POST['tel'];
$text .= PHP_EOL.'<b>Сообщение</b>: '.nl2br($_POST['message']); 

$query = http_build_query([
    'chat_id' => $channelId->value,
    'text' => $text,
    'parse_mode' => 'HTML'
]);
$url = "https://api.telegram.org/bot{$botApiToken}/sendMessage?{$query}";

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CUSTOMREQUEST => 'POST',
));

$response = curl_exec($curl);

if ($response === false) {
    // Если curl_exec вернул false, это означает, что произошла ошибка
    echo 'Curl error: ' . curl_error($curl);
} else {
    // Преобразование JSON-строки в ассоциативный массив
    $responseArray = json_decode($response, true);

    // Проверка на наличие ключа 'ok' в массиве
    if ($responseArray['ok'] === true) {
        echo 'Значение": ' . $responseArray['result'];
    } else {
        echo 'Ошибка: ' . $responseArray['error_code'];
        echo 'Описание: ' . $responseArray['description'];
    }
}
curl_close($curl);
