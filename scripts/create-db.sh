#!/bin/bash
rm -rf app/db
cd app
mkdir db
sqlite3 db/upload-hmw.db < ./app/config/sql-schema.sql
sqlite3 db/upload-hmw.db < ./app/config/insert-students.sql