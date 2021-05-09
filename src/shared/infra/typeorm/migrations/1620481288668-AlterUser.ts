import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUser1620481288668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'cpf',
        type: 'varchar',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'phone_number',
        type: 'varchar',
        isNullable: true,
      })
    );
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'birth',
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'cpf');
    await queryRunner.dropColumn('users', 'phone_number');
    await queryRunner.dropColumn('users', 'birth');
  }
}
