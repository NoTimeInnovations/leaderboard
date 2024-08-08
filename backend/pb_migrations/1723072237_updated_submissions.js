/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ba00ulr0",
    "name": "Linkedin_Post",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nfzxkaqu",
    "name": "Commit_link",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

  // remove
  collection.schema.removeField("ba00ulr0")

  // remove
  collection.schema.removeField("nfzxkaqu")

  return dao.saveCollection(collection)
})
