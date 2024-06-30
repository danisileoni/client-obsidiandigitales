import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from '../icons/SearchIcon';
import { getSearchProduct } from '@/services/products.services';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

export const SearchBar = () => {
  const [search, setSearch] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate({ from: '/product' });

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearch(inputValue);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data: searchProduct } = useQuery({
    queryKey: ['searchProduct', search],
    queryFn: () => getSearchProduct(search),
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      setIsSearchActive(true);
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== '') {
      navigate({
        to: '/product',
        search: { search: inputValue, page: '1' },
      });
    }
  };

  return (
    <div className="relative" ref={searchContainerRef}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2"
      >
        <div className="flex gap-2 bg-sky-700 rounded-full pr-3">
          <input
            type="search"
            placeholder="Buscar un prod..."
            autoComplete="off"
            className="p-1 pl-4 rounded-l-full outline-none w-[250px] md:w-80 text-white bg-[#2f2f2f]"
            name="search"
            onChange={handleInputChange}
          />
          <button type="submit" className="text-white">
            <SearchIcon />
          </button>
        </div>
      </form>
      {isSearchActive && searchProduct && searchProduct.length > 0 && (
        <div className="absolute left-0 w-full bg-white shadow-lg rounded-lg mt-2 z-10">
          {searchProduct.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="flex items-center p-2 hover:bg-gray-200 rounded-lg"
            >
              <picture>
                <img
                  src={product.productImages[0]}
                  className="w-10 h-12 object-cover rounded"
                  alt={product.title}
                />
              </picture>
              <span className="ml-2">{product.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
