package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class UserConsumer {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserConsumer.class);

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper; // Jackson para converter JSON

    @KafkaListener(topics = "user-topic", groupId = "user-group")
    public void consume(String message) {  // Agora recebe uma String (JSON)
        try {
            User user = objectMapper.readValue(message, User.class); // Converte JSON para objeto
            LOGGER.info("Recebendo usuário do Kafka: {}", user);
            userRepository.save(user);
        } catch (Exception e) {
            LOGGER.error("Erro ao desserializar mensagem do Kafka", e);
        }
    }
}

