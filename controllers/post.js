const pkg = require("@prisma/client")
const { PrismaClient } = pkg
const prisma = new PrismaClient()
const { post } = prisma

const getAll = async (req, res) => {
  try {
    const data = await post.findMany()
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
    const data = await post.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    data
      ? res.status(200).send(data)
      : res.status(404).send({
        message: err.message || `Post ${id} inexistant`
      })
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la récupération des données"
    })
  }
}

const create = async (req, res) => {
  const { user_id, title, content, description } = req.body

  try {
    await post.create({
      data: {
        user_id: parseInt(user_id),
        title,
        content,
        description
      }
    })
    res.status(201).send("Post ajouté")
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de l'ajout du Post"
    })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { title, content, description } = req.body

  try {
    await post.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title,
        content,
        description
      }
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
    await post.delete({
      where: {
        id: parseInt(id)
      }
    })

    res.sendStatus(204)

  }
  catch(err){
    res.status(500).send({
      message: err.message || "Erreur lors de la suppression du post"
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
