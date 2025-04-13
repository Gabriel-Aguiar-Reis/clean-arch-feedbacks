import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedUsers1712938540000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [
      {
        id: 1,
        firstName: 'Karen',
        lastName: 'Jones',
        description:
          "Karen is the senior dev who knows everything — and uses it against you. Her PR comments sting harder than failed deploys on Fridays. She never forgets a mistake (yours, not hers) and keeps a mental changelog of everyone's slip-ups. Her spreadsheet has three tabs: 'Bugs', 'Best Practices', and 'Grudges'. Working with her is like having a linter with venom."
      },
      {
        id: 2,
        firstName: 'Ryan',
        lastName: 'Jameson',
        description:
          "Ryan is a force of nature in a hoodie. He rewrites core modules overnight, introduces new frameworks mid-sprint, and considers testing 'a nice-to-have.' His calendar is chaos, but somehow it all works — or explodes spectacularly. Working with him is like debugging a hurricane: thrilling, confusing, and slightly dangerous."
      },
      {
        id: 3,
        firstName: 'Lucas',
        lastName: 'Collins',
        description:
          "Lucas is the kind of boss devs dream of. He's got the roadmap polished, the standups running smoothly, and still checks in to see if you’ve eaten. He runs on empathy and spreadsheets. If something goes wrong, he already has a backup plan — and a backup for the backup. Probably drinks herbal tea."
      },
      {
        id: 4,
        firstName: 'Hana',
        lastName: 'Chen',
        description:
          "Hana is the chaotic good wizard of the team. She prototypes, experiments, and somehow makes magic happen with duct tape and console.log(). Her desk is a mess, her tabs are infinite, but her solutions? Brilliant. Pair programming with her is a wild ride — but you’ll never be bored."
      }
    ]

    for (const user of users) {
      await queryRunner.manager.insert('users', user)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users" WHERE id IN (1, 2, 3, 4)`)
  }
}
