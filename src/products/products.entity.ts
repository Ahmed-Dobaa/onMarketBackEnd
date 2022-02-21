import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {Orders} from '../orders/orders.entity';


@Entity("products")
export class Products extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "product_name", length: 50, nullable: false })
    product_name: string;

    @Column("int", { name: "status" })
    status: number;

    @OneToMany(() => Orders, (orders) => orders.productId)
    product_id: Orders[];
}
