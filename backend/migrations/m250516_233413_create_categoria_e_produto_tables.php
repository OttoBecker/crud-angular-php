<?php

use yii\db\Migration;

class m250516_233413_create_categoria_e_produto_tables extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->execute('CREATE DATABASE IF NOT EXISTS `crud_angular_php`');
        
        $this->execute('USE `crud_angular_php`');
        
        $this->createTable('categoria', [
            'id' => $this->primaryKey(),
            'nome' => $this->string(100)->notNull(),
        ]);

        $this->batchInsert('categoria', ['id', 'nome'], [
            [1, 'Esportes'],
            [2, 'Eletrônicos'],
            [3, 'Lazer']
        ]);

        $this->createTable('produto', [
            'id' => $this->primaryKey(),
            'nome' => $this->string(200)->notNull(),
            'quantidade' => $this->integer()->notNull(),
            'categoriaId' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-produto-categoriaId',
            'produto',
            'categoriaId',
            'categoria',
            'id',
            'CASCADE',
            'CASCADE'
        );

         $this->batchInsert('produto', ['id', 'nome', 'quantidade', 'categoriaId'], [
            [1, 'Bola', 12, 1],
            [2, 'Livros', 48, 3],
            [3, 'PS5', 3, 2],
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-produto-categoriaId', 'produto');

        $this->dropTable('produto');
        $this->dropTable('categoria');
    }
}
