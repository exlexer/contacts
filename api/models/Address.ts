import * as db from '../lib/db';
import { IAddress } from './types';

export default class Address {
  id: number;
  address: IAddress;

  constructor(address: IAddress, id?: string) {
    this.address = address;
    this.id = +id;
  }

  async store(contactId: string): Promise<number> {
    if (this.id) throw new Error('address already stored');
    const text = `
        insert into addresses
          (contact_id, line_1, line_2, city, state, country)
        values ($1, $2, $3, $4, $5, $6)
        returning id
      `;

    const params = [
      contactId,
      this.address.line1,
      this.address.line2,
      this.address.city,
      this.address.state,
      this.address.country,
    ];

    const [{ id }] = await db.query(text, params);

    this.id = id;
    return id;
  }

  async update(address: IAddress): Promise<void> {
    const text = `
        update addresses set
          line_1 = $1,
          line_2 = $2,
          city = $3,
          state = $4,
          country = $5
        where id = $6`;

    const mergedAddress: IAddress = { ...this.address, ...address };

    const params = [
      mergedAddress.line1,
      mergedAddress.line2,
      mergedAddress.city,
      mergedAddress.state,
      mergedAddress.country,
      this.id,
    ];

    await db.query(text, params);
  }

  static async getById(id: string): Promise<Address> {
    const [address] = await db.query(
      'select line_1 line1, line_2 line2, city, state, country from addresses where id = $1',
      [id],
    );
    return new Address(address, id);
  }

  static delete(id: string): Promise<unknown> {
    return db.query('delete from addresses where id = $1', [id]);
  }
}
