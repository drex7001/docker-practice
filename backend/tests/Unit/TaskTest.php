<?php

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(Tests\TestCase::class, RefreshDatabase::class);

it('can create a task', function () {
    // dd(Task::create(['title' => 'Test Task', 'description' => 'Test Description']));
    $task = Task::create(['title' => 'Test Task', 'description' => 'Test Description']);
    // dd($task);
    expect(Task::where('title', 'Test Task')->exists())->toBeTrue();
});

it('can soft delete a task', function () {
    $task = Task::create(['title' => 'Test Task', 'description' => 'Test Description']);
    $task->delete();
    expect(Task::withTrashed()->where('title', 'Test Task')->exists())->toBeTrue();
});