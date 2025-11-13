// Tipado general de la vista de todos los productos
export interface product_view_table {
  /* ------- Existe la posibilidad de eliminar o unificar vars?

  VARCHAR(n), CHAR(n), TEXT	string - Cadenas de texto

  INT, SMALLINT, BIGINT	number - Números enteros

  DECIMAL, FLOAT, DOUBLE	number - Números decimales

  BOOLEAN, TINYINT(1)	boolean	- Valor lógico

  DATE, DATETIME, TIMESTAMP	Date	Fechas y horas

  JSON	any o un tipo específico	Depende del contenido
  BLOB, BINARY, VARBINARY	Buffer o Uint8Array	Datos binarios
  ENUM('a', 'b', ...)	`'a'	'b'
  NULLABLE (IS_NULLABLE = YES)	Agregás `	null`
  */

  // La idea sería agrupar por lógica

  tech_sku_id: number;
  hemicode: string;
  status: string;
  image_in_process: boolean;
  factory_code: string;
  factory_mold: string;
  item_upc: string;
  case_upc: string;
  vendor: string;
  brand_name: string;
  origin_country: string;
  pre_price: boolean;
  factory_name: string;
  description: string;
  short_description: string;
  super_category: string;
  category: string;
  sub_category: string;
  consumer_use: string;
  set_collection: string;
  product_collection: string;
  process_type: string;
  season: string;
  color_family: string;
  color_description: string;
  pantone_code: string;
  tosaf_code: string;
  raw_material: string;
  finishing: string;
  shipping_pack: string;
  label: string;
  packing: string;
  pieces_per_unit: number;
  case_pack: number;
  pieces_per_carton: number;
  carton_per_american_pallet: number;
  estimated_carton_per_american_pallet: number; // float..
  ti: number;
  hi: number;
  product_or_kit: string;
  notes: string;

  // Hasta final del aviso todos estos son float:
  product_length_mm: number;
  product_height_mm: number;
  product_width_mm: number;
  product_weight_kg: number;
  product_volume_ml: number;

  product_length_in: number;
  product_height_in: number;
  product_width_in: number;
  product_weight_lb: number;
  product_volume_oz: number;

  set_length_mm: number;
  set_height_mm: number;
  set_width_mm: number;
  set_weight_kg: number;
  set_weight_lb: number;
  set_length_in: number;
  set_height_in: number;
  set_width_in: number;
  box_length_mm: number;
  box_height_mm: number;
  box_width_mm: number;
  carton_weight_kg: number;
  box_length_in: number;
  box_height_in: number;
  box_width_in: number;
  carton_weight_lb: number;
  // hasta aca floats

  pieces_per_polybag: number;
  polybag_per_pallet: number;
  polybag_pallet_type: string;
  polybag_product_pallets_per_40hc: number;
  polybag_product_pallets_per_45hc: number;
  polybag_product_pallets_per_40std: number;
  polybag_product_pallets_per_20std: number;
  polybag_product_pallets_per_53ft: number;

  // floats
  polybag_length_mm: number;
  polybag_width_mm: number;
  polybag_height_mm: number;
  polybag_length_in: number;
  polybag_width_in: number;
  polybag_height_in: number;
  polybag_to_case_length_mm: number;
  polybag_to_case_width_mm: number;
  polybag_to_case_height_mm: number;
  polybag_to_case_length_in: number;
  polybag_to_case_width_in: number;
  polybag_to_case_height_in: number;
  case_cbm: number;
  cbm_const: number;
  case_cft: number;
  // termmina floats

  loading_type: string;
  stacked_pallets: number;
  receiving_carton_per_pallet: number;

  // HTS
  hts_code: string;
  hts_duty: number; // float
  hts_type: string;
  hts_product_subtype: string;

  // FOB
  fob_current_cost_value: number; // float
  fob_current_cost_start_date: Date;
  fob_current_cost_update_commentary: string;

  // EXW
  exw_current_cost_value: number; // float
  exw_current_cost_start_date: Date;
  exw_current_cost_update_commentary: string;

  // DDP
  ddp_current_cost_value: number; // float
  ddp_current_cost_start_date: Date;
  ddp_current_cost_update_commentary: string;

  // CNF
  cnf_diff_current_cost_value: number;
  cnf_diff_current_cost_start_date: Date;
  cnf_diff_current_cost_update_commentary: string;
  cnf_current_cost_value: number; // float
  cnf_current_cost_start_date: Date;
  cnf_current_cost_update_commentary: string;

  // floats..
  mrsp: number;
  commission_percentage: number;
  commission_amount: number;
  duty_percentage: number;
  fixed_duty_per_piece: number;
  duty_cost: number;
  tariff: number;
  max_carton_per_weight: number;
  max_case_pack_per_weight: number;

  confirmed_carton_per_40hc: number; // int
  calculated_cartons_40hc_per_volume: number;
  calculated_case_pack_40hc_per_volume: number;
  optimal_cartons_per_40hc: number;
  optimal_pieces_per_40hc: number;

  confirmed_carton_per_45hc: number; // int
  calculated_cartons_45hc_per_volume: number;
  calculated_case_pack_45hc_per_volume: number;
  optimal_cartons_per_45hc: number;
  optimal_pieces_per_45hc: number;

  confirmed_carton_per_40std: number; // int
  calculated_cartons_40std_per_volume: number;
  calculated_case_pack_40std_per_volume: number;
  optimal_cartons_per_40std: number;
  optimal_pieces_per_40std: number;

  confirmed_carton_per_20std: number; // int
  calculated_cartons_20std_per_volume: number;
  calculated_case_pack_20std_per_volume: number;
  optimal_cartons_per_20std: number;
  optimal_pieces_per_20std: number;

  confirmed_carton_per_53ft: number; // int
  calculated_cartons_53ft_per_volume: number;
  calculated_case_pack_53ft_per_volume: number;
  optimal_cartons_per_53ft: number;
  optimal_pieces_per_53ft: number;

  logistic_cost_40hc: number;
  logistic_cost_45hc: number;
  logistic_cost_40std: number;
  logistic_cost_20std: number;
  logistic_cost_53ft: number;

  landed_cost_40hc: number;
  landed_cost_45hc: number;
  landed_cost_40std: number;
  landed_cost_20std: number;
  landed_cost_53ft: number;
  // terminan floats..

  image_path: string;
  average_cost: number; // decimal

  // floats..
  inventory_today: number;
  inventory_today_7: number;
  inventory_today_14: number;
  inventory_today_21: number;
  inventory_today_49: number;
  inventory_today_77: number;
  inventory_today_105: number;
}
