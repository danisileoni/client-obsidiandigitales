import { SideBar } from '@/components/dashboard/SideBar';
import { ViewIcon } from '@/components/icons/ViewIcon';
import { PaginationProducts } from '@/components/products/PaginationProducts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { ItemsDashboardFilter } from '@/routes/admin/dashboard/panel/products';
import { deleteUser, getUsersAll } from '@/services/user.service';
import { useQuery } from '@tanstack/react-query';
import { UseNavigateResult } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';

interface PaymentsProps extends ItemsDashboardFilter {
  navigate: UseNavigateResult<'/admin/dashboard/panel/accounts'>;
}

const UsersDashboardPage = ({ page, navigate }: PaymentsProps) => {
  const limit = 10;
  const currentPage = Number(page);
  const offset = (currentPage - 1) * limit;

  const [search, setSearch] = useState('');
  const [update, setUpdate] = useState(false);
  const { isAuthenticate, token } = useAuth();

  useEffect(() => {
    (async () => {
      const isAuth = await isAuthenticate();
      if (!isAuth) {
        navigate({ to: '/auth/login' });
      }
    })();
  }, [isAuthenticate, navigate]);

  const { data: users, refetch } = useQuery({
    queryKey: ['payments', search, currentPage, update],
    queryFn: () => getUsersAll(limit, offset, token, search),
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(e.currentTarget.value);
    }
  };

  const handleBannedUser = async (id: string) => {
    try {
      const user = await deleteUser(id, token);
      if (user) {
        toast.success('Se a eliminado correctamente');
        setUpdate(true);
        refetch();
      }
    } catch (error) {
      toast.error('A sucedido un error');
    }
  };

  return (
    <section className="h-screen flex text-[#c1c1c1] bg-[#0a0a0a]">
      <SideBar />
      <div className="bg-[#212121] items-center w-full m-3 rounded-lg flex flex-col">
        <div className="w-[95%] flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar pago"
            className="w-full h-8 rounded-full p-5 mt-4 bg-[#2f2f2f]"
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex flex-col w-[95%] gap-y-2 mt-5">
          {users?.users.map((user) => (
            <div
              className="bg-[#2f2f2f] p-3 rounded-lg w-full flex items-center justify-between"
              key={user.id}
            >
              <div className="flex items-center gap-2">
                <h5 className="text-xl">ID: {user.id}</h5>
                <h5 className="text-xl">username: {user.username}</h5>
              </div>
              <div className="flex">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="bg-[#3c3c3c] flex items-center font-bold hover:bg-[#494949] p-2 rounded-full transition-colors duration-300"
                    >
                      <ViewIcon />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-black text-white">
                    <DialogHeader>
                      <DialogTitle>Usuario</DialogTitle>
                    </DialogHeader>
                    <div>
                      <ul>
                        <li>ID: {user.id}</li>
                        <li>NOMBRE: {user.name}</li>
                        <li>EMAIL: {user.email}</li>
                        <li>USUARIO: {user.username}</li>
                        <li>BANEADO: {user.isActive ? 'NO' : 'SI'}</li>
                        <li>ROLES: {user.roles}</li>
                        <li>
                          CREADO EL:{' '}
                          {(() => {
                            const date = new Date(user.createAt);
                            const day = date.getDay();
                            const month = date.getMonth();
                            const year = date.getFullYear();
                            return `${day}/${month}/${year}`;
                          })()}
                        </li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
                <button
                  type="button"
                  onClick={() => handleBannedUser(user.id)}
                  className="p-1 ml-2 pl-2 pr-2 bg-rose-700 font-bold rounded"
                >
                  BAN
                </button>
              </div>
            </div>
          ))}
        </div>
        <PaginationProducts navigate={navigate} products={users ?? null} />
      </div>
      <Toaster position="bottom-right" richColors />
    </section>
  );
};

export default UsersDashboardPage;
