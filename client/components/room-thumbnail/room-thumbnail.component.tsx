// @flow
import Image from 'next/image';
import * as React from 'react';

import Checkmark from '../../public/icons/checkmark.svg';
import { Room } from '../../types/property';
type Props = {
  rooms: Room[];
  selectedRoom: Room;
  selectRoom: (room: Room) => void;
};
export const RoomThumbnail = ({ rooms, selectRoom, selectedRoom }: Props) => {
  return (
    <div className="room-list">
      {rooms.map((room, index) => (
        <div
          key={index}
          className={`room-thumbnail ${room.id === selectedRoom.id ? 'active' : ''}`}
          onClick={() => selectRoom(room)}
        >
          <h5 className="heading">{room.name}</h5>
          <span className="paragraph--medium">Capacity: {room.capacity}</span>
          <span className="paragraph--medium">Price Per Night: {room.pricePerNight}</span>
          {room.id === selectedRoom.id ? (
            <div className="checkmark">
              <Checkmark />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};
