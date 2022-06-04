const router = require('express').Router();
const Person = require('../models/Person');

// Create - criação de dados
router.post('/', async (req, res) => {
  // req.body - corpo da requisição, onde vai chegar os dados
  // {name: 'Cesar', salary: 5000, approved: False}
  const { name, salary, approved } = req.body;

  if (!name) {
    res.status(422).json({ error: 'o nome é obrigatório!' });
    return;
  }

  const person = {
    name,
    salary,
    approved,
  };

  // Create
  try {
    // Criando dados
    await Person.create(person);

    res.status(201).json({ message: 'Pessoa inserida com sucesso!' });
  } catch (error) {
    // se der erro, atribuir para um erro do servidor (http code 500)
    res.status(500).json({ error: error });
  }
});

// Read - leitura de dados
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Read - leitura de dado unico
router.get('/:id', async (req, res) => {
  // Extrair o dado da requisição, pela url = req.params
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ message: 'O usuario não foi encontrado!' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Update - atualizando dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
  // url vem com o id do usuario, e o body vaim com os dados que precisam ser atualizados
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);

    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ message: 'O usuario não foi encontrado!' });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DELETE - deletando dados

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ message: 'o usuario não foi encontrado!' });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });
    res.status(200).json({ message: 'Usuario removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
