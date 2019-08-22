#!/bin/bash
rm -rf app/db
cd app
mkdir db
sqlite3 db/upload-hmw.db < config/sql-schema.sql
