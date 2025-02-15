package com.example.demo.service;

import com.example.demo.model.User;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
@RequiredArgsConstructor
public class UserProducer {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserProducer.class);
    private static final String TOPIC = "user-topic";

    private final KafkaTemplate<String, String> kafkaTemplate;  // Alterado para String
    private final ObjectMapper objectMapper;  // Jackson para converter JSON

    public void sendMessage(User user) {
        try {
            String userJson = objectMapper.writeValueAsString(user); // Convertendo para JSON
            LOGGER.info("Enviando usuário: {}", userJson);
            kafkaTemplate.send(TOPIC, userJson);
        } catch (JsonProcessingException e) {
            LOGGER.error("Erro ao serializar usuário", e);
        }
    }
}
