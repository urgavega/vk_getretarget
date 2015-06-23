<?php
include("libs/func.php");
include("libs/func_smarty.php");

    $smarty->assign('user_name', $_SESSION['user_name']);



	$smarty->display ('get_users_from_group.tpl');

    ?>