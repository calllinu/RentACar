export interface Car {
  key: string;
  id: number;
  marca: string;
  model: string;
  descriere: string;
  km: string;
  categorie: string;
  tag: string;
  picture: string;
  is_borrowed: boolean;
  pret: number;
}

export interface CarHistory extends Car {
  initialDate: string;
  returnDate: string;
  dueDate: string;
  userKey: string;
  userFullName: string;
}
