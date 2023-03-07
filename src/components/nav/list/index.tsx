import React, { useEffect, useState } from 'react';
import NavListInput from './Input';
import styles from './index.module.css';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import useAuth from '@/hooks/useAuth';
import NavListItem from './item';
import useModal from '@/hooks/useModal';
import useSkeleton from '@/hooks/useSkeleton';
import SkeletonNavListItemLoader from '@/components/skeleton/NavListItemLoader';

export type ListType = {
  user_id: string;
  list_id: number;
  title: string;
  default_user_list: boolean;
};

const NavList: React.FC = () => {
  const [lists, setLists] = useState<ListType[]>([]);
  const { setError } = useModal();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();

  const { setNavLoading, navLoading } = useSkeleton();

  useEffect(() => {
    const getUserLists = async () => {
      try {
        setNavLoading(true);
        const response = await axiosPrivate.get(`lists/user/${auth.user_id}`);
        setLists([
          ...response?.data.data.filter(
            (list: ListType) => list.default_user_list === false
          ),
        ]);
      } catch (error) {
        setError(setError(error));
      } finally {
        setNavLoading(false);
      }
    };
    if (auth.user_id) getUserLists();
  }, [auth.user_id]);

  return (
    <div className="w-full">
      <hr className={`${styles.divider} solid border-t-4 mb-3`} />
      {navLoading ? (
        <SkeletonNavListItemLoader />
      ) : (
        <>
          {lists.map((list) => (
            <NavListItem
              title={list.title}
              key={list.list_id}
              id={list.list_id}
              setLists={setLists}
            />
          ))}
          <NavListInput setLists={setLists} />
        </>
      )}
    </div>
  );
};
export default NavList;
