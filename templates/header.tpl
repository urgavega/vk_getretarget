{config_load file="vidget.conf" section="setup"}
{*include file="header.tpl" Name="Рассылка" title="Виджет"*}

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>



		<title>VK_getRetarget</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
        <meta name="keywords" content="#keywords()" />
        <meta http-equiv="Cache-control" content="no-cache">

				<meta http-equiv="Pragma" content="no-cache">
				<meta http-equiv="Expires" content="-1">

			  <link type="text/css"         href="libs/jquery/jquery.css" media="screen" rel="stylesheet">
			  <script src="libs/jquery/jquery-2.1.3.min.js" type="text/javascript"></script>


        <script type="text/javascript" src="libs/jquery/jquery.nano.js"></script>

        <script type="text/javascript" src="libs/jquery/moment.min.js"></script>





                <link   type="text/css"       href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet">
				<script type="text/javascript" src="libs/bootstrap/js/bootstrap.min.js"></script>



        <!--script type="text/javascript" src="libs/jquery/jquery.activity-indicator-1.0.0.min.js"></script-->

     {literal}
        <style>
            .loader {
                background: transparent url(libs/ajax-loader-red.gif) center no-repeat !important;
                color: #000;
                z-index:99;
                margin-left:  auto;
                margin-right: auto;
            }
        </style>
     {/literal}
</head>
<body>


<div class="container">

<br>
    <div class="row">
        <div class="col-md-1">&nbsp;</div>
        <div class="col-md-9">&nbsp;</div>
        <div class="col-md-2">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
                    Menu
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="index.php">Index</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="groups_search.php">Groups Search</a></li>
                    <li class="divider" role="presentation"></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="login.php">LogOut</a></li>
                </ul>
            </div>
        </div>

    </div>

