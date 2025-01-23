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
        Schema::create('revelacaos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('filme_id')->references('id')->on('filmes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('camera_id')->references('id')->on('cameras')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('processo_id')->references('id')->on('processos')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('foi_concluida');
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revelacaos');
    }
};
