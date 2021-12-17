-- This script only contains the table creation statements and does not fully represent the table in database. It's still missing: indices, triggers. Do not use it as backup.

-- Squences
CREATE SEQUENCE IF NOT EXISTS cabeceras_id_seq

-- Table Definition
CREATE TABLE cabeceras (
    "id" int4 DEFAULT nextval('cabeceras_id_seq'::regclass),
    "AREA" varchar NOT NULL,
    "CODE" varchar NOT NULL,
    "DATE" date NOT NULL,
    "HOUR" time NOT NULL,
    "IDENTIFICATIONTYPE" varchar NOT NULL,
    "IDENTIFIER" numeric NOT NULL,
    "NAME" varchar NOT NULL,
    "LASTNAME" varchar NOT NULL,
    "SECONDLASTNAME" varchar NOT NULL,
    "BIRTHDAY" date NOT NULL,
    "SEX" varchar NOT NULL,
    "OBSERVATION" varchar NOT NULL,
    "createdAt" timestamp,
    "updatedAt" timestamp
);

INSERT INTO "public"."cabeceras" ("id", "AREA", "CODE", "DATE", "HOUR", "IDENTIFICATIONTYPE", "IDENTIFIER", "NAME", "LASTNAME", "SECONDLASTNAME", "BIRTHDAY", "SEX", "OBSERVATION", "createdAt", "updatedAt") VALUES
(6, 'Emergencia', '1d4d2', '2021-03-11', '08:39:40', 'C', 17283651004, 'PEDRO PABLO', 'ALMEIDA', 'CORAL', '1990-12-19', 'F', 'DETALLE DEL PEDIDO', '2021-11-17 18:05:43.584', '2021-11-17 18:05:43.584');
INSERT INTO "public"."cabeceras" ("id", "AREA", "CODE", "DATE", "HOUR", "IDENTIFICATIONTYPE", "IDENTIFIER", "NAME", "LASTNAME", "SECONDLASTNAME", "BIRTHDAY", "SEX", "OBSERVATION", "createdAt", "updatedAt") VALUES
(7, 'Emergencia', '1d4d2', '2021-03-11', '08:39:40', 'C', 17283651004, 'PEDRO PABLO', 'ALMEIDA', 'CORAL', '1990-12-19', 'F', 'DETALLE DEL PEDIDO', '2021-11-17 18:28:56.996', '2021-11-17 18:28:56.996');
INSERT INTO "public"."cabeceras" ("id", "AREA", "CODE", "DATE", "HOUR", "IDENTIFICATIONTYPE", "IDENTIFIER", "NAME", "LASTNAME", "SECONDLASTNAME", "BIRTHDAY", "SEX", "OBSERVATION", "createdAt", "updatedAt") VALUES
(8, 'Emergencia', '1d4d2', '2021-03-11', '08:39:40', 'C', 17283651004, 'PEDRO PABLO', 'ALMEIDA', 'CORAL', '1990-12-19', 'F', 'DETALLE DEL PEDIDO', '2021-11-17 18:31:44.483', '2021-11-17 18:31:44.483');
INSERT INTO "public"."cabeceras" ("id", "AREA", "CODE", "DATE", "HOUR", "IDENTIFICATIONTYPE", "IDENTIFIER", "NAME", "LASTNAME", "SECONDLASTNAME", "BIRTHDAY", "SEX", "OBSERVATION", "createdAt", "updatedAt") VALUES
(9, 'Emergencia', '1d4d2', '2021-03-11', '08:39:40', 'C', 17283651004, 'PEDRO PABLO', 'ALMEIDA', 'CORAL', '1990-12-19', 'F', 'DETALLE DEL PEDIDO', '2021-11-17 21:33:58.806', '2021-11-17 21:33:58.806'),
(11, 'Emergencia', '1d4d2', '2021-03-11', '08:39:40', 'C', 17283651004, 'PEDRO PABLO', 'ALMEIDA', 'CORAL', '1990-12-19', 'F', 'DETALLE DEL PEDIDO', '2021-11-17 21:35:15.839', '2021-11-17 21:35:15.839');