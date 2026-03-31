# Reconstrucción menú dueño (2 cartas)

Fecha de carga propuesta: **2026-03-30**.

## 1) Insumos detectados en las cartas

Insumos explícitos en productos:

- salsa de tomate, tomate
- mozzarella (mozza), queso tybo, queso sardo, queso roquefort, parmesano
- jamón cocido, jamón crudo
- aceituna
- orégano, albahaca, perejil, ajo
- cebolla, cebolla de verdeo, morrón, rúcula, champiñones, choclo, acelga
- salame/calabresa, salchicha, anchoa
- palmito, salsa golf
- ananá, azúcar morena
- huevo frito / huevo
- boloñesa, fileto, parisienne, peceto (salsas de pasta)
- milanesa y papas fritas

Insumos inferidos por receta base (cuando la carta no lo detallaba):

- masas: masa de pizza, masa de tarta, masa de pasta, tapa de empanada
- proteínas base: carne picada, pollo, peceto, medallón hamburguesa
- postres: crema, café, cacao, vainillas, galletitas oreo, chocolinas
- pan de hamburguesa y aceite de fritura

## 2) Estructura propuesta para base de datos

Se define un esquema normalizado:

- `menu_categories`: rubros del menú
- `ingredients`: catálogo único de insumos + unidad + costo estimado
- `products`: ítems comerciales
- `product_variants`: precios por tamaño/presentación (ej: pizza entera/media; empanada unidad/media/docena)
- `product_ingredients`: tabla pivote de receta estimada por producto

## 3) Alcance de la carga

El script `db/menu_rebuild.sql` hace:

1. Crea tablas si no existen.
2. Borra datos previos (`TRUNCATE ... RESTART IDENTITY CASCADE`).
3. Inserta categorías del menú actual.
4. Inserta insumos detectados + costos estimados ARS.
5. Inserta productos de ambas cartas.
6. Inserta variantes de precio según carta.
7. Inserta receta estimada (insumos principales) para productos representativos.

> Nota: para una costificación estricta conviene completar `product_ingredients` para **todos** los productos con gramajes reales de cocina.
