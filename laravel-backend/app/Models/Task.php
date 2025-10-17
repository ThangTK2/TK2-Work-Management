<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'assigned_to',
        'created_by',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];

    // Relation tới user được giao
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    // Relation tới user tạo task
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Thêm scope để lọc task theo trạng thái
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
