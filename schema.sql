create table contacts(
  id serial NOT NULL PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  last_name text NOT NULL,
  birth date NOT NULL
);

create table addresses(
  id serial NOT NULL PRIMARY KEY,
  contact_id integer REFERENCES contacts(id) ON DELETE CASCADE,
  line_1 text NOT NULL,
  line_2 text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  country text NOT NULL
);

create table phones(
  id serial NOT NULL PRIMARY KEY,
  contact_id integer REFERENCES contacts(id) ON DELETE CASCADE,
  phone_number text NOT NULL
);

create table emails(
  id serial NOT NULL PRIMARY KEY,
  contact_id integer REFERENCES contacts(id) ON DELETE CASCADE,
  email text NOT NULL
);
