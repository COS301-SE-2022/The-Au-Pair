export interface Activity{
    id: string;
    name: string;
    description: string;
    location: string;
    boundary: number;
    longitude: number;
    latitude: number;
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
    dob: string;
    allergies: string;
    diet: string;
    parent: string;
    aupair: string;
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
    rating: number [];
  }

  export interface auPair{
    id: string;
    rating: number [];
    onShift: boolean;
    employer: string;
    costIncurred: number;
    distTraveled: number;
    payRate: number;
    bio: string;
    experience: string;
    currentLong: number;
    currentLat: number;
    alreadyOutOfBounds: boolean;
    terminateDate: string;
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
    latitude: number;
    longitude: number;
    suburb: string;
    gender: string;
    fcmToken : string;
    birth: string;
    warnings: number;
    banned: string;
  }

  export interface Contract{
    parentID: string;
    auPairID: string;
    timestamp: string;
  }
  
  export interface Notification{
    id: string;
    parentId: string;
    auPairId: string;
    title: string;
    body: string;
    date: string;
    time: string;
  }
  
  export interface Report{
    id: string;
    reportIssuerId: string;
    reportedUserId: string;
    desc: string;
  }
  
  export interface Email{
    to: string;
    subject: string;
    body: string;
  }

  export interface UserCosts{
    id: string;
    type: string;
    description: string;
    contributerId: string;
    otherPartyId: string;
    date: string;
    metric: number;
    amount: number;
  }
  