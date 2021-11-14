import { v4 } from 'uuid';
import CharacterSnapshot from './characterSnapshot';
import CharacterDoesNotHaveEnoughSkillPointsException
    from './exceptions/characterDoesNotHaveEnoughSkillPointsException';
import CharacterNameLengthException from './exceptions/characterNameLengthException';

export default class Character {
    #id: string;

    #name: string;

    #skillPoints: number;

    #healthPoints: number;

    #attackPoints: number;

    #defensePoints: number;

    #magikPoints: number;

    #playerId: string;

    public constructor(
        {
            id,
            name,
            skillPoints,
            healthPoints,
            attackPoints,
            defensePoints,
            magikPoints,
            playerId,
        }:{
            id?: string,
            name: string,
            skillPoints: number,
            healthPoints: number,
            attackPoints: number,
            defensePoints: number,
            magikPoints: number,
            playerId: string,
        },
    ) {
        this.#id = id || v4();
        this.#name = name;
        this.#healthPoints = healthPoints;
        this.#skillPoints = skillPoints;
        this.#attackPoints = attackPoints;
        this.#defensePoints = defensePoints;
        this.#magikPoints = magikPoints;
        this.#playerId = playerId;
        if (this.#name.length > 25) {
            throw new CharacterNameLengthException();
        }
    }

    private spendSkillPoints(skillPointsToSpend: number): void {
        this.canSpendSkillPointsOrDie(skillPointsToSpend);
        this.#skillPoints -= skillPointsToSpend;
    }

    private canSpendSkillPointsOrDie(skillPointsToSpend: number): void {
        if (skillPointsToSpend > this.#skillPoints) {
            throw new CharacterDoesNotHaveEnoughSkillPointsException();
        }
    }

    levelUpHealthPoints(healthPoints: number): void {
        if (healthPoints > this.#healthPoints) {
            this.spendSkillPoints(healthPoints - this.#healthPoints);
            this.#healthPoints = healthPoints;
        }
    }

    private static computeSkillPointsToSpend(currentLevel: number, targetLevel: number): number {
        let skillsPointsToSpend = 0;
        let currentLevelCopy = currentLevel;
        while (targetLevel > currentLevelCopy) {
            skillsPointsToSpend += currentLevelCopy ? Math.ceil(currentLevelCopy / 5) : 1;
            currentLevelCopy++;
        }

        return skillsPointsToSpend;
    }

    levelUpAttackPoints(attackPoints: number): void {
        if (attackPoints > this.#attackPoints) {
            this.spendSkillPoints(Character.computeSkillPointsToSpend(this.#attackPoints, attackPoints));
            this.#attackPoints = attackPoints;
        }
    }

    levelUpDefensePoints(defensePoints: number): void {
        if (defensePoints > this.#defensePoints) {
            this.spendSkillPoints(Character.computeSkillPointsToSpend(this.#defensePoints, defensePoints));
            this.#defensePoints = defensePoints;
        }
    }

    levelUpMagikPoints(magikPoints: number): void {
        if (magikPoints > this.#magikPoints) {
            this.spendSkillPoints(Character.computeSkillPointsToSpend(this.#magikPoints, magikPoints));
            this.#magikPoints = magikPoints;
        }
    }

    snapshot(): CharacterSnapshot {
        return new CharacterSnapshot({
            id: this.#id,
            name: this.#name,
            skillPoints: this.#skillPoints,
            healthPoints: this.#healthPoints,
            attackPoints: this.#attackPoints,
            defensePoints: this.#defensePoints,
            magikPoints: this.#magikPoints,
            playerId: this.#playerId,
        });
    }
}
