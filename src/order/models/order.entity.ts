import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from '../../cart';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'uuid', nullable: false})
    user_id: string;

    @OneToOne(() => Cart, (cart) => cart.id)
    @JoinColumn({name: 'cart_id'})
    cart_id: string;
    
    @Column({type: 'json', nullable: false})
    payment: string;

    @Column({type: 'json', nullable: false})
    delivery: string;

    @Column({type: 'text'})
    comments: string;
    
    @Column({type: 'text', nullable: false})
    status: string;
    
    @Column({type: 'integer', nullable: false})
    total: number;
}