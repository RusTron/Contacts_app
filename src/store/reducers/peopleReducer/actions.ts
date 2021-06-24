import { PEOPLE_ACTIONS_TYPES, PeopleTypes } from '../../../types';

export type actionCreatorsTypes = {
  setData: (items: Array<PeopleTypes>) => SetDataType;
  setError: (value: boolean) => SetErrorType;
  filterByName: (searchValue: string) => FilterByNameType;
  selectGender: (item: string) => SelectGenderType;
  selectNationality: (item: string) => SelectNationalityType;
  clearForm: () => ClearFormType;
  clearData: (value: boolean) => ClearDataType;
};

interface SetDataType {
  type: PEOPLE_ACTIONS_TYPES.SET_PEOPLE;
  peopleData: Array<PeopleTypes>;
}

interface SetErrorType {
  type: PEOPLE_ACTIONS_TYPES.SET_ERROR;
  error: boolean;
}

interface FilterByNameType {
  type: PEOPLE_ACTIONS_TYPES.FILTER_BY_NAME;
  searchValue: string;
}

interface SelectGenderType {
  type: PEOPLE_ACTIONS_TYPES.SET_SELECTED_GENDER;
  selectedGender: string;
}

interface SelectNationalityType {
  type: PEOPLE_ACTIONS_TYPES.SET_SELECTED_NATIONALITY;
  selectedNationality: string;
}

interface ClearFormType {
  type: PEOPLE_ACTIONS_TYPES.CLEAR_FORM;
  clear: boolean;
}

interface ClearDataType {
  type: PEOPLE_ACTIONS_TYPES.CLEAR_DATA;
  data: boolean;
}

export const actionCreators: actionCreatorsTypes = {
  setData: (items) => ({
    type: PEOPLE_ACTIONS_TYPES.SET_PEOPLE,
    peopleData: items,
  }),
  setError: (value: boolean) => ({
    type: PEOPLE_ACTIONS_TYPES.SET_ERROR,
    error: value,
  }),
  filterByName: (item: string) => ({
    type: PEOPLE_ACTIONS_TYPES.FILTER_BY_NAME,
    searchValue: item,
  }),
  selectGender: (item: string) => ({
    type: PEOPLE_ACTIONS_TYPES.SET_SELECTED_GENDER,
    selectedGender: item,
  }),
  selectNationality: (item: string) => ({
    type: PEOPLE_ACTIONS_TYPES.SET_SELECTED_NATIONALITY,
    selectedNationality: item,
  }),
  clearForm: () => ({
    type: PEOPLE_ACTIONS_TYPES.CLEAR_FORM,
    clear: true,
  }),
  clearData: (value: boolean) => ({
    type: PEOPLE_ACTIONS_TYPES.CLEAR_DATA,
    data: value,
  }),
};

export type CurrentActionType =
  | SetDataType
  | SetErrorType
  | FilterByNameType
  | SelectGenderType
  | SelectNationalityType
  | ClearFormType
  | ClearDataType;
