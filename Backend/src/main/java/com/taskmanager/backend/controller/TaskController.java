package com.taskmanager.backend.controller;

import com.taskmanager.backend.exception.ResourceNotFoundException;
import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping("/add")
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("{id}")
    public ResponseEntity<Task> updateTask(@PathVariable long id,@RequestBody Task taskNew){
        Task upTask = taskRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Task doesnt exist"));
        upTask.setTstatus(taskNew.isTstatus());
        taskRepository.save(upTask);
        return ResponseEntity.ok(upTask);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable long id){
        Task delTask = taskRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Task doesnt exist "+id));
        taskRepository.delete(delTask);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
