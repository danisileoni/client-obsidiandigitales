import type { UseNavigateResult } from '@tanstack/react-router';

type Platform = 'PlayStation 3' | 'Steam' | 'PlayStation 4' | 'PlayStation 5';
export type Category =
  | 'supervivencia'
  | 'accion'
  | 'disparos'
  | 'rol'
  | 'musica'
  | 'guerra'
  | 'deporte'
  | 'conduccion'
  | 'multijugador'
  | 'infantil'
  | 'estrategia'
  | 'simulacion'
  | 'arcade';

export const handleFilter = (
  e: React.ChangeEvent<HTMLInputElement>,
  navigate: UseNavigateResult<'/product'>,
) => {
  const { name, value, checked } = e.target;

  if (name === 'category' && isValidCategory(value)) {
    navigate({
      search: (prev) => {
        const currentValues = (prev[name] || []) as Category[];
        const valueExists = currentValues.includes(value as Category);

        return {
          ...prev,
          [name]: valueExists
            ? currentValues.filter((cValue) => cValue !== value)
            : [...currentValues, value],
        };
      },
    });
  } else if (name === 'platform' && isValidPlatform(value)) {
    navigate({
      search: (prev) => ({
        ...prev,
        [name]: value,
      }),
    });
  } else if (name === 'sale') {
    navigate({
      search: (prev) => ({
        ...prev,
        [name]: checked,
      }),
    });
  }
};

const isValidCategory = (value: string): value is Category => {
  return [
    'supervivencia',
    'accion',
    'disparos',
    'rol',
    'musica',
    'guerra',
    'deporte',
    'conduccion',
    'multijugador',
    'infantil',
    'estrategia',
    'simulacion',
    'arcade',
  ].includes(value);
};

const isValidPlatform = (value: string): value is Platform => {
  return ['PlayStation 3', 'Steam', 'PlayStation 4', 'PlayStation 5'].includes(
    value,
  );
};
