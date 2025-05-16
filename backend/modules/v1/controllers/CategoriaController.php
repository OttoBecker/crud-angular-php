<?php

namespace app\modules\v1\controllers;

use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\web\Response;

class CategoriaController extends ActiveController
{
    public $modelClass = 'app\models\Categoria';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:4200'],
                'Access-Control-Request-Method' => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Request-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'accept', 'Authorization']
            ],
        ];

        return $behaviors;
    }
}
