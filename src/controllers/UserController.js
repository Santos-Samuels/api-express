const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async createUser(request, response) {
    const { name, password, email } = request.body;
    const user = await User.getByEmail(email);

    if (user) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Já existe um usuário com esse email!',
      });
    }

    try {
      await User.create({
        name,
        password: await bcrypt.hash(password, 8),
        email,
      });

      return response.status(200).json({
        statusCode: 200,
        message: 'User cadastrado com sucesso!',
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Erro ao cadastrar usuário!',
      });
    }
  },

  async listUsers(request, response) {
    try {
      const users = await User.list();

      return response.status(200).json({
        statusCode: 200,
        users,
      });
    } catch (error) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Nenhum usuário encontrado!',
      });
    }
  },

  async getUserById(request, response) {
    const userId = request.params.id;

    try {
      const user = await User.show(userId);

      if (user) {
        return response.status(200).json({
          statusCode: 200,
          user,
        });
      }

      return response.status(400).json({
        statusCode: 400,
        message: 'Nenhum usuário encontrado!',
      });
    } catch (error) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Erro ao buscar usuário!',
      });
    }
  },

  async deleteUser(request, response) {
    const userId = request.params.id;

    try {
      await User.delete(userId);

      return response.status(200).json({
        statusCode: 200,
        message: 'Usuário removido com sucesso',
      });
    } catch (error) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Erro ao remover usuário!',
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
        statusCode: 200,
        message: 'Usuário atualizado com sucesso!',
      });
    } catch (error) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Erro ao atualizar usuário!',
      });
    }
  },
};
