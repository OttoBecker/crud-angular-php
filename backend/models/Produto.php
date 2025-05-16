<?php

namespace app\models;

use Yii;

use app\models\Categoria;

/**
 * This is the model class for table "produto".
 *
 * @property int $id
 * @property string $nome
 * @property int $quantidade
 * @property int $categoriaId
 * 
 * @property Categoria $categoria
 */
class Produto extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'produto';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nome', 'quantidade', 'categoriaId'], 'required'],
            [['quantidade', 'categoriaId'], 'integer'],
            [['nome'], 'string', 'max' => 200],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nome' => 'Nome',
            'quantidade' => 'Quantidade',
            'categoriaId' => 'Categoria',
        ];
    }

    /**
     * Gets query for [[Categoria]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getCategoria()
    {
        return $this->hasOne(Categoria::class, ['id' => 'categoriaId']);
    }

}
