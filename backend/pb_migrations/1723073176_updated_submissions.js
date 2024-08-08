/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pln85o5b",
    "name": "score",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

  // remove
  collection.schema.removeField("eagk66qu")

  // remove
  collection.schema.removeField("pln85o5b")

  return dao.saveCollection(collection)
})
