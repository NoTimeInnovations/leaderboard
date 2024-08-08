/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

  // remove
  collection.schema.removeField("eagk66qu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "69o5q4y9",
    "name": "status",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eagk66qu",
    "name": "status",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("69o5q4y9")

  return dao.saveCollection(collection)
})
