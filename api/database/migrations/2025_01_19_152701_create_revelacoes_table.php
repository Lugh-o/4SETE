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
        Schema::create('revelacoes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('filme_id')->constrained('filmes'); // Foreign key para a tabela filmes
            $table->foreignId('camera_id')->constrained('cameras'); // Foreign key para a tabela cameras
            $table->foreignId('processo_id')->constrained('processos'); // Foreign key para a tabela processos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revelacoes');
    }
};
