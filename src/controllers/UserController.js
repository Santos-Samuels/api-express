const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async createUser(request, response) {
    const { name, password, email } = request.body;
    const user = await User.getByEmail(email);

    if (user) {
      return response.status(200).json({
        mensagem: 'Já existe um usuário com esse email!',
      });
    }

    try {
      await User.create({
        name,
        password: await bcrypt.hash(password, 8),
        email,
      });

      return response.status(200).json({
        mensagem: 'User cadastrado com sucesso!',
      });
    } catch (error) {
      return response.status(400).json({
        mensagem: 'Erro ao cadastrar usuário!',
      });
    }
  },

  async listUsers(request, response) {
    try {
      const users = await User.list();

      return response.status(200).json({
        users,
      });
    } catch (error) {
      return response.status(400).json({
        mensagem: 'Nenhum usuário encontrado!',
      });
    }
  },

  async getUserById(request, response) {
    const userId = request.params.id;

    try {
      const user = await User.show(userId);

      if (user) {
        return response.status(200).json({
          user,
        });
      }

      return response.status(400).json({
        mensagem: 'Nenhum usuário encontrado!',
      });
    } catch (error) {
      return response.status(400).json({
        mensagem: 'Erro ao buscar usuário!',
      });
    }
  },

  async deleteUser(request, response) {
    const userId = request.params.id;

    try {
      await User.delete(userId);

      return response.status(200).json({
        mensagem: 'Usuário removido com sucesso',
      });
    } catch (error) {
      return response.status(400).json({
        mensagem: 'Erro ao remover usuário!',
      });
    }
  },

  async updateUser(request, response) {
    const userId = request.params.id;
    const { name, email } = request.body;

    try {
      const user = await User.show(userId);
      var updatedUser = {
        name,
        email: email || user.email,
      };

      await User.update(updatedUser, userId);

      return response.status(200).json({
        mensagem: 'Usuário atualizado com sucesso!',
      });
    } catch (error) {
      return response.status(400).json({
        mensagem: 'Erro ao atualizar usuário!',
      });
    }
  },
};
