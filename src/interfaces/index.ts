export interface IArgs {
  args?: {
    formData?: any;
    json?: {
      [key: string]: any;
    };
  };
}

export interface IPerson {
  age: string;
  firstName: string;
  id: string;
  lastName: string;
  photo: string;
}
