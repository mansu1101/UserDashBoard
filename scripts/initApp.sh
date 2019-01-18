#!/usr/bin/env bash

# Creates a database and register an Admin user.
mongo data_store_point --eval 'db.user.insert({
"username" : "Manish",
"mobile": 9672281491,
"email" : "manish.joshi89@gmail.com",
"password" : "$2b$10$XvhQsSUr.cV8Wn5NPS7SSOHben1RTsrkWHvLL0eBXbg.gf5gmInl2",
"role" : "Admin",
"isActive" : true
})'