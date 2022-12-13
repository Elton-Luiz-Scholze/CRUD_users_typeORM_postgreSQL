import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("usuarios")
class user {
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
}

export { user }