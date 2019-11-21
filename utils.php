<?php 
$API_BASE = 'http://18.184.88.79:3001';
if(isset($_POST['getArrTr'])){
    $url = $API_BASE . '/words/tr/many';
    $headers = array(
        'Content-type: application/json'
    );
    $data = '{"arr":' . json_encode($_POST['getArrTr']) . '}';
    $result = postRequest($url, $data, $headers);
    echo($result);
    return;
}


function postRequest($url, $postData, $headers){
    //init curl:
    $ch = curl_init($url);
    // Configuring curl options
    $options = array(
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_HTTPHEADER => $headers
    );
    
    // Setting curl options
    curl_setopt_array( $ch, $options );
    // Getting results
    $result = curl_exec($ch); // Getting jSON result string
    $info = curl_getinfo($ch);
    curl_close($ch);
    $responseCode = $info['http_code'];
    return $result;
}
?>