#!/bin/bash
rm -rf $ACELERADORA_ADM_DB_NAME
sqlite3 $ACELERADORA_ADM_DB_NAME < ./app/migrations/001-initial.sql
sqlite3 $ACELERADORA_ADM_DB_NAME < ./app/migrations/002-insert-students.sql