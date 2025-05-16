<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
    'on afterOpen' => function($event) {
        $db = $event->sender;
        $dbName = 'crud_angular_php';

        $command = $db->createCommand("CREATE DATABASE IF NOT EXISTS `$dbName`");
        $command->execute();

        $db->createCommand("USE `$dbName`")->execute();
    }
]; 