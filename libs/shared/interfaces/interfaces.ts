export interface Activity{
    id: string;
    name: string;
    description: string;
    location: string;
    timeStart: string;
    timeEnd: string;
    budget: number;
    comment: string;
    behavior: string;
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

  export interface medAid{
    id: string;
    plan: string;
    name: string;
    sname: string;
    mID: string;
  }
  