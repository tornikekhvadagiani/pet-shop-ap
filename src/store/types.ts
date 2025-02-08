export interface Pet {
  id: number;
  name: string;
  type: string;
}

export interface PetsState {
  petsList: Pet[];
}
