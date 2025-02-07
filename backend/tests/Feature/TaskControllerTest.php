<?php

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns the latest tasks', function () {
    Task::factory()->count(10)->create();
    $response = $this->getJson('/api/tasks');
    $response->assertStatus(200)->assertJsonCount(5);
});

it('creates a new task', function () {
    $response = $this->postJson('/api/tasks', [
        'title' => 'New Task',
        'description' => 'New Description',
    ]);
    $response->assertStatus(201)->assertJson(['title' => 'New Task']);
    expect(Task::where('title', 'New Task')->exists())->toBeTrue();
});

it('deletes a task', function () {
    $task = Task::factory()->create();
    $response = $this->deleteJson("/api/tasks/{$task->id}");
    $response->assertStatus(200);
    expect(Task::withTrashed()->where('id', $task->id)->exists())->toBeTrue();
});

it('can create a task', function () {
    // dd(Task::create(['title' => 'Test Task', 'description' => 'Test Description']));
    $task = Task::create(['title' => 'Test Task', 'description' => 'Test Description']);
    // dd($task);
    expect(Task::where('title', 'Test Task')->exists())->toBeTrue();
});