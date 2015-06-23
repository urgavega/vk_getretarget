<?php
include("libs/func.php");
include("libs/func_smarty.php");

    $smarty->assign('user_name', $_SESSION['user_name']);



	$smarty->display ('clean_group_from_dogs.tpl');

    ?>