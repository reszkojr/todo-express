const { execSync } = require('child_process');

process.env.NODE_ENV = 'test';

execSync('npm run db:generate');
execSync('npm run db:migrate');