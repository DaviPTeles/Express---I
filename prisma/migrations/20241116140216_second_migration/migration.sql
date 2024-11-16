/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_id_key" ON "Usuarios"("id");
