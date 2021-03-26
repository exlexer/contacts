export type IAddress = {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
};

export type IContact = {
  firstName: string;
  lastName: string;
  birth: Date;
  addresses?: IAddress[];
  phones?: string[];
  emails?: string[];
};
