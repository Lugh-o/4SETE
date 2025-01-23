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
        Schema::create('processos', function (Blueprint $table) {
            $table->id();
            $table->text('nome');
            $table->text('marca')->nullable();
            $table->dateTime('data_compra')->nullable();
            $table->dateTime('validade')->nullable();
            $table->text('loja')->nullable();
            $table->text('valor')->nullable();
            $table->text('observacoes')->nullable();
            $table->integer('quantidade_usos')->nullable();
            $table->integer('vezes_usado');
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processos');
    }
};
