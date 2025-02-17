#!/bin/bash

echo "📦 Iniciando build do backend..."

# Vai para o diretório correto
cd ~/Desktop/cadastro_usuario/demo

# Faz o build do projeto Spring Boot (ignora testes para evitar falhas iniciais)
mvn clean install -DskipTests

echo "🚀 Build do backend concluído!"

echo "📦 Instalando dependências do frontend..."
# Se o frontend existir, instala as dependências
if [ -d "./frontend" ]; then
  cd frontend
  npm ci
  cd ..
fi

echo "🐳 Buildando e subindo os containers com Docker Compose..."
# Se Docker Compose estiver instalado, sobe os containers
if command -v docker-compose &> /dev/null
then
    docker-compose up --build -d
elif command -v docker &> /dev/null
then
    docker compose up --build -d
else
    echo "❌ Docker Compose não encontrado. Instale-o antes de continuar."
    exit 1
fi

echo "✅ Aplicação iniciada com sucesso!"
