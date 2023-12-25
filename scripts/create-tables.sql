create type status_val as ENUM('OPEN', 'ORDERED');

create table cart (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null default uuid_generate_v4(),
	created_at date not null,
    updated_at date not null,
    status status_val not null
);

create extension if not exists "uuid-ossp";

create table cart_item (
	cart_id uuid not null,
    product_id uuid,
    count integer,
    foreign key (cart_id) references cart(id)
);

create table orders(
	id uuid not null default uuid_generate_v4() primary key,
    user_id uuid not null,
	cart_id uuid not null,
    foreign key (cart_id) references cart(id),
    payment json,
    delivery json,
    comments text,
    status text,
    total integer
);

create table users(
	id uuid not null default uuid_generate_v4() primary key,
	username text,
	email text,
	password text
);