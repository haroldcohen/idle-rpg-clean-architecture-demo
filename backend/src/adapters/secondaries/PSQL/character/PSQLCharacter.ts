import { BaseEntity, Column, JoinColumn, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import PSQLPlayer from '../player/PSQLPlayer';

@Entity('characters')
export default class PSQLCharacter extends BaseEntity {
    @PrimaryColumn()
    public id: string;

    @Column('varchar', { length: 25 })
    public name!: string;

    @Column('integer')
    public skillPoints!: number;

    @Column('integer')
    public healthPoints!: number;

    @Column('integer')
    public attackPoints!: number;

    @Column('integer')
    public defensePoints!: number;

    @Column('integer')
    public magikPoints!: number;

    @ManyToOne(() => PSQLPlayer, (player: PSQLPlayer) => player.characters)
    public player: PSQLPlayer;

    constructor(
        id: string,
        name: string,
        skillPoints: number,
        healthPoints: number,
        attackPoints: number,
        defensePoints: number,
        magikPoints: number,
        player: PSQLPlayer,
    ) {
        super();
        this.id = id;
        this.name = name;
        this.skillPoints = skillPoints;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
        this.defensePoints = defensePoints;
        this.magikPoints = magikPoints;
        this.player = player;
    }
}
