import { hashSync } from "bcryptjs";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeUpdate, BeforeInsert } from "typeorm";

@Entity("usuarios")
class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 200 })
    name: string

    @Column({ length: 200, unique: true })
    email: string

    @Column({ length: 150 })
    password: string

    @Column()
    isAdm: boolean

    @Column({ default: true })
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeUpdate()
    @BeforeInsert()
    hashPassWord() {
        this.password = hashSync(this.password,10)
    }
}

export { User }