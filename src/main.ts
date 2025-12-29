import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('AI_SERVICE_URL ENV:', process.env.AI_SERVICE_URL);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  
  const config = new DocumentBuilder()
    .setTitle('Travel Log API')
    .setDescription(
      'API documentation for Travel Log - A platform to track trips, upload experiences, and plan future adventures. Share your travel stories and discover amazing destinations!',
    )
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('trips', 'Trip management endpoints')
    .addTag('cities', 'City information endpoints')
    .addTag('chat', 'AI chat assistant endpoints')
    .addTag('admin', 'Admin management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addCookieAuth('access_token', {
      type: 'http',
      in: 'Cookie',
      scheme: 'Bearer',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3001);
  console.log(` Server running on port ${process.env.PORT ?? 3001}`);
  console.log(` Swagger documentation available at http://localhost:${process.env.PORT ?? 3001}/api`);
}
bootstrap();
