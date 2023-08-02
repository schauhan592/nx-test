import { useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';

const useHistory = () => {
  return useContext(HistoryContext);
};

export default useHistory;
