<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department;

class Students extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'department_id',
        'profile_img'
    ];

    /**
     * Get the phone associated with the user.
     */
    public function department()
    {
        return $this->hasOne(Department::class);
    }
}
