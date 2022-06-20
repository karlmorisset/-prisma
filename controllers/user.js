const pkg = require("@prisma/client")
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { user, post } = prisma

const getAll = async (req, res) => {
  try {
    const data = await user.findMany()
    res.status(200).send(data)
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la récupération des données"
    })
  }
}


const get = async (req, res) => {
  const { id } = req.params

  try {
    const data = await user.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    data
      ? res.status(200).send(data)
      : res.status(404).send({
        message: err.message || `Utilisateur ${id} inexistant`
      })
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la récupération des données"
    })
  }
}

const create = async (req, res) => {
  try {
    await user.create({data: {...req.body}})
    res.status(201).send("Utilisateur ajouté")
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de l'ajout de l'utilisateur"
    })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body

  try {
    await user.update({
      where: {
        id: parseInt(id)
      },
      data: {name, email}
    })

    res.sendStatus(204)

  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la mise à jour des données"
    })
  }
}


const destroy = async (req, res) => {
  const { id } = req.params

  try {
    await post.deleteMany({
      where: {
        user_id: parseInt(id)
      }
    })

    await user.delete({
      where: {
        id: parseInt(id)
      }
    })

    res.sendStatus(204)

  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la suppression de l'utilisateur"
    })
  }
}

module.exports = {
  getAll,
  get,
  create,
  update,
  delete: destroy
}
