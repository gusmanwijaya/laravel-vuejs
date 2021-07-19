<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    protected $table = "level";
    protected $primaryKey = "id";
    protected $fillable = ['id', 'nama_level'];

    public function user()
    {
        return $this->hasMany(User::class, 'level_id');
    }
}
