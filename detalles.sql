-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS untitled_table_191_id_seq

-- Table Definition
CREATE TABLE "public"."detalles" (
    "id" int4 NOT NULL DEFAULT nextval('untitled_table_191_id_seq'::regclass),
    "code_id" varchar,
    "producto_id" numeric,
    "producto_nombre" varchar,
    "createdAt" timestamp,
    "updatedAt" timestamp
);

