<?php
  Error_Reporting(E_ALL & ~E_NOTICE);
  header("content-type: application/json");
    # ---------------------------------------
        include("libs/func.php");
    # ---------------------------------------

  if (count($_GET) > 1)
    {$data = (object)$_GET;}
  elseif (count($_POST) > 0)
    {$data = (object)$_POST;}
  else
    {echo $_GET['callback']. '('. json_encode('0') . ')'; exit();}



    $datas      = json_decode($data->datas);
    $filename   = $data->filename;
   // debug($data->groups);exit;

    $filename = $path_local.'users/'.$_SESSION['user_id'].'/'.$filename.'_'.date('YmdHis').'.csv';
    @mkdir($path_local.'users/'.$_SESSION['user_id']);
    @unlink($filename);

    foreach ($datas as $k => $v)
        { file_put_contents($filename, $k.PHP_EOL, FILE_APPEND); }

    $return['code'] = 1;
    $return['filename'] = $filename;


    echo $_GET['callback']. '('. json_encode($return) . ')';
    exit;

?>




