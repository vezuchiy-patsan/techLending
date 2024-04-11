<?php

enum MyEnum: int {
    case gut_id = -4144784863;
    case eng_id = -4172454446;
    case tpk_id = -4166978429;
}

$botApiToken = '6938885385:AAGJlfJeG98ufjh91bvR4OcPdKtq059cl_4';
$channelId = MyEnum::gut_id;
$text = 'Hello, I am from PHP!';

$query = http_build_query([
    'chat_id' => $channelId->value,
    'text' => $text,
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
?>