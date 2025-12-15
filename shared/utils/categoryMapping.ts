export const productCategories = [
  { id: "all", name: "Вся продукция", slug: "all" },
  {
    id: "kts",
    name: "Трансформаторные подстанции",
    slug: "transformatornye-podstancii",
  },
  {
    id: "kru",
    name: "Распределительные устройства среднего напряжения 6(10) кВ",
    slug: "raspredelitelnye-ustroystva-srednego-napryazheniya-6-10-kv",
  },
  {
    id: "nku",
    name: "Распределительные устройства низкого напряжения 0,4 кВ",
    slug: "raspredelitelnye-ustroystva-nizkogo-napryazheniya-04-kv",
  },
  {
    id: "accounting",
    name: "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
    slug: "punkty-ucheta-i-sekcionirovaniya-vle",
  },
  {
    id: "stations",
    name: "Электростанции и установки",
    slug: "elektrostancii-i-ustanovki",
  },
];

// Маппинг для коротких ID категорий из mock_data
export const shortCategoryMap = new Map([
  ["kts", "Трансформаторные подстанции"],
  ["kru", "Распределительные устройства среднего напряжения 6(10) кВ"],
  ["nku", "Распределительные устройства низкого напряжения 0,4 кВ"],
  [
    "accounting",
    "Пункты коммерческого учёта и секционирования воздушных линий электропередач",
  ],
  ["stations", "Электростанции и установки"],
]);

export const categoryLabelMap = new Map(
  productCategories.map((cat) => [cat.slug, cat.name])
);

export const getCategoryLabel = (categoryValue: string): string => {
  // Сначала проверяем короткие ID
  const shortLabel = shortCategoryMap.get(categoryValue);
  if (shortLabel) {
    return shortLabel;
  }

  // Затем проверяем полные английские названия
  const fullLabel = categoryLabelMap.get(categoryValue);
  if (fullLabel) {
    return fullLabel;
  }

  // Если ничего не найдено, возвращаем исходное значение
  return categoryValue;
};
