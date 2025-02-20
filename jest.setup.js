const { execSync } = require('child_process');

execSync('npm run db:generate');
execSync('npm run db:migrate');