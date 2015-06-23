<?php
session_start();
Error_Reporting(E_ALL & ~E_NOTICE);
ini_set("max_execution_time", "360");
set_time_limit(0);
date_default_timezone_set("Europe/London");


//unset($_SESSION);
//debug($_SESSION);


        #logout
        if(!empty($_SESSION['vk_token']) and substr_count( $_SERVER['SCRIPT_FILENAME'], "login.php" ) != 0)
            {
                unset($vkapi);
                unset($_SESSION['vk_token']);
                unset($_SESSION['user_id']);
                unset($_SESSION['user_name']);
                debug('Logout done');
                exit;
            }


        //unset($_SESSION['vk_token']);
        $client_id     = '4812755';
        $client_secret = 'S0hi3O1hpqNmKKfNA6SJ';
        include("libs/vk_oauth.php");






if (empty($_SESSION['vk_token']) and empty($_GET['code']))
{
    header('Location: https://oauth.vk.com/authorize?client_id='.$client_id.'&scope=notify,friends,photos,audio,video,docs,notes,pages,status,offers,questions,groups,notifications,stats,ads,offline&redirect_uri=http://localhost/vk_getretarget/login.php&response_type=code');
    exit;
}
elseif (empty($_SESSION['vk_token']) and !empty($_GET['code']))
{
    $vkapi = new vkAPI($client_id, $client_secret);
    $vkapi->LogIn($_GET['code']);
}
else
{
    $vkapi = new vkAPI($client_id, $client_secret);
}


//debug($_SESSION); //exit;

  if ($_SERVER[SERVER_NAME] == 'localhost')
    {
    	$url_main_domain = "http://localhost/vk_getretarget/";
    	$path_local      = '';

        /*
        $host_name  = "localhost";
        $database   = "db565188427";
        $user_name  = "root";
        $password   = "";


        $mysqli = new mysqli($host_name, $user_name, $password, $database);

        if (mysqli_connect_errno())
            {printf("Connect failed: %s\n", mysqli_connect_error()); exit;}
        */
    }
  else
    {
        /*
    	$url_main_domain = "http://acc.chromainteriors.co.uk/system/";
        $path_local      = '';
        //debug($path_local);

        $host_name  = "db565188427.db.1and1.com";
        $database   = "db565188427";
        $user_name  = "dbo565188427";
        $password   = "I7VRBxrXlq";

        $mysqli = new mysqli($host_name, $user_name, $password, $database);

        if (mysqli_connect_errno())
            {printf("Connect failed: %s\n", mysqli_connect_error()); exit;}
        */
    }




if(empty($_SESSION['vk_token']) and substr_count( $_SERVER['SCRIPT_FILENAME'], "login.php" ) == 0)
    {header('Location: '.$url_main_domain.'login.php'); exit;}



function debug($data)
{
	echo "<pre>";
	print_r($data);
	echo "</pre>";
}

?>