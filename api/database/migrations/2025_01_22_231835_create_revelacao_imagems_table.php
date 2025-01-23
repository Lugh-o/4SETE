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
        Schema::create('revelacao_imagems', function (Blueprint $table) {
            $table->id();
            $table->text('nome');
            $table->binary('imagem');
            $table->foreignId('revelacao_id')->references('id')->on('revelacaos')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revelacao_imagems');
    }
};
