<?php
try {
    // PHP ^8.1
    enum MyEnum: int
    {
        case gut_id = -4144784863;
    }
    // токен
    $botApiToken = '6938885385:AAGJlfJeG98ufjh91bvR4OcPdKtq059cl_4';

    $channelId = MyEnum::gut_id;

    $text = 'Новая заявка ГУТ';
    $text .= PHP_EOL . '<b>Сайт</b>: <a href="' . $_POST['link'] . '">' . $_POST['title'] . '</a>';
    $text .= PHP_EOL . '<b>Название формы</b>: ' . $_POST['name_form'];
    $text .= PHP_EOL . '<b>ФИО</b>: ' . $_POST['name'];
    $text .= PHP_EOL . '<b>Телефон</b>: ' . $_POST['tel'];

        // формирование параметров
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
} catch (\Throwable $th) {
    echo "Ошибка при выполнении программы" . $th->getMessage();
}
