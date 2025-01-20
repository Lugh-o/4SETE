<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('filmes', function (Blueprint $table) {
            $table->id();
            $table->text('marca');
            $table->dateTime('validade');
            $table->text('modelo');
            $table->integer('iso');
            $table->dateTime('data_compra');
            $table->text('loja');
            $table->text('valor');
            $table->text('observacoes');
            $table->foreignId('user_id')->constrained('users'); // Foreign key para a tabela users
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filmes');
    }
};
