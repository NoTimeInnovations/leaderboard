/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

  // remove
  collection.schema.removeField("69o5q4y9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yopucux7",
    "name": "field",
    "type": "email",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dffhmdgx",
    "name": "status",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("on7gqu744ukhrlj")

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

  // remove
  collection.schema.removeField("yopucux7")

  // remove
  collection.schema.removeField("dffhmdgx")

  return dao.saveCollection(collection)
})
