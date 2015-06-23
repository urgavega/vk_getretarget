<?php
session_start();
Error_Reporting(E_ALL & ~E_NOTICE);
ini_set("max_execution_time", "0");
set_time_limit(0);
date_default_timezone_set("Europe/Moscow");

include("libs/func.php");
include("libs/func_smarty.php");



    unset($request);
    $method = 'users.get';
    $request['fields']  = 'uid,first_name,last_name,screen_name,sex,bdate,photo_big';
        $vkapi->MakeQuery($method,$request);


    if(empty($vkapi->result['response']))
    {debug('Error: Empty response from API'); debug($api); exit;}



    foreach ($vkapi->result['response'] as $k => $v)
    {
        debug($v);
        //$_SESSION['user_name'] = $v;
    }

?>




