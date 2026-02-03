package com.backend.chirp.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @GetMapping("/")
    public String hello() {
        return "Hello World Chirp is running!";
    }
}
