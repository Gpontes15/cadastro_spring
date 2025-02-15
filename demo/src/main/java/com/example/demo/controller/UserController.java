package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.validation.annotation.Validated;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserProducer userProducer;

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        userProducer.sendMessage(user);
        return ResponseEntity.ok("Usuário enviado para o Kafka!");
    }
}

