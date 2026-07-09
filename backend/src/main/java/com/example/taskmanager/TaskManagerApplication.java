package com.example.taskmanager;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.model.TaskStatus;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class TaskManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagerApplication.class, args);
    }

    @Bean
    CommandLineRunner init(TaskRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        new Task("Plan sprint goals", "Outline the key deliverables for the week.", TaskStatus.TODO, LocalDate.now().plusDays(2)),
                        new Task("Draft onboarding checklist", "Prepare the welcome steps for new team members.", TaskStatus.IN_PROGRESS, LocalDate.now().plusDays(5)),
                        new Task("Review deployment steps", "Confirm the rollout plan and backup strategy.", TaskStatus.DONE, LocalDate.now().minusDays(1))
                ));
            }
        };
    }
}
