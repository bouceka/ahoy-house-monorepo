// @flow
import * as React from 'react';
import Trash from '../../public/icons/trash.svg';
import Pencil from '../../public/icons/pencil.svg';
import { Action } from '../action/action.component';
import Image from 'next/image';

type Props = {
  th: string[];
  data: { [key: string]: any }[];
  propertyList: string[];
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  isEditable?: boolean;
};
export const AdminTable = ({ th, data, propertyList, handleDelete, handleEdit, isEditable = true }: Props) => {
  return (
    <table className='admin-table'>
      <thead>
        <tr>
          {th.map((th, index) => (
            <th key={index}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((td, index) => (
          <tr key={index}>
            <th>{index + 1}</th>
            {propertyList.map((key, i) => {
              if (key === 'rooms' && td[key]) return <td key={i}>{`${td[key].length}`}</td>;
              else if (key === 'image')
                return (
                  <td key={i}>
                    <Image alt='image' style={{ width: '100px' }} src={td['url']} />
                  </td>
                );
              else if (key === 'url')
                return (
                  <td key={i}>
                    <Action as='link' styleType='outline' href={td['url']}>
                      Link
                    </Action>
                  </td>
                );
              else if (key !== 'edit') return <td key={i}>{`${td[key]}`}</td>;
              else
                return (
                  <td key={i}>
                    {isEditable ? (
                      <button onClick={() => handleEdit(td['id'])}>
                        <Pencil />
                      </button>
                    ) : null}
                    <button onClick={() => handleDelete(td['id'])}>
                      <Trash />
                    </button>
                  </td>
                );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
