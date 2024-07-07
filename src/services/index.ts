import useSWRImmutable from 'swr/immutable';
import useSWRMutation from 'swr/mutation';
import {API_URL} from '../utilities/constants';
import {fetcher} from '../utilities/fetcher';

export const getContacts = () => {
  const {data, error, isLoading, isValidating, mutate} = useSWRImmutable(
    API_URL,
    fetcher,
    {refreshInterval: 5000},
  );
  return {data: data?.data, error, isLoading, isValidating, mutate};
};

export const getContactById = (id: any | string) => {
  const {data, error, isMutating, reset, trigger} = useSWRMutation(
    `${API_URL}/${id}`,
    fetcher,
  );
  return {data: data?.data, error, isMutating, reset, trigger};
};
