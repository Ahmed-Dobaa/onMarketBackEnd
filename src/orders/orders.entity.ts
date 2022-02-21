import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Products} from '../products/products.entity';
import {Users} from '../users/users.entity';


@Entity("orders")
export class Orders extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("int", { name: "product_id" })
    product_id: number;

    @Column("int", { name: "user_id" })
    user_id: number;

    @Column("int", { name: "quantity" })
    quantity: number;

    @Column("int", { name: "status" })
    status: number;


    @ManyToOne(() => Products, (products) => products.product_id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      })
      @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
      productId: Products;


    @ManyToOne(() => Users, (users) => users.user_id, {
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
      })
      @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
      userId: Users;

}
