package org.example.backapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDate;
import java.util.Date;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@EnableScheduling
public class BackAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackAppApplication.class, args);
	}

}
