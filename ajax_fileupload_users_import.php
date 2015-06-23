<?php
include("libs/func.php");
# ---------------------------------------
# ---------------------------------------


    foreach ($_FILES as $k => $v)
        { $file = $v; break; }

/*
    if (count($_POST) > 0)
        {$data_src = (object)$_POST;}
    else
        {echo $_GET['callback']. '('. json_encode('0') . ')'; exit();}

*/

/**
$_FILES
Array
(
    [fileToUpload] => Array
        (
            [name] => phone_305597118650703576.csv
            [type] => application/vnd.ms-excel
            [tmp_name] => Z:\tmp\php5E4E.tmp
            [error] => 0
            [size] => 4975
        )

)
/**/


    $code = 0;
	if(!empty($file['error']))
	{
		switch($file['error'])
		{

			case '1':
				$error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
				break;
			case '2':
				$error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
				break;
			case '3':
				$error = 'The uploaded file was only partially uploaded';
				break;
			case '4':
				$error = 'No file was uploaded.';
				break;
			case '6':
				$error = 'Missing a temporary folder';
				break;
			case '7':
				$error = 'Failed to write file to disk';
				break;
			case '8':
				$error = 'File upload stopped by extension';
				break;
			case '999':
			default:
				$error = 'No error code avaiable';
		}
	}
	elseif(empty($file['tmp_name']) || $file['tmp_name'] == 'none')
	{
		$error = 'No file was uploaded..';
	}
	elseif(strpos($file['type'], 'excel') * 1 == 0  and strpos($file['type'], 'csv') * 1 == 0  and strpos($file['type'], 'comma-separated-values') * 1 == 0)
	{
		$error = 'No CSV file was uploaded..';
	}
	else
	{
         $code  = 1;
         $error = '';

        /**
        $results = print_r($file, true);
        file_put_contents("debug.html", "<pre>".$results."\n\n</pre><br>", FILE_APPEND);
        /**/

        $arr_data = array();
        if (($handle = fopen($file['tmp_name'], "r")) !== FALSE)
         {
             while (($data = fgetcsv($handle)) !== FALSE)
             {
                 $data['0'] = trim($data['0'], " \t\n\r\0\x0B");
                 $data['0'] = mb_strtolower($data['0'], 'UTF-8');

                 if(!empty($data['0'])){$arr_data[] = $data['0'];}
             }
             fclose($handle);
         }
        $arr_data = array_unique($arr_data);

        $return['users'] = $arr_data;
	}


	$return['code']  = $code;
	$return['error'] = $error;

	//echo json_encode($return);
    echo $_GET['callback']. '('. json_encode($return) . ')'; exit();
?>