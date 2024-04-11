<?php

enum MyEnum: int
{
    case gut_id = -4144784863;
    case eng_id = -4172454446;
    case tpk_id = -4166978429;
    case test_dan = 180823165;
}

$botApiToken = '6938885385:AAGJlfJeG98ufjh91bvR4OcPdKtq059cl_4';
$channelId = MyEnum::test_dan;
$text = '<p><b>Привет</b></p>';
$text .=  '<strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<tg-emoji emoji-id="5368324170671202286">👍</tg-emoji>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
<blockquote>Block quotation started\nBlock quotation continued\nThe last line of the block quotation</blockquote>';

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
        // echo 'Значение": ' . $responseArray['result'];
    } else {
        // echo 'Ошибка: ' . $responseArray['error_code'];
        // echo 'Описание: ' . $responseArray['description'];
    }
}
curl_close($curl);
