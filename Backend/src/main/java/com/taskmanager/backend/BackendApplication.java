package com.taskmanager.backend;

import com.taskmanager.backend.model.Task;
import com.taskmanager.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public void run(String... args) throws Exception {
		Task task=new Task();
		task.setTname("Complete HW");
		task.setTstatus(false);
		taskRepository.save(task);
	}
}
