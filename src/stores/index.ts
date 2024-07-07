import {create} from 'zustand';
import {IPerson} from '../interfaces';

interface OperationState {
  activity: 'create' | 'none' | 'update';
  loading: boolean;
  person: IPerson;
  visible: boolean;
  setActivity: (activity: 'create' | 'none' | 'update') => void;
  setLoading: (loading: boolean) => void;
  setPerson: (person: IPerson) => void;
  setVisible: (visible: boolean) => void;
}

export const useOperationStore = create<OperationState>()(set => ({
  activity: 'none',
  loading: false,
  person: {
    age: '',
    firstName: '',
    id: '',
    lastName: '',
    photo: '',
  },
  visible: false,
  setActivity: (activity: 'create' | 'none' | 'update') =>
    set({activity: activity}),
  setLoading: (loading: boolean) => set({loading: loading}),
  setPerson: (person: IPerson) => set({person: person}),
  setVisible: (visible: boolean) => set({visible: visible}),
}));
