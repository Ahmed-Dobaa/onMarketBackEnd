import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt'
import {Orders} from '../orders/orders.entity';


@Index(["userEmail"], { unique: true })
@Entity("users")
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn({ type: "int", name: "id" })
    id: number;

    @Column("varchar", { name: "user_name", length: 50, nullable: false })
    userName: string;

    @Column("varchar", { name: "user_email", length: 100, nullable: false, unique: true })
    userEmail: string;

    @Column("varchar", { name: "user_password", length: 500, nullable: false })
    userPassword: string;

    @Column("varchar", { name: "salt", length: 500, nullable: false })
    salt: string;

    @Column("int", { name: "created_by", nullable: true })
    createdBy: number;

    @Column("int", { name: "updated_by", nullable: true })
    updatedBy: number;



    @OneToMany(() => Orders, (orders) => orders.userId)
    user_id: Orders[];
    async compareUserPassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.userPassword
      }
}
