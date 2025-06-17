# IssueHub Application Setup Instructions

## 1. Database Configuration

### Using PlanetScale

1. Access [PlanetScale](https://planetscale.com/) and create an account
2. Create a new database (e.g., `issuehub`)
3. Get the connection string and set it in your `.env.local` file:
   ```
   DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/issuehub?sslaccept=strict"
   ```

### Using Local MySQL

1. Install MySQL (if not already installed)
   ```bash
   brew install mysql
   ```
2. Start MySQL
   ```bash
   brew services start mysql
   ```
3. Create a database
   ```bash
   mysql -u root -p
   CREATE DATABASE issuehub;
   set password for root@localhost='password';
   ```
4. Set the connection string in your `.env.local` file:
   ```
   DATABASE_URL="mysql://root:password@localhost:3306/issuehub"
   ```

## 2. GitHub OAuth Configuration

1. Access [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App" in the "OAuth Apps" section
3. Enter the following information:
   - Application name: IssueHub
   - Homepage URL: http://localhost:3002
   - Authorization callback URL: http://localhost:3002/api/auth/callback/github
4. Click "Register application"
5. Set the generated Client ID and Client Secret in your `.env.local` file:
   ```
   GITHUB_CLIENT_ID="your-client-id"
   GITHUB_CLIENT_SECRET="your-client-secret"
   ```

## 3. Creating a GitHub Personal Access Token (PAT)

1. Access [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the following permissions:
   - `repo` (public repos only)
   - `read:user`
4. Generate the token and set it in your `.env.local` file:
   ```
   GITHUB_API_TOKEN="your-github-pat"
   ```

## 4. NextAuth Secret Configuration

1. Run the following command in your terminal to generate a random string:
   ```bash
   openssl rand -base64 32
   ```
2. Set the generated string in your `.env.local` file:
   ```
   NEXTAUTH_SECRET="generated-string"
   NEXTAUTH_URL="http://localhost:3002"
   ```

## 5. Prisma Database Initialization

After completing the configuration, run the following commands to initialize the database:

```bash
cd /Users/takumaniwa/issuehub
npx prisma migrate dev --name init
npx prisma generate
```

## 6. Restart the Application

```bash
npm run dev
```

You should now be able to access the application at http://localhost:3002 and it should be working properly.
