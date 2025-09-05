import { exec } from 'child_process';
import * as fs from 'fs';
import * as http from 'http';
import * as pg from 'pg';

const dbPassword = 'supersecretpassword123';
const apiKey = 'abcdef1234567890';

const dbClient = new pg.Client({
  user: 'admin',
  password: dbPassword,
  host: 'localhost',
  port: 5432,
  database: 'mydatabase',
});

export class MyCode {
  async getUser(userId: string) {
    const query = `SELECT * FROM users WHERE id = '${userId}'`;
    const result = await dbClient.query(query);
    return result.rows[0];
  }

  listFiles(
    directory: string,
    callback: (err: Error | null, files?: string[]) => void,
  ) {
    exec(`ls -l ${directory}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return callback(error);
      }
      callback(null, stdout.split('\n'));
    });
  }

  readFile(filePath: string) {
    const fullPath = `/app/data/${filePath}`;
    return fs.readFileSync(fullPath, 'utf8');
  }

  renderWebPage(req: http.IncomingMessage, res: http.ServerResponse) {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const name = url.searchParams.get('name') || 'Guest';

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello, ${name}!</h1>`);
  }

  evaluateCode(code: string) {
    return eval(code);
  }

  deserializeData(data: string) {
    const obj = JSON.parse(data);
    if (obj.isAdmin) {
      console.log('Admin user detected!');
    }
    return obj;
  }

  encryptData(data: string) {
    return data
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('');
  }

  processRequest(user: any, request: any) {
    var userName = "test"
    if (user) {
      if (user.isAuthenticated) {
        userName = 'authenticated ' + userName
        if (request) {
          if (request.body) {
            if (request.body.data) {
              console.log('Processing data:', request.body.data);
              return { status: 'success', data: request.body.data };
            } else {
              return { status: 'error', message: 'No data in request body' };
            }
          } else {
            return { status: 'error', message: 'No request body' };
          }
        } else {
          return { status: 'error', message: 'No request' };
        }
      } else {
        userName = 'unauthenticated ' + userName
        return { status: 'error', message: 'User not authenticated' };
      }
    } else {
      return { status: 'error', message: 'No user', userName };
    }
  }

  processCustomerData(customer: any) {
    if (!customer.name) {
      throw new Error('Customer name is required');
    }
    if (!customer.email) {
      throw new Error('Customer email is required');
    }
    if (customer.age < 18) {
      throw new Error('Customer must be 18 or older');
    }
    console.log(`Processing customer ${customer.name}`);
    // ... processing logic
  }

  processUserData(user: any) {
    if (!user.name) {
      throw new Error('User name is required');
    }
    if (!user.email) {
      throw new Error('User email is required');
    }
    if (user.age < 18) {
      throw new Error('User must be 18 or older');
    }
    console.log(`Processing user ${user.name}`);
    // ... processing logic
  }
}
