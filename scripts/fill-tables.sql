insert into cart(created_at, updated_at, status) values('2023-12-24', '2023-12-24', 'OPEN');
insert into cart(created_at, updated_at, status) values('2023-12-23', '2023-12-23', 'OPEN');
insert into cart(created_at, updated_at, status) values('2023-12-22', '2023-12-22', 'OPEN');
insert into cart(created_at, updated_at, status) values('2023-12-21', '2023-12-21', 'ORDERED');
insert into cart(created_at, updated_at, status) values('2023-12-20', '2023-12-20', 'ORDERED');

select id from cart;

-- replace cart_id values below, using values from select query
insert into cart_item(cart_id, product_id, count) values
('a90b7e0b-1be3-4aa2-a3a1-1ccaa2a83cba', '5f806c90-8f56-4dda-b974-cae72ef9de0e', 2),
('a90b7e0b-1be3-4aa2-a3a1-1ccaa2a83cba', '90642b5d-2568-48a7-9701-22c2eb1a261a', 5),
('80ba3f43-7050-4bea-9d41-90c6e107ee24', '90642b5d-2568-48a7-9701-22c2eb1a261a', 5),
('80ba3f43-7050-4bea-9d41-90c6e107ee24', '25e5354e-84de-408a-b2f5-528341a103fb', 8),
('fee59be6-14ee-460c-a778-35d56e5bc7c8', '90642b5d-2568-48a7-9701-22c2eb1a261a', 3),
('fee59be6-14ee-460c-a778-35d56e5bc7c8', '7567ec4b-b10c-49c5-9345-fc73348a80a1', 4),
('218255fc-979d-4720-aaee-0677af3ca9de', '5f806c90-8f56-4dda-b974-cae72ef9de0e', 6),
('218255fc-979d-4720-aaee-0677af3ca9de', '90642b5d-2568-48a7-9701-22c2eb1a261a', 7),
('12cb5420-60aa-4042-a518-bb6941ef49d5', '25e5354e-84de-408a-b2f5-528341a103fb', 10),
('12cb5420-60aa-4042-a518-bb6941ef49d5', '7567ec4b-b10c-49c5-9345-fc73348a80a1', 1);