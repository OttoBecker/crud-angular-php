<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\filters\ContentNegotiator;
use yii\filters\Cors;
use yii\web\Response;
use app\models\Produto;

class ProdutoController extends ActiveController
{
    public $modelClass = 'app\models\Produto';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $cors = [
            'class' => Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:4200'],
                'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age' => 86400,
                'Access-Control-Allow-Headers' => ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
            ],
        ];

        unset($behaviors['corsFilter']);
        $behaviors = array_merge(['corsFilter' => $cors], $behaviors);

        $behaviors['contentNegotiator'] = [
            'class' => ContentNegotiator::class,
            'formats' => [
                'application/json' => Response::FORMAT_JSON,
            ],
        ];

        return $behaviors;
    }


    public function actionFiltrar()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $params = Yii::$app->request->bodyParams;

        $query = Produto::find();

        if (!empty($params['nome'])) {
            $query->andWhere(['like', 'nome', $params['nome']]);
        }

        if (!empty($params['categoriaId'])) {
            $query->andWhere(['categoriaId' => $params['categoriaId']]);
        }

        if (!empty($params['quantidadeInicial'])) {
            $query->andWhere(['>=', 'quantidade', $params['quantidadeInicial']]);
        }

        if (!empty($params['quantidadeFinal'])) {
            $query->andWhere(['<=', 'quantidade', $params['quantidadeFinal']]);
        }

         $produtos = $query->all();

        $resultado = array_map(function($produto) {
            return [
                'id' => $produto->id,
                'nome' => $produto->nome,
                'quantidade' => $produto->quantidade,
                'categoriaNome' => $produto->categoria->nome ?? null
            ];
        }, $produtos);

    return $resultado;
    }

    // public function actionOptions()
    // {
    //     \Yii::$app->response->format = Response::FORMAT_JSON;
    //     return ['message' => 'OK']; // Responder a solicitação OPTIONS com um status 200 OK
    // }
}
