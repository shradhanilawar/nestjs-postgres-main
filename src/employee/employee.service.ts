import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly db: DatabaseService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { name, email } = createEmployeeDto;
      const query =
        'INSERT INTO employee(name, email) VALUES ( $1, $2) RETURNING * ';
      const data = this.db.query(query, [name, email]);
      return data;
    } catch (error) {
      return error;
    }
  }

  findAll() {
    try {
      const query = 'select * from employee';
      const data = this.db.query(query);
      return data;
    } catch (error) {
      return error;
    }
  }

  findOne(id: number) {
    try {
      const query = 'SELECT * FROM employee WHERE id=$1';
      const data = this.db.query(query, [id]);
      return data;
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const { name, email } = updateEmployeeDto;
      const query =
        'UPDATE employee SET name=$1, email=$2 WHERE id=$3  RETURNING *';
      const data = this.db.query(query, [name, email, id]);
      return data;
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    try {
      const query = 'DELETE FROM employee WHERE id=$1  RETURNING *';
      const data = this.db.query(query, [id]);
      return data;
    } catch (error) {
      return error;
    }
  }
}
