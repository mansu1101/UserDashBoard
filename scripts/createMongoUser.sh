#!/usr/bin/env bash
#Creates a database and a user

mongo data_store_point --eval 'db.sample.insert({"name":"test"})'

mongo data_store_point --eval 'db.createUser(
  {
    user: "admin",
    pwd: "password",
    roles: [ { role: "userAdmin", db: "data_store_point" } ]
  }
)'
