<?php

	include('form.html');


	if (isset ($_GET['login'])){

		echo '<pre class="indicators">';
 if(count($_GET) > 14){
	 echo "<p class='alert error'>Получены не корректные данные. Превышено количество значений.</p>";
 }else{
	 echo "<p class='alert info'>Данные успешно получены</p>";
	 $ln  = $_GET['login'];
	 $ps  = $_GET['password'];
	 $psc = $_GET['password-confirm'];
	 $nm  = $_GET['name'];
	 $snm = $_GET['surname'];
	 $fnm = $_GET['fathername'];
	 $bd  = $_GET['birthdate'];
	 $ph  = $_GET['phone'];
	 $ml  = $_GET['email'];
	 $ev  = $_GET['event'];
	 $evd = $_GET['eventdate'];
	 $pl  = $_GET['place'];
	 $rt  = (int)$_GET['rate'];
	 $rv  = htmlspecialchars($_GET['rev'], ENT_HTML5);//преобразовать отзыв в хтмл
	 $newGet = [$ln, $ps, $psc, $nm, $snm, $fnm, $bd, $ph, $ml, $ev, $evd, $pl, $rt, $rv];
 }
		
// LOGIN
		if(preg_match('/^[a-z_\-\d]+$/i', $ln)){
			if(mb_strlen($ln) > 30){
				echo "<i class='rI'></i><p> login need < 30 chars </p><br>";
			}else if(mb_strlen($ln) < 8){
				echo "<i class='rI'></i><p> login need > 8 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> login correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> login not correct </p><br>";
		}

// PASSWORD
		if(preg_match('/[A-Za-z\d\-+#$_]/', $ps)
		   && preg_match('/[A-Z]+/', $ps)
		   && preg_match('/\d+/', $ps)
		   && preg_match('/[a-z]+/', $ps)){
			if(mb_strlen($ps) > 30){
				echo "<i class='rI'></i><p> password need < 30 chars </p><br>";
			}else if(mb_strlen($ps) < 8){
				echo "<i class='rI'></i><p> password need > 8 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> password correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> password not correct </p><br>";
		}
		if( $psc === $ps ){
			echo "<i class='gI'></i><p> password-confirm correct </p><br>";
		}else{
			echo "<i class='rI'></i><p> password-confirm not correct </p><br>";
		}

// NAME
		if(preg_match('/^[a-zа-яё0-9]+$/i', $nm)){
			if(mb_strlen($nm) > 30){
				echo "<i class='rI'></i><p> name need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> name correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> name not correct </p><br>";
		}
		if(preg_match('/^[a-zа-яё0-9]+$/i', $snm)){
			if(mb_strlen($snm) > 30){
				echo "<i class='rI'></i><p> surname need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> surname correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> surname not correct </p><br>";
		}
		if(strlen($fnm) == 0){
			echo "<i class='eI'></i><p> fathername empty </p><br>";
		}elseif(mb_strlen($fnm) > 30){
			echo "<i class='rI'></i><p> fathername need < 30 chars </p><br>";
		}elseif(preg_match('/^[a-zа-яё0-9]+$/i', $fnm)){
			echo "<i class='gI'></i><p> fathername correct </p><br>";
		}else{
			echo "<i class='rI'></i><p> fathername not correct </p><br>";
		}

// BDATES
		function validateDate($date, $format = 'Y-m-d H:i:s'){
			$d = DateTime::createFromFormat($format, $date);
			return $d && $d->format($format) == $date;
		}
		if(validateDate($bd, 'Y-m-d')){
			echo "<i class='gI'></i><p> birthdate true </p><br>";
		}else{
			echo "<i class='rI'></i><p> birthdate false </p><br>";
		}

// PHONE
		if(preg_match('/(?:8|\+7)? ?\(?(\d{3})\)? ?(\d{3})[ -]?(\d{2})[ -]?(\d{2})/', $ph)){
			if(mb_strlen($ph) > 30){
				echo "<i class='rI'></i><p> phone need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> phone correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> phone not correct </p><br>";
		}

// EMAIL
		if(preg_match('/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/', $ml)){
			if(mb_strlen($ml) > 30){
				echo "<i class='rI'></i><p> e-mail need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> e-mail correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> email not correct </p><br>";
		}

	// PLACE
		if(preg_match('/^[,!\?"\'\.\-\w \x7F-\xFF]+$/i', $ev)){
			if(mb_strlen($ev) > 30){
				echo "<i class='rI'></i><p> event need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> event correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> event not correct </p><br>";
		}
// EVENTDATE
		if(validateDate($evd, 'Y-m-d')){
			echo "<i class='gI'></i><p> evd true </p><br>";
		}else{
			echo "<i class='rI'></i><p> evd false </p><br>";
		}
// PLACE
		if(preg_match('/^[,!\?"\'\.\-\w \x7F-\xFF]+$/i', $pl)){
			if(mb_strlen($pl) > 30){
				echo "<i class='rI'></i><p> place need < 30 chars </p><br>";
			}else{
				echo "<i class='gI'></i><p> place correct </p><br>";
			}
		}else{
			echo "<i class='rI'></i><p> place not correct </p><br>";
		}

// RATE
		if(preg_match('/^-?\d+$/', $rt)){
			if($rt < 1 || $rt > 5){
				echo "<i class='rI'></i><p> rate no correct! </p><br>";
			}else{
				echo "<i class='gI'></i><p> rate correct </p><br>";
			}
		}

// REV
		if(strlen($rv) == 0){
			echo "<i class='eI'></i><p> rev empty </p><br>";
		}	else if(mb_strlen($rv) < 255){
			echo "<i class='gI'></i><p> rev correct </p><br>";
		}else{
			echo "<i class='rI'></i><p> rev not correct </p><br>";
		}

		echo "</pre><pre>";
		print_r($newGet);
		echo "</pre>";


	}else{
		echo "Данные не получены";
	}


?>