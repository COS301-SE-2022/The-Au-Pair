export interface Activity{
    id: string;
    name: string;
    description: string;
    location: string;
    timeStart: string;
    timeEnd: string;
    budget: number;
    comment: string;
    behavior: number;
    day: string ;
    child: string;
  }
  
  export interface Child{
    id: string;
    fname: string;
    sname: string;
    allergies: string;
    diet: string;
    parent: string;
  }

  export interface HoursLogged{
    id: string;
    user: string;
    date: String
    timeStart: string;
    timeEnd: string;
  }

  export interface medAid{
    id: string;
    plan: string;
    name: string;
    sname: string;
    mID: string;
    provider: string;
  }
  
  export interface Parent{
    id: string;
    children: string [];
    medID: string;
    auPair: string;
  }

  export interface auPair{
    id: string;
    rating: number;
    onShift: boolean;
    employer: string;
    costIncurred: number;
    distTraveled: number;
    payRate: number;
    bio: string;
    experience: string;
  }

  export interface User{
    id: string;
    fname: string;
    sname: string;
    email: string;
    address: string;
    registered: boolean;
    type: number;
    password: string;
    number: string;
    salt: string;
  }

  export interface auPair{
    id: string;
    rating: number;
    payRate: number;
    distTraveled: number;
    costIncurred: number;
    onShift: boolean;
    employer: string;
  }
  