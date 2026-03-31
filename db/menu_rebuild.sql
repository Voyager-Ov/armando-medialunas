-- Reconstrucción completa de menú (cartas dueño) - 2026-03-30
-- Dialecto: PostgreSQL

BEGIN;

CREATE TABLE IF NOT EXISTS menu_categories (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ingredients (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  unit TEXT NOT NULL,
  estimated_unit_cost_ars NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  category_id BIGINT NOT NULL REFERENCES menu_categories(id),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS product_variants (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price_ars NUMERIC(12,2) NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS product_ingredients (
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  ingredient_id BIGINT NOT NULL REFERENCES ingredients(id),
  quantity NUMERIC(12,3) NOT NULL,
  PRIMARY KEY (product_id, ingredient_id)
);

-- Limpieza de datos previos (sin tocar estructura)
TRUNCATE TABLE product_ingredients, product_variants, products, ingredients, menu_categories RESTART IDENTITY CASCADE;

-- Categorías
INSERT INTO menu_categories (code, name, sort_order) VALUES
('pastas', 'Pastas', 10),
('tartas_grandes', 'Tartas grandes', 20),
('tartas_individuales', 'Tartas individuales', 30),
('calzoni', 'Calzoni', 40),
('empanadas', 'Empanadas', 50),
('milanesas', 'Milanesas', 60),
('hamburguesas', 'Hamburguesas', 70),
('postres', 'Postres', 80),
('pizzas', 'Pizzas', 90);

-- Insumos (estimados de mercado minorista ARS 2026-Q1)
INSERT INTO ingredients (code, name, unit, estimated_unit_cost_ars) VALUES
('harina_0000', 'Harina 0000', 'kg', 1400),
('huevo', 'Huevo', 'unidad', 280),
('tomate', 'Tomate fresco', 'kg', 2200),
('salsa_tomate', 'Salsa de tomate', 'kg', 2800),
('mozzarella', 'Mozzarella', 'kg', 11000),
('jamon_cocido', 'Jamón cocido', 'kg', 12000),
('jamon_crudo', 'Jamón crudo', 'kg', 22000),
('queso_sardo', 'Queso sardo', 'kg', 13000),
('queso_tybo', 'Queso tybo', 'kg', 11000),
('queso_roquefort', 'Queso roquefort', 'kg', 19000),
('parmesano', 'Queso parmesano', 'kg', 22000),
('cebolla', 'Cebolla', 'kg', 1300),
('choclo', 'Choclo', 'kg', 2600),
('acelga', 'Acelga', 'kg', 3000),
('pollo', 'Pollo', 'kg', 6500),
('carne_picada', 'Carne picada', 'kg', 9000),
('peceto', 'Peceto', 'kg', 15000),
('morron', 'Morrón', 'kg', 3400),
('aceituna', 'Aceituna', 'kg', 8000),
('albahaca', 'Albahaca', 'kg', 12000),
('oregano', 'Orégano', 'kg', 15000),
('ajo', 'Ajo', 'kg', 4500),
('perejil', 'Perejil', 'kg', 5000),
('anchoa', 'Anchoa', 'kg', 20000),
('rucula', 'Rúcula', 'kg', 8000),
('salame', 'Salame/calabresa', 'kg', 15000),
('salchicha', 'Salchicha', 'kg', 7000),
('mostaza', 'Mostaza', 'kg', 4000),
('papa', 'Papa', 'kg', 1200),
('champignones', 'Champiñones', 'kg', 9000),
('palmito', 'Palmito', 'kg', 14000),
('salsa_golf', 'Salsa golf', 'kg', 4500),
('anana', 'Ananá', 'kg', 4500),
('azucar_morena', 'Azúcar morena', 'kg', 2200),
('berenjena', 'Berenjena (árabe)', 'kg', 2500),
('limon', 'Limón', 'kg', 1800),
('arveja', 'Arveja', 'kg', 3000),
('mila_carne', 'Milanesa de carne preparada', 'kg', 10500),
('pan_hamburguesa', 'Pan de hamburguesa', 'unidad', 650),
('medallon_carne', 'Medallón hamburguesa', 'unidad', 1600),
('crema', 'Crema de leche', 'kg', 5000),
('vainilla', 'Esencia de vainilla', 'litro', 7000),
('cacao', 'Cacao en polvo', 'kg', 8500),
('galletitas_oreo', 'Galletitas tipo Oreo', 'kg', 9000),
('chocolinas', 'Chocolinas', 'kg', 8500),
('cafe', 'Café', 'kg', 18000),
('vainillas', 'Vainillas para tiramisú', 'kg', 7000),
('aceite', 'Aceite para fritura', 'litro', 2500),
('masa_empanada', 'Tapas de empanada', 'unidad', 180),
('masa_tarta', 'Masa de tarta', 'unidad', 900),
('masa_pizza', 'Bollo de pizza', 'unidad', 1300),
('masa_pasta', 'Masa de pasta', 'kg', 3000);

-- Productos y variantes
WITH c AS (SELECT id, code FROM menu_categories)
INSERT INTO products (category_id, code, name, description)
VALUES
((SELECT id FROM c WHERE code='pastas'), 'pasta_bolognesa', 'Pasta con salsa boloñesa', 'Base de pasta a elección + salsa boloñesa'),
((SELECT id FROM c WHERE code='pastas'), 'pasta_fileto', 'Pasta con salsa fileto', 'Base de pasta a elección + salsa fileto'),
((SELECT id FROM c WHERE code='pastas'), 'pasta_parissiene', 'Pasta con salsa parissiene', 'Base de pasta a elección + salsa parisienne'),
((SELECT id FROM c WHERE code='pastas'), 'pasta_peceto', 'Pasta con salsa de peceto', 'Base de pasta a elección + salsa de peceto'),
((SELECT id FROM c WHERE code='tartas_grandes'), 'tarta_pollo', 'Tarta de pollo', NULL),
((SELECT id FROM c WHERE code='tartas_grandes'), 'tarta_jamon_queso', 'Tarta de jamón y queso', NULL),
((SELECT id FROM c WHERE code='tartas_grandes'), 'tarta_choclo', 'Tarta de choclo', NULL),
((SELECT id FROM c WHERE code='tartas_grandes'), 'tarta_acelga', 'Tarta de acelga', NULL),
((SELECT id FROM c WHERE code='tartas_individuales'), 'tarta_ind_pollo', 'Tarta individual de pollo', NULL),
((SELECT id FROM c WHERE code='tartas_individuales'), 'tarta_ind_jamon_queso', 'Tarta individual de jamón y queso', NULL),
((SELECT id FROM c WHERE code='tartas_individuales'), 'tarta_ind_choclo', 'Tarta individual de choclo', NULL),
((SELECT id FROM c WHERE code='tartas_individuales'), 'tarta_ind_acelga', 'Tarta individual de acelga', NULL),
((SELECT id FROM c WHERE code='tartas_individuales'), 'tarta_ind_cebolla_queso', 'Tarta individual de cebolla y queso', NULL),
((SELECT id FROM c WHERE code='calzoni'), 'calzoni_sanvito', 'Calzoni Sanvito', 'Boloñesa, muzza, aceituna'),
((SELECT id FROM c WHERE code='calzoni'), 'calzoni_ghiottone', 'Calzoni Ghiottone', 'Tomate, jamón, aceituna, muzza, morrón'),
((SELECT id FROM c WHERE code='calzoni'), 'calzoni_capresse', 'Calzoni Capresse', 'Tomate, muzza, albahaca, morrón, aceituna'),
((SELECT id FROM c WHERE code='calzoni'), 'calzoni_4_quesos', 'Calzoni 4 quesos', 'Mozza, tybo, sardo, roquefort'),
((SELECT id FROM c WHERE code='calzoni'), 'calzoni_calabresa', 'Calzoni Calabresa', 'Tomate, muzza, calabresa, aceituna'),
((SELECT id FROM c WHERE code='empanadas'), 'emp_arabes', 'Empanada árabe', 'Carne condimentada con limón'),
((SELECT id FROM c WHERE code='empanadas'), 'emp_saladas', 'Empanada salada', 'Carne cortada, cebolla, huevo, aceituna'),
((SELECT id FROM c WHERE code='empanadas'), 'emp_jamon_queso', 'Empanada jamón y queso', NULL),
((SELECT id FROM c WHERE code='empanadas'), 'emp_cebolla_queso', 'Empanada cebolla y queso', NULL),
((SELECT id FROM c WHERE code='empanadas'), 'emp_dulces', 'Empanada dulce', 'Membrillo/batata y queso'),
((SELECT id FROM c WHERE code='milanesas'), 'mila_frita', 'Milanesa con fritas', NULL),
((SELECT id FROM c WHERE code='milanesas'), 'mila_completa', 'Milanesa completa', 'Jamón, queso y huevo frito'),
((SELECT id FROM c WHERE code='milanesas'), 'mila_napo', 'Milanesa a la napolitana', 'Salsa, jamón y muzza'),
((SELECT id FROM c WHERE code='milanesas'), 'mila_caballo', 'Milanesa a caballo', '2 huevos fritos'),
((SELECT id FROM c WHERE code='milanesas'), 'sandwich_mila', 'Sándwich de milanesa', NULL),
((SELECT id FROM c WHERE code='hamburguesas'), 'hamb_simple', 'Hamburguesa simple', NULL),
((SELECT id FROM c WHERE code='hamburguesas'), 'hamb_doble', 'Hamburguesa doble', NULL),
((SELECT id FROM c WHERE code='postres'), 'postre_oreo', 'Postre Oreo', NULL),
((SELECT id FROM c WHERE code='postres'), 'postre_tiramisu', 'Tiramisú', NULL),
((SELECT id FROM c WHERE code='postres'), 'postre_chocolina', 'Postre Chocotorta/Chocolina', NULL),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_muzzarella', 'Pizza Muzzarella', 'Salsa de tomate, muzza, aceituna, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_fugazzeta', 'Pizza Fugazzeta', 'Cebolla salteada, muzza, aceituna, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_fuga_verdeo', 'Pizza Fuga al verdeo', 'Cebolla salteada, muzza, verdeo, parmesano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_mozza_huevo', 'Pizza Mozza con huevo', 'Salsa, muzza, huevo, aceituna, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_provenzal', 'Pizza Provenzal', 'Salsa, muzza, ajo, perejil, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_margarita', 'Pizza Margarita', 'Salsa, muzza, sardo, aceituna, albahaca, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_especial', 'Pizza Especial', 'Salsa, jamón, muzza, aceituna, morrones, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_napolitana', 'Pizza Napolitana', 'Salsa, muzza, tomate, ajo, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_fuga_jamon', 'Pizza Fuga con jamón', 'Cebolla salteada, muzza, jamón, morrón'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_choclo', 'Pizza Choclo', 'Salsa, muzza, choclo, aceituna, morrones'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_vienesa', 'Pizza Vienesa', 'Salsa, muzza, salchicha, mostaza, aceituna, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_del_campo', 'Pizza del campo', 'Salsa, hierbas, muzza, champiñones, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_auvernia', 'Pizza Auvernia', 'Cebolla, muzza, roquefort, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_palmito', 'Pizza Palmito', 'Salsa, muzza, palmito, salsa golf, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_4_quesos', 'Pizza 4 quesos', 'Salsa, muzza, sardo, roquefort, tybo, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_capresse', 'Pizza Capresse', 'Salsa, muzza, tomate, albahaca, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_calabresa', 'Pizza Calabresa', 'Salsa, muzza, salame, aceituna, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_anchoa', 'Pizza Anchoa', 'Salsa, muzza, jamón, anchoa, aceituna, morrón, orégano'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_rucula', 'Pizza Rúcula', 'Salsa, muzza, rúcula, jamón crudo, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_trattoria', 'Pizza Trattoria', 'Salsa, muzza, cebolla y pimiento salteados picantes'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_tropical', 'Pizza Tropical', 'Salsa, muzza, jamón, ananá, azúcar morena, aceituna'),
((SELECT id FROM c WHERE code='pizzas'), 'pizza_atomica', 'Pizza Atómica', 'Salsa, muzza, papas fritas, salsa golf, huevo frito');

-- Variantes de precio
INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_default', 'Porción/Presentación estándar',
CASE
  WHEN code IN ('pasta_bolognesa', 'pasta_fileto') THEN 7500
  WHEN code IN ('pasta_parissiene', 'pasta_peceto') THEN 8500
  WHEN code LIKE 'tarta_%' AND code NOT LIKE 'tarta_ind_%' THEN 6000
  WHEN code LIKE 'tarta_ind_%' THEN 2000
  WHEN code LIKE 'calzoni_%' THEN 8500
  WHEN code LIKE 'mila_%' THEN CASE WHEN code='mila_frita' THEN 7000 ELSE 9000 END
  WHEN code='sandwich_mila' THEN 7000
  WHEN code='hamb_simple' THEN 6500
  WHEN code='hamb_doble' THEN 10000
  WHEN code LIKE 'postre_%' THEN 5500
  ELSE 0
END,
TRUE
FROM products
WHERE code NOT LIKE 'emp_%' AND code NOT LIKE 'pizza_%';

-- Empanadas: unidad / media / docena
INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_unidad', 'Unidad', 1200, TRUE FROM products WHERE code LIKE 'emp_%';
INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_media_docena', 'Media docena', 7000, FALSE FROM products WHERE code LIKE 'emp_%';
INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_docena', 'Docena', 14000, FALSE FROM products WHERE code LIKE 'emp_%';

-- Pizzas: entera / media por bandas de precio
INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_entera', 'Entera',
CASE
  WHEN code IN ('pizza_muzzarella','pizza_fugazzeta','pizza_fuga_verdeo','pizza_mozza_huevo','pizza_provenzal','pizza_margarita') THEN 7000
  WHEN code IN ('pizza_especial','pizza_napolitana','pizza_fuga_jamon','pizza_choclo','pizza_vienesa','pizza_del_campo') THEN 8000
  WHEN code IN ('pizza_auvernia','pizza_palmito','pizza_4_quesos','pizza_capresse','pizza_calabresa','pizza_anchoa','pizza_rucula','pizza_trattoria','pizza_tropical') THEN 9000
  WHEN code = 'pizza_atomica' THEN 12000
END,
TRUE
FROM products WHERE code LIKE 'pizza_%';

INSERT INTO product_variants (product_id, code, name, price_ars, is_default)
SELECT id, code || '_media', 'Media',
CASE
  WHEN code IN ('pizza_muzzarella','pizza_fugazzeta','pizza_fuga_verdeo','pizza_mozza_huevo','pizza_provenzal','pizza_margarita') THEN 4000
  WHEN code IN ('pizza_especial','pizza_napolitana','pizza_fuga_jamon','pizza_choclo','pizza_vienesa','pizza_del_campo') THEN 4500
  WHEN code IN ('pizza_auvernia','pizza_palmito','pizza_4_quesos','pizza_capresse','pizza_calabresa','pizza_anchoa','pizza_rucula','pizza_trattoria','pizza_tropical') THEN 5000
  WHEN code = 'pizza_atomica' THEN 7000
END,
FALSE
FROM products WHERE code LIKE 'pizza_%';

-- Relación producto -> insumos principales (receta estimada)
INSERT INTO product_ingredients (product_id, ingredient_id, quantity)
SELECT p.id, i.id, x.qty
FROM (
  VALUES
  ('pasta_bolognesa','masa_pasta',0.25), ('pasta_bolognesa','carne_picada',0.10), ('pasta_bolognesa','salsa_tomate',0.12),
  ('pasta_fileto','masa_pasta',0.25), ('pasta_fileto','salsa_tomate',0.15),
  ('pasta_parissiene','masa_pasta',0.25), ('pasta_parissiene','jamon_cocido',0.05), ('pasta_parissiene','crema',0.08),
  ('pasta_peceto','masa_pasta',0.25), ('pasta_peceto','peceto',0.10), ('pasta_peceto','crema',0.06),
  ('tarta_pollo','masa_tarta',1), ('tarta_pollo','pollo',0.18), ('tarta_pollo','cebolla',0.08),
  ('tarta_jamon_queso','masa_tarta',1), ('tarta_jamon_queso','jamon_cocido',0.12), ('tarta_jamon_queso','mozzarella',0.15),
  ('tarta_choclo','masa_tarta',1), ('tarta_choclo','choclo',0.25), ('tarta_choclo','mozzarella',0.08),
  ('tarta_acelga','masa_tarta',1), ('tarta_acelga','acelga',0.20), ('tarta_acelga','huevo',2),
  ('calzoni_4_quesos','masa_pizza',1), ('calzoni_4_quesos','mozzarella',0.10), ('calzoni_4_quesos','queso_tybo',0.05), ('calzoni_4_quesos','queso_sardo',0.05), ('calzoni_4_quesos','queso_roquefort',0.03),
  ('emp_jamon_queso','masa_empanada',1), ('emp_jamon_queso','jamon_cocido',0.03), ('emp_jamon_queso','mozzarella',0.03),
  ('emp_cebolla_queso','masa_empanada',1), ('emp_cebolla_queso','cebolla',0.04), ('emp_cebolla_queso','mozzarella',0.03),
  ('mila_napo','mila_carne',0.30), ('mila_napo','salsa_tomate',0.05), ('mila_napo','jamon_cocido',0.05), ('mila_napo','mozzarella',0.06),
  ('hamb_simple','pan_hamburguesa',1), ('hamb_simple','medallon_carne',1), ('hamb_simple','mozzarella',0.03),
  ('hamb_doble','pan_hamburguesa',1), ('hamb_doble','medallon_carne',2), ('hamb_doble','mozzarella',0.05),
  ('postre_oreo','galletitas_oreo',0.10), ('postre_oreo','crema',0.10),
  ('postre_tiramisu','vainillas',0.10), ('postre_tiramisu','cafe',0.02), ('postre_tiramisu','crema',0.08), ('postre_tiramisu','cacao',0.01),
  ('postre_chocolina','chocolinas',0.10), ('postre_chocolina','crema',0.12),
  ('pizza_muzzarella','masa_pizza',1), ('pizza_muzzarella','salsa_tomate',0.10), ('pizza_muzzarella','mozzarella',0.20), ('pizza_muzzarella','aceituna',0.02), ('pizza_muzzarella','oregano',0.002),
  ('pizza_especial','masa_pizza',1), ('pizza_especial','salsa_tomate',0.10), ('pizza_especial','mozzarella',0.20), ('pizza_especial','jamon_cocido',0.08), ('pizza_especial','morron',0.05),
  ('pizza_4_quesos','masa_pizza',1), ('pizza_4_quesos','salsa_tomate',0.08), ('pizza_4_quesos','mozzarella',0.14), ('pizza_4_quesos','queso_sardo',0.05), ('pizza_4_quesos','queso_tybo',0.05), ('pizza_4_quesos','queso_roquefort',0.03),
  ('pizza_atomica','masa_pizza',1), ('pizza_atomica','salsa_tomate',0.10), ('pizza_atomica','mozzarella',0.18), ('pizza_atomica','papa',0.20), ('pizza_atomica','salsa_golf',0.04), ('pizza_atomica','huevo',1)
) AS x(product_code, ingredient_code, qty)
JOIN products p ON p.code = x.product_code
JOIN ingredients i ON i.code = x.ingredient_code;

COMMIT;
