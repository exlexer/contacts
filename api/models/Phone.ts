import * as db from '../lib/db';

export default class Phone {
  number: string;
  id: number;

  constructor(number: string, id?: string) {
    this.number = number;
    this.id = +id;
  }

  async store(contactId: string): Promise<void> {
    if (this.id) throw new Error('phone already stored');
    const text = `
        insert into phones
          (contact_id, phone_number)
        values ($1, $2)
        returning id
      `;

    const params = [contactId, this.number];

    const [{ id }] = await db.query(text, params);
    this.id = id;
    return id;
  }

  async update(number: string): Promise<void> {
    const text = `
        update phones set
          phone_number = $1
        where id = $2`;

    const params = [number || this.number, this.id];

    await db.query(text, params);
  }

  static async getById(id: string): Promise<Phone> {
    const [{ phone_number }] = await db.query('select * from phones where id = $1', [id]);
    return new Phone(phone_number, id);
  }

  static async delete(id: string): Promise<void> {
    await db.query('delete from phones where id = $1', [id]);
  }
}
