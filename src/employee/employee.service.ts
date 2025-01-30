import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly db: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { name, email } = createEmployeeDto;
    const query =
      'INSERT INTO employee(name, email) VALUES ($1, $2) RETURNING *';
    return this.executeQuery(query, [name, email]);
  }

  async findAll() {
    return this.executeQuery('SELECT * FROM employee');
  }

  async findOne(id: number) {
    return this.executeQuery('SELECT * FROM employee WHERE id=$1', [id]);
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const { name, email } = updateEmployeeDto;
    const query =
      'UPDATE employee SET name=$1, email=$2 WHERE id=$3 RETURNING *';
    return this.executeQuery(query, [name, email, id]);
  }

  async remove(id: number) {
    return this.executeQuery('DELETE FROM employee WHERE id=$1 RETURNING *', [
      id,
    ]);
  }

  private async executeQuery(query: string, params: any[] = []) {
    try {
      return await this.db.query(query, params);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }
}
