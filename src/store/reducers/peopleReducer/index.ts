import { PeopleTypes, PEOPLE_ACTIONS_TYPES } from '../../../types';
import { CurrentActionType } from './actions';

export interface PeopleReducerTypes {
  peopleData?: Array<PeopleTypes>;
  searchValue: string;
  selectedNationality: Array<string>;
  selectedGender: string;
  clear: boolean;
  data: boolean;
  error?: boolean;
}

interface FilteredPeopleTypes {
  people: PeopleReducerTypes;
}

export const filterPeople = ({ people }: FilteredPeopleTypes) => {
  const { peopleData, searchValue, selectedNationality, selectedGender, data } = people;

  let persons: Array<PeopleTypes> = [];

  if (data) {
    return persons;
  }
  if (peopleData) {
    persons = [...peopleData];
  }

  if (searchValue) {
    persons = persons.filter((item: PeopleTypes) => {
      if (typeof item.name !== 'string') return;
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }

  if (selectedNationality && selectedNationality.length) {
    persons = persons.filter((item: PeopleTypes) => selectedNationality.includes(item.nationality.name));
  }

  if (selectedGender) {
    persons = persons.filter((person: PeopleTypes) => person.gender === selectedGender);
  }

  return persons;
};

const contactsInitialState: PeopleReducerTypes = {
  peopleData: [],
  searchValue: '',
  selectedNationality: [],
  selectedGender: '',
  clear: false,
  data: true,
  error: false,
};

const peopleReducer = (state = contactsInitialState, action: CurrentActionType): PeopleReducerTypes => {
  switch (action.type) {
    case PEOPLE_ACTIONS_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case PEOPLE_ACTIONS_TYPES.SET_PEOPLE:
      return {
        ...state,
        peopleData: action.peopleData,
      };
    case PEOPLE_ACTIONS_TYPES.FILTER_BY_NAME:
      return {
        ...state,
        searchValue: action.searchValue,
      };
    case PEOPLE_ACTIONS_TYPES.SET_SELECTED_GENDER:
      return {
        ...state,
        selectedGender: action.selectedGender,
      };
    case PEOPLE_ACTIONS_TYPES.SET_SELECTED_NATIONALITY:
      return {
        ...state,
        selectedNationality: state.selectedNationality.length
          ? [...state.selectedNationality, action.selectedNationality]
          : [action.selectedNationality],
      };
    case PEOPLE_ACTIONS_TYPES.CLEAR_FORM:
      return {
        ...state,
        searchValue: '',
        selectedNationality: [],
        selectedGender: '',
        clear: false,
      };
    case PEOPLE_ACTIONS_TYPES.CLEAR_DATA:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export default peopleReducer;
