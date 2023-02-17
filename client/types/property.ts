export interface Property {
  id: string;
  numberRooms: number;
  postCode: string;
  numberBaths: number;
  size: number;
  name: string;
  description: string;
  address: string;
  images: PropertyImage[];
	rooms:Room[]
}

export interface PropertyImage {
	id:string,
	url:string,
	alt:string
}


export interface Room {
	id:string,
	name:string,
	capacity:number,
	description:string,
	size:number,
	pricePerNight: number,
}
