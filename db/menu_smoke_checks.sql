-- Validaciones mínimas para asegurar que la carga quedó consistente.

DO $$
DECLARE
  v_categories INT;
  v_products INT;
  v_ingredients INT;
  v_variants INT;
BEGIN
  SELECT COUNT(*) INTO v_categories FROM menu_categories;
  SELECT COUNT(*) INTO v_products FROM products;
  SELECT COUNT(*) INTO v_ingredients FROM ingredients;
  SELECT COUNT(*) INTO v_variants FROM product_variants;

  IF v_categories <> 9 THEN
    RAISE EXCEPTION 'Cantidad de categorías inválida: %, esperado 9', v_categories;
  END IF;

  IF v_products <> 55 THEN
    RAISE EXCEPTION 'Cantidad de productos inválida: %, esperado 55', v_products;
  END IF;

  IF v_ingredients < 40 THEN
    RAISE EXCEPTION 'Cantidad de insumos inválida: %, esperado al menos 40', v_ingredients;
  END IF;

  IF v_variants < 87 THEN
    RAISE EXCEPTION 'Cantidad de variantes inválida: %, esperado al menos 87', v_variants;
  END IF;
END $$;
