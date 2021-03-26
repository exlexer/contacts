import * as db from '../lib/db';
import { IContact, IAddress } from './types';

export default class Contact {
  contact: IContact;
  id: number;

  constructor(contact: IContact, id?: string) {
    this.contact = contact;
    this.contact.addresses = [];
    this.contact.phones = [];
    this.contact.emails = [];
    this.id = +id;
  }

  addAddresses(addresses: IAddress[]): void {
    this.contact.addresses = [...this.contact.addresses, ...addresses];
  }

  addPhones(phones: string[]): void {
    this.contact.phones = [...this.contact.phones, ...phones];
  }

  addEmails(emails: string[]): void {
    this.contact.emails = [...this.contact.emails, ...emails];
  }

  async update(contact: IContact): Promise<void> {
    const text = `
        update contacts set
          first_name = $1,
          last_name = $2,
          birth = $3
        where id = $4`;
    const mergedContact: IContact = { ...this.contact, ...contact };

    const params = [mergedContact.firstName, mergedContact.lastName, mergedContact.birth, this.id];

    await db.query(text, params);
  }

  async store(): Promise<void> {
    const text = `
        insert into contacts
          (first_name, last_name, birth)
        values ($1, $2, $3)
        returning id
      `;

    const params = [this.contact.firstName, this.contact.lastName, this.contact.birth];

    const [res] = await db.query(text, params);
    await this._storeItems('addresses', res.id);
    await this._storeItems('phones', res.id);
    await this._storeItems('emails', res.id);
  }

  static async delete(id: string): Promise<void> {
    await db.query('delete from contacts where id = $1', [id]);
  }

  static async getById(id: string): Promise<Contact> {
    const [contact] = await db.query(
      'select first_name firstName, last_name lastName, birth dob from contacts where id = $1',
      [id],
    );
    return new Contact(contact, id);
  }

  static async getAll(): Promise<any> {
    const [{ data }] = await db.query(
      `
        select array_to_json(array(select row_to_json(row) from (select
          c.first_name "firstName",
          c.last_name "lastName",
          to_char(c.birth, 'DD Mon YYYY') dob,
          c.id,
          array_to_json(array(select row_to_json(e) from (select * from emails where contact_id = c.id) e)) emails,
          array_to_json(array(select row_to_json(p) from (select * from phones where contact_id = c.id) p)) phones,
          array_to_json(array(select row_to_json(a) from (select * from addresses where contact_id = c.id) a)) addresses
        from contacts c) row)) "data"`,
    );
    return data;
  }

  async _storeItems(item: string, id: string): Promise<void> {
    for (let i = 0; i < this[item].length; i++) {
      await this[item][i].store(id);
    }
  }
}
