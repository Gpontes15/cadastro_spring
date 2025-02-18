import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/users',
});

export interface User {
  id?: number;
  name: string;
  email: string;
  cpf: string;
}

export const getUsers = async () => {
  try {
    const response = await api.get<User[]>('');
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const createUser = async (user: User) => {
  try {
    console.log('Enviando usuário para o backend:', user);
    const response = await api.post('', user);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const updateUser = async (id: number, user: User) => {
  try {
    const response = await api.put(`${id}`, user);
    return response.data;
  } catch (error) {
    handleError(error as AxiosError);
  }
};

export const deleteUser = async (id: number) => {
  try {
    await api.delete(`${id}`);
  } catch (error) {
    handleError(error as AxiosError);
  }
};

// Função para tratar os erros de forma mais eficiente
const handleError = (error: AxiosError) => {
  if (error.response) {
    // A requisição foi feita, mas o servidor respondeu com status diferente de 2xx
    console.error('Erro na requisição:', error.response.data);
    throw new Error(`Erro: ${error.response.status} - ${error.response.data}`);
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta
    console.error('Sem resposta do servidor:', error.request);
    throw new Error('Erro: Não houve resposta do servidor.');
  } else {
    // Algo aconteceu ao configurar a requisição
    console.error('Erro ao configurar a requisição:', error.message);
    throw new Error(`Erro ao enviar a requisição: ${error.message}`);
  }
};
