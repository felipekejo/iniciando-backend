import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateAppointments1599707519157 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar',

          },
          {
            name: 'date',
            type: 'timestamptz',

          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()'
          }
        ]

      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments')
  }

}
