import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'uuid', nullable: false})
    user_id: string;

    @Column({type: 'date', nullable: false})
    created_at: Date;

    @Column({type: 'date', nullable: false})
    updated_at: Date;

    @Column({type: 'text'})
    status: 'OPEN' | 'ORDERED';

    @OneToMany(() => CartItem, (item) => item.cart_id)
    items: CartItem[]
}

@Entity('cart_item')
export class CartItem {
    @ManyToOne(() => Cart, (cart) => cart.id)
    @JoinColumn({name: 'cart_id'})
    cart_id: string;

    @PrimaryColumn({type: 'uuid', nullable: false})
    product_id: string;

    @Column({type: 'integer', nullable: false})
    count: number
}