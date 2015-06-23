<?php
require_once($root . 'libs/Smarty-3.1.5/libs/Smarty.class.php');
$smarty = new Smarty();
$smarty->template_dir = $path . 'templates/';
$smarty->compile_dir  = $path . 'templates_c/';
$smarty->config_dir   = $path . 'configs/';
$smarty->cache_dir    = $path . 'cache/';
	//** раскомментируйте следующую строку для отображения отладочной консоли
	#$smarty->debugging = true;

?>