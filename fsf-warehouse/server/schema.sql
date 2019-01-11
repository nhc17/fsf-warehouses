create database warehouses;

use warehouses;

create table warehouse (
    warehouse_id    int(2) not null,
    warehouse_name  varchar(30) not null,
    inventory_qty   int(4) not null,

    primary key(warehouse_id)
)

create table products (
    product_id  int(2) not null,
    name        varchar(30) not null,
    qty         int(3) not null,
    
    primary key(product_id)
)

create table inventories (
    warehouse_id int(2) not null,
    warehouse_name  varchar(30) not null,
    product_id  int(2) not null,
    name        varchar(30) not null,
    qty         int(3) not null,
    

    primary key(warehouse_id),

    constraint fk_product_id
        foreign key(product_id)
        references product(product_id)
);


INSERT INTO warehouses (warehouse_id, warehouse_name, inventory_qty) VALUES
(1, "Tuas", 100),
(2, "Jurong East", 300),
(3, "Jurong West", 100),
(4, "Pasir Ris", 100),
(5, "Tanjung Pagar", 200),
(6, "Punggol", 100),
(7, "Sembawang", 100),
(8, "Yishun", 200);

INSERT INTO products (product_id, name, qty) VALUES
(1, "Television", 1000),
(2, "Dryer", 1000),
(3, "Game Console", 1000);

INSERT INTO inventories (warehouse_id, warehouse_name, product_id, name, qty) VALUES
(1, "Tuas", 1, "Television", 30),
(1, "Tuas", 2, "Dryer", 40),
(1, "Tuas", 3, "Game Console", 30),

(2, "Jurong East", 1, "Television", 100),
(2, "Jurong East", 2, "Dryer", 100),
(2, "Jurong East", 3, "Game Console", 100),

(3, "Jurong West", 1, "Television", 30),
(3, "Jurong West", 2, "Dryer", 40),
(3, "Jurong West", 3, "Game Console", 30),

(4, "Pasir Ris", 1, "Television", 30),
(4, "Pasir Ris", 2, "Dryer", 40),
(4, "Pasir Ris", 3, "Game Console", 30),

(5, "Tanjung Pagar", 1, "Television", 100),
(5, "Tanjung Pagar", 2, "Dryer", 50),
(5, "Tanjung Pagar", 3, "Game Console", 50),

(6, "Punggol", 1, "Television", 30),
(6, "Punggol", 2, "Dryer", 40),
(6, "Punggol", 3, "Game Console", 30),

(7, "Sembawang", 1,"Television", 30),
(7, "Sembawang", 2, "Dryer", 40),
(7, "Sembawang", 3, "Game Console", 30),

(8, "Yishun", 1, "Television", 100),
(8, "Yishun", 2, "Dryer", 50),
(8, "Yishun", 3, "Game Console", 50);