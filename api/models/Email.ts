import * as db from '../lib/db';

export default class Email {
  email: string;
  id: number;

  constructor(email: string, id?: string) {
    this.email = email;
    this.id = +id;
  }

  async store(contactId: string): Promise<void> {
    if (this.id) throw new Error('email already stored');
    const text = `
        insert into emails (contact_id, email)
        values ($1, $2)
        returning id
      `;

    const params = [contactId, this.email];

    const [{ id }] = await db.query(text, params);
    this.id = id;
    return id;
  }

  async update(email: string): Promise<void> {
    const text = `
        update emails set
          email = $1
        where id = $2`;

    const params = [email || this.email, this.id];

    await db.query(text, params);
  }

  static async getById(id: string): Promise<Email> {
    const [{ email }] = await db.query('select * from emails where id = $1', [id]);
    return new Email(email, id);
  }

  static async delete(id: string): Promise<void> {
    await db.query('delete from emails where id = $1', [id]);
  }
}
