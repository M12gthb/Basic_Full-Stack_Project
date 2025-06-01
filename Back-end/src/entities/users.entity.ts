import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 255 }) // Adicionei length para melhor prática
  image: string;

  @CreateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    precision: 6,
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp",
    precision: 6,
    nullable: true,
  })
  deletedAt: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password && !getRounds(this.password)) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { User };
