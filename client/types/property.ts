export interface Property {
  id: string;
  numberRooms: number;
  postalCode: string;
  numberBaths: number;
  livingArea: number;
  name: string;
  description: string;
  address: string;
  isActive: boolean;
  images: PropertyImage[];
  rooms: Room[];
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  description: string;
  livingArea: number;
  pricePerNight: number;
  propertyId:string
  amenities:string,
}
