<?php

class vkAPI {
	var $client_id; // id приложения
    var $code; // code
	var $client_secret; // пароль приложения
	var $token; // токен, полученый в результате авторизации
	var $success = true; // bool результат успешности выполнения последней операции
	var $error = ''; // описание последней ошибки
	var $result = array(); // результат запроса
    var $user_id;


	function vkAPI($client_id, $client_secret) {
		$this->client_id     = $client_id;
		$this->client_secret = $client_secret;

        if (!empty($_SESSION['vk_token'])){$this->token   = $_SESSION['vk_token'];}
        if (!empty($_SESSION['user_id']) ){$this->user_id = $_SESSION['user_id'];}
	}


	// авторизация на сервисе через логин-пароль пользователя
	function LogIn($code) {
		$url = 'https://oauth.vk.com/access_token?client_id='.$this->client_id.'&client_secret='.$this->client_secret.'&code='.$code.'&redirect_uri=http://localhost/vk_getretarget/login.php';
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$url); // set url to post to
		curl_setopt($ch, CURLOPT_FAILONERROR, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);// allow redirects
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1); // return into a variable
		curl_setopt($ch, CURLOPT_TIMEOUT, 20);
		//curl_setopt($ch, CURLOPT_POST, 1); // set POST method
		//curl_setopt($ch, CURLOPT_POSTFIELDS, "client_id={$this->client_id}&redirect_uri=https://oauth.vk.com/blank.html&display=page&scope=12&response_type=code&client_secret={$this->client_secret}"); // add POST fields
		$result = curl_exec($ch); // run the whole process
		$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);


        #debug($url);
        #file_put_contents('content.html', $result);

		if ($status != 200) {
			$this->_error($result);
			return false;
		}

		$this->_success($result);
		$this->token   = $this->result['access_token'];
        $this->user_id = $this->result['user_id'];

        $_SESSION['vk_token'] = $this->token;
        $_SESSION['user_id']  = $this->user_id;

		return true;
	}

	// сделать запрос
	// https://beta.api-metrika.yandex.ru/stat/v1/data.csv?dimensions=ym:s:regionAreaName,ym:s:genderName,ym:s:ageInterval&metrics=ym:s:visits,ym:s:users&sort=ym:s:regionAreaName,ym:s:genderName,ym:s:ageInterval&id=2138128&oauth_token=05dd3dd84ff948fdae2bc4fb91f13e22
	function MakeQuery($method, $params = array()) {
	    $path = "https://api.vk.com/method/{$method}?";
        $params['access_token'] = $this->token;
        $params['uids']         = $this->user_id;

		foreach ($params as $key=>$value) $path .= "{$key}={$value}&";
        //debug('<a target=_blank  href="'.$path.'">link</a>'); exit;
		if (!$result = @file_get_contents($path)) {
			$this->_error();
			return false;
		}
		$this->_success($result);
		return true;
	}

	// вызывается после каждой успешной операции
	function _success($result) {
		$this->result = json_decode($result, true);
		$this->success = true;
		$this->error = '';
	}
	// вызывается после каждой неуспешной операции
	function _error($desc='') {
		$this->success = false;
		$this->error = json_decode($desc, true);
	}

}



?>