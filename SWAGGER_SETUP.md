# Swagger/OpenAPI Documentation Setup

## ✅ What's Been Configured

### 1. **Swagger Installation**
- ✅ Installed `@nestjs/swagger` and `swagger-ui-express`
- ✅ Configured in `src/main.ts`

### 2. **Swagger Configuration**
- **Title:** Travel Log API
- **Description:** API documentation for Travel Log platform
- **Version:** 1.0
- **Base URL:** `/api`
- **JWT Authentication:** Bearer token support configured

### 3. **Documented Endpoints**

#### **Auth Endpoints** (`/auth`)
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login user

#### **User Endpoints** (`/users`)
- `GET /users/me` - Get current user profile (Protected)
- `PATCH /users/me` - Update user profile (Protected)
- `PATCH /users/me/password` - Change password (Protected)
- `GET /users/:id` - Get user public information

#### **City Endpoints** (`/city`)
- `GET /city` - Get all cities
- `GET /city/search?query=...` - Search cities by name
- `GET /city/popular` - Get popular cities
- `GET /city/:id` - Get city by ID

#### **Chat Endpoints** (`/chat`)
- `POST /chat` - Chat with AI assistant

#### **Admin Endpoints** (`/admin`)
- Currently commented out (ready for future use)

---

## 🚀 How to Access

1. **Start your server:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI:**
   ```
   http://localhost:3001/api
   ```

3. **Alternative JSON format:**
   ```
   http://localhost:3001/api-json
   ```

---

## 🔐 Authentication in Swagger

### Using JWT Bearer Token:

1. **Login first:**
   - Go to `/auth/signin` endpoint
   - Enter your credentials
   - Copy the `access_token` from the response

2. **Authorize:**
   - Click the **"Authorize"** button (🔒) at the top right
   - Enter: `Bearer YOUR_TOKEN_HERE` (or just `YOUR_TOKEN_HERE`)
   - Click "Authorize"
   - Click "Close"

3. **Test Protected Endpoints:**
   - All protected endpoints will now use your token automatically
   - The token persists across requests (thanks to `persistAuthorization: true`)

---

## 📝 Adding New Endpoints

### For Controllers:
```typescript
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('your-tag')
@Controller('your-route')
export class YourController {
  @Get()
  @ApiOperation({ summary: 'Brief description' })
  @ApiResponse({ status: 200, description: 'Success response' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  yourMethod() {
    // ...
  }
}
```

### For Protected Endpoints:
```typescript
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
@Get('/protected')
yourProtectedMethod() {
  // ...
}
```

### For DTOs:
```typescript
import { ApiProperty } from '@nestjs/swagger';

export class YourDto {
  @ApiProperty({
    description: 'Field description',
    example: 'example value',
  })
  @IsString()
  field: string;
}
```

---

## 🎨 Customization Options

### Update Swagger Config in `main.ts`:

```typescript
const config = new DocumentBuilder()
  .setTitle('Your Title')
  .setDescription('Your Description')
  .setVersion('1.0')
  .addServer('https://api.production.com', 'Production')
  .addServer('http://localhost:3001', 'Development')
  // ... more options
  .build();
```

### Available Options:
- `.addTag()` - Add custom tags
- `.addServer()` - Add multiple server environments
- `.addBearerAuth()` - Configure authentication
- `.addCookieAuth()` - Configure cookie authentication
- `.setContact()` - Add contact information
- `.setLicense()` - Add license information

---

## 📚 Best Practices

1. **Always add `@ApiTags()`** to controllers for organization
2. **Use `@ApiOperation()`** for endpoint descriptions
3. **Document all responses** with `@ApiResponse()`
4. **Add `@ApiProperty()`** to DTOs for better schema documentation
5. **Use `@ApiBearerAuth()`** for protected endpoints
6. **Provide examples** in `@ApiProperty()` and `@ApiResponse()`

---

## 🔍 Testing in Swagger UI

1. **Try It Out:** Click "Try it out" on any endpoint
2. **Fill Parameters:** Enter required parameters
3. **Execute:** Click "Execute"
4. **View Response:** See the response with status code and body
5. **Copy cURL:** Use the generated cURL command for testing

---

## 🐛 Troubleshooting

### Swagger UI not loading?
- Check if server is running
- Verify port matches your configuration
- Check browser console for errors

### Authentication not working?
- Make sure you're using `Bearer YOUR_TOKEN` format
- Verify `@ApiBearerAuth('JWT-auth')` matches the name in `main.ts`
- Check that the token hasn't expired

### DTOs not showing in Swagger?
- Ensure `@ApiProperty()` decorators are added
- Check that DTOs are properly imported
- Verify class-validator decorators are present

---

## 📖 Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger UI Documentation](https://swagger.io/tools/swagger-ui/)



