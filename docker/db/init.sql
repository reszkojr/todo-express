CREATE TYPE "public"."status" AS ENUM('pending', 'in progress', 'completed');
CREATE TABLE "todo" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" text NOT NULL,
    "description" text,
    "status" "status" DEFAULT 'pending' NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

INSERT INTO todo (title, description)
VALUES ('Tarefa 1', 'Descrição para tarefa 1'),
    ('Tarefa 2', 'Descrição para tarefa 2'),
    ('Tarefa 3', 'Descrição para tarefa 3');