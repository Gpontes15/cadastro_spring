import { useEffect, useState } from 'react';
import { User, getUsers, createUser, updateUser, deleteUser } from '../services/UserService';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({ name: '', email: '', cpf: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    if (data) {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await updateUser(editingId, form);
    } else {
      await createUser(form);
    }

    setForm({ name: '', email: '', cpf: '' });
    setEditingId(null);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setForm(user);
    setEditingId(user.id!);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h1>Cadastro de Usuários</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={form.cpf}
          onChange={(e) => setForm({ ...form, cpf: e.target.value })}
          required
        />
        <button type="submit">{editingId ? 'Atualizar' : 'Cadastrar'}</button>
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.cpf}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id!)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
