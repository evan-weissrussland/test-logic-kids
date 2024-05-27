export const coursesName = {
  all: 'Все темы',
  chess: 'Шахматы',
  countries: 'Страны и столицы',
  logic: 'Логика и мышление',
  mystery: 'Загадки',
  puzzles: 'Головоломки',
  world: 'Окружающий мир',
} as const

export type FilterType = (typeof coursesName)[keyof typeof coursesName]
