import { BaseEntity, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import PSQLCharacter from '../character/PSQLCharacter';

@Entity('players')
export default class PSQLPlayer extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @OneToMany(() => PSQLCharacter, (character: PSQLCharacter) => character.player)
    public characters!: PSQLCharacter[];

    constructor(
        id: string,
    ) {
        super();
        this.id = id;
    }
}
