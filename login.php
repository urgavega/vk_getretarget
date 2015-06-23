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

        $_SESSION['user_name'] = $v['first_name'].' '.$v['last_name'];
        break;
    }

/*
    if ($_SESSION['auth'] == 1){unset($_SESSION['auth']);}

//debug($_POST);


if (!empty($_POST['login']))
{
           // api.cultserv.ru/jtransport/auth/login?auth_data=
           // где authdata = base64_encode( $login . ":"  . $password)
            unset($request);
                $request['auth_data'] = base64_encode( $_POST['login'] . ":"  . $_POST['password']);
                $api_response    = $cultserv->auth->login($request);

//debug($api_response); exit;



    if ($api_response->code != 1)
      {

          $error['error_msg'] = 'The authentication fails.';
          $smarty->assign('error', $error);

            $smarty->assign('error',   $error);
          	unset($_SESSION['auth']);


      }
    else
      {
           #debug($_SESSION['referrals']);
         $_SESSION['auth'] = 1;
         header('Location: ya_report.php');
         exit;
      }
}
*/
 //$_SESSION['ID'] = 1;
 #
 //header('Location: vidget_admin.php');
 ///exit;

	//$smarty->display ('login.tpl');

?>




