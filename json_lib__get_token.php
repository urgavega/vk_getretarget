<?php
  Error_Reporting(E_ALL & ~E_NOTICE);
  header("content-type: application/json");
    # ---------------------------------------
        include("libs/func.php");
    # ---------------------------------------


    $return['user_name']    = $_SESSION['user_name'];
    $return['vk_token']     = $_SESSION['vk_token'];
    $return['user_id']      = $_SESSION['user_id'];


    echo $_GET['callback']. '('. json_encode($return) . ')';
    exit;

?>




